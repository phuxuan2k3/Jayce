import { url } from "../../../app/env";
import { CurrentTestSocket } from "../api/socket.schema";
import { io } from "socket.io-client";
import { testApiGen } from "../api/test.api-gen";
import { RootState } from "../../../app/redux/store";
import { currentAttemptActions } from "./currentAttemtpSlice";

let _socket: CurrentTestSocket | null = null;

function connectSocket(getState: () => any) {
	if (!_socket) {
		const state = getState() as RootState;
		_socket = io(`${url.thresh.socket}/current`, {
			auth: {
				userId: state.auth.tokens?.user_id,
			}
		});
		_socket.on("connect_error", (error) => {
			console.error("connect_error", error);
		});
	}
	return _socket;
}

function clearSocket() {
	if (_socket) {
		_socket.removeAllListeners();
		_socket.disconnect();
		_socket = null;
	}
}

const currentAttemptApi = testApiGen.enhanceEndpoints({
	addTagTypes: ["CurrentTestSocket"],
	endpoints: {
		postTestsByTestIdCurrentNew: {
			invalidatesTags: ["CurrentTestSocket"],
			queryFn(arg, api, _, baseQuery) {
				const { currentAttempt } = api.getState() as RootState;
				// Prevent accidentally API calls if there is already an attempt. Ex: Navigate back, refresh page, etc.
				// Only allow to call this API when user confirm the dialog => dispatch(currentAttemptActions.endTest())
				if (currentAttempt.attemptInfo != null) {
					throw new Error("Already has an attempt");
				}
				return baseQuery(arg);
			},
		},
		getTestsByTestIdCurrent: {
			providesTags: ["CurrentTestSocket"],

			async onQueryStarted(arg, {
				queryFulfilled,
				getState,
				dispatch,
			}) {
				try {
					// Wait for the query to be fulfilled
					const { data } = await queryFulfilled;

					if (arg.testId == null || data == null) {
						console.error("Error: NULL in currentAttemptApi >> postTestsByTestIdCurrentNew >> onQueryStarted");
						return;
					}

					const socket = connectSocket(getState);
					if (data.currentAttempt != null) {
						socket.emit("REGISTERED", { attemptId: data.currentAttempt.id }, ({ isInprogress }) => {
							if (isInprogress == false) {
								dispatch(currentAttemptApi.util.invalidateTags(["CurrentTestSocket"]));
							}
						});
						dispatch(currentAttemptActions.startNewTest({
							testId: arg.testId,
							id: data.currentAttempt.id,
						}));
					}
					else {
						// End the test as the server response
						dispatch(currentAttemptActions.endTest());
					}

				} catch (error) {
					console.error("Error in currenctTestSocketApi >> onCacheEntryAdded");
					console.error(error);

					clearSocket();
					throw error;
				}
			},

			async onCacheEntryAdded(_, {
				updateCachedData,
				cacheDataLoaded,
				cacheEntryRemoved,
				getState,
				dispatch,
			}) {
				try {
					// Data loaded (cached)
					// Actually, everythign is loaded once, so don't worry about assigning socket events many times
					// The 2 await statements are "anchor" of the cache lifecycle, they only continue when the cache is loaded / removed.
					await cacheDataLoaded;

					const socket = connectSocket(getState);

					socket.on("CLOCK_SYNCED", ({ secondsLeft }) => {
						updateCachedData((draft) => {
							if (draft.currentAttempt == null) return;
							console.log("CLOCK_SYNCED", secondsLeft);
							draft.currentAttempt.secondsLeft = secondsLeft;
						});
					});

					socket.on("ANSWERED", ({ questionId, optionId }) => {
						updateCachedData((draft) => {
							if (draft.currentAttempt == null) return;
							if (optionId == null) {
								draft.currentAttempt.answers = draft.currentAttempt.answers.filter((answer) => answer.questionId !== questionId);
								return;
							}
							const existingAnswer = draft.currentAttempt.answers.find((answer) => answer.questionId === questionId);
							if (existingAnswer) {
								existingAnswer.chosenOption = optionId;
							} else {
								draft.currentAttempt.answers.push({ questionId, chosenOption: optionId });
							}
						});
					});

					socket.on("ENDED", () => {
						dispatch(currentAttemptApi.util.invalidateTags(["CurrentTestSocket"]));
					});

					// Cache time ends when data is not used in a certain time
					await cacheEntryRemoved;
					clearSocket();
				} catch (error) {
					console.error("Error in currenctTestSocketApi >> onCacheEntryAdded");
					console.error(error);

					clearSocket();
					throw error;
				}
			}
		}
	}
}).injectEndpoints({
	endpoints: (builder) => ({
		answerTestQuestion: builder.mutation<
			void,
			{
				attemptId: number,
				questionId: number,
				optionId: number | undefined
			}
		>({
			queryFn: (
				{ attemptId, questionId, optionId },
				{ getState }
			) => {
				try {
					const socket = connectSocket(getState);
					socket.emit("ANSWERED", { attemptId, questionId, optionId }, (error) => {
						if (error.error) throw new Error(error.error);
					});
					return {
						data: void 0,
					};
				}
				catch (error) {
					clearSocket();
					console.error("Error in currentTestApi >> answerTestQuestion");
					console.error(error);
					throw error;
				}
			}
		})
	}),
	overrideExisting: true,
});

export const { useAnswerTestQuestionMutation } = currentAttemptApi;
export { currentAttemptApi };
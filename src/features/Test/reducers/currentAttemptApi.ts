import { url } from "../../../app/env";
import { CurrentAttemptSocket } from "../api/socket.schema";
import { io } from "socket.io-client";
import { testApiGen } from "../api/test.api-gen";
import { RootState } from "../../../app/redux/store";
import { currentAttemptActions } from "./currentAttemtpSlice";

let _socket: CurrentAttemptSocket | null = null;

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

// TODO: save flagged questions and current index on the server side: Separate current attempt to a dependent entity, use json or cache storage.

const currentAttemptApi = testApiGen.enhanceEndpoints({
	addTagTypes: ["CurrentAttempt"],
	endpoints: {
		postCurrentAttemptNew: {
			invalidatesTags: ["CurrentAttempt"],
			onQueryStarted: async (_, {
				dispatch,
				queryFulfilled,
			}) => {
				await queryFulfilled;
				dispatch(currentAttemptActions.startTest());
			}
		},
		getCurrentAttemptState: {
			providesTags: ["CurrentAttempt"],

			async onQueryStarted(_, {
				queryFulfilled,
				getState,
				dispatch,
			}) {
				try {
					// Wait for the query to be fulfilled
					const { data } = await queryFulfilled;

					if (data == null) {
						console.error("Error: NULL in currentAttemptApi >> postTestsByTestIdCurrentNew >> onQueryStarted");
						return;
					}

					const socket = connectSocket(getState);
					if (data.currentAttempt != null) {
						socket.emit("REGISTERED", { attemptId: data.currentAttempt.id }, ({ isInprogress }) => {
							if (isInprogress == false) {
								throw new Error("Candidate do not have test that is in progress");
							}
						});
					}
					else {
						// This is the case when: fetch or re-fetch to the server with no current attempts, used for all cases when dispatch(invaildateTags) is called
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
						dispatch(currentAttemptActions.endTest()); // Ends the test
						dispatch(currentAttemptApi.util.invalidateTags(["CurrentAttempt"])); // Re-fetch to make sure it ends
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
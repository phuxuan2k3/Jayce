import { url } from "../../../app/env";
import { CurrentAttemptSocket } from "./socket.schema";
import { io } from "socket.io-client";
import { testApiGenOld } from "../legacy/test.api-gen";
import { RootState } from "../../../app/store";
import { testActions } from "../stores/testSlice";
import { authSelectors } from "../../auth/store/authSlice";

let _socket: CurrentAttemptSocket | null = null;

function connectSocket(getState: () => any) {
	if (!_socket) {
		const userId = authSelectors.selectUserId(getState() as RootState);
		_socket = io(`${url.thresh.socket}/current`, {
			auth: {
				userId: userId,
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

// TODO: sync flagged questions and current index

const currentAttemptApi = testApiGenOld.enhanceEndpoints({
	addTagTypes: ["CurrentAttempt"],
	endpoints: {
		getCandidateCurrentAttemptDo: {
			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(testActions.initialize({
						questions: data.questions,
					}));
				}
				// When no current attempt is found, the server will return 400 error
				catch (error) {
					clearSocket();
					dispatch(testActions.endTest());
				}
			}
		},
		postCandidateCurrentAttemptNew: {
			invalidatesTags: ["CurrentAttempt"],
		},
		getCandidateCurrentAttemptState: {
			providesTags: ["CurrentAttempt"],

			// Handle after the query is initiated
			async onQueryStarted(_, {
				queryFulfilled,
				getState,
				dispatch,
			}) {
				try {
					// Wait for the query to be fulfilled
					const { data } = await queryFulfilled;

					const socket = connectSocket(getState);
					if (data.currentAttempt != null) {
						socket.emit("REGISTERED", {
							attemptId: data.currentAttempt.id
						}, ({ isInprogress }) => {
							if (isInprogress == false || data.currentAttempt == null) {
								throw new Error("Candidate do not have test that is in progress");
							}
						});
					}
					else {
						// This is the case when: fetch or re-fetch to the server with no current attempts, used for all cases when dispatch(invaildateTags) is called

						dispatch(testActions.endTest());
					}

				} catch (error) {
					console.error(error);
					clearSocket();
					throw error;
				}
			},

			// Handle when the cache is created after the query is initiated
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
							draft.currentAttempt.secondsLeft = secondsLeft;
						});
					});

					socket.on("ANSWERED", ({ questionId, optionId }) => {
						updateCachedData((draft) => {
							if (draft.currentAttempt == null) return;
							if (optionId == null) {
								// If optionId is null, it means the answer is removed (unanswered) => Remove the answer from the list of answers
								draft.currentAttempt.answers = draft.currentAttempt.answers.filter((answer) => answer.questionId !== questionId);
								return;
							}
							// Update the answer if it exists, otherwise add a new one
							const existingAnswer = draft.currentAttempt.answers.find((answer) => answer.questionId === questionId);
							if (existingAnswer) {
								existingAnswer.chosenOption = optionId;
							} else {
								draft.currentAttempt.answers.push({
									questionId,
									chosenOption: optionId
								});
							}
						});
					});

					socket.on("ENDED", () => {
						dispatch(currentAttemptApi.util.invalidateTags(["CurrentAttempt"])); // Re-fetch to make sure it ends
					});

					// Cache time ends when data is not used in a certain time
					await cacheEntryRemoved;
					clearSocket();
				} catch (error) {
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
			null,
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
						console.error(error);
					});
					return {
						data: null,
						error: undefined,
					};
				}
				catch (error) {
					clearSocket();
					console.error(error);
					return {
						error: {
							status: 500,
							data: "Error in currentTestApi >> answerTestQuestion",
						}
					};
				}
			}
		})
	}),
	overrideExisting: true,
});

export const { useAnswerTestQuestionMutation } = currentAttemptApi;
export { currentAttemptApi };
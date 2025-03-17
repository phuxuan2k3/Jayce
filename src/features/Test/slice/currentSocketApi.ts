import { url } from "../../../app/env";
import { CurrentTestSocket } from "../api/socket.schema";
import { io } from "socket.io-client";
import { testApiGen } from "../api/test.api-gen";
import { RootState } from "../../../app/redux/store";
import { testClientSliceActions } from "./testClientSlice";

let _socket: CurrentTestSocket | null = null;

function connectSocket(auth: any) {
	if (!_socket) {
		_socket = io(`${url.thresh.socket}/current`, {
			auth: {
				userId: 1
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

const currentTestSocketApi = testApiGen.enhanceEndpoints({
	endpoints: {
		getTestsByTestIdCurrent: {
			async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState, dispatch }) {
				try {
					// Data loaded (cached)
					// Actually, everythign is loaded once, so don't worry about assigning socket events many times
					// The 2 await statements are "anchor" of the cache lifecycle, they only continue when the cache is loaded / removed.
					await cacheDataLoaded;

					const socket = connectSocket(null);

					console.log("currentTestSocketApi >> onCacheEntryAdded >> currentTestSocket.auth", (getState() as RootState).auth.tokens?.user_id);

					socket.on("connect", () => {
						socket.emit("REGISTERED", { testId: 1 }, (error) => {
							if (error.error) throw new Error(error.error);
							// Acknowledged
							dispatch(testClientSliceActions.setHasOnGoingTest(true));
						});
					});

					socket.on("CLOCK_SYNCED", ({ secondsLeft }) => {
						updateCachedData((draft) => {
							if (!draft) return;
							draft.secondsLeft = secondsLeft;
						});
					});

					socket.on("ANSWERED", ({ questionId, optionId }) => {
						updateCachedData((draft) => {
							if (!draft) return;
							if (optionId == null) {
								draft.answers = draft.answers.filter((answer) => answer.questionId !== questionId);
								return;
							}
							const existingAnswer = draft.answers.find((answer) => answer.questionId === questionId);
							if (existingAnswer) {
								existingAnswer.chosenOption = optionId;
							} else {
								draft.answers.push({ questionId, chosenOption: optionId });
							}
						});
					});

					socket.on("ENDED", () => {
						currentTestSocketApi.util.resetApiState();
						dispatch(testClientSliceActions.setHasOnGoingTest(false));
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
			) => {
				try {
					const socket = connectSocket(null);
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
	})
});

export const { useAnswerTestQuestionMutation } = currentTestSocketApi;
export { currentTestSocketApi };
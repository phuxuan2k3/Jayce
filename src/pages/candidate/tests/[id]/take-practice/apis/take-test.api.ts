import { testApiGen } from "../../../../../../features/tests/api/test.api-gen";

const takeTestApi = testApiGen.enhanceEndpoints({
	addTagTypes: ["CurrentAttempt"],
	endpoints: {
		getCurrentAttemptsByAttemptIdAnswers: {
			providesTags: (result, _, { attemptId }) =>
				result
					? [
						...result.map(({ questionId }) => ({
							type: "CurrentAttempt" as const,
							id: `${attemptId}-${questionId}`,
						})),
						{ type: "CurrentAttempt" as const, id: attemptId },
					]
					: [{ type: "CurrentAttempt" as const, id: attemptId }],
		},
		patchCurrentAttemptsByAttemptIdAnswers: {
			invalidatesTags: (_, __, { attemptId, body: { questionId } }) => [
				{ type: "CurrentAttempt" as const, id: `${attemptId}-${questionId}` },
			],
			// // Implement optimistic updates
			// onQueryStarted: async ({ attemptId, body }, { dispatch, queryFulfilled }) => {
			// 	// Get the current cache key for the query
			// 	const patchResult = dispatch(
			// 		takeTestApi.util.updateQueryData(
			// 			'getCurrentAttemptsByAttemptIdAnswers',
			// 			{ attemptId },
			// 			(draft) => {
			// 				// Find the answer for the current question
			// 				const answerIndex = draft.findIndex(answer =>
			// 					answer.questionId === body.questionId
			// 				);

			// 				if (answerIndex >= 0) {
			// 					// Update existing answer
			// 					draft[answerIndex].chosenOption = body.chosenOption || 0;
			// 				} else if (body.questionId !== null && body.chosenOption !== null) {
			// 					// Add new answer
			// 					draft.push({
			// 						attemptId,
			// 						questionId: body.questionId,
			// 						chosenOption: body.chosenOption || 0
			// 					});
			// 				}
			// 			}
			// 		)
			// 	);

			// 	try {
			// 		// Wait for the mutation to complete
			// 		await queryFulfilled;
			// 	} catch {
			// 		// If the mutation fails, undo the optimistic update
			// 		patchResult.undo();
			// 	}
			// },
		},
	},
});

export const {
	useGetCurrentAttemptsByAttemptIdAnswersQuery,
	usePatchCurrentAttemptsByAttemptIdAnswersMutation,
} = takeTestApi;
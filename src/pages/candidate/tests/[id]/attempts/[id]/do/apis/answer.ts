import { testApiGenV2 } from "../../../../../../../../infra-test/api/test.api-gen-v2";

const answerEnhance = testApiGenV2.enhanceEndpoints({
	addTagTypes: ["AttemptsByAttemptIdAnswers"],
	endpoints: {
		getAttemptsByAttemptIdAnswers: {
			providesTags: (result, _, arg) =>
				result
					? result.map((item) => ({
						type: "AttemptsByAttemptIdAnswers" as const,
						id: item.questionId,
					}))
					: [{ type: "AttemptsByAttemptIdAnswers", id: arg.attemptId }],
		},
		postAttemptsByAttemptIdAnswers: {
			invalidatesTags: (_, __, arg) => [
				{ type: "AttemptsByAttemptIdAnswers", id: arg.body.questionId },
			],
			onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
				const patchResult = dispatch(
					answerEnhance.util.updateQueryData(
						"getAttemptsByAttemptIdAnswers",
						{ attemptId: arg.attemptId },
						(draft) => {
							const questionIndex = draft.findIndex((q) => q.questionId === arg.body.questionId);
							if (questionIndex !== -1) {
								draft[questionIndex].child = arg.body.answer;
							} else {
								draft.push({
									id: "optimistic-id-" + Math.random().toString(36).substring(2, 15),
									questionId: arg.body.questionId,
									attemptId: arg.attemptId,
									child: arg.body.answer,
									createdAt: new Date().toISOString(),
									updatedAt: new Date().toISOString(),
								});
							}
						}
					)
				);
				try {
					await queryFulfilled;
				} catch (error) {
					// Rollback the optimistic update if the query fails
					patchResult.undo();
				}
			}
		}
	}
});

export const {
	usePostAttemptsByAttemptIdAnswersMutation,
	useGetAttemptsByAttemptIdAnswersQuery,
} = answerEnhance;
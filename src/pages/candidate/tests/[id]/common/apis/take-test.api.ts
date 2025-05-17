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
		},
	},
});

export const {
	useGetCurrentAttemptsByAttemptIdAnswersQuery,
	usePatchCurrentAttemptsByAttemptIdAnswersMutation,
} = takeTestApi;
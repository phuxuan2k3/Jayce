import { testApiGen } from "../../../../../../features/tests/api/test.api-gen";

const answerApiEnhance = testApiGen.enhanceEndpoints({
	addTagTypes: [
		"CurrentAttemptAnswer",
	],
	endpoints: {
		getCurrentAttemptsByAttemptIdAnswers: {
			providesTags: ["CurrentAttemptAnswer"],
		},
		patchCurrentAttemptsByAttemptIdAnswers: {
			invalidatesTags: ["CurrentAttemptAnswer"],
		},
	},
});

export const {
	useGetCurrentAttemptsByAttemptIdAnswersQuery,
	usePatchCurrentAttemptsByAttemptIdAnswersMutation,
} = answerApiEnhance;
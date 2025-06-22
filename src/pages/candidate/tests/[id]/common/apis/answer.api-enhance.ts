import { testApiGen } from "../../../../../../infra-test/api/test.api-gen";

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
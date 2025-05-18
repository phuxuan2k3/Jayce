import { testApiGen } from "../../../../../../features/tests/api/test.api-gen";

const attemptApiEnhance = testApiGen.enhanceEndpoints({
	addTagTypes: [
		"CurrentAttemptPractice",
		"CurrentAttemptExam",
		"CurrentAttempt",
	],
	endpoints: {
		getCurrentTestsByTestId: {
			providesTags: ["CurrentAttempt"],
		},
		getSelfAttempts: {
			providesTags: ["CurrentAttempt"],
		},
		getExamsByTestIdAttempts: {
			providesTags: ["CurrentAttemptExam"],
		},
		getExamsByTestIdAttemptsAggregate: {
			providesTags: ["CurrentAttemptExam"],
		},
		getExamsByTestIdAttemptsSelf: {
			providesTags: ["CurrentAttemptExam"],
		},
		getPracticesByTestIdAttempts: {
			providesTags: ["CurrentAttemptPractice"],
		},
		getPracticesByTestIdAttemptsAggregate: {
			providesTags: ["CurrentAttemptPractice"],
		},
		patchCurrentAttemptsByAttemptIdSubmit: {
			invalidatesTags: [
				"CurrentAttempt",
				"CurrentAttemptExam",
				"CurrentAttemptPractice",
			],
		},
		postExamsByTestIdAttemptsStart: {
			invalidatesTags: [
				"CurrentAttemptExam",
				"CurrentAttempt",
			],
		},
		postPracticesByTestIdAttemptsStart: {
			invalidatesTags: [
				"CurrentAttemptPractice",
				"CurrentAttempt",
			],
		}
	}
});


export const {
	useGetCurrentTestsByTestIdQuery,
	useGetSelfAttemptsQuery,
	useGetExamsByTestIdAttemptsQuery,
	useGetExamsByTestIdAttemptsAggregateQuery,
	useGetExamsByTestIdAttemptsSelfQuery,
	useGetPracticesByTestIdAttemptsQuery,
	useGetPracticesByTestIdAttemptsAggregateQuery,
	usePatchCurrentAttemptsByAttemptIdSubmitMutation,
	usePostExamsByTestIdAttemptsStartMutation,
	usePostPracticesByTestIdAttemptsStartMutation,
} = attemptApiEnhance;
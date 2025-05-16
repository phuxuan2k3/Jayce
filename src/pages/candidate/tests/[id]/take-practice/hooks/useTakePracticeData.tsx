import { useGetCurrentTestsByTestIdQuery, useGetPracticesByTestIdQuery, useGetPracticesByTestIdQuestionsToDoQuery } from '../../../../../../features/tests/api/test.api-gen'
import { useGetCurrentAttemptsByAttemptIdAnswersQuery } from '../apis/take-test.api';

export default function useData(testId: string) {
	const currentAttemptQuery = useGetCurrentTestsByTestIdQuery({ testId });
	const practiceQuery = useGetPracticesByTestIdQuery({ testId });
	const questionsToDoQuery = useGetPracticesByTestIdQuestionsToDoQuery({ testId });
	const answersQuery = useGetCurrentAttemptsByAttemptIdAnswersQuery({
		attemptId: currentAttemptQuery.data?.id || "",
	}, {
		skip: !currentAttemptQuery.data?.id,
	})

	return {
		data: {
			practice: practiceQuery.data,
			currentAttempt: currentAttemptQuery.data,
			questionsToDo: questionsToDoQuery.data || [],
			answers: answersQuery.data || [],
		},
		isLoading: practiceQuery.isLoading || questionsToDoQuery.isLoading || currentAttemptQuery.isLoading || answersQuery.isLoading,
	}
}

import { useGetCurrentTestsByTestIdQuery } from '../../../../../../../features/tests/api/test.api-gen'
import { useGetCurrentAttemptsByAttemptIdAnswersQuery } from '../../apis/take-test.api';

export default function useCurrentAttemptWithAnswers(testId: string) {
	const currentAttemptQuery = useGetCurrentTestsByTestIdQuery({ testId });
	const answersQuery = useGetCurrentAttemptsByAttemptIdAnswersQuery({
		attemptId: currentAttemptQuery.data?.id || "",
	}, {
		skip: !currentAttemptQuery.data?.id,
	})

	return {
		data: {
			currentAttempt: currentAttemptQuery.data,
			answers: answersQuery.data || [],
		},
		isLoading: currentAttemptQuery.isLoading || answersQuery.isLoading,
	}
}

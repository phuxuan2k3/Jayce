import { useGetCurrentTestsByTestIdQuery, useGetExamsByTestIdAttemptsAggregateQuery, useGetExamsByTestIdQuery } from '../../../../../../features/tests/api/test.api-gen';
import useGetUsers from '../../../../../../features/tests/hooks/user/useGetUsers';

export default function useExam(testId: string) {
	const examQuery = useGetExamsByTestIdQuery({ testId });
	const user = useGetUsers(examQuery.data?.authorId);
	const currentAttempt = useGetCurrentTestsByTestIdQuery({ testId });
	const attemptsAggregate = useGetExamsByTestIdAttemptsAggregateQuery({ testId });

	const isAllowedToSeeOtherResults = examQuery.data?.isAllowedToSeeOtherResults || false;

	return {
		data: {
			exam: examQuery.data,
			currentAttempt: currentAttempt.data,
			author: user.users[0] || null,
			isAllowedToSeeOtherResults,
			attemptsAggregate: attemptsAggregate.data,
		},
		isLoading: examQuery.isLoading || currentAttempt.isLoading,
	}
}

import { useGetPracticesByTestIdAggregateQuery, useGetPracticesByTestIdQuery } from '../../../../../../features/tests/api/test.api-gen';
import useGetTestIdParams from '../../../../../../features/tests/hooks/useGetTestIdParams';
import useGetUsers from '../../../../../../features/tests/hooks/user/useGetUsers';
import { useGetPracticesByTestIdAttemptsAggregateQuery } from '../../common/apis/attempts.api-enhance';

export default function usePracticePage() {
	const testId = useGetTestIdParams();

	const practiceQuery = useGetPracticesByTestIdQuery({
		testId,
	});

	const practiceAggregateQuery = useGetPracticesByTestIdAggregateQuery({
		testId,
	});

	const attemptsAggregateQuery = useGetPracticesByTestIdAttemptsAggregateQuery({
		testId,
	});

	const user = useGetUsers(practiceQuery.data ? [practiceQuery.data.authorId] : undefined);

	return {
		data: {
			practice: practiceQuery.data,
			practiceAggregate: practiceAggregateQuery.data || {
				numberOfQuestions: 0,
				totalPoints: 0,
			},
			attemptAggregate: attemptsAggregateQuery.data || {
				averageScore: 0,
				averageTime: 0,
				highestScore: 0,
				lowestScore: 0,
				totalAttempts: 0,
				totalParticipants: 0,
			},
			author: user.users[0] || null,
		},
		isLoading: practiceQuery.isLoading || attemptsAggregateQuery.isLoading,
	}
}
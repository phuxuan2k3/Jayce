import { useEffect } from 'react';
import { useGetCurrentAttemptsByAttemptIdAnswersQuery } from '../../apis/answer.api-enhance';
import { useGetCurrentTestsByTestIdQuery } from '../../apis/attempts.api-enhance';

export default function useCurrentAttemptWithAnswers({
	testId,
	onNotFoundCurrentAttempt,
}: {
	testId: string;
	onNotFoundCurrentAttempt?: () => void;
}) {
	const currentAttemptQuery = useGetCurrentTestsByTestIdQuery({ testId });
	const answersQuery = useGetCurrentAttemptsByAttemptIdAnswersQuery({
		attemptId: currentAttemptQuery.data?.id || "",
	}, {
		skip: !currentAttemptQuery.data?.id,
	});

	useEffect(() => {
		if (
			currentAttemptQuery.isSuccess &&
			currentAttemptQuery.isFetching === false &&
			currentAttemptQuery.data == null &&
			onNotFoundCurrentAttempt != null
		) {
			onNotFoundCurrentAttempt();
		}
	}, [
		currentAttemptQuery.isSuccess,
		currentAttemptQuery.data,
		onNotFoundCurrentAttempt
	]);

	return {
		data: {
			currentAttempt: currentAttemptQuery.data,
			answers: answersQuery.data || [],
		},
		isLoading: currentAttemptQuery.isLoading || answersQuery.isLoading,
	}
}

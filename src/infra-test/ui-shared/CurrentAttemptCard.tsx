import AttemptCard from '../ui-items/attempt/AttemptCard'
import FetchStateCover2 from '../ui/fetch-states/FetchStateCover2'
import StartNewAttemptButton from './StartNewAttemptButton'
import { useGetTestsByTestIdAttemptsQuery } from '../api/test.api-gen-v2';
import useGetTestIdParams from '../hooks/useGetTestIdParams';
import useGetUserId from '../hooks/useGetUserId';

export default function CurrentAttemptCard() {
	const testId = useGetTestIdParams();
	const userId = useGetUserId();
	const currentAttemptQuery = useGetTestsByTestIdAttemptsQuery({
		testId,
		candidateId: userId,
		status: "IN_PROGRESS"
	});

	return (
		<FetchStateCover2
			fetchState={currentAttemptQuery}
			dataComponent={({ data: attempts }) => attempts.length > 0 ? (
				<div className="flex flex-col gap-2">
					{attempts.map(attempt => (
						<AttemptCard key={attempt.id} attempt={attempt} />
					))}
				</div>
			) : (
				<StartNewAttemptButton />
			)}
		/>
	)
}

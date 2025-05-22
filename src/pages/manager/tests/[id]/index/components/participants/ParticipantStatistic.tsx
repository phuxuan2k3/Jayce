import { AttemptsOfCandidateInTestAggregateCore } from '../../../../../../features/tests/model/attempt.model'

export default function ParticipantStatisticCard({
	attemptAggregate,
}: {
	attemptAggregate: AttemptsOfCandidateInTestAggregateCore
}) {
	return (
		<div className='rounded-lg px-6 py-8 bg-primary-toned-50 shadow-md max-h-full overflow-y-auto'>
			<h3 className="text-xl font-semibold mb-3">Statistic</h3>
			<hr className="mb-4" />
			<div className='grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-primary-toned-600 
			[&>*:nth-child(odd)]:font-bold 
			[&>*:nth-child(odd)]:text-primary-toned-700
			[&>*:nth-child(even)]:text-right
			'>
				<span>Rank:</span>
				<span>{attemptAggregate.rank}</span>

				<span>Total Attempts:</span>
				<span>{attemptAggregate.totalAttempts}</span>

				<span>Highest Score:</span>
				<span>{attemptAggregate.highestScore}</span>

				<span>Lowest Score:</span>
				<span>{attemptAggregate.lowestScore}</span>

				<span>Average Score:</span>
				<span>{attemptAggregate.averageScore}</span>

				<span>Average Time:</span>
				<span>{formatSeconds(attemptAggregate.averageTime)}</span>
			</div>
		</div>
	)
}

const formatSeconds = (seconds: number) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	if (hours > 0) {
		return `${hours}h ${minutes}m ${secs}s`;
	}
	if (minutes > 0) {
		return `${minutes}m ${secs}s`;
	}
	return `${secs}s`;
}
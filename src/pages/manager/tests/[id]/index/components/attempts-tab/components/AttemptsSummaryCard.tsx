import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faClock, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { AttemptsOfTestAggregate } from '../../../../../../../../infra-test/core/attempt.model';

interface AttemptsSummaryCardProps {
	aggregate: AttemptsOfTestAggregate;
	testTitle: string;
}

const formatTime = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}
	return `${minutes}m`;
};

export default function AttemptsSummaryCard({ aggregate, testTitle }: AttemptsSummaryCardProps) {
	const completionRate = aggregate.totalParticipants > 0
		? (aggregate.totalAttempts / aggregate.totalParticipants * 100).toFixed(1)
		: '0';

	const averageAttemptsPerParticipant = aggregate.totalParticipants > 0
		? (aggregate.totalAttempts / aggregate.totalParticipants).toFixed(1)
		: '0';

	const performanceGrade = () => {
		if (aggregate.averageScore >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
		if (aggregate.averageScore >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
		if (aggregate.averageScore >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
		return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' };
	};

	const performance = performanceGrade();

	return (
		<div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h3 className="text-xl font-bold text-gray-800 mb-1">Test Summary</h3>
					<p className="text-sm text-gray-600 truncate max-w-xs" title={testTitle}>
						{testTitle}
					</p>
				</div>
				<div className={`w-12 h-12 rounded-full ${performance.bg} flex items-center justify-center`}>
					<span className={`text-xl font-bold ${performance.color}`}>
						{performance.grade}
					</span>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-6">
				{/* Left Column */}
				<div className="space-y-4">
					<div className="flex items-center space-x-3">
						<div className="p-2 bg-blue-100 rounded-lg">
							<FontAwesomeIcon icon={faUsers} className="text-blue-600 w-4 h-4" />
						</div>
						<div>
							<p className="text-sm text-gray-600">Participants</p>
							<p className="text-lg font-semibold text-gray-800">
								{aggregate.totalParticipants}
							</p>
						</div>
					</div>

					<div className="flex items-center space-x-3">
						<div className="p-2 bg-green-100 rounded-lg">
							<FontAwesomeIcon icon={faChartBar} className="text-green-600 w-4 h-4" />
						</div>
						<div>
							<p className="text-sm text-gray-600">Total Attempts</p>
							<p className="text-lg font-semibold text-gray-800">
								{aggregate.totalAttempts}
							</p>
						</div>
					</div>

					<div className="flex items-center space-x-3">
						<div className="p-2 bg-purple-100 rounded-lg">
							<FontAwesomeIcon icon={faClock} className="text-purple-600 w-4 h-4" />
						</div>
						<div>
							<p className="text-sm text-gray-600">Avg. Time</p>
							<p className="text-lg font-semibold text-gray-800">
								{formatTime(aggregate.averageTime)}
							</p>
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div className="space-y-4">
					<div className="flex items-center space-x-3">
						<div className="p-2 bg-yellow-100 rounded-lg">
							<FontAwesomeIcon icon={faTrophy} className="text-yellow-600 w-4 h-4" />
						</div>
						<div>
							<p className="text-sm text-gray-600">Avg. Score</p>
							<p className="text-lg font-semibold text-gray-800">
								{aggregate.averageScore.toFixed(1)}%
							</p>
						</div>
					</div>

					<div className="bg-gray-50 rounded-lg p-3">
						<p className="text-xs text-gray-500 mb-1">Score Range</p>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-gray-700">
								{aggregate.lowestScore.toFixed(1)}%
							</span>
							<div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
								<div
									className="bg-gradient-to-r from-red-400 to-green-400 h-2 rounded-full"
									style={{ width: '100%' }}
								></div>
							</div>
							<span className="text-sm font-medium text-gray-700">
								{aggregate.highestScore.toFixed(1)}%
							</span>
						</div>
					</div>

					<div className="bg-gray-50 rounded-lg p-3">
						<p className="text-xs text-gray-500 mb-1">Completion Rate</p>
						<p className="text-sm font-semibold text-gray-800">
							{completionRate}% ({averageAttemptsPerParticipant} attempts/participant)
						</p>
					</div>
				</div>
			</div>

			<div className="mt-6 pt-4 border-t border-gray-100">
				<div className="flex items-center justify-between text-xs text-gray-500">
					<span>Last updated: {new Date().toLocaleDateString()}</span>
					<span>Real-time data</span>
				</div>
			</div>
		</div>
	);
}

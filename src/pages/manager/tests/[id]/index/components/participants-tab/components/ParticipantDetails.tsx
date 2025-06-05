import { format } from 'date-fns'
import { AttemptCore } from '../../../../../../../../infra-test/core/attempt.model';
import { Participant } from '../type';

export default function ParticipantDetails({
	participant,
	attempts,
	onBack,
}: {
	participant: Participant;
	attempts: AttemptCore[];
	onBack: () => void;
}) {
	const { user, attemptsAggregate } = participant;

	return (
		<div className="space-y-6">
			{/* Back Button */}
			<div className="flex justify-between items-center mb-4">
				<button
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
					onClick={onBack}
				>
					Back to Participants List
				</button>
			</div>

			{/* User Profile Section */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<div className="flex items-start space-x-4">
					<div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
						{user.avatarPath ? (
							<img
								src={user.avatarPath}
								alt={user.fullname}
								className="w-16 h-16 rounded-full object-cover"
							/>
						) : (
							<span className="text-xl font-semibold text-gray-600">
								{user.fullname.charAt(0).toUpperCase()}
							</span>
						)}
					</div>
					<div className="flex-1">
						<h2 className="text-xl font-semibold text-gray-900">{user.fullname}</h2>
						<p className="text-sm text-gray-500">@{user.username}</p>
						<p className="text-sm text-gray-500">{user.email}</p>
						<div className="mt-2 flex items-center space-x-4">
							<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
								Rank #{attemptsAggregate.rank}
							</span>
							<span className="text-sm text-gray-500">
								{attemptsAggregate.totalAttempts} attempt(s)
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Performance Overview */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="text-center p-4 bg-green-50 rounded-lg">
						<div className="text-2xl font-bold text-green-600">
							{attemptsAggregate.highestScore}%
						</div>
						<div className="text-sm text-gray-500">Highest Score</div>
					</div>
					<div className="text-center p-4 bg-orange-50 rounded-lg">
						<div className="text-2xl font-bold text-orange-600">
							{attemptsAggregate.lowestScore}%
						</div>
						<div className="text-sm text-gray-500">Lowest Score</div>
					</div>
					<div className="text-center p-4 bg-blue-50 rounded-lg">
						<div className="text-2xl font-bold text-blue-600">
							{attemptsAggregate.averageScore.toFixed(1)}%
						</div>
						<div className="text-sm text-gray-500">Average Score</div>
					</div>
					<div className="text-center p-4 bg-purple-50 rounded-lg">
						<div className="text-2xl font-bold text-purple-600">
							{formatTime(attemptsAggregate.averageTime)}
						</div>
						<div className="text-sm text-gray-500">Average Time</div>
					</div>
				</div>
			</div>

			{/* Detailed Statistics */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Statistics</h3>
				<div className="space-y-3">
					<div className="flex justify-between items-center py-2 border-b border-gray-100">
						<span className="text-sm font-medium text-gray-700">Total Attempts</span>
						<span className="text-sm text-gray-900">{attemptsAggregate.totalAttempts}</span>
					</div>
					<div className="flex justify-between items-center py-2 border-b border-gray-100">
						<span className="text-sm font-medium text-gray-700">Current Rank</span>
						<span className="text-sm text-gray-900">#{attemptsAggregate.rank}</span>
					</div>
					<div className="flex justify-between items-center py-2 border-b border-gray-100">
						<span className="text-sm font-medium text-gray-700">Score Range</span>
						<span className="text-sm text-gray-900">
							{attemptsAggregate.lowestScore}% - {attemptsAggregate.highestScore}%
						</span>
					</div>
					<div className="flex justify-between items-center py-2 border-b border-gray-100">
						<span className="text-sm font-medium text-gray-700">Improvement</span>
						<span className="text-sm text-gray-900">
							{attemptsAggregate.highestScore - attemptsAggregate.lowestScore > 0 ? '+' : ''}
							{(attemptsAggregate.highestScore - attemptsAggregate.lowestScore).toFixed(1)}%
						</span>
					</div>
				</div>
			</div>

			{/* Attempts History */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Attempts History ({attempts.length})
				</h3>
				{attempts.length === 0 ? (
					<div className="text-center py-8 text-gray-500">
						No attempts recorded yet.
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Attempt #
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Date
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Score
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Time Spent
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{attempts.map((attempt, index) => (
									<tr key={attempt.id} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											#{index + 1}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											<div>{format(new Date(attempt.createdAt), "MMM d, yyyy")}</div>
											<div className="text-xs text-gray-400">
												{format(new Date(attempt.createdAt), "h:mm a")}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div
													className={`text-sm font-semibold ${attempt.score >= 80 ? 'text-green-600' :
														attempt.score >= 60 ? 'text-yellow-600' :
															'text-red-600'
														}`}
												>
													{attempt.score}%
												</div>
												<div
													className={`ml-2 w-12 h-2 rounded-full ${attempt.score >= 80 ? 'bg-green-200' :
														attempt.score >= 60 ? 'bg-yellow-200' :
															'bg-red-200'
														}`}
												>
													<div
														className={`h-2 rounded-full ${attempt.score >= 80 ? 'bg-green-500' :
															attempt.score >= 60 ? 'bg-yellow-500' :
																'bg-red-500'
															}`}
														style={{ width: `${attempt.score}%` }}
													/>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{formatTime(attempt.secondsSpent)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${attempt.hasEnded
													? 'bg-green-100 text-green-800'
													: 'bg-yellow-100 text-yellow-800'
													}`}
											>
												{attempt.hasEnded ? 'Completed' : 'In Progress'}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>

			{/* Performance Trend */}
			{attempts.length > 1 && (
				<div className="bg-white rounded-lg shadow-md p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
					<div className="space-y-3">
						{/* Simple trend visualization */}
						<div className="flex items-center justify-between">
							<span className="text-sm text-gray-600">Latest vs Previous:</span>
							{attempts.length >= 2 && (
								<span className={`text-sm font-semibold ${attempts[attempts.length - 1].score > attempts[attempts.length - 2].score
									? 'text-green-600' :
									attempts[attempts.length - 1].score < attempts[attempts.length - 2].score
										? 'text-red-600' : 'text-gray-600'
									}`}>
									{attempts[attempts.length - 1].score > attempts[attempts.length - 2].score && '+'}
									{(attempts[attempts.length - 1].score - attempts[attempts.length - 2].score).toFixed(1)}%
								</span>
							)}
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm text-gray-600">Best Improvement:</span>
							<span className="text-sm font-semibold text-green-600">
								+{(attemptsAggregate.highestScore - attemptsAggregate.lowestScore).toFixed(1)}%
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm text-gray-600">Consistency:</span>
							<span className="text-sm font-semibold text-blue-600">
								{attemptsAggregate.totalAttempts > 1 ?
									Math.abs(attemptsAggregate.highestScore - attemptsAggregate.lowestScore) < 20 ? 'High' :
										Math.abs(attemptsAggregate.highestScore - attemptsAggregate.lowestScore) < 40 ? 'Medium' : 'Low'
									: 'N/A'
								}
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

// Helper function to format time
const formatTime = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}
	if (minutes > 0) {
		return `${minutes}m ${secs}s`;
	}
	return `${secs}s`;
};

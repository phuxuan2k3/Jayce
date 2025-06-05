import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { AttemptsOfTestAggregate } from '../../../../../../../../infra-test/core/attempt.model';

interface AttemptsStatsCardProps {
	aggregate: AttemptsOfTestAggregate;
}

export default function AttemptsStatsCard({ aggregate }: AttemptsStatsCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
			<div className="flex items-center justify-between mb-4">
				<h4 className="text-lg font-semibold text-gray-800">Participation</h4>
				<div className="p-2 bg-blue-100 rounded-lg">
					<FontAwesomeIcon icon={faUsers} className="text-blue-600 w-5 h-5" />
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faUsers} className="text-blue-500 w-4 h-4" />
						<span className="text-sm text-gray-600">Total Participants</span>
					</div>
					<span className="text-2xl font-bold text-blue-600">
						{aggregate.totalParticipants}
					</span>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faRepeat} className="text-green-500 w-4 h-4" />
						<span className="text-sm text-gray-600">Total Attempts</span>
					</div>
					<span className="text-2xl font-bold text-green-600">
						{aggregate.totalAttempts}
					</span>
				</div>

				<div className="pt-2 border-t border-gray-100">
					<div className="flex items-center justify-between">
						<span className="text-xs text-gray-500">Avg. attempts per participant</span>
						<span className="text-sm font-medium text-gray-700">
							{aggregate.totalParticipants > 0
								? (aggregate.totalAttempts / aggregate.totalParticipants).toFixed(1)
								: '0'
							}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStopwatch, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { AttemptsOfTestAggregate } from '../../../../../../../../infra-test/core/attempt.model';

interface AttemptsTimeAnalyticsCardProps {
	aggregate: AttemptsOfTestAggregate;
}

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

const formatTimeDetailed = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}
	return `${minutes}m`;
};

export default function AttemptsTimeAnalyticsCard({ aggregate }: AttemptsTimeAnalyticsCardProps) {
	const averageTimeMinutes = Math.floor(aggregate.averageTime / 60);

	const getTimeEfficiencyColor = (timeMinutes: number) => {
		// Assuming optimal time is around 30-60 minutes for most tests
		if (timeMinutes <= 30) return 'text-green-600';
		if (timeMinutes <= 60) return 'text-yellow-600';
		return 'text-red-600';
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
			<div className="flex items-center justify-between mb-4">
				<h4 className="text-lg font-semibold text-gray-800">Time Analytics</h4>
				<div className="p-2 bg-purple-100 rounded-lg">
					<FontAwesomeIcon icon={faClock} className="text-purple-600 w-5 h-5" />
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faHourglassHalf} className="text-purple-500 w-4 h-4" />
						<span className="text-sm text-gray-600">Average Time</span>
					</div>
					<span className={`text-xl font-bold ${getTimeEfficiencyColor(averageTimeMinutes)}`}>
						{formatTime(aggregate.averageTime)}
					</span>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div className="text-center p-3 bg-gray-50 rounded-lg">
						<FontAwesomeIcon icon={faStopwatch} className="text-gray-500 w-4 h-4 mb-1" />
						<div className="text-xs text-gray-500 mb-1">Time per attempt</div>
						<div className="text-sm font-semibold text-gray-700">
							{formatTimeDetailed(aggregate.averageTime)}
						</div>
					</div>

					<div className="text-center p-3 bg-gray-50 rounded-lg">
						<FontAwesomeIcon icon={faClock} className="text-gray-500 w-4 h-4 mb-1" />
						<div className="text-xs text-gray-500 mb-1">Total time spent</div>
						<div className="text-sm font-semibold text-gray-700">
							{formatTimeDetailed(aggregate.averageTime * aggregate.totalAttempts)}
						</div>
					</div>
				</div>

				<div className="pt-2 border-t border-gray-100">
					<div className="flex items-center justify-between">
						<span className="text-xs text-gray-500">Efficiency rating</span>
						<div className="flex items-center space-x-2">
							<span className="text-sm font-medium text-gray-700">
								{averageTimeMinutes <= 30 ? 'Excellent' :
									averageTimeMinutes <= 60 ? 'Good' : 'Needs Review'}
							</span>
							<div className={`w-2 h-2 rounded-full ${averageTimeMinutes <= 30 ? 'bg-green-500' :
								averageTimeMinutes <= 60 ? 'bg-yellow-500' : 'bg-red-500'
								}`}></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

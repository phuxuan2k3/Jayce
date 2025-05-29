import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faChartLine, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { AttemptsOfTestAggregate } from '../../../../../../../../infra-test/core/attempt.model';

interface AttemptsPerformanceCardProps {
	aggregate: AttemptsOfTestAggregate;
}

export default function AttemptsPerformanceCard({ aggregate }: AttemptsPerformanceCardProps) {
	const getScoreColor = (score: number) => {
		if (score >= 80) return 'text-green-600';
		if (score >= 60) return 'text-yellow-600';
		return 'text-red-600';
	};

	const getScoreBgColor = (score: number) => {
		if (score >= 80) return 'bg-green-100';
		if (score >= 60) return 'bg-yellow-100';
		return 'bg-red-100';
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
			<div className="flex items-center justify-between mb-4">
				<h4 className="text-lg font-semibold text-gray-800">Performance</h4>
				<div className="p-2 bg-green-100 rounded-lg">
					<FontAwesomeIcon icon={faTrophy} className="text-green-600 w-5 h-5" />
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faTrophy} className="text-green-500 w-4 h-4" />
						<span className="text-sm text-gray-600">Highest Score</span>
					</div>
					<div className="flex items-center space-x-2">
						<span className={`text-xl font-bold ${getScoreColor(aggregate.highestScore)}`}>
							{aggregate.highestScore.toFixed(1)}%
						</span>
						<div className={`w-3 h-3 rounded-full ${getScoreBgColor(aggregate.highestScore)}`}></div>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faChartLine} className="text-blue-500 w-4 h-4" />
						<span className="text-sm text-gray-600">Average Score</span>
					</div>
					<div className="flex items-center space-x-2">
						<span className={`text-xl font-bold ${getScoreColor(aggregate.averageScore)}`}>
							{aggregate.averageScore.toFixed(1)}%
						</span>
						<div className={`w-3 h-3 rounded-full ${getScoreBgColor(aggregate.averageScore)}`}></div>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faArrowDown} className="text-red-500 w-4 h-4" />
						<span className="text-sm text-gray-600">Lowest Score</span>
					</div>
					<div className="flex items-center space-x-2">
						<span className={`text-xl font-bold ${getScoreColor(aggregate.lowestScore)}`}>
							{aggregate.lowestScore.toFixed(1)}%
						</span>
						<div className={`w-3 h-3 rounded-full ${getScoreBgColor(aggregate.lowestScore)}`}></div>
					</div>
				</div>

				<div className="pt-2 border-t border-gray-100">
					<div className="flex items-center justify-between">
						<span className="text-xs text-gray-500">Score Range</span>
						<span className="text-sm font-medium text-gray-700">
							{(aggregate.highestScore - aggregate.lowestScore).toFixed(1)}%
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

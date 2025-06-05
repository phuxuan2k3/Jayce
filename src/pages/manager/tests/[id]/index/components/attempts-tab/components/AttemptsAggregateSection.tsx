import { AttemptsOfTestAggregate } from '../../../../../../../../infra-test/core/attempt.model';
import AttemptsStatsCard from './AttemptsStatsCard';
import AttemptsPerformanceCard from './AttemptsPerformanceCard';
import AttemptsTimeAnalyticsCard from './AttemptsTimeAnalyticsCard';

interface AttemptsAggregateSectionProps {
	aggregate: AttemptsOfTestAggregate;
	isLoading?: boolean;
}

export default function AttemptsAggregateSection({
	aggregate,
	isLoading = false
}: AttemptsAggregateSectionProps) {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				{[...Array(3)].map((_, index) => (
					<div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
						<div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
						<div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
						<div className="h-3 bg-gray-200 rounded w-full"></div>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="space-y-6 mb-8">
			<div className="flex items-center justify-between">
				<h3 className="text-xl font-semibold text-gray-800">Attempts Overview</h3>
				<div className="text-sm text-gray-500">
					Last updated: {new Date().toLocaleDateString()}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<AttemptsStatsCard aggregate={aggregate} />
				<AttemptsPerformanceCard aggregate={aggregate} />
				<AttemptsTimeAnalyticsCard aggregate={aggregate} />
			</div>
		</div>
	);
}

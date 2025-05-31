interface SummaryCardsProps {
	totalTopics: number;
	totalQuestions: number;
}

export default function SummaryCards({ totalTopics, totalQuestions }: SummaryCardsProps) {
	return (
		<div className="grid grid-cols-2 gap-4 mb-6">
			<div className="bg-primary-toned-50 border border-primary-toned-200 rounded-lg p-4">
				<h3 className="text-sm font-semibold text-gray-500 mb-1">Total Topics</h3>
				<p className="text-2xl font-bold text-primary-toned-700">{totalTopics}</p>
			</div>
			<div className="bg-primary-toned-50 border border-primary-toned-200 rounded-lg p-4">
				<h3 className="text-sm font-semibold text-gray-500 mb-1">Total Questions</h3>
				<p className="text-2xl font-bold text-primary-toned-700">{totalQuestions}</p>
			</div>
		</div>
	);
}

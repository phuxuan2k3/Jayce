import { Target } from "lucide-react";
import { ExamGenerationState } from "../../../../models/exam-generation.model";

interface TopicsReviewProps {
	state: ExamGenerationState;
}

export default function TopicsReview({ state }: TopicsReviewProps) {
	return (
		<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
			<div className="flex items-center gap-3 mb-6">
				<div className="p-2 bg-primary text-white rounded-lg">
					<Target className="w-5 h-5" />
				</div>
				<h3 className="text-xl font-semibold text-gray-800">Topics & Questions</h3>
			</div>

			<div className="space-y-4">
				{state.step2.topics.map((topic, index) => {
					const topicTotal = Object.values(topic.difficultyDistribution).reduce((sum, count) => sum + count, 0);
					return (
						<div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
							<div className="flex items-start justify-between mb-3">
								<div className="flex-1">
									<h4 className="font-semibold text-gray-800 mb-1">Topic #{index + 1}</h4>
									<p className="text-gray-600 text-sm leading-relaxed">{topic.name}</p>
								</div>
								<div className="text-right ml-4">
									<div className="text-lg font-bold text-primary">{topicTotal}</div>
									<div className="text-xs text-gray-500">questions</div>
								</div>
							</div>

							<div className="grid grid-cols-3 gap-3 mt-3">
								<div className="flex items-center gap-2 text-sm">
									<div className="w-3 h-3 bg-green-500 rounded-full"></div>
									<span className="text-gray-600">Easy:</span>
									<span className="font-semibold">{topic.difficultyDistribution.Easy || 0}</span>
								</div>
								<div className="flex items-center gap-2 text-sm">
									<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
									<span className="text-gray-600">Medium:</span>
									<span className="font-semibold">{topic.difficultyDistribution.Medium || 0}</span>
								</div>
								<div className="flex items-center gap-2 text-sm">
									<div className="w-3 h-3 bg-red-500 rounded-full"></div>
									<span className="text-gray-600">Hard:</span>
									<span className="font-semibold">{topic.difficultyDistribution.Hard || 0}</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

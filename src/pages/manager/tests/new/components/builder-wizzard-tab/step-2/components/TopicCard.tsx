import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { DifficultyLevel, ValidationErrors } from "../types";
import { TopicBlueprint } from "../../../../models/generate.types";

interface TopicCardProps {
	topic: TopicBlueprint;
	index: number;
	canDelete: boolean;
	errors: ValidationErrors;
	onUpdate: (topicId: string, updates: Partial<TopicBlueprint>) => void;
	onDelete: (topicId: string) => void;
	onDifficultyChange: (topicId: string, difficulty: DifficultyLevel, value: number) => void;
}

export default function TopicCard({
	topic,
	index,
	canDelete,
	errors,
	onUpdate,
	onDelete,
	onDifficultyChange
}: TopicCardProps) {
	return (
		<div className="bg-white border border-primary-toned-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
			<div className="space-y-4">
				{/* Topic Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4 flex-1">
						<div className="flex-1">
							<label className="block text-sm font-semibold text-primary mb-1">
								Topic {index + 1} Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								value={topic.name}
								onChange={(e) => onUpdate(topic.id, { name: e.target.value })}
								placeholder="Enter topic name"
								className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring ${errors[`topic-${topic.id}-name`]
									? 'border-red-500 focus:ring-red-300'
									: 'border-primary focus:ring-teal-300'
									}`}
							/>
							{errors[`topic-${topic.id}-name`] && (
								<p className="text-red-500 text-sm mt-1">{errors[`topic-${topic.id}-name`]}</p>
							)}
						</div>
						<div className="w-32">
							<label className="block text-sm font-semibold text-primary mb-1">
								Questions <span className="text-red-500">*</span>
							</label>
							<input
								type="number"
								min="1"
								value={topic.questionCount}
								onChange={(e) => onUpdate(topic.id, { questionCount: Math.max(1, parseInt(e.target.value) || 1) })}
								className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring ${errors[`topic-${topic.id}-questions`]
									? 'border-red-500 focus:ring-red-300'
									: 'border-primary focus:ring-teal-300'
									}`}
							/>
							{errors[`topic-${topic.id}-questions`] && (
								<p className="text-red-500 text-sm mt-1">{errors[`topic-${topic.id}-questions`]}</p>
							)}
						</div>
					</div>

					{/* Delete Button */}
					{canDelete && (
						<button
							onClick={() => onDelete(topic.id)}
							className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
							title="Delete topic"
						>
							<FontAwesomeIcon icon={faTrashCan} className="w-4 h-4" />
						</button>
					)}
				</div>

				{/* Difficulty Distribution */}
				<div>
					<h4 className="text-sm font-semibold text-primary mb-3">Difficulty Distribution</h4>
					<div className="grid grid-cols-3 gap-4">
						{(["Easy", "Medium", "Hard"] as DifficultyLevel[]).map((difficulty) => (
							<div key={difficulty} className="space-y-2">
								<label className="block text-sm font-medium text-gray-600">
									{difficulty}
								</label>
								<div className="flex items-center gap-2">
									<input
										type="number"
										min="0"
										max="100"
										value={topic.difficultyDistribution[difficulty]}
										onChange={(e) => onDifficultyChange(
											topic.id,
											difficulty,
											parseInt(e.target.value) || 0
										)}
										className="w-16 border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-primary-toned-300"
									/>
									<span className="text-sm text-gray-500">%</span>
								</div>
								{/* Visual percentage bar */}
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className={`h-2 rounded-full transition-all duration-300 ${difficulty === 'Easy' ? 'bg-green-500' :
											difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
											}`}
										style={{ width: `${topic.difficultyDistribution[difficulty]}%` }}
									></div>
								</div>
							</div>
						))}
					</div>
					{errors[`topic-${topic.id}-distribution`] && (
						<p className="text-red-500 text-sm mt-2">{errors[`topic-${topic.id}-distribution`]}</p>
					)}

					{/* Distribution Summary */}
					<div className="mt-3 p-3 bg-gray-50 rounded-lg">
						<div className="flex justify-between text-sm">
							<span className="text-gray-600">Total:</span>
							<span className={`font-semibold ${Math.abs((topic.difficultyDistribution.Easy + topic.difficultyDistribution.Medium + topic.difficultyDistribution.Hard) - 100) < 0.1
								? 'text-green-600' : 'text-red-600'
								}`}>
								{topic.difficultyDistribution.Easy + topic.difficultyDistribution.Medium + topic.difficultyDistribution.Hard}%
							</span>
						</div>
						<div className="mt-2 grid grid-cols-3 gap-2 text-xs">
							<div className="text-center">
								<div className="text-gray-500">Easy</div>
								<div className="font-semibold">{Math.round(topic.questionCount * topic.difficultyDistribution.Easy / 100)} q</div>
							</div>
							<div className="text-center">
								<div className="text-gray-500">Medium</div>
								<div className="font-semibold">{Math.round(topic.questionCount * topic.difficultyDistribution.Medium / 100)} q</div>
							</div>
							<div className="text-center">
								<div className="text-gray-500">Hard</div>
								<div className="font-semibold">{Math.round(topic.questionCount * topic.difficultyDistribution.Hard / 100)} q</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

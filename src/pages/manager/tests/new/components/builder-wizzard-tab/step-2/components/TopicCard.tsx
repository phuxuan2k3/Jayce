import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { DifficultyLevel } from "../../common/base-types";
import { Topic } from "../../models/topic.model";
import { cn } from '../../../../../../../../app/cn';
import { classNameInput } from '../../common/classname';
import { useMemo } from 'react';
import TextareaAutosize from 'react-textarea-autosize'

interface TopicCardProps {
	topic: Topic;
	index: number;
	canDelete: boolean;
	onUpdate: (index: number, updates: Partial<Topic>) => void;
	onDelete: (index: number) => void;
}

export default function TopicCard({
	topic,
	index,
	canDelete,
	onUpdate,
	onDelete,
}: TopicCardProps) {
	const difficulties = Object.keys(topic.difficultyDistribution) as DifficultyLevel[];
	const totalQuestions = useMemo(() => {
		return Object.values(topic.difficultyDistribution).reduce((sum, value) => sum + value, 0);
	}, [topic.difficultyDistribution]);
	const difficultiesPercentage = useMemo(() => {
		return difficulties.reduce((acc, difficulty) => {
			acc[difficulty] = topic.difficultyDistribution[difficulty] / totalQuestions * 100 || 0;
			return acc;
		}, {} as Record<DifficultyLevel, number>);
	}, [topic.difficultyDistribution, totalQuestions]);

	return (
		<div className="bg-white border border-primary-toned-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
			<div className="space-y-4">
				{/* Topic Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4 flex-1">
						<div className="flex-1">
							<label className="block font-semibold text-primary mb-2">
								Topic #{index + 1}
							</label>
							<TextareaAutosize
								value={topic.name}
								onChange={(e) => onUpdate(index, { name: e.target.value })}
								placeholder="Describe the topic"
								className={cn(classNameInput, "focus:ring-primary-toned-300 focus:border-primary-toned-300")}
							/>
						</div>
					</div>

					{/* Delete Button */}
					{canDelete && (
						<button
							onClick={() => onDelete(index)}
							className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
							title="Delete topic"
						>
							<FontAwesomeIcon icon={faTrashCan} className="w-4 h-4" />
						</button>
					)}
				</div>

				<hr className='border-gray-300' />

				{/* Difficulty Distribution */}
				<div>
					<h4 className="text-sm font-semibold text-primary mb-3">Difficulty Distribution</h4>
					<div className="grid grid-cols-3 gap-4">
						{difficulties.map((difficulty) => (
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
										onChange={(e) => onUpdate(index, {
											difficultyDistribution: {
												...topic.difficultyDistribution,
												[difficulty]: parseInt(e.target.value, 10) || 0
											}
										})}
										className="w-16 border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-primary-toned-300"
									/>
								</div>
								{/* Visual percentage bar */}
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className={`h-2 rounded-full transition-all duration-300 ${difficulty === 'Easy' ? 'bg-green-500' :
											difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
											}`}
										style={{ width: `${difficultiesPercentage[difficulty]}%` }}
									></div>
								</div>
							</div>
						))}
					</div>

					{/* Distribution Summary */}
					<div className="mt-3 p-3 bg-gray-50 rounded-lg">
						<h5 className=''>
							Number of Questions: <span className="font-semibold">{totalQuestions}</span>
						</h5>
					</div>
				</div>
			</div>
		</div>
	);
}

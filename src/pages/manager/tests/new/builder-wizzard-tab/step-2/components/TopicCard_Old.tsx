import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';
import { DifficultyType, Topic } from '../../../common/base-schema';
import { cn } from '../../../../../../../app/cn';
import { difficultyClassNames } from '../../../common/class-names';
import MyFieldLayout from '../../../../../../../features/tests/ui/forms/MyFieldLayout';
import MyLabel from '../../../../../../../features/tests/ui/forms/MyLabel';
import MyTextArea from '../../../../../../../features/tests/ui/forms/MyTextArea';

interface TopicCardProps {
	topic: Topic;
	index: number;
	canDelete: boolean;
	onUpdate: (index: number, updates: Partial<Topic>) => void;
	onDelete: (index: number) => void;
}

export default function TopicCard_Old({
	topic,
	index,
	canDelete,
	onUpdate,
	onDelete,
}: TopicCardProps) {
	const difficulties = Object.keys(topic.difficultyDistribution) as DifficultyType[];

	const totalQuestions = useMemo(() => {
		return Object.values(topic.difficultyDistribution).reduce((sum, value) => sum + value, 0);
	}, [topic.difficultyDistribution]);

	const difficultiesPercentage = useMemo(() => {
		return difficulties.reduce((acc, difficulty) => {
			acc[difficulty] = topic.difficultyDistribution[difficulty] / totalQuestions * 100 || 0;
			return acc;
		}, {} as Record<DifficultyType, number>);
	}, [topic.difficultyDistribution, totalQuestions]);

	return (
		<div className="bg-white border border-primary-toned-200 rounded-lg p-6 shadow-md">
			<div className="space-y-4">
				{/* Topic Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4 flex-1">
						<MyFieldLayout className='w-full'>
							<MyLabel>Topic #{index + 1}</MyLabel>
							<MyTextArea
								value={topic.name}
								onChange={(e) => onUpdate(index, { name: e.target.value })}
								placeholder='Describe the topic'
								aria-label='Topic description'
							/>
						</MyFieldLayout>
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

				<hr className='border-primary-toned-300' />

				{/* Difficulty Distribution */}
				<div>
					<h4 className="text-lg font-semibold text-primary mb-3">Difficulty Distribution</h4>
					<div className="grid grid-cols-3 gap-4">
						{difficulties.map((difficulty) => (
							<div key={difficulty} className="flex flex-col gap-2 border border-gray-200 rounded-lg p-4 shadow-md">
								<div className='flex items-center justify-between'>
									<label className="block text-sm font-semibold text-primary">
										{difficulty}:
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
											className="w-18 border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-primary-toned-300"
										/>
									</div>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className={cn(
											`h-2 rounded-full transition-all duration-300`,
											difficultyClassNames(difficulty).heavyBackground().build()
										)}
										style={{ width: `${difficultiesPercentage[difficulty]}%` }}
									></div>
								</div>
							</div>
						))}
					</div>

					{/* Distribution Summary */}
					<div className="mt-6 p-3 bg-primary-toned-50 text-primary rounded-lg">
						<h5 className=''>
							Number of Questions: <span className="font-semibold">{totalQuestions}</span>
						</h5>
					</div>
				</div>
			</div>
		</div>
	);
}

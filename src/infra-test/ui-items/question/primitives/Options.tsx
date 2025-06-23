import React from 'react';
import { useQuestion, getOptionState } from './context';

const Options: React.FC = () => {
	const { question, answer, showCorrectAnswer, onAnswerChange, mode } = useQuestion();

	if (question.type !== 'MCQ') return null;

	const detail = question.detail as { type: 'MCQ' } & { options: string[]; correctOption: number | null };
	const chosenOption = answer?.answer?.child.type === 'MCQ' ? answer.answer.child.chosenOption : undefined;
	const correctOption = detail.correctOption ?? undefined;
	const isInteractive = mode === 'exam' && onAnswerChange;

	return (
		<div className="px-4 pb-4">
			<div className="space-y-2">
				{detail.options.map((option: string, index: number) => {
					const optionState = getOptionState(index, chosenOption, correctOption, showCorrectAnswer);

					let optionClasses = `p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer `;

					if (optionState === 'correct') {
						optionClasses += 'bg-green-50 border-green-300 text-green-800';
					} else if (optionState === 'incorrect') {
						optionClasses += 'bg-red-50 border-red-300 text-red-800';
					} else if (chosenOption === index && !showCorrectAnswer) {
						optionClasses += 'bg-blue-50 border-blue-300 text-blue-800';
					} else {
						optionClasses += 'bg-white border-gray-200 text-gray-700 hover:border-gray-300';
					}

					if (!isInteractive) {
						optionClasses += ' cursor-default';
					}

					return (
						<div
							key={index}
							className={optionClasses}
							onClick={() => isInteractive && onAnswerChange?.(index)}
						>
							<div className="flex items-start space-x-3">
								<div className="flex-shrink-0 mt-0.5">
									<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${chosenOption === index
										? 'border-primary-600 bg-primary-600'
										: 'border-gray-300'
										}`}>
										{chosenOption === index && (
											<div className="w-2 h-2 rounded-full bg-white" />
										)}
									</div>
								</div>
								<div className="flex-1">
									<span className="text-sm font-medium">{option}</span>
								</div>
								{showCorrectAnswer && (
									<div className="flex items-center space-x-2">
										{optionState === 'correct' && (
											<div className="flex items-center space-x-1">
												<div className="w-2 h-2 bg-green-500 rounded-full" />
												<span className="text-xs font-medium text-green-700">Correct</span>
											</div>
										)}
										{optionState === 'incorrect' && (
											<div className="flex items-center space-x-1">
												<div className="w-2 h-2 bg-red-500 rounded-full" />
												<span className="text-xs font-medium text-red-700">Chosen</span>
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Options;

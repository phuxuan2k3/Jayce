import React from 'react';
import { useQuestion } from './context';

const Compact: React.FC = () => {
	const { question, answer, mode } = useQuestion();

	if (mode !== 'list') return null;

	const isAnswered = answer?.answer !== null;
	const isCorrect = answer?.isCorrect;

	return (
		<div className="p-3">
			<div className="flex items-start justify-between gap-3">
				<div className="flex-1">
					<h4 className="text-sm font-medium text-gray-900 line-clamp-2">
						{question.text}
					</h4>
					<div className="flex items-center gap-2 mt-2">
						<span className="text-xs text-gray-500">{question.points} pts</span>
						<span className="text-xs text-gray-300">•</span>
						<span className="text-xs text-gray-500">{question.type}</span>
					</div>
				</div>

				<div className="flex flex-col items-end gap-1">
					{isAnswered && (
						<div className={`px-2 py-1 rounded-full text-xs font-medium ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
							}`}>
							{isCorrect ? 'Correct' : 'Incorrect'}
						</div>
					)}
					<span className="text-xs text-gray-400">
						{question._aggregate_test.numberOfAnswers} answers
					</span>
				</div>
			</div>
		</div>
	);
};

export default Compact;

import React from 'react';
import { useQuestion } from './context';

const LongAnswerInput: React.FC = () => {
	const { question, answer, onAnswerChange, mode } = useQuestion();

	if (question.type !== 'LONG_ANSWER' || mode !== 'exam') return null;

	const currentAnswer = answer?.answer?.child.type === 'LONG_ANSWER' ? answer.answer.child.answer : '';

	return (
		<div className="px-4 pb-4">
			<textarea
				value={currentAnswer}
				onChange={(e) => onAnswerChange?.(e.target.value as any)}
				placeholder="Type your answer here..."
				className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg resize-vertical focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
				rows={5}
			/>
		</div>
	);
};

export default LongAnswerInput;

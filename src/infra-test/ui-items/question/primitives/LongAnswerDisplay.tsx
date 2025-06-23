import React from 'react';
import { useQuestion } from './context';

const LongAnswerDisplay: React.FC = () => {
	const { question, answer, showCorrectAnswer } = useQuestion();

	if (question.type !== 'LONG_ANSWER' || question.detail.type !== "LONG_ANSWER") return null;

	const detail = question.detail;
	const userAnswer = answer?.answer?.child.type === 'LONG_ANSWER' ? answer.answer.child.answer : null;
	const correctAnswer = showCorrectAnswer ? detail.correctAnswer : null;

	if (!userAnswer && !correctAnswer) return null;

	return (
		<div className="px-4 pb-4 space-y-4">
			{userAnswer && (
				<div>
					<h4 className="text-sm font-medium text-gray-700 mb-2">Answer:</h4>
					<div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
						<p className="text-sm text-gray-800 whitespace-pre-wrap">{userAnswer}</p>
					</div>
				</div>
			)}

			{correctAnswer && showCorrectAnswer && (
				<div>
					<h4 className="text-sm font-medium text-green-700 mb-2">Correct Answer:</h4>
					<div className="bg-green-50 border border-green-200 rounded-lg p-3">
						<p className="text-sm text-green-800 whitespace-pre-wrap">{correctAnswer}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default LongAnswerDisplay;

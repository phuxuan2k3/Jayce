import React from 'react';
import { useQuestion, getAnswerStatusColor } from './context';

const Status: React.FC = () => {
	const { question, answer, mode } = useQuestion();

	if (mode === 'exam') return null;

	const isAnswered = answer?.answer !== null;
	const isCorrect = answer?.isCorrect;
	const pointsReceived = answer?.answer?.pointReceived ?? 0;

	return (
		<div className="px-4 pb-4">
			<div className="flex items-center justify-between">
				<div className={`px-3 py-1 rounded-full text-sm font-semibold ${getAnswerStatusColor(isAnswered, isCorrect)}`}>
					{!isAnswered ? 'Not Answered' : isCorrect ? 'Correct' : 'Incorrect'}
				</div>

				<div className="text-sm">
					<span className="text-gray-600">Score: </span>
					<span className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
						{pointsReceived} / {question.points}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Status;

import React from 'react';
import { useQuestion } from './context';

const Navigation: React.FC<{ onPrevious?: () => void; onNext?: () => void; }> = ({
	onPrevious,
	onNext
}) => {
	const { questionIndex, totalQuestions, mode } = useQuestion();

	if (mode !== 'exam') return null;

	const isFirst = questionIndex === 0;
	const isLast = totalQuestions !== undefined && questionIndex === totalQuestions - 1;

	return (
		<div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
			<button
				onClick={onPrevious}
				disabled={isFirst}
				className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isFirst
					? 'bg-gray-100 text-gray-400 cursor-not-allowed'
					: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
					}`}
			>
				Previous
			</button>

			<span className="text-sm text-gray-600">
				{questionIndex !== undefined && totalQuestions && (
					`${questionIndex + 1} of ${totalQuestions}`
				)}
			</span>

			<button
				onClick={onNext}
				disabled={isLast}
				className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isLast
					? 'bg-gray-100 text-gray-400 cursor-not-allowed'
					: 'bg-primary-600 text-white hover:bg-primary-700'
					}`}
			>
				{isLast ? 'Submit' : 'Next'}
			</button>
		</div>
	);
};

export default Navigation;

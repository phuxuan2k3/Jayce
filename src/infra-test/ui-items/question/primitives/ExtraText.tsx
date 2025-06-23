import React from 'react';
import { useQuestion } from './context';

const ExtraText: React.FC = () => {
	const { question } = useQuestion();
	if (question.type !== 'LONG_ANSWER' || question.detail.type !== "LONG_ANSWER") return null;
	const extraText = question.detail.extraText;

	return (
		<div className="px-4 pb-4">
			<div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
				{extraText ? (
					<p className="text-sm text-blue-800">{extraText}</p>
				) : (
					<p className="text-sm text-gray-500 italic">No additional instructions provided.</p>
				)}
			</div>
		</div>
	);
};

export default ExtraText;

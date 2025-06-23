import React from 'react';
import { useQuestion } from './context';

const Text: React.FC = () => {
	const { question, mode } = useQuestion();

	const textSize = mode === 'list' ? 'text-sm' : 'text-base';
	const padding = mode === 'list' ? 'p-3' : 'p-4';

	return (
		<div className={padding}>
			<h3 className={`font-medium text-gray-900 ${textSize} leading-relaxed`}>
				{question.text}
			</h3>
		</div>
	);
};

export default Text;

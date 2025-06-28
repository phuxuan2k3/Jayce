import React from 'react'
import { DoQuestionContext } from '../contexts'
import { BaseComponentProps } from '../types';
import { cn } from '../../../../../../app/cn';

export default function DoAnswerText({
	className = '',
}: BaseComponentProps) {
	const { getLongAnswerAnswer, setDoAnswer } = DoQuestionContext.useDoQuestionContext();
	const longAnswer = getLongAnswerAnswer();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDoAnswer({
			type: "LONG_ANSWER",
			answer: e.target.value,
		});
	};


	return (
		<input
			className={cn(
				"w-full py-2 px-4 border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors",
				className,
			)}
			type="text"
			value={longAnswer || ''}
			onChange={handleChange}
			placeholder="Type your answer here"
		/>
	)
}

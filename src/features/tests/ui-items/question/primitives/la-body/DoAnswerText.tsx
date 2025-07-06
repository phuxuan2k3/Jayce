import React from 'react'
import { DoQuestionContext } from '../contexts'
import { BaseComponentProps } from '../types';
import { cn } from '../../../../../../app/cn';
import MyTextArea from '../../../../ui/forms/MyTextArea';

export default function DoAnswerText({
	className = '',
}: BaseComponentProps) {
	const { getLongAnswerAnswer, setDoAnswer } = DoQuestionContext.useDoQuestionContext();
	const longAnswer = getLongAnswerAnswer();
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDoAnswer({
			type: "LONG_ANSWER",
			answer: e.target.value,
		});
	};


	return (
		<MyTextArea
			className={cn(
				className,
			)}
			value={longAnswer || ''}
			onChange={handleChange}
			placeholder="Type your answer here"
		/>
	)
}

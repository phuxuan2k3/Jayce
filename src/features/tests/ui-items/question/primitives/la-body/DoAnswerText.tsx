import React from 'react'
import { DoQuestionContext } from '../contexts'
import { BaseComponentProps } from '../types';
import { cn } from '../../../../../../app/cn';
import MyTextArea from '../../../../ui/forms/MyTextArea';
import { useLanguage } from '../../../../../../LanguageProvider';

export default function DoAnswerText({
	className = '',
}: BaseComponentProps) {
	const { t } = useLanguage();
	
	const { getLongAnswerAnswer, setDoAnswer } = DoQuestionContext.useDoQuestionContext();
	const longAnswer = getLongAnswerAnswer();
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (e.target.value.trim() === '') {
			setDoAnswer(undefined);
			return;
		}
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
			placeholder={t("do_answer_text_placeholder")}
		/>
	)
}

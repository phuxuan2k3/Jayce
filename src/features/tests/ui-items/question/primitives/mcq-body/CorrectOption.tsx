import { cn } from '../../../../../../app/cn';
import { QuestionContext, ShowAnswerContext } from '../contexts';
import { BaseComponentProps } from '../types';

export function CorrectOption({
	className = "",
}: BaseComponentProps) {
	const correctOption = QuestionContext.useMCQDetail()?.correctOption;
	const { show: showResult } = ShowAnswerContext.useShowAnswer();

	if (correctOption == null || !showResult) return null;

	const characterCode = String.fromCharCode(65 + correctOption);

	return (
		<div className={cn("text-sm font-semibold text-green-600", className)}>
			Correct Option: {characterCode}
		</div>
	);
}

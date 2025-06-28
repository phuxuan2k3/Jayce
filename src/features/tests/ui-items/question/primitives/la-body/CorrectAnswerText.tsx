import { cn } from '../../../../../../app/cn';
import { QuestionContext } from '../contexts';
import { BaseComponentProps } from '../types';
import { commonBoxClassNames } from './type';
import { TextAnswerAsConst } from './type';

export function CorrectAnswerText({
	className = "",
}: BaseComponentProps) {
	const correctAnswer = QuestionContext.useLongAnswerDetail().correctAnswer;
	if (correctAnswer == null) return null;

	return (
		<div className={cn(commonBoxClassNames, TextAnswerAsConst.CORRECT.color, className)}>
			{correctAnswer}
		</div>
	);
}

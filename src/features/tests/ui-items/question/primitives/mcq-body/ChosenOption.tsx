import { cn } from '../../../../../app/cn';
import { QuestionContext } from '../contexts';
import { BaseComponentProps } from '../types';

export function AttemptChosenOption({
	className = "",
}: BaseComponentProps) {
	const chosenOption = QuestionContext.useMCQAnswerDetail()?.chosenOption;
	if (chosenOption == null) return null;
	return (
		<div className={cn("text-sm font-semibold text-gray-600", className)}>
			Chosen Option: {String.fromCharCode(65 + chosenOption)}
		</div>
	);
}

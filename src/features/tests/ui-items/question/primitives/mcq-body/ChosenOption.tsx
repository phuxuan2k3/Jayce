import { cn } from '../../../../../../app/cn';
import { useLanguage } from '../../../../../../LanguageProvider';
import { QuestionContext } from '../contexts';
import { BaseComponentProps } from '../types';

export function AttemptChosenOption({
	className = "",
}: BaseComponentProps) {
	const { t } = useLanguage();

	const chosenOption = QuestionContext.useMCQAnswerDetail()?.chosenOption;
	if (chosenOption == null) return null;
	return (
		<div className={cn("text-sm font-semibold text-gray-600", className)}>
			{t("chosen_option")}: {String.fromCharCode(65 + chosenOption)}
		</div>
	);
}

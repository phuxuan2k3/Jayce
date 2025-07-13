import { cn } from '../../../../../../app/cn';
import { useLanguage } from '../../../../../../LanguageProvider';
import { MySlider } from '../../../../ui/MySlider';
import { QuestionContext } from '../contexts';
import { BaseComponentProps } from '../types';
import { commonSliderButtonClassNames, commonBoxClassNames } from './type';

export function ExtraText({
	className = "",
}: BaseComponentProps) {
	const { t } = useLanguage();

	const extraText = QuestionContext.useLongAnswerDetail().extraText;
	return (
		<MySlider
			trigger={({ onClick, isShow }) => (
				<button
					className={cn(commonSliderButtonClassNames(isShow), className)}
					onClick={onClick}
				>
					{isShow ? t("extra_text_hide") : t("extra_text_show")}
				</button>
			)}
			maxHeight={200}
		>
			<div className={cn(
				commonBoxClassNames,
				"border-t-0 mt-0 rounded-t-none text-sm h-[200px] overflow-y-auto",
				className
			)}>
				{extraText ? extraText : <span>{t("extra_text_empty")}</span>}
			</div>
		</MySlider>
	);
}

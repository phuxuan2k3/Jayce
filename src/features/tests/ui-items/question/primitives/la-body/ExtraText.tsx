import { cn } from '../../../../../../app/cn';
import { MySlider } from '../../../../ui/MySlider';
import { QuestionContext } from '../contexts';
import { BaseComponentProps } from '../types';
import { commonSliderButtonClassNames, commonBoxClassNames } from './type';

export function ExtraText({
	className = "",
}: BaseComponentProps) {
	const extraText = QuestionContext.useLongAnswerDetail().extraText;
	return (
		<MySlider
			trigger={({ onClick, isShow }) => (
				<button
					className={cn(commonSliderButtonClassNames(isShow), className)}
					onClick={onClick}
				>
					{isShow ? "Hide Extra Description" : "Show Extra Description"}
				</button>
			)}
		>
			<div className={cn(commonBoxClassNames, "border-t-0 mt-0 rounded-t-none text-sm", className)}>
				{extraText ? extraText : <span>No extra description provided.</span>}
			</div>
		</MySlider>
	);
}

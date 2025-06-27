import { cn } from '../../../../../app/cn';
import { ShowAnswerContext } from '../contexts';
import { BaseComponentProps } from '../types';
import { ImageLinks } from './ImageLinks';
import { ExtraText } from './ExtraText';
import { CorrectAnswerText } from './CorrectAnswerText';
import { AttemptAnswerText } from './AttemptAnswerText';
import DoAnswerText from './DoAnswerText';

export function LongAnswerDetail({
	className = "",
}: BaseComponentProps) {
	const { show } = ShowAnswerContext.useShowAnswer();
	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<ExtraText />
			<ImageLinks />
			<hr className="border-gray-300" />
			<AttemptAnswerText />
			{show && <CorrectAnswerText />}
		</div>
	);
}

export function LongAnswerDo({
	className = "",
}: BaseComponentProps) {
	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<ExtraText />
			<ImageLinks />
			<hr className="border-gray-300" />
			<DoAnswerText />
		</div>
	);
}
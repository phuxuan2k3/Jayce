import { cn } from '../../../../../../app/cn';
import { BaseComponentProps } from '../types';
import { AttemptChosenOption } from './ChosenOption';
import { CorrectOption } from './CorrectOption';
import { OptionsDoList } from './OptionsDoList';
import { OptionsList } from './OptionsList';

export function MCQDetail({
	className = "",
}: BaseComponentProps) {
	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<OptionsList />
			<hr className="my-1 border-gray-300" />
			<AttemptChosenOption />
			<CorrectOption />
		</div>
	);
}

export function MCQDo({
	className = "",
}: BaseComponentProps) {
	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<OptionsDoList />
		</div>
	);
}
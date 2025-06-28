import { cn } from '../../../../../../app/cn';
import { DoQuestionContext, QuestionContext } from '../contexts'
import { BaseComponentProps } from '../types';

export function OptionsDoList({
	className = "",
}: BaseComponentProps) {
	const { options } = QuestionContext.useMCQDetail();
	return (
		<ul className={cn("flex flex-col gap-2", className)}>
			{options.map((_, index) => (
				<OptionDoItem key={index} index={index} />
			))}
		</ul>
	);
}

function OptionDoItem({
	className = "",
	index,
}: BaseComponentProps & {
	index: number;
}) {
	const { setDoAnswer, getMCQChosenOption } = DoQuestionContext.useDoQuestionContext();

	const { options } = QuestionContext.useMCQDetail();
	const character = String.fromCharCode(65 + index);
	const isChosen = getMCQChosenOption() === index;

	return (
		<li className={cn(
			"flex flex-row items-baseline gap-4 py-2 px-4 border border-gray-200 shadow-sm rounded-lg hover:shadow-sm hover:shadow-primary hover:border-primary cursor-pointer transition-colors",
			isChosen && "shadow-primary border-primary",
			className,
		)}
			onClick={() => setDoAnswer({
				type: "MCQ",
				chosenOption: index,
			})}
		>
			<div className={cn(
				'rounded-full h-7 aspect-square flex items-center justify-center',
				isChosen ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700',
			)}>
				<span>{character}</span>
			</div>
			<span className='mt-0'>{options[index]}</span>
		</li>
	)
}

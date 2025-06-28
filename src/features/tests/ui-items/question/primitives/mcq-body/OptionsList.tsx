import { QuestionContext } from '../contexts';
import { BaseComponentProps } from '../types';
import { ShowAnswerContext } from '../contexts';
import { cn } from '../../../../../../app/cn';

export function OptionsList({
	className = "",
}: BaseComponentProps) {
	const detail = QuestionContext.useMCQDetail();
	return (
		<ul className={cn("flex flex-col gap-4 text-[15px]", className)}>
			{detail.options.map((_, index) => (
				<OptionItem
					key={index}
					index={index} />
			))}
		</ul>
	);
}

function OptionItem({
	className = "",
	optionClassName = "",
	onClick,
	index,
}: BaseComponentProps & {
	index: number;
	optionClassName?: string;
}) {
	const { show: showResult } = ShowAnswerContext.useShowAnswer();
	const detail = QuestionContext.useMCQDetail();
	const answer = QuestionContext.useMCQAnswerDetail();
	const chosenOption = answer?.chosenOption;

	const character = String.fromCharCode(65 + index);
	const isCorrectOption = detail.correctOption === index;

	let optionState = OptionStateAsConst.DEFAULT;

	if (showResult === true &&
		isCorrectOption === true) {
		optionState = OptionStateAsConst.CORRECT;
	}
	else if (showResult === true &&
		chosenOption === index &&
		isCorrectOption === false) {
		optionState = OptionStateAsConst.INCORRECT;
	}
	else if (chosenOption === index) {
		optionState = OptionStateAsConst.CHOOSEN;
	}
	else {
		optionState = OptionStateAsConst.DEFAULT;
	}

	return <>
		{(detail.options[index] && (
			<li className={cn(
				"flex flex-row items-baseline gap-4 py-2 px-4 bg-gray-50 border border-gray-200 shadow-sm rounded-lg",
				onClick && "cursor-pointer hover:bg-gray-100 hover:border-gray-400",
				optionState.bg,
				className
			)}
				onClick={onClick}
			>
				<div className={cn(
					'rounded-full h-7 aspect-square flex items-center justify-center',
					optionState.option,
					optionClassName,
				)}>
					<span>{character}</span>
				</div>
				<span className='mt-0'>{detail.options[index]}</span>
			</li>
		))}
	</>;
}

const OptionStateAsConst = {
	"CORRECT": {
		bg: cn("bg-green-200 text-green-800 border border-green-500 font-semibold"),
		option: cn("bg-green-800 text-white"),
		label: "Correct",
	},
	"INCORRECT": {
		bg: cn("bg-red-200 text-red-800 border border-red-500 font-semibold"),
		option: cn("bg-red-800 text-white"),
		label: "Incorrect",
	},
	"CHOOSEN": {
		bg: cn("bg-gray-200 text-gray-800 border border-gray-300 font-semibold"),
		option: cn("bg-gray-800 text-white border-gray-300"),
		label: "Not Answered",
	},
	"DEFAULT": {
		bg: cn("bg-white text-gray-800 border border-gray-300"),
		option: cn("bg-gray-100 text-gray-800 border-2 border-gray-300"),
		label: "Not Answered",
	},
};
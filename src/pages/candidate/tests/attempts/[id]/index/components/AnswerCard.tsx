import { QuestionToDo } from "../../../../../../../infra-test/core/question.model";

export default function AnswerCard({
	index,
	question,
	chosenOption,
	correctOption = undefined,
}: {
	index: number;
	question: QuestionToDo;
	chosenOption?: number | null;
	correctOption?: number;
}) {
	const optionState = getAnswerState({
		chosenOption,
		correctOption,
	})

	return (
		<div className="flex gap-4">
			<div className='flex flex-col items-center mt-2 w-[15%]'>
				<span className="font-bold mb-2 opacity-50">
					Question {index + 1}
				</span>
				<div className={`px-4 text-sm font-bold rounded-full ${answerClass(optionState)}`}>{question.points} Points</div>
				{optionState === "notAnswered" && <div className="mt-2 px-2 py-0.5 max-w-full overflow-visible text-xs font-semibold text-orange-700 rounded-full bg-orange-100">Not answered</div>}
			</div>

			<div className="flex-1 flex flex-col">
				<div className={`"w-full font-bold px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 mb-2 ${answerClass(optionState)}`}>
					{question.text}
				</div>
				{question.options.map((option, index) => (
					<div key={index} className={`py-1 px-2 w-full flex items-center gap-2 justify-start border border-gray-300 rounded-lg mt-2  ${correctOption != null && index === correctOption
						? "text-green-700 bg-green-100"
						: index === chosenOption && correctOption != null
							? " text-red-700 bg-red-100 border-2"
							: index === chosenOption && correctOption == null
								? "bg-gray-200 font-semibold border-2 border-gray-400"
								: "bg-gray-50"}
							`}>
						<span>{String.fromCharCode(65 + Number(index))}.
						</span>
						<span>{option}</span>
					</div>
				))}
			</div>
		</div>
	);
}

type OptionState = "notShowingCorrect" | "notAnswered" | "correct" | "incorrect";

function getAnswerState({
	chosenOption,
	correctOption,
}: {
	chosenOption: number | null | undefined;
	correctOption: number | null | undefined;
}): OptionState {
	if (chosenOption == null) {
		return "notAnswered";
	} else if (correctOption == null) {
		return "notShowingCorrect";
	} else if (chosenOption === correctOption) {
		return "correct";
	} else {
		return "incorrect";
	}
}

function answerClass(optionState: OptionState) {
	switch (optionState) {
		case "notShowingCorrect":
			return "bg-gray-100 text-gray-700";
		case "correct":
			return "bg-green-100 text-green-700";
		case "notAnswered":
		case "incorrect":
			return "bg-red-100 text-red-700";
	}
}

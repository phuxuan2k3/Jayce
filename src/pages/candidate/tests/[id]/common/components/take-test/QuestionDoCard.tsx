import { Flag, Trash2 } from "lucide-react";
import { QuestionToDo } from "../../../../../../../features/tests/model/question.model";
import { QuestionDoingState } from "../../type";

export default function QuestionDoCard({
	totalQuestion,
	questionToDo,
	questionDoingState,
	currentQuestionIndex,
	onQuestionIndexChange,
	onQuestionAnswered,
	onQuestionFlagToggled,
}: {
	totalQuestion: number;
	questionToDo: QuestionToDo;
	questionDoingState: QuestionDoingState;
	currentQuestionIndex: number;
	onQuestionIndexChange: (index: number) => void;
	onQuestionAnswered: (questionId: number, optionIndex?: number) => void;
	onQuestionFlagToggled: (questionId: number) => void;
}) {
	const isFirstQuestion = currentQuestionIndex === 0;
	const isLastQuestion = currentQuestionIndex === totalQuestion - 1;

	const handleNextQuestion = () => {
		if (currentQuestionIndex < totalQuestion) {
			onQuestionIndexChange(currentQuestionIndex + 1);
		}
	};

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex >= 1) {
			onQuestionIndexChange(currentQuestionIndex - 1);
		}
	};

	const handleAnswerQuestion = (newOptionIndex?: number) => {
		onQuestionAnswered(questionToDo.id, newOptionIndex);
	};

	const handleFlagQuestionToggle = () => {
		onQuestionFlagToggled(questionToDo.id);
	};

	return (
		<div className="w-full flex flex-col justify-between">
			<div className="w-full flex items-center gap-2">
				<div className="font-bold rounded-full text-primary-toned-700 px-4 bg-primary-toned-100 ">
					{questionToDo.points} points
				</div>

				<div className="text-primary-toned-600 font-semibold">Question {currentQuestionIndex + 1} of {totalQuestion}</div>

				<div
					className={`ml-auto font-semibold cursor-pointer text-primary`}
					onClick={handleFlagQuestionToggle}
				>
					{questionDoingState.isFlagged ? (
						<div className="flex items-center gap-1 text-secondary">
							<span>Flagged</span>
							<Flag size={20} strokeWidth={2.5} className="inline" />
						</div>
					) : (
						<div className="text-primary">
							<Flag size={20} strokeWidth={2.5} />
						</div>
					)}
				</div>
			</div>

			<hr className="mt-4 mb-8 border-primary-toned-700/50" />

			<div className="font-semibold">
				{questionToDo.text}
			</div>

			<div className="flex flex-col mt-4 gap-2">
				{questionToDo.options.map((option, index) => {
					const label = String.fromCharCode(65 + index);
					return (
						<label
							key={index}
							className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
						>
							<input
								type="radio"
								checked={questionDoingState.chosenOption === index}
								onChange={() => handleAnswerQuestion(index)}
								className="h-4 w-4 border-primary mt-1 focus:ring-primary accent-primary cursor-pointer"
							/>
							<span>{label}. {option}</span>
						</label>
					);
				})}
			</div>

			<hr className="mt-8 mb-4 border-primary-toned-700/50" />

			<div className="flex flex-row justify-between items-center">
				<button
					className="font-bold text-primary border-2 border-primary bg-white rounded-lg px-6 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={handlePreviousQuestion}
					disabled={isFirstQuestion}
				>
					Previous
				</button>
				<button
					className="flex-shrink flex items-center gap-1 text-secondary-toned-500 font-semibold bg-secondary-toned-100 rounded-full px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={questionDoingState.chosenOption == null}
					onClick={() => handleAnswerQuestion(undefined)}
				>
					<Trash2 size={18} strokeWidth={2.5} />
					<span className="text-sm">Clear Answer</span>
				</button>
				<button
					className="font-bold text-white border-2 border-primary bg-primary rounded-lg px-6 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={handleNextQuestion}
					disabled={isLastQuestion}
				>
					Next
				</button>
			</div>
		</div>
	);
};
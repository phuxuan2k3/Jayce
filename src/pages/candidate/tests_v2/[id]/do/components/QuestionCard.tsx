import { Flag, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { useAnswerTestQuestionMutation } from "../../../../../../features/tests/api/current.api-socket";
import { testActions, testSelectors } from "../../../../../../features/tests/stores/testSlice";
import { CurrentAttempt } from "../../../../../../features/tests/types/current";

interface QuestionComponentProps {
	currentAttempt: CurrentAttempt;
	totalQuestion: number;
	question: {
		id: number;
		text: string;
		options: {
			id: number;
			text: string;
		}[];
		points: number;
	};
}

const QuestionCard: React.FC<QuestionComponentProps> = ({
	currentAttempt,
	totalQuestion,
	question
}) => {
	const dispatch = useAppDispatch();
	const [answerQuestion] = useAnswerTestQuestionMutation();
	const isFlagged = useAppSelector(testSelectors.selectCurrentQuestionIndexIsFlagged);
	const currentQuestionIndex = useAppSelector(testSelectors.selectCurrentQuestionIndex);

	const currentAnswer = currentAttempt.answers.find((answer) => answer.questionId === question.id);

	const isFirstQuestion = currentQuestionIndex === 0;
	const isLastQuestion = currentQuestionIndex === totalQuestion - 1;

	const handleNextQuestion = () => {
		if (currentQuestionIndex < totalQuestion) {
			dispatch(testActions.setCurrentQuestionIndex(currentQuestionIndex + 1));
		}
	};

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex >= 1) {
			dispatch(testActions.setCurrentQuestionIndex(currentQuestionIndex - 1));
		}
	};

	const handleAnswerQuestion = (newOptionId: number) => {
		if (!currentAttempt) return;
		answerQuestion({
			questionId: question.id,
			optionId: newOptionId,
			attemptId: currentAttempt.id,
		});
	};

	const handleFlagQuestionToggle = () => {
		dispatch(testActions.toggleFlagCurrentQuestion());
	};

	return (
		<div className="w-full flex flex-col justify-between">
			<div className="w-full flex items-center gap-2">
				<div className="font-bold rounded-full text-primary-toned-700 px-4 bg-primary-toned-100 ">
					{question.points} points
				</div>

				<div className="text-primary-toned-600 font-semibold">Question {currentQuestionIndex + 1} of {totalQuestion}</div>

				<div
					className={`ml-auto font-semibold cursor-pointer text-primary`}
					onClick={handleFlagQuestionToggle}
				>
					{isFlagged ? (
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
				{question.text}
			</div>

			<div className="flex flex-col mt-4 gap-2">
				{question.options.map((option, index) => {
					const label = String.fromCharCode(97 + index);
					return (
						<label
							key={option.id}
							className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
						>
							<input
								type="radio"
								checked={currentAnswer ? currentAnswer.chosenOption === option.id : false}
								onChange={() => handleAnswerQuestion(option.id)}
								className="h-4 w-4 border-primary mt-1 focus:ring-primary accent-primary cursor-pointer"
							/>
							<span>{label}. {option.text}</span>
						</label>
					);
				})}
			</div>

			<hr className="mt-8 mb-4 border-primary-toned-700/50" />

			<div className="flex flex-row justify-between items-center">
				<button
					className="font-bold text-primary border-2 border-primary bg-white rounded-lg px-6 py-1"
					onClick={handlePreviousQuestion}
					disabled={isFirstQuestion}
				>
					Previous
				</button>
				<button
					className="flex-shrink flex items-center gap-1 text-secondary-toned-500 font-semibold bg-secondary-toned-100 rounded-full px-4 py-2"
					disabled={!currentAnswer}
					onClick={() => handleAnswerQuestion(-1)}
				>
					<Trash2 size={18} strokeWidth={2.5} />
					<span className="text-sm">Clear Answer</span>
				</button>
				<button
					className="font-bold text-white border-2 border-primary bg-primary rounded-lg px-6 py-1"
					onClick={handleNextQuestion}
					disabled={isLastQuestion}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default QuestionCard;
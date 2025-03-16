import { CurrentAttemptQuestion } from "../../../../features/Test/types/current";
import { useAppDispatch, useAppSelector } from "../../../../app/redux/hooks";
import { testSliceActions, testSliceSelects } from "../../../../features/Test/slice/testSlice";

interface QuestionComponentProps {
	currentQuestion: CurrentAttemptQuestion;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
	currentQuestion,
}) => {
	const currentQuestionIndex = useAppSelector(testSliceSelects.selectCurrentIndex);
	const totalQuestion = useAppSelector(testSliceSelects.selectTotalQuestions);
	const dispatch = useAppDispatch();

	const isFirstQuestion = currentQuestionIndex === 0;
	const isLastQuestion = currentQuestionIndex === totalQuestion - 1;

	const handleNextQuestion = () => {
		if (currentQuestionIndex < totalQuestion) {
			dispatch(testSliceActions.setCurrentQuestionIndex(currentQuestionIndex + 1));
		}
	};

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex >= 1) {
			dispatch(testSliceActions.setCurrentQuestionIndex(currentQuestionIndex - 1));
		}
	}

	const handleAnswerQuestion = (newOptionId: number) => {
		dispatch(testSliceActions.answerQuestion({ questionId: currentQuestion.id, chosenOption: newOptionId }));
	}

	const handleFlagQuestionToggle = () => {
		dispatch(testSliceActions.toggleFlagCurrentQuestion());
	}

	return (
		<div className="flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-primary">
			<div className="w-1/5 mb-4 bg-white rounded-lg shadow-primary p-6 h-fit border-r border-b border-primary">
				<div className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}</div>
				<p className="text-[#39A0AD]">{currentQuestion.chosenOption == null ? "Not yet answered" : "Already answered"}</p>
				<p className="text-[#39A0AD]">Points: {currentQuestion.points}</p>
				<div className="flex justify-end">
					<p className="text-[#A04D38] mt-4 hover:underline cursor-pointer" onClick={handleFlagQuestionToggle}>
						{currentQuestion.isFlagged ? "🏴 Flagged" : "Flag question"}
					</p>
				</div>
			</div>
			<div className="w-4/5">
				<div className="mb-4 bg-[#EAF6F8] rounded-lg shadow-md p-6 pl-4">
					<p className="text-lg font-medium border-b border-black pb-4">{currentQuestion.text}</p>
					<div className="space-y-3 mt-4">
						{currentQuestion.options.map((option, index) => {
							const label = String.fromCharCode(97 + index);
							return (
								<label
									key={option.id}
									className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
								>
									<input
										type="radio"
										checked={currentQuestion.chosenOption === option.id}
										onChange={() => handleAnswerQuestion(option.id)}
										className="h-4 w-4 border-primary focus:ring-primary accent-primary cursor-pointer"
									/>
									<span>{label}. {option.text}</span>
								</label>
							);
						})}
					</div>
					<div className="flex justify-end">
						<p className="w-fit mt-4 text-[#A04D38] px-6 py-2 hover:underline cursor-pointer" onClick={() => handleAnswerQuestion(-1)}>Clear my choice</p>
					</div>
				</div>
				<div className="flex flex-row">
					{!isFirstQuestion &&
						<button className="text-md font-bold bg-gradient-text text-white px-6 py-2 rounded-lg mr-auto" onClick={handlePreviousQuestion}>
							Previous
						</button>
					}
					{!isLastQuestion &&
						<button className="text-md font-bold bg-gradient-text text-white px-6 py-2 rounded-lg ml-auto" onClick={handleNextQuestion}>
							Next
						</button>
					}
				</div>
			</div>
		</div>
	);
};

export default QuestionComponent;
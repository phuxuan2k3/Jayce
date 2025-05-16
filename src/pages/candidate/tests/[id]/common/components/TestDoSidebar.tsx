import TestTimer from "../../../../../../features/tests/ui/TestTimer";
import { AlarmClock } from "lucide-react";
import { QuestionDoingState } from "../type";

export default function TestDoSidebar({
	secondsLeft,
	questionDoState,
	currentQuestionIndex,
	onTestCancel,
	onTestSubmit,
	onCurrentQuestionIndexChange,
}: {
	secondsLeft: number;
	questionDoState: QuestionDoingState[];
	currentQuestionIndex: number;
	onTestCancel: () => void;
	onTestSubmit: () => void;
	onCurrentQuestionIndexChange: (index: number) => void;
}) {
	const handleCancelTest = () => {
		onTestCancel();
	};
	const handleSubmitClick = () => {
		onTestSubmit();
	};

	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex justify-center items-center gap-1 font-bold text-xl mb-4 shadow-secondary bg-white rounded-lg py-4 text-secondary" >
				<AlarmClock size={24} strokeWidth={2.5} className="mb-1 mr-1" />
				<TestTimer
					timeLeft={secondsLeft}
				/>
			</div>
			<div className="bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
				<div className="mb-4 font-semibold text-primary text-xl">Questions</div>
				<div className="grid grid-cols-5 gap-4 lg:grid-cols-7 lg:gap-2">
					{questionDoState == null || questionDoState.length === 0
						? (
							<div>No questions found</div>
						) : (questionDoState.map((question, index) => (
							<button
								key={index}
								className={`w-full aspect-square rounded-full text-sm font-bold text-primary border border-primary cursor-pointer ${currentQuestionIndex === index
									? "bg-primary-toned-600 text-white"
									: question.isFlagged === true
										? "bg-secondary-toned-200"
										: question.chosenOption != null
											? "bg-primary-toned-200"
											: "bg-white"
									}`}
								onClick={() => onCurrentQuestionIndexChange(index)}
							>
								{index + 1}
							</button>
						)))}
				</div>
			</div>

			<hr className="mt-auto mb-2 border-primary-toned-700/50" />

			<button
				className="mt-4 w-full font-bold text-white bg-primary py-2 rounded-lg border-2 border-primary"
				onClick={handleSubmitClick}>
				Submit
			</button>
			<button
				className="mt-4 w-full font-bold text-secondary bg-white border-2 border-secondary py-2 rounded-lg"
				onClick={handleCancelTest}>
				Cancel Test
			</button>
		</div >
	);
}

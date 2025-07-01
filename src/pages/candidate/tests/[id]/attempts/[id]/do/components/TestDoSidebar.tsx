import { AlarmClock } from "lucide-react";
import { QuestionDoState } from "../types";
import { AttemptCoreSchema, TestFullSchema } from "../../../../../../../../features/tests/api/test.api-gen-v2";
import MyButton from "../../../../../../../../features/tests/ui/buttons/MyButton";
import TestTimer from "./TestTimer";
import useTimeCountDown from "../../../../../../../../features/tests/hooks/useTimeCountDown";
import { useEffect, useState } from "react";
import MyDialog from "../../../../../../../../features/tests/ui/MyDialog";

// The server auto submit when time is up, so we don't need to handle the submit there.

export default function TestDoSidebar({
	attempt,
	test,
	questionDoState,
	currentQuestionIndex,
	onSubmit,
	onTimesUp,
	onCurrentQuestionIndexChange,
}: {
	attempt: AttemptCoreSchema;
	test: TestFullSchema;
	questionDoState: QuestionDoState[];
	currentQuestionIndex: number;
	onSubmit: () => void;
	onTimesUp: () => void;
	onCurrentQuestionIndexChange: (index: number) => void;
}) {
	const [showSubmitDialog, setShowSubmitDialog] = useState(false);
	const secondsLeft = useTimeCountDown({
		endDate: new Date(new Date(attempt.createdAt).getTime() + (test.minutesToAnswer * 60 * 1000)),
	});

	useEffect(() => {
		if (secondsLeft <= 0) {
			onTimesUp();
		}
	}, [secondsLeft, onTimesUp]);

	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex justify-center items-center gap-1 font-bold text-xl mb-4 shadow-secondary bg-white rounded-lg py-4 text-secondary" >
				<AlarmClock size={24} strokeWidth={2.5} className="mb-1 mr-1" />
				<TestTimer timeLeft={secondsLeft} />
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
										: question.answer != null
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

			<MyButton onClick={() => setShowSubmitDialog(true)} className="w-full" variant="primary">
				Submit
			</MyButton>


			{showSubmitDialog && <MyDialog>
				<div className="flex flex-col w-[500px] h-32 justify-between items-center p-4 bg-white rounded-lg shadow-lg">
					<h1>Do you want to submit your answers?</h1>
					<hr className="my-4 border-primary-toned-700/50" />
					<div className="flex w-full gap-2 mt-auto">
						<MyButton onClick={onSubmit} className="flex-1">
							Yes, submit
						</MyButton>
						<MyButton variant="secondary" onClick={() => setShowSubmitDialog(false)} className="flex-1">
							No, cancel
						</MyButton>
					</div>
				</div>
			</MyDialog>}
		</div>
	);
}

import { AlarmClock } from "lucide-react";
import TestTimer from "../../../../../../../../infra-test/ui/TestTimer";
import { AttemptCoreSchema, TestFullSchema } from "../../../../../../../../infra-test/api/test.api-gen-v2";
import { QuestionDoState } from "../types";
import MyButton from "../../../../../../../../infra-test/ui/buttons/MyButton";

export default function TestDoSidebar({
	attempt,
	test,
	questionDoState,
	currentQuestionIndex,
	onSubmit,
	onCurrentQuestionIndexChange,
}: {
	attempt: AttemptCoreSchema;
	test: TestFullSchema;
	questionDoState: QuestionDoState[];
	currentQuestionIndex: number;
	onSubmit: () => void;
	onCurrentQuestionIndexChange: (index: number) => void;
}) {
	const secondsLeft = Math.max(test.minutesToAnswer * 60 - attempt.secondsSpent, 0);
	const handleSubmitClick = () => {
		onSubmit();
	};

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

			<MyButton onClick={handleSubmitClick}>
				Submit
			</MyButton>
		</div>
	);
}

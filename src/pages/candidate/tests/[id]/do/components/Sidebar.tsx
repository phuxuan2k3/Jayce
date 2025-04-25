import { useNavigate } from "react-router-dom";
import paths from "../../../../../../router/paths";
import useGetTestIdParams from "../../../../../../features/tests/hooks/useGetTestIdParams";
import { useEffect } from "react";
import TestTimer from "../../../../../../features/tests/ui/TestTimer";
import { testActions, testSelectors } from "../../../../../../features/tests/stores/testSlice";
import { CurrentAttempt } from "../../../../../../features/tests/types/current";
import { usePostCandidateCurrentAttemptSubmitMutation } from "../../../../../../features/tests/api/test.api-gen";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { AlarmClock } from "lucide-react";

interface SidebarProps {
	currentAttempt: CurrentAttempt;
	questionIds: number[];
}

export default function Sidebar({
	currentAttempt: { secondsLeft, answers },
	questionIds
}: SidebarProps) {
	const testId = useGetTestIdParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [submitTest, { isSuccess, isLoading }] = usePostCandidateCurrentAttemptSubmitMutation();

	const currentQuestionIndex = useAppSelector(testSelectors.selectCurrentQuestionIndex);

	const handleCancelTest = () => {
		navigate(paths.candidate.tests.in(testId).ATTEMPTS);
	}

	useEffect(() => {
		if (isSuccess) {
			navigate(paths.candidate.tests.in(testId).ATTEMPTS);
		}
	}, [isSuccess]);

	const handleSubmitClick = () => {
		submitTest();
	}

	// TODO: clear my choice still has background color
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
					{questionIds.map((id, index) => (
						<button
							key={index}
							className={`w-full aspect-square rounded-full text-sm font-bold text-primary border border-primary cursor-pointer ${currentQuestionIndex === index
								? "bg-primary-toned-600 text-white"
								: useAppSelector(state => testSelectors.selectQuestionIdIsFlagged(state, id))
									? "bg-secondary-toned-200"
									: answers.find(answer => answer.questionId === id)?.chosenOption != null
										? "bg-primary-toned-200"
										: "bg-white"
								}`}
							onClick={() => dispatch(testActions.setCurrentQuestionIndex(index))}
						>
							{index + 1}
						</button>
					))}
				</div>
			</div>

			<hr className="mt-auto mb-2 border-primary-toned-700/50" />

			<button
				disabled={isLoading}
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

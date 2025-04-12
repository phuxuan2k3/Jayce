import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import { useEffect } from "react";
import TestTimer from "../../common/TestTimer";
import { currentAttemptActions, curerntAttemptSelects } from "../../../../../features/tests/stores/currentAttemtpSlice";
import { CurrentAttempt } from "../../../../../features/tests/types/current";
import { usePostCandidateCurrentAttemptSubmitMutation } from "../../../../../features/tests/api/test.api-gen";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";

interface SidebarProps {
	currentAttempt: CurrentAttempt;
	questionIds: number[];
}

export default function Sidebar({
	currentAttempt,
	questionIds
}: SidebarProps) {
	const testId = useGetTestIdParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const currentAttemptState = useAppSelector(curerntAttemptSelects.selectCurrentAttempt);

	const [submitTest, { isSuccess, isLoading, error }] = usePostCandidateCurrentAttemptSubmitMutation();

	const { secondsLeft, answers } = currentAttempt;
	const { currentQuestionIndex, flaggedQuestionIndexes, } = currentAttemptState;

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

	return (
		<div className="flex flex-col w-64 ml-4">
			<div className="font-bold text-xl flex justify-center mb-4" >
				<TestTimer
					timeLeft={secondsLeft}
				/>
			</div>
			<div className="bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
				<div className="mb-4 font-semibold">Quiz navigation</div>
				<div className="grid grid-cols-5 gap-2">
					{questionIds.map((id, index) => (
						<button
							key={index}
							className={`w-10 h-10 rounded-full text-sm font-bold text-primary border border-primary cursor-pointer ${currentQuestionIndex === index
								? "bg-primary-toned-600 text-white"
								: flaggedQuestionIndexes.has(index)
									? "bg-secondary-toned-200"
									: answers.find(answer => answer.questionId === id)?.chosenOption != null
										? "bg-primary-toned-200"
										: "bg-white"
								}`}
							onClick={() => dispatch(currentAttemptActions.setCurrentQuestionIndex(index))}
						>
							{index + 1}
						</button>
					))}
				</div>
			</div>
			<div>
				<button
					disabled={isLoading}
					className="mt-4 w-full bg-gradient-text text-md font-bold text-white px-6 py-3 rounded-lg"
					onClick={handleSubmitClick}>
					Submit
				</button>
				{error &&
					<span className="text-sm text-red-600 block">There was an error.</span>
				}
			</div>
			<button
				className="mt-4 w-full px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer"
				onClick={handleCancelTest}>
				Cancel Test
			</button>
		</div>
	);
}
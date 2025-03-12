import { useNavigate } from "react-router-dom";
import { AttemptAnswer } from "../../../../features/Test/types/current";
import { usePostTestsByTestIdCurrentSubmitMutation } from "../../../../features/Test/api/test.api-gen";
import paths2 from "../../../../router/path-2";
import useGetTestIdParams from "../../../../features/Test/hooks/useGetTestIdParams";
import { useEffect } from "react";
import TestTimer from "../../../../features/Test/partials/TestTimer";
import { useCurrentTestContext } from "../../../../features/Test/context/current-test-context";

interface SidebarProps {
	answers: AttemptAnswer[];
	flaggedQuestions: Set<number>;
	currentQuestionIndex: number;
	setCurrentQuestionIndex: (questionNumber: number) => void;
}

export default function Sidebar({ answers, flaggedQuestions, currentQuestionIndex, setCurrentQuestionIndex }: SidebarProps) {
	const testId = useGetTestIdParams();
	const navigate = useNavigate();
	const { isEnded, timeLeft } = useCurrentTestContext();

	const [submitTest, { isSuccess, isLoading, isError }] = usePostTestsByTestIdCurrentSubmitMutation();

	const handleCancelTest = () => {
		navigate(paths2.candidate.tests.in(testId).ATTEMPTS);
	}

	useEffect(() => {
		if (isSuccess) {
			navigate(paths2.candidate.tests.in(testId).ATTEMPTS);
		}
	}, [isSuccess]);

	const handleSubmitClick = () => {
		submitTest({ testId });
	}

	return (
		<div className="flex flex-col w-64 ml-4">
			<div className="font-bold text-xl flex justify-center mb-4" >
				<TestTimer
					isEnded={isEnded}
					timeLeft={timeLeft} />
			</div>
			<div className="bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
				<div className="mb-4 font-semibold">Quiz navigation</div>
				<div className="grid grid-cols-5 gap-2">
					{answers.map(({ questionId, optionId }, index) => (
						<button
							key={questionId}
							className={`w-10 h-10 rounded-full text-sm font-bold text-primary border border-primary cursor-pointer ${currentQuestionIndex === index
								? "bg-primary-toned-600 text-white"
								: flaggedQuestions.has(questionId)
									? "bg-secondary-toned-200"
									: optionId !== -1
										? "bg-primary-toned-200"
										: "bg-white"
								}`}
							onClick={() => setCurrentQuestionIndex(index)}
						>
							{index + 1}
						</button>
					))}
				</div>
			</div>
			<div>
				<button
					disabled={isEnded || isLoading}
					className="mt-4 w-full bg-gradient-text text-md font-bold text-white px-6 py-3 rounded-lg"
					onClick={handleSubmitClick}>
					Submit
				</button>
				<span className="text-sm text-red-600 block" hidden={isError}>There was an error.</span>
			</div>
			<button
				className="mt-4 w-full px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer"
				onClick={handleCancelTest}>
				Cancel Test
			</button>
		</div>
	);
}
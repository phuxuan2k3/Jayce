import TestTimer from "./TestTimer";
import { useNavigate } from "react-router-dom";
import paths from "../../../router/paths";

export default function CurrentAttemptStatus({
	testId,
	testTitle,
	secondsLeft,
}: {
	testId: number;
	testTitle: string;
	secondsLeft: number;
}) {
	const navigate = useNavigate();
	const handleNavigateToDo = () => {
		navigate(paths.candidate.tests.in(testId).DO);
	}

	return <>
		<div onClick={handleNavigateToDo}
			className="flex flex-col items-center border-primary-toned-900 bg-primary-toned-100 p-6 rounded-lg shadow-md m-2 cursor-pointer">
			<div className="text-primary-toned-600 font-arya text-sm">{testTitle}</div>
			<TestTimer
				className="text-secondary-toned-600 font-bold"
				timeLeft={secondsLeft}
			/>
		</div>
	</>
}
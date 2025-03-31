import TestTimer from "./TestTimer";
import { useNavigate } from "react-router-dom";
import paths from "../../../router/paths";
import { useGetCurrentAttemptStateQuery } from "../api/test.api-gen";

export default function CurrentAttemptStatus() {
	const navigate = useNavigate();
	const { data: currentAttemptData } = useGetCurrentAttemptStateQuery({});
	if (currentAttemptData == null) return <>Loading...</>;
	if (currentAttemptData.currentAttempt == null) return <>No Tests is going</>;

	const handleNavigateToDo = () => {
		if (currentAttemptData.currentAttempt == null) return;
		navigate(paths.candidate.tests.in(currentAttemptData.currentAttempt.test.id).DO);
	}

	const { test, secondsLeft } = currentAttemptData.currentAttempt;

	return <>
		<div onClick={handleNavigateToDo}
			className="flex flex-col items-center border-primary-toned-900 bg-primary-toned-100 p-6 rounded-lg shadow-md m-2 cursor-pointer">
			<div className="text-primary-toned-600 font-arya text-sm">{test.title}</div>
			<TestTimer
				className="text-secondary-toned-600 font-bold"
				timeLeft={secondsLeft}
			/>
		</div>
	</>
}
import { useEffect } from "react";
import { useAppSelector } from "../../../app/redux/hooks";
import { useLazyGetTestsByTestIdCurrentQuery } from "../api/test.api-gen";
import { curerntAttemptSelects } from "../reducers/currentAttemtpSlice";
import TestTimer from "./TestTimer";

export default function CurrentTestStatus() {
	const currentAttempt = useAppSelector(curerntAttemptSelects.selectCurrentAttempt);
	const [currentAttetmptFetch, { data, isLoading }] = useLazyGetTestsByTestIdCurrentQuery();
	const testId = currentAttempt.attemptInfo?.testId;
	useEffect(() => {
		if (testId == null) return;
		currentAttetmptFetch({ testId });
	}, [testId]);

	if (currentAttempt.attemptInfo == null) return <>No Tests is going</>;
	if (isLoading) return <>Loading...</>;
	return <>
		<div className="flex items-center bg-primary-toned-200 p-6 rounded-lg shadow-md">
			<div className="text-secondary-toned-600 font-bold">You have ongoing Test</div>
			<TestTimer
				timeLeft={data?.currentAttempt?.secondsLeft ?? 0}
			/>
		</div>
	</>
}
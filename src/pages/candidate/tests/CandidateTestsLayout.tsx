import { Outlet } from "react-router-dom";
import FixedContent from "../../../components/ui/common/FixedContent";
import CurrentAttemptStatus from "../../../features/tests/ui/CurrentAttemptStatus";
import { useShowCurrentTest } from "../contexts/show-current-test.context";
import { useGetCandidateCurrentAttemptStateQuery } from "../../../features/tests/api/test.api-gen";

export default function CandidateTestsLayout() {
	const { showCurrentTest } = useShowCurrentTest();
	const { data: currentAttemptState } = useGetCandidateCurrentAttemptStateQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});

	if (currentAttemptState == null || currentAttemptState.currentAttempt == null) return (
		<Outlet />
	);

	const testId = currentAttemptState.currentAttempt.test.id;
	const testTitle = currentAttemptState.currentAttempt.test.title;
	const secondsLeft = currentAttemptState.currentAttempt.secondsLeft;

	return (
		<>
			<Outlet />
			{showCurrentTest && (
				<FixedContent position="bottom-right">
					<CurrentAttemptStatus
						testId={testId}
						testTitle={testTitle}
						secondsLeft={secondsLeft}
					/>
				</FixedContent>
			)}
		</>
	)
}
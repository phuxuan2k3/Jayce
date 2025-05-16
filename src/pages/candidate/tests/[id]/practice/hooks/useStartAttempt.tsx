import { useNavigate } from "react-router-dom";
import { usePostPracticesByTestIdAttemptsStartMutation } from "../../../../../../features/tests/api/test.api-gen"
import useGetTestIdParams from "../../../../../../features/tests/hooks/useGetTestIdParams";
import paths from "../../../../../../router/paths";

export default function useStartAttempt() {
	const testId = useGetTestIdParams();
	const navigate = useNavigate();

	const [_startAttempt, startAttemptState] = usePostPracticesByTestIdAttemptsStartMutation();

	const startAttempt = async () => {
		try {
			await _startAttempt({ testId }).unwrap();
			navigate(paths.candidate.tests.in(testId).TAKE_PRACTICE);
		}
		catch (error) {
			console.error("Error starting attempt:", error);
			throw error;
		}
	}

	return {
		startAttempt,
		startAttemptState
	}
}

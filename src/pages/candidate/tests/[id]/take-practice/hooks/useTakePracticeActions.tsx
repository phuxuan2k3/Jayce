import { useNavigate } from "react-router-dom";
import { usePatchCurrentAttemptsByAttemptIdSubmitMutation } from "../../../../../../features/tests/api/test.api-gen";
import { usePatchCurrentAttemptsByAttemptIdAnswersMutation } from "../apis/take-test.api";
import paths from "../../../../../../router/paths";

export default function useTakePracticeActions({
	testId,
	attemptId,
}: {
	testId?: string;
	attemptId?: string;
}) {
	const navigate = useNavigate();
	const [answer] = usePatchCurrentAttemptsByAttemptIdAnswersMutation();
	const [submit] = usePatchCurrentAttemptsByAttemptIdSubmitMutation();
	const handleQuestionAnswered = async (questionId: number, optionIndex?: number) => {
		if (!attemptId) {
			console.error("Attempt ID is not defined");
			return;
		}
		answer({
			attemptId,
			body: {
				questionId,
				chosenOption: optionIndex,
			}
		});
	}

	const handleTestCancel = () => {
		navigate(paths.candidate.tests.in(testId).PRACTICE);
	};

	const handleTestSubmit = async () => {
		try {
			if (!attemptId) {
				console.error("Attempt ID is not defined");
				return;
			}
			await submit({
				attemptId,
			});
			navigate(paths.candidate.tests.attempts.in(attemptId).ROOT);
		} catch (error) {
			console.error("Error submitting test:", error);
			throw error;
		}
	};

	return {
		handleTestCancel,
		handleTestSubmit,
		handleQuestionAnswered,
	}
}

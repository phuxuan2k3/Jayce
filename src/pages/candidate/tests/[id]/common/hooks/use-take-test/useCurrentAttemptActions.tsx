import { useNavigate } from "react-router-dom";
import paths from "../../../../../../../router/paths";
import { usePatchCurrentAttemptsByAttemptIdAnswersMutation } from "../../apis/answer.api-enhance";
import { usePatchCurrentAttemptsByAttemptIdSubmitMutation } from "../../../../../../../infra-test/api/test.api-gen";

export default function useCurrentAttemptActions({
	attemptId,
}: {
	attemptId?: string;
}) {
	const navigate = useNavigate();
	const [answer] = usePatchCurrentAttemptsByAttemptIdAnswersMutation();
	const [submit] = usePatchCurrentAttemptsByAttemptIdSubmitMutation();
	const handleAnswer = async (questionId: number, optionIndex?: number) => {
		if (attemptId == null) {
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

	const handleSubmit = async () => {
		try {
			if (attemptId == null) {
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
		handleSubmit,
		handleAnswer,
	}
}

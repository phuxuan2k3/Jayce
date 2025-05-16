import { useNavigate } from "react-router-dom"
import paths from "../../../../../../../router/paths";

export default function useNavigateToAttempt() {
	const navigate = useNavigate();
	return (attemptId: string) => {
		navigate(paths.candidate.tests.attempts.in(attemptId).ROOT);
	}
}

import { useNavigate } from "react-router-dom";
import useGetAttemptIdParams from "../../../../features/Test/hooks/useGetAttemptIdParams";
import AnswerList from "./AnswerList";
import TestInfo from "./AttemptSummary";

const CandidateAttemptPage = () => {
	const attemptId = useGetAttemptIdParams();
	const navigate = useNavigate();

	function handleBackClick() {
		navigate(-1);
	}

	return (
		<div className="w-full flex-grow flex flex-col items-center px-4">
			<div className="w-full max-w-7xl py-6">
				<TestInfo attemptId={attemptId} />

				<div className="flex flex-col items-center">
					<AnswerList attemptId={attemptId} />
				</div>

				<div className="flex flex-row justify-center">
					<button className="mt-4 w-fit px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBackClick}>
						Back
					</button>
				</div>
			</div>
		</div>
	);
}

export default CandidateAttemptPage;
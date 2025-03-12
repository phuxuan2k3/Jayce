import { useNavigate } from "react-router-dom"
import { paths } from "../../../../router/path";
import useGetTestIdParams from "../../../../features/Test/hooks/useGetTestIdParams";
import { usePostTestsByTestIdCurrentNewMutation } from "../../../../features/Test/api/test.api-gen";
import paths2 from "../../../../router/path-2";
import { useEffect } from "react";

export default function Sidebar() {
	const testId = useGetTestIdParams();
	const navigate = useNavigate();

	const [postNewAttempt, { isLoading, isSuccess, error }] = usePostTestsByTestIdCurrentNewMutation();

	useEffect(() => {
		if (isSuccess) {
			navigate(paths2.candidate.tests.in(testId).DO);
		}
	}, [isSuccess]);

	const handleStartNewQuiz = async () => {
		postNewAttempt({ testId });
	};

	const handleBackToQuestions = () => {
		navigate(paths2.candidate.tests.ROOT);
	};

	const handleViewEvaluated = () => {
		navigate(paths.TEST.evaluate(testId.toString()));
	}

	return (
		<>
			<div className="w-64 ml-4">
				<div>
					<button
						className="w-full px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer"
						onClick={handleStartNewQuiz}
						disabled={isLoading}
					>
						Start a new quiz
					</button>
					<span className="text-sm text-[#39A0AD] mt-2 block">
						{error && "Failed to start a new quiz. Please try again."}
					</span>
				</div>
				<button className="mt-4 w-full px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBackToQuestions}>
					Back to Questions
				</button>
				<div className="mt-4 bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
					<h3 className="text-lg font-bold">Notes</h3>
					<p className="text-sm text-[#39A0AD] mt-2">
						Please read each question carefully and double-check your
						answers. Manage your time wisely, stay calm, and focus on
						accuracy rather than speed. Good luck!
					</p>
				</div>
				<button className="mt-4 w-full border bg-gradient-text text-md font-bold text-white px-6 py-3 rounded-lg cursor-pointer" onClick={handleViewEvaluated}>
					View Evaluated
				</button>
			</div>
		</>
	);
}

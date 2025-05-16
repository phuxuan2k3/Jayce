import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import paths from '../../../../../../../router/paths';
import { GetUserAttemptsByAttemptIdApiResponse } from "../../../../../../../features/tests/legacy/test.api-gen";
import { ListUsersResponse } from "../../../../../../../features/auth/api/auth-profile.api";


// Helper function to format seconds to "xxmyys" format
const formatSecondsToTimeString = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}m${remainingSeconds}s`;
};

export default function Sidebar({
	attemptSummary,
	manager,
}: {
	attemptSummary?: GetUserAttemptsByAttemptIdApiResponse;
	manager?: ListUsersResponse;
}) {
	const navigate = useNavigate();

	function handleBackClick() {
		navigate(paths.candidate.tests.in(attemptSummary?.test.id || "").PRACTICE);
	}

	return (
		<div className="w-full flex flex-col items-center text-primary">
			<div className="py-6 px-8 shadow-primary flex flex-col w-full items-stretch bg-white rounded-lg">
				<div className="text-2xl font-bold text-center">
					Summary
				</div>

				<hr className="border-primary-toned-300 mt-4 mb-6" />

				<div className="flex flex-col items-center gap-1 text-center font-semibold ">
					<div className="text-xl font-bold mb-2">{attemptSummary?.test.title}</div>
					<div>Duration: {attemptSummary?.test.minutesToAnswer} (minutes)</div>
					<div className="text-sm text-gray-500">By: {manager?.users[0].username || "unknown"}</div>
				</div>

				<hr className="border-primary-toned-300 mt-4 mb-6" />

				<div className="flex flex-col items-stretch gap-1 font-semibold [&>div>span]:text-secondary">
					<div className="text-center text-xl font-bold mb-2">Attempt #1</div>
					<div>Score: <span>{attemptSummary?.score}</span></div>
					<div>Total score: <span>{attemptSummary?.totalScore}</span></div>
					<div>Percentage: <span>{attemptSummary && Math.round((attemptSummary.score / attemptSummary.totalScore) * 100)}%</span></div>
					<div>
						Time taken: <span>{attemptSummary?.secondsSpent ? formatSecondsToTimeString(attemptSummary.secondsSpent) : 'none'}</span>
					</div>
					<div>Started at: <span>{attemptSummary && format(new Date(attemptSummary.startDate), "PPp")}</span></div>
				</div>

				<hr className="border-primary-toned-300 mt-4 mb-6" />

				<div className="flex flex-col items-stretch gap-1 font-semibold">
					<div>Total questions: <span className="text-secondary">{attemptSummary?.totalQuestions}</span></div>
					<div>Total correct: <span className="text-green-600">{attemptSummary?.totalCorrectAnswers}</span></div>
					<div>Total incorrect: <span className="text-red-600">{attemptSummary?.totalWrongAnswers}</span></div>
					<div>Total skipped: <span className="text-blue-500">{attemptSummary && (attemptSummary?.totalQuestions - attemptSummary?.totalCorrectAnswers - attemptSummary?.totalWrongAnswers)}</span></div>
				</div>
			</div>

			<button
				className="mt-8 bg-white border-2 border-primary rounded-lg py-2 px-4 text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-300 w-full"
				onClick={handleBackClick}
			>
				Back to attempts
			</button>
		</div>
	)
}

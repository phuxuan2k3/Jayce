import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { AttemptCore } from "../../../../../../../infra-test/core/attempt.model";
import { TestCore } from "../../../../../../../infra-test/core/test.model";
import { useGetSelfAttemptsByAttemptIdAggregateQuery, useGetSelfTestsByTestIdAggregateQuery } from "../../../../../../../features/tests/api/test.api-gen";
import { FetchError } from "../../../../../../../app/server-error";
import paths from "../../../../../../../router/paths";
import { useGetUsersQuery } from "../../../../../../../features/auth/api/auth-profile.api";
import { getUserCore } from "../../../../../../../infra-test/core/user.model";

const AttemptSidebar = ({
	showAnswersAvailable,
	showAnswers,
	setShowAnswers,
	attempt,
	test,
}: {
	showAnswersAvailable: boolean;
	showAnswers: boolean;
	setShowAnswers: (show: boolean) => void;
	attempt: AttemptCore;
	test: TestCore;
}) => {
	const navigate = useNavigate();
	const attemptAggregateQuery = useGetSelfAttemptsByAttemptIdAggregateQuery({
		attemptId: attempt.id
	}, {
		skip: attempt == null
	});

	const testAggregateQuery = useGetSelfTestsByTestIdAggregateQuery({
		testId: attempt.testId
	}, {
		skip: attempt == null
	});

	const usersQuery = useGetUsersQuery({
		user_ids: [test.authorId]
	}, {
		skip: attempt == null
	})

	const loading = attemptAggregateQuery.isLoading || testAggregateQuery.isLoading || usersQuery.isLoading;
	const error = attemptAggregateQuery.error || testAggregateQuery.error || usersQuery.error;
	const attemptAggregate = attemptAggregateQuery.data;
	const testAggregate = testAggregateQuery.data;
	const user = usersQuery.data?.users[0];

	if (loading) return (
		<div className="flex justify-center items-center h-64">
			<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
		</div>
	);
	if (error) throw new FetchError(error);
	if (attemptAggregate == null || testAggregate == null || user == null) return (
		<div className="flex justify-center items-center h-64">
			<div className="bg-white rounded-lg shadow-md p-6 text-center">
				<p className="text-gray-600">No data found for this attempt.</p>
			</div>
		</div>
	);

	const author = getUserCore(user);

	return (
		<div className="sticky top-2 max-h-[96vh] w-full flex flex-col items-center text-primary">
			<div className="py-6 px-8 shadow-primary flex flex-col w-full items-stretch bg-white rounded-lg">
				<div className="text-2xl font-bold text-center">
					Summary
				</div>

				<hr className="border-primary-toned-300 mt-4 mb-6" />

				<div className="flex flex-col items-center gap-1 text-center font-semibold">
					<div className="text-xl font-bold mb-2">{test.title}</div>
					<div>Duration: {test.minutesToAnswer} minutes</div>
					<div className="text-sm text-gray-500">By: {author.fullname}</div>
				</div>

				<hr className="border-primary-toned-300 mt-4 mb-6" />

				<div className="flex flex-col items-stretch gap-1 font-semibold [&>div>span]:text-secondary">
					<div className="text-center text-xl font-bold mb-2">Results</div>
					<div>Score: <span>{attempt.score}%</span></div>
					<div>Questions Answered: <span>{attemptAggregate.answered}/{attemptAggregate.answered}</span></div>
					<div>Correct Answers: <span>{attemptAggregate.answeredCorrect}</span></div>
					<div>
						Time taken: <span>{formatSecondsToTimeString(attempt.secondsSpent)}</span>
					</div>
					<div>Started: <span>{format(new Date(attempt.createdAt), "PPp")}</span></div>
					{attempt.hasEnded && (
						<div>Completed: <span>{format(new Date(attempt.updatedAt), "PPp")}</span></div>
					)}
				</div>
			</div>

			<div className="py-6 px-8 shadow-primary flex flex-col w-full items-stretch bg-white rounded-lg mt-4">
				{showAnswersAvailable ? (
					<button className="mt-8 bg-primary text-white rounded-lg py-2 px-4 font-semibold hover:bg-primary-toned-300 transition-colors duration-300 w-full"
						onClick={() => setShowAnswers(!showAnswers)}
					>
						{showAnswers === false ? "Show Answers" : "Hide Answers"}
					</button>
				) : (
					<div className="text-sm text-gray-500 mt-2">
						You are not allowed to see the answers.
					</div>
				)}

				<button
					className="mt-8 bg-white border-2 border-primary rounded-lg py-2 px-4 text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-300 w-full"
					onClick={() => {
						if (test.mode === "practice") {
							navigate(paths.candidate.tests.in(attempt.testId).PRACTICE);
						}
						else {
							navigate(paths.candidate.tests.in(attempt.testId).EXAM);
						}
					}}
				>
					Back to Tests
				</button>
			</div>
		</div>
	);
};


export default AttemptSidebar;

const formatSecondsToTimeString = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	if (hours > 0) {
		return `${hours}h ${minutes}m ${secs}s`;
	}
	if (minutes > 0) {
		return `${minutes}m ${secs}s`;
	}
	return `${secs}s`;
};
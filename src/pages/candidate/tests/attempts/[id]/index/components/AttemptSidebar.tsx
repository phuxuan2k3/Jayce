import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../../../router/paths";
import { AttemptCoreSchema, TestFullSchema } from "../../../../../../../infra-test/api/test.api-gen-v2";
import UserCard from "../../../../../../../infra-test/ui-shared/UserCard";

export default function AttemptSidebar({
	showAnswersAvailable,
	showAnswers,
	setShowAnswers,
	attempt,
	test,
}: {
	showAnswersAvailable: boolean;
	showAnswers: boolean;
	setShowAnswers: (show: boolean) => void;
	attempt: AttemptCoreSchema;
	test: TestFullSchema;
}) {
	const navigate = useNavigate();
	const { points, answered, answeredCorrect } = attempt._aggregate;
	const { numberOfQuestions, totalPoints } = test._aggregate;

	const getStatusBadge = () => {
		const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
		switch (attempt.status) {
			case "IN_PROGRESS":
				return `${baseClasses} bg-yellow-100 text-yellow-800`;
			case "COMPLETED":
				return `${baseClasses} bg-blue-100 text-blue-800`;
			case "GRADED":
				return `${baseClasses} bg-green-100 text-green-800`;
			default:
				return `${baseClasses} bg-gray-100 text-gray-800`;
		}
	};

	const getScorePercentage = () => {
		return totalPoints > 0 ? Math.round((points / totalPoints) * 100) : 0;
	};

	const getAccuracyPercentage = () => {
		return answered > 0 ? Math.round((answeredCorrect / answered) * 100) : 0;
	};

	return (
		<div className="sticky top-2 max-h-[96vh] w-full flex flex-col gap-4 text-primary">
			{/* Test Info Card */}
			<div className="p-6 shadow-primary bg-white rounded-lg">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-bold text-primary">{test.title}</h3>
					<span className={getStatusBadge()}>{attempt.status}</span>
				</div>

				<div className="space-y-2 text-sm">
					<div className="flex justify-between">
						<span className="text-gray-600">Mode:</span>
						<span className="font-medium capitalize">{test.mode}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Duration:</span>
						<span className="font-medium">{test.minutesToAnswer} min</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Language:</span>
						<span className="font-medium">{test.language}</span>
					</div>
				</div>

				<UserCard userId={test.authorId} />
			</div>

			{/* Attempt Results Card */}
			<div className="p-6 shadow-primary bg-white rounded-lg">
				<h3 className="text-lg font-bold text-primary mb-4">Attempt Results</h3>

				{/* Score Overview */}
				<div className="mb-4 p-3 bg-gray-50 rounded-lg">
					<div className="flex justify-between items-center mb-2">
						<span className="text-sm text-gray-600">Score</span>
						<span className="text-lg font-bold text-primary">{getScorePercentage()}%</span>
					</div>
					<div className="text-xs text-gray-500">
						{points} / {totalPoints} points
					</div>
				</div>

				{/* Progress Stats */}
				<div className="space-y-3 text-sm">
					<div className="flex justify-between">
						<span className="text-gray-600">Questions answered:</span>
						<span className="font-medium">{answered} / {numberOfQuestions}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Accuracy:</span>
						<span className="font-medium">{getAccuracyPercentage()}%</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Time spent:</span>
						<span className="font-medium">{formatSecondsToTimeString(attempt.secondsSpent)}</span>
					</div>
				</div>

				{/* Timestamps */}
				<div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-500">
					<div>Started: {format(new Date(attempt.createdAt), "MMM dd, yyyy 'at' HH:mm")}</div>
					{attempt.status === "GRADED" && (
						<div>Completed: {format(new Date(attempt.updatedAt), "MMM dd, yyyy 'at' HH:mm")}</div>
					)}
				</div>
			</div>

			{/* Actions Card */}
			<div className="p-6 shadow-primary bg-white rounded-lg">
				{showAnswersAvailable ? (
					<button
						className="w-full mb-3 bg-primary text-white rounded-lg py-2 px-4 font-semibold hover:bg-primary-toned-300 transition-colors duration-300"
						onClick={() => setShowAnswers(!showAnswers)}
					>
						{showAnswers ? "Hide Answers" : "Show Answers"}
					</button>
				) : (
					<div className="text-sm text-gray-500 mb-3 text-center p-2 bg-gray-50 rounded">
						Answers not available for viewing
					</div>
				)}

				<button
					className="w-full bg-white border-2 border-primary rounded-lg py-2 px-4 text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
					onClick={() => {
						if (test.mode === "PRACTICE") {
							navigate(paths.candidate.tests.in(attempt.testId).PRACTICE);
						} else {
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
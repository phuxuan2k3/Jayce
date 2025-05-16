import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import MyPagination from "../../../../../../components/ui/common/MyPagination";
import RightLayoutTemplate from "../../../../../../components/layouts/RightLayoutTemplate";
import useGetAttemptIdParams from "../../../../../../features/tests/hooks/useGetAttemptIdParams";
import paths from "../../../../../../router/paths";

// Mock attempt data
const mockAttempt = {
	id: "attempt-1",
	order: 1,
	hasEnded: true,
	secondsSpent: 1245, // 20m 45s
	candidate: {
		id: "user-1",
		name: "John Doe",
		avatar: "/defaults/avatar.png"
	},
	test: {
		id: "123",
		title: "Frontend Development Fundamentals",
		description: "Test your knowledge of modern frontend development frameworks and practices",
		minutesToAnswer: 30,
		language: "en",
		mode: "practice",
		author: {
			id: "author-1",
			name: "Jane Smith",
			avatar: "/defaults/avatar.png"
		},
		createdAt: "2025-04-25T12:00:00Z",
		updatedAt: "2025-04-25T12:00:00Z"
	},
	createdAt: "2025-05-07T14:30:00Z",
	updatedAt: "2025-05-07T15:05:00Z"
};

// Mock aggregate data
const mockAggregate = {
	score: 75,
	answered: 15,
	answeredCorrect: 12,
	total: 20
};

// Mock answers data 
const mockAnswers = [
	{
		attemptId: "attempt-1",
		questionId: 1,
		points: 10,
		text: "What is the Virtual DOM in React?",
		options: [
			"A virtual representation of the HTML DOM in memory",
			"A browser extension for debugging",
			"A database for storing React components",
			"A type of React component"
		],
		correctOption: 0,
		chosenOption: 0 // Correct answer
	},
	{
		attemptId: "attempt-1",
		questionId: 2,
		points: 5,
		text: "Which hook is used to perform side effects in React function components?",
		options: [
			"useState",
			"useEffect",
			"useContext",
			"useReducer"
		],
		correctOption: 1,
		chosenOption: 1 // Correct answer
	},
	{
		attemptId: "attempt-1",
		questionId: 3,
		points: 5,
		text: "Which is NOT a feature of TypeScript?",
		options: [
			"Static typing",
			"Interfaces",
			"Automatic memory management",
			"Generics"
		],
		correctOption: 2,
		chosenOption: 3 // Incorrect answer
	},
	{
		attemptId: "attempt-1",
		questionId: 4,
		points: 10,
		text: "What is the purpose of Redux in a React application?",
		options: [
			"To create responsive layouts",
			"To manage global state",
			"To optimize performance",
			"To handle routing"
		],
		correctOption: 1,
		chosenOption: null // Not answered
	},
	{
		attemptId: "attempt-1",
		questionId: 5,
		points: 10,
		text: "Which CSS property is used to create a flexible box layout?",
		options: [
			"position",
			"display: block",
			"display: flex",
			"float"
		],
		correctOption: 2,
		chosenOption: 2 // Correct answer
	}
];

// Attempt Summary Sidebar component
const AttemptSidebar = ({
	attempt,
	aggregate
}: {
	attempt: typeof mockAttempt,
	aggregate: typeof mockAggregate
}) => {
	const navigate = useNavigate();

	// Helper function to format seconds to "XmYs" format
	const formatSecondsToTimeString = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}m ${remainingSeconds}s`;
	};

	const handleBackToAttempts = () => {
		navigate(paths.candidate.tests.in(attempt.test.id).PRACTICE);
	};

	return (
		<div className="w-full flex flex-col items-center text-primary">
			<div className="py-6 px-8 shadow-primary flex flex-col w-full items-stretch bg-white rounded-lg">
				<div className="text-2xl font-bold text-center">
					Attempt Summary
				</div>

				<hr className="border-primary-toned-300 mt-4 mb-6" />

				<div className="flex flex-col items-center gap-1 text-center font-semibold">
					<div className="text-xl font-bold mb-2">{attempt.test.title}</div>
					<div>Duration: {attempt.test.minutesToAnswer} minutes</div>
					<div className="text-sm text-gray-500">By: {attempt.test.author.name}</div>
				</div>

				<hr className="border-primary-toned-300 mt-4 mb-6" />

				<div className="flex flex-col items-stretch gap-1 font-semibold [&>div>span]:text-secondary">
					<div className="text-center text-xl font-bold mb-2">Results</div>
					<div>Score: <span>{aggregate.score}%</span></div>
					<div>Questions Answered: <span>{aggregate.answered}/{aggregate.total}</span></div>
					<div>Correct Answers: <span>{aggregate.answeredCorrect}</span></div>
					<div>
						Time taken: <span>{formatSecondsToTimeString(attempt.secondsSpent)}</span>
					</div>
					<div>Started: <span>{format(new Date(attempt.createdAt), "PPp")}</span></div>
					{attempt.hasEnded && (
						<div>Completed: <span>{format(new Date(attempt.updatedAt), "PPp")}</span></div>
					)}
				</div>
			</div>

			<button
				className="mt-8 bg-white border-2 border-primary rounded-lg py-2 px-4 text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-300 w-full"
				onClick={handleBackToAttempts}
			>
				Back to Attempts
			</button>
		</div>
	);
};

// Question Answer Card component
const AnswerCard = ({ answer, index }: { answer: typeof mockAnswers[0], index: number }) => {
	const isCorrect = answer.chosenOption === answer.correctOption;
	const notAnswered = answer.chosenOption === null || answer.chosenOption === undefined;

	return (
		<div className="bg-white rounded-lg shadow-md p-6 mb-6">
			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center">
					<span className="font-bold text-gray-900 mr-2">Question {index + 1}</span>
					<span className={`px-2 py-1 text-xs font-semibold rounded-full ${notAnswered
						? "bg-gray-100 text-gray-600"
						: isCorrect
							? "bg-green-100 text-green-800"
							: "bg-red-100 text-red-800"
						}`}>
						{notAnswered ? "Not Answered" : isCorrect ? "Correct" : "Incorrect"}
					</span>
				</div>
				<span className="text-primary font-bold">{answer.points} points</span>
			</div>

			<div className="text-gray-800 mb-4 font-medium">{answer.text}</div>

			<div className="space-y-2">
				{answer.options.map((option, optIndex) => (
					<div
						key={optIndex}
						className={`p-3 border rounded-lg flex items-center ${optIndex === answer.correctOption
							? "bg-green-50 border-green-200"
							: optIndex === answer.chosenOption && optIndex !== answer.correctOption
								? "bg-red-50 border-red-200"
								: "border-gray-200"
							}`}
					>
						<div className="mr-3 flex-shrink-0">
							<div className={`w-6 h-6 flex items-center justify-center rounded-full border ${optIndex === answer.chosenOption
								? "bg-primary text-white border-primary"
								: "border-gray-300"
								}`}>
								{String.fromCharCode(65 + optIndex)}
							</div>
						</div>
						<div className="flex-grow">{option}</div>
						{optIndex === answer.correctOption && (
							<div className="ml-2 text-green-600 font-semibold text-sm">
								Correct Answer
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default function CandidateAttemptPage() {
	const [page, setPage] = useState(1);
	const perPage = 5;

	// Use mock data instead of API fetching
	const attempt = mockAttempt;
	const aggregate = mockAggregate;
	const answersData = mockAnswers;
	const isLoading = false;

	// Calculate pagination
	const paginatedAnswers = answersData.slice((page - 1) * perPage, page * perPage);
	const totalPages = Math.ceil(answersData.length / perPage);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<RightLayoutTemplate
			header={{
				title: attempt ? `Attempt Details: ${attempt.test.title}` : "Loading Attempt...",
				description: attempt ? `Taken on ${format(new Date(attempt.createdAt), "MMMM d, yyyy")}` : "",
			}}
			right={
				<AttemptSidebar
					attempt={attempt}
					aggregate={aggregate}
				/>
			}
		>
			<div className="w-full p-4">
				{isLoading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
					</div>
				) : !paginatedAnswers || paginatedAnswers.length === 0 ? (
					<div className="bg-white rounded-lg shadow-md p-6 text-center">
						<p className="text-gray-600">No answers found for this attempt.</p>
					</div>
				) : (
					<>
						<div className="mb-4">
							<h2 className="text-xl font-bold text-gray-800">
								Your Answers {page > 1 ? `(Page ${page})` : ""}
							</h2>
							{attempt && attempt.hasEnded ? (
								<p className="text-sm text-gray-600">
									This attempt was completed on {format(new Date(attempt.updatedAt), "MMM d, yyyy")} and can't be modified.
								</p>
							) : (
								<p className="text-sm text-primary">
									This attempt is still in progress. You can continue taking the test.
								</p>
							)}
						</div>

						<div className="space-y-6">
							{paginatedAnswers.map((answer, index) => (
								<AnswerCard
									key={answer.questionId}
									answer={answer}
									index={(page - 1) * perPage + index}
								/>
							))}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="mt-6 flex justify-center">
								<MyPagination
									totalPage={totalPages}
									onPageChange={handlePageChange}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</RightLayoutTemplate>
	);
}
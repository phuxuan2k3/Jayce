import { useState } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import NewLeftLayoutTemplate from "../../../../../components/layouts/NewLeftLayoutTemplate";
import { authSelectors } from "../../../../../features/auth/store/authSlice";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import SidebarActions from "../../../../../features/tests/ui2/SidebarActions";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";
import { QuestionCore } from "../../../../../features/tests/model/question.model";
import { TestPractice } from "../../../../../features/tests/model/test.model";
import {
	TestInfoCard,
	OngoingAttemptCard,
	CompletedAttemptsList,
	AttemptPagination,
	TabsComponent,
	AttemptsTabContent,
	QuestionsTabContent,
	FeedbackTabContent
} from "./components";

// Mock test data
const mockTest = {
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
	updatedAt: "2025-04-25T12:00:00Z",
	// TestPractice specific properties
	difficulty: 3,
	tags: ["React", "TypeScript", "Frontend Development", "Modern JavaScript"],
	numberOfQuestions: 8,
	numberOfOptions: 4,
	outlines: ["Component Lifecycle", "React Hooks", "TypeScript Integration", "State Management", "CSS-in-JS"],
	feedback: {
		rating: 7,
		comment: "Good test overall, but some questions could be more challenging.",
		problems: "incomplete"
	}
};

// Mock attempts data
const mockAttempts = {
	page: 1,
	perPage: 10,
	total: 5,
	totalPages: 1,
	data: [
		{
			id: "attempt-1",
			order: 1,
			hasEnded: true,
			secondsSpent: 1245, // 20m 45s
			candidate: {
				id: "user-1",
				name: "John Doe",
				avatar: "/defaults/avatar.png"
			},
			test: { ...mockTest },
			createdAt: "2025-05-07T14:30:00Z", // Yesterday
			updatedAt: "2025-05-07T15:05:00Z"
		},
		{
			id: "attempt-2",
			order: 2,
			hasEnded: true,
			secondsSpent: 980, // 16m 20s
			candidate: {
				id: "user-1",
				name: "John Doe",
				avatar: "/defaults/avatar.png"
			},
			test: { ...mockTest },
			createdAt: "2025-05-06T10:15:00Z", // 2 days ago
			updatedAt: "2025-05-06T10:35:00Z"
		},
		{
			id: "attempt-3",
			order: 3,
			hasEnded: false,
			secondsSpent: 450, // 7m 30s
			candidate: {
				id: "user-1",
				name: "John Doe",
				avatar: "/defaults/avatar.png"
			},
			test: { ...mockTest },
			createdAt: "2025-05-08T09:00:00Z", // Today
			updatedAt: "2025-05-08T09:07:30Z"
		},
		{
			id: "attempt-4",
			order: 4,
			hasEnded: true,
			secondsSpent: 1800, // Full 30 mins
			candidate: {
				id: "user-1",
				name: "John Doe",
				avatar: "/defaults/avatar.png"
			},
			test: { ...mockTest },
			createdAt: "2025-05-01T16:20:00Z", // A week ago
			updatedAt: "2025-05-01T16:50:00Z"
		},
		{
			id: "attempt-5",
			order: 5,
			hasEnded: true,
			secondsSpent: 1100, // 18m 20s
			candidate: {
				id: "user-1",
				name: "John Doe",
				avatar: "/defaults/avatar.png"
			},
			test: { ...mockTest },
			createdAt: "2025-04-29T11:45:00Z", // ~10 days ago
			updatedAt: "2025-04-29T12:03:20Z"
		}
	]
};

// Mock questions data
const mockQuestions: QuestionCore[] = [
	{
		id: 1,
		testId: 123,
		text: "Which of the following is NOT a React Hook?",
		options: [
			"useState",
			"useEffect",
			"useHistory",
			"useReactState"
		],
		points: 3,
		correctOption: 3
	},
	{
		id: 2,
		testId: 123,
		text: "What does JSX stand for?",
		options: [
			"JavaScript XML",
			"JavaScript Extension",
			"JavaScript Syntax",
			"Java Serialized XML"
		],
		points: 2,
		correctOption: 0
	},
	{
		id: 3,
		testId: 123,
		text: "Which CSS property is used to create space between elements?",
		options: [
			"space",
			"margin",
			"padding",
			"gap"
		],
		points: 2,
		correctOption: 1
	},
	{
		id: 4,
		testId: 123,
		text: "What is the purpose of the 'key' prop in React lists?",
		options: [
			"To style list items uniquely",
			"To encrypt data in the list",
			"To help React identify which items have changed",
			"To set the tab order of list items"
		],
		points: 3,
		correctOption: 2
	},
	{
		id: 5,
		testId: 123,
		text: "Which of the following is true about the Virtual DOM?",
		options: [
			"It's slower than the real DOM",
			"It's a complete copy of the real DOM",
			"It's a lightweight JavaScript representation of the DOM",
			"It requires special browser support"
		],
		points: 3,
		correctOption: 2
	},
	{
		id: 6,
		testId: 123,
		text: "What is the correct way to pass a prop called 'name' to a component?",
		options: [
			"<Component name={name} />",
			"<Component name=\"name\" />",
			"<Component {name} />",
			"<Component props.name={name} />"
		],
		points: 2,
		correctOption: 0
	},
	{
		id: 7,
		testId: 123,
		text: "Which tool is commonly used for state management in large React applications?",
		options: [
			"React Router",
			"React Helmet",
			"Redux",
			"React Query"
		],
		points: 2,
		correctOption: 2
	},
	{
		id: 8,
		testId: 123,
		text: "What is the main advantage of using TypeScript with React?",
		options: [
			"It makes your app run faster",
			"It provides better type safety",
			"It reduces the bundle size",
			"It provides built-in state management"
		],
		points: 3,
		correctOption: 1
	}
];

export default function CandidateTestPage() {
	const testId = useGetTestIdParams();
	const userId = useAppSelector(authSelectors.selectUserId);
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const perPage = 10;

	// Use mock data instead of API fetching
	const test = mockTest as unknown as TestPractice;
	const attempts = mockAttempts;
	const questions = mockQuestions;
	const isLoading = false;

	// Find ongoing attempt (there can only be one)
	const ongoingAttempt = attempts?.data.find(attempt => !attempt.hasEnded);
	// Filter completed attempts
	const completedAttempts = attempts?.data.filter(attempt => attempt.hasEnded) || [];

	// Format time function
	const formatSeconds = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}m ${remainingSeconds}s`;
	};

	// Navigate to attempt details
	const handleViewAttempt = (attemptId: string) => {
		navigate(paths.candidate.tests.attempts.in(attemptId).ROOT);
	};

	// Continue with existing attempt
	const handleContinueAttempt = (attemptId: string) => {
		navigate(paths.candidate.tests.in(attemptId).DO);
	};

	// Start new attempt
	const handleStartNewAttempt = () => {
		navigate(paths.candidate.tests.in(testId).DO);
	};

	// Handle feedback changes
	const handleFeedbackChange = (feedback: TestPractice['feedback']) => {
		console.log('Feedback updated:', feedback);
		// In a real app, you would call an API to save the feedback
		// For now, we'll just log it to the console
		alert('Thank you for your feedback!');
	};

	// Using the AttemptsTabContent component
	const attemptsTabContent = (
		<AttemptsTabContent
			isLoading={isLoading}
			attempts={attempts}
			page={page}
			perPage={perPage}
			formatSeconds={formatSeconds}
			onViewAttempt={handleViewAttempt}
			onContinueAttempt={handleContinueAttempt}
			onStartNewAttempt={handleStartNewAttempt}
			setPage={setPage}
		/>
	);

	// Check if user has any attempts (completed or ongoing)
	const hasAttempts = attempts?.data.length > 0;

	const questionsTabContent = (
		<QuestionsTabContent
			isLoading={isLoading}
			questions={questions}
			testTitle={test.title}
			hasAttempts={hasAttempts}
		/>
	);

	// Using the FeedbackTabContent component
	const feedbackTabContent = (
		<FeedbackTabContent
			isLoading={isLoading}
			test={test}
			onFeedbackChange={handleFeedbackChange}
		/>
	);

	// Define tabs
	const tabs = [
		{
			id: "attempts",
			label: "Attempts",
			content: attemptsTabContent
		},
		{
			id: "questions",
			label: "Questions",
			content: questionsTabContent
		},
		{
			id: "feedback",
			label: "Feedback",
			content: feedbackTabContent
		}
	];

	return (
		<NewLeftLayoutTemplate
			header={
				<NewLeftLayoutTemplate.Header
					title={test ? test.title : "Test Attempts"}
					description={test ? `View your attempts for ${test.title}` : "View your test attempts and their results."}
				/>
			}
			left={<SidebarActions />}
		>
			<div className="flex flex-col gap-8">
				{attempts && attempts.data.length > 0 && (
					<TestInfoCard test={test} />
				)}

				{/* Attempts List Section */}
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between mb-2">
						<h2 className="text-xl font-bold">Your Attempts</h2>
						{!ongoingAttempt && (
							<button
								className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
								onClick={handleStartNewAttempt}
							>
								Take New Test
							</button>
						)}
					</div>

					<TabsComponent tabs={tabs} defaultTabId="attempts" />
				</div>
			</div>
		</NewLeftLayoutTemplate>
	);
}
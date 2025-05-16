import { useState } from "react";
import NewLeftLayoutTemplate from "../../../../../components/layouts/NewLeftLayoutTemplate";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";
import { PracticeCore } from "../../../../../features/tests/model/test.model";
import {
	PracticeInfoCard
	AttemptsTabContent,
	QuestionsTabContent,
	FeedbackTabContent
} from "./components";
import usePracticePage from "./hooks/usePracticePage";
import TabsComponent from "./components/ui/TabsComponent";

export default function CandidateTestPage() {
	const navigate = useNavigate();
	const { data: { practice } } = usePracticePage();


	const [page, setPage] = useState(1);
	const perPage = 10;


	// Find ongoing attempt (there can only be one)
	const ongoingAttempt = attempts?.data.find(attempt => !attempt.hasEnded);
	// Filter completed attempts
	const completedAttempts = attempts?.data.filter(attempt => attempt.hasEnded) || [];

	// Format time function

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
	const handleFeedbackChange = (feedback: PracticeCore['feedback']) => {
		console.log('Feedback updated:', feedback);
		// In a real app, you would call an API to save the feedback
		// For now, we'll just log it to the console
		alert('Thank you for your feedback!');
	};

	// Using the AttemptsTabContent component
	const attemptsTabContent = (
		<AttemptsTabContent />
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
					title={practice ? practice.title : "Test Attempts"}
					description={practice ? `View your attempts for ${practice.title}` : "View your test attempts and their results."}
				/>
			}
			left={<></>}
		>
			<div className="flex flex-col gap-8">
				<PracticeInfoCard />

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
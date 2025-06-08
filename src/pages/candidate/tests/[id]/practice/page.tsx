import { useNavigate } from "react-router-dom";
import NewLeftLayoutTemplate from "../../../../../components/layouts/NewLeftLayoutTemplate";
import AttemptsContent from "../common/components/test-details/AttemptsTabContent";
import TestInfoCard from "../common/components/test-details/TestInfoCard";
import TabsComponent from "../common/components/test-details/TestTabsComponent";
import FeedbackTabContent from "./components/FeedbackTabContent";
import QuestionsTabContent from "./components/QuestionsTabContent";
import usePracticeAttempts from "./hooks/usePracticeAttempts";
import usePracticePage from "./hooks/usePracticePage";
import paths from "../../../../../router/paths";
import OngoingAttemptCard from "../common/components/test-details/OngoingAttemptCard";
import SidebarActions from "../../../../../infra-test/ui/sidebar/primitive/SidebarActions";
import { useCallback } from "react";
import { useGetCurrentTestsByTestIdQuery, usePostPracticesByTestIdAttemptsStartMutation } from "../common/apis/attempts.api-enhance";
import useGetTestIdParams from "../../../../../infra-test/hooks/useGetTestIdParams";

export default function CandidatePracticePage() {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const [startAttempt] = usePostPracticesByTestIdAttemptsStartMutation();
	const { data: currentAttempt } = useGetCurrentTestsByTestIdQuery({ testId });

	const { data: {
		practice,
		author,
	}, isLoading } = usePracticePage();

	const {
		totalPages,
		attempts,
		isLoading: isLoadingAttempts,
		filter,
		setFilter,
	} = usePracticeAttempts();

	const handleStartNewAttempt = useCallback(async () => {
		try {
			await startAttempt({ testId }).unwrap();
			navigate(paths.candidate.tests.in(testId).TAKE_PRACTICE);
		} catch (error) {
			console.error("Error starting attempt:", error);
			throw error;
		}
	}, [startAttempt, testId, navigate]);

	// Define tabs
	const tabs = [
		{
			id: "attempts",
			label: "Attempts",
			content: <AttemptsContent
				totalPages={totalPages}
				attempts={attempts}
				isLoading={isLoadingAttempts}
				filter={filter}
				setFilter={setFilter}
				onStartAttempt={handleStartNewAttempt}
			/>
		},
		{
			id: "questions",
			label: "Questions",
			content: <QuestionsTabContent />
		},
		{
			id: "feedback",
			label: "Feedback",
			content: <FeedbackTabContent />
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
			left={<SidebarActions>
				<SidebarActions.YourTests />
				<SidebarActions.BrowseTemplates />
				<SidebarActions.JoinTest />
			</SidebarActions>}
		>
			<div className="flex flex-col gap-8">
				<TestInfoCard
					author={author}
					test={practice}
					isLoading={isLoading}
				/>

				{/* Ongoing Attempt */}
				{currentAttempt && (
					<OngoingAttemptCard
						attempt={currentAttempt}
						onContinue={() => navigate(paths.candidate.tests.in(testId).TAKE_PRACTICE)}
					/>
				)}

				{/* Attempts List Section */}
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between mb-2">
						<h2 className="text-xl font-bold">Details</h2>
						{currentAttempt == null && (
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
		</NewLeftLayoutTemplate >
	);
}
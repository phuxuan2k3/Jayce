import { useNavigate } from "react-router-dom";
import NewLeftLayoutTemplate from "../../../../../components/layouts/NewLeftLayoutTemplate";
import DefaultSidebarActions from "../../../../../features/tests/ui2/sidebar/DefaultSidebar";
import AttemptsContent from "../common/components/test-details/AttemptsTabContent";
import TestInfoCard from "../common/components/test-details/TestInfoCard";
import TabsComponent from "../common/components/test-details/TestTabsComponent";
import FeedbackTabContent from "./components/FeedbackTabContent";
import QuestionsTabContent from "./components/QuestionsTabContent";
import usePracticeAttempts from "./hooks/usePracticeAttempts";
import usePracticePage from "./hooks/usePracticePage";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import paths from "../../../../../router/paths";
import OngoingAttemptCard from "../common/components/test-details/OngoingAttemptCard";

export default function CandidatePracticePage() {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();

	const { data: {
		practice,
		currentAttempt,
		author,
	}, isLoading } = usePracticePage();

	const {
		totalPages,
		attempts,
		isLoading: isLoadingAttempts,
		filter,
		setFilter,
	} = usePracticeAttempts();

	const handleStartNewAttempt = () => {
		navigate(paths.candidate.tests.in(testId).TAKE_PRACTICE);
	};

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
			left={<DefaultSidebarActions />}
		>
			<div className="flex flex-col gap-8">
				<TestInfoCard
					author={author}
					test={practice}
					isLoading={isLoading}
				/>

				{/* Ongoing Attempt */}
				{currentAttempt && (
					<div className="bg-white shadow-md rounded-lg p-6">
						<h3 className="text-lg font-semibold mb-3">Ongoing Attempt</h3>
						<p className="text-gray-600 mb-4">You have an ongoing attempt for this test.</p>
						<OngoingAttemptCard
							attempt={currentAttempt}
							onContinue={() => navigate(paths.candidate.tests.in(testId).TAKE_PRACTICE)}
						/>
						<button
							className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
							onClick={() => navigate(paths.candidate.tests.attempts.in(currentAttempt.id).ROOT)}
						>
							Continue Attempt
						</button>
					</div>
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
		</NewLeftLayoutTemplate>
	);
}
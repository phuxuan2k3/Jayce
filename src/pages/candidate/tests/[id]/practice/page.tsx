import NewLeftLayoutTemplate from "../../../../../components/layouts/NewLeftLayoutTemplate";
import DefaultSidebarActions from "../../../../../features/tests/ui2/sidebar/DefaultSidebar";
import {
	PracticeInfoCard,
	AttemptsTabContent,
	QuestionsTabContent,
	FeedbackTabContent
} from "./components";
import TabsComponent from "./components/ui/TabsComponent";
import usePracticePage from "./hooks/usePracticePage";

export default function CandidatePracticePage() {
	const { data: {
		practice,
		currentAttempt,
		author,
	}, isLoading } = usePracticePage();

	const handleStartNewAttempt = () => {
		// navigate(paths.candidate.tests.in(testId).DO);
	};

	// Define tabs
	const tabs = [
		{
			id: "attempts",
			label: "Attempts",
			content: <AttemptsTabContent />
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
				<PracticeInfoCard
					author={author}
					test={practice}
					isLoading={isLoading}
				/>

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
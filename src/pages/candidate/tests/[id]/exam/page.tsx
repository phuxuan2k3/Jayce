import { useNavigate } from "react-router-dom";
import NewLeftLayoutTemplate from "../../../../../components/layouts/NewLeftLayoutTemplate";
import DefaultSidebarActions from "../../../../../features/tests/ui2/sidebar/DefaultSidebar";
import AttemptsTabContent from "../common/components/AttemptsTabContent";
import TabsComponent from "../common/components/TestTabsComponent";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import useExamSelfAttempts from "./hooks/useExamSelfAttempts";
import useExam from "./hooks/useExam";
import TestInfoCard from "../common/components/TestInfoCard";
import OngoingAttemptCard from "../common/components/OngoingAttemptCard";
import paths from "../../../../../router/paths";
import ConfigurationTabContent from "./components/ConfigurationTabContent";

export default function CandidateTestExamPage() {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();

	const {
		data: {
			exam,
			author,
			currentAttempt,
			attemptsAggregate,
			isAllowedToSeeOtherResults,
		},
		isLoading,
	} = useExam(testId);

	const {
		filter,
		setFilter,
		data: {
			attempts,
			totalPages,
		},
		isLoading: isLoadingAttempts,
	} = useExamSelfAttempts(testId);

	const handleStartNewAttempt = () => {
		navigate(paths.candidate.tests.in(testId).TAKE_EXAM);
	}

	// Define tabs
	const tabs = [
		{
			id: "attempts",
			label: "Attempts",
			content: <AttemptsTabContent
				attempts={attempts}
				isLoading={isLoadingAttempts}
				totalPages={totalPages}
				filter={filter}
				setFilter={setFilter}
			/>
		},
		{
			id: "configuration",
			label: "Configuration",
			content: <ConfigurationTabContent
				examData={exam}
				attemptsAggregate={attemptsAggregate}
			/>
		},
		...(isAllowedToSeeOtherResults ? [
			{
				id: "others",
				label: "Others' Attempts",
				content: <div>Others</div>
			}
		] : []),
	];

	return (
		<NewLeftLayoutTemplate
			header={
				<NewLeftLayoutTemplate.Header
					title={exam ? exam.title : "Test Attempts"}
					description={exam ? `View your attempts for ${exam.title}` : "View your test attempts and their results."}
				/>
			}
			left={<DefaultSidebarActions />}
		>
			<div className="flex flex-col gap-8">
				<TestInfoCard
					author={author}
					test={exam}
					isLoading={isLoading}
				/>

				{/* Ongoing Attempt */}
				{currentAttempt && (
					<OngoingAttemptCard
						attempt={currentAttempt}
						onContinue={() => navigate(paths.candidate.tests.in(testId).TAKE_EXAM)}
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
		</NewLeftLayoutTemplate>
	);
}
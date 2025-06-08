import { useNavigate } from "react-router-dom";
import NewLeftLayoutTemplate from "../../../../../components/layouts/NewLeftLayoutTemplate";
import AttemptsTabContent from "../common/components/test-details/AttemptsTabContent";
import TabsComponent from "../common/components/test-details/TestTabsComponent";
import useExamSelfAttempts from "./hooks/useExamSelfAttempts";
import useExam from "./hooks/useExam";
import TestInfoCard from "../common/components/test-details/TestInfoCard";
import OngoingAttemptCard from "../common/components/test-details/OngoingAttemptCard";
import paths from "../../../../../router/paths";
import ConfigurationTabContent from "./components/ConfigurationTabContent";
import ParticipantsTabContent from "./components/ParticipantsTabContent";
import { useGetCurrentTestsByTestIdQuery, usePostExamsByTestIdAttemptsStartMutation } from "../common/apis/attempts.api-enhance";
import { useCallback } from "react";
import useGetTestIdParams from "../../../../../infra-test/hooks/useGetTestIdParams";
import DefaultSidebarActions from "../../../../../infra-test/ui/sidebar/candidate/DefaultSidebar";

export default function CandidateTestExamPage() {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const [startAttempt] = usePostExamsByTestIdAttemptsStartMutation();
	const { data: currentAttempt } = useGetCurrentTestsByTestIdQuery({ testId });

	const {
		data: {
			exam,
			author,
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

	const handleStartNewAttempt = useCallback(async () => {
		try {
			await startAttempt({ testId }).unwrap();
			navigate(paths.candidate.tests.in(testId).TAKE_EXAM);
		}
		catch (error) {
			console.error("Error starting attempt:", error);
			throw error;
		}
	}, [startAttempt, testId, navigate]);

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
				onStartAttempt={handleStartNewAttempt}
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
		{
			id: "participants",
			label: "Participants",
			content: <ParticipantsTabContent
				testId={testId}
				isAllowedToSeeOtherResults={isAllowedToSeeOtherResults}
			/>
		},
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
import LeftLayoutTemplate from "../../../../../components/layouts/LeftLayoutTemplate";
import TabsComponent from "../../../../../infra-test/ui/TabsComponent";
import FeedbackTabContent from "./components/FeedbackTabContent";
import SidebarActions from "../../../../../infra-test/ui/sidebar/primitive/SidebarActions";
import useGetTestIdParams from "../../../../../infra-test/hooks/useGetTestIdParams";
import { TestFullSchema, useGetTestsByTestIdQuery } from "../../../../../infra-test/api/test.api-gen-v2";
import FetchStateCover2 from "../../../../../infra-test/ui/fetch-states/FetchStateCover2";
import TestFullCard from "../../../../../infra-test/ui-items/test/TestFullCard";
import AttemptsTab from "../../../../../infra-test/ui-shared/attempts-tab";
import QuestionsTabContent from "./components/QuestionsTabContent";
import CurrentAttemptCard from "../../../../../infra-test/ui-shared/test-pages/CurrentAttemptCard";
import { useCallback } from "react";
import useGetUserId from "../../../../../infra-test/hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";

export default function CandidatePracticePage() {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const testQuery = useGetTestsByTestIdQuery({ testId });
	const userId = useGetUserId();

	const tabs = useCallback((test: TestFullSchema) => [
		{
			id: "attempts",
			label: "Attempts",
			content: <AttemptsTab
				onAttemptClick={(attempt) => navigate(paths.candidate.tests.in(testId).attempts.in(attempt.id).ROOT)}
				candidateId={userId}
			/>
		},
		{
			id: "questions",
			label: "Questions",
			content: <QuestionsTabContent numberOfAttempts={test._aggregate.totalAttempts} />
		},
		{
			id: "feedback",
			label: "Feedback",
			content: <FeedbackTabContent />
		}
	], []);

	return (
		<FetchStateCover2
			fetchState={testQuery}
			dataComponent={(test) => (
				<LeftLayoutTemplate
					header={
						<LeftLayoutTemplate.Header
							title={test.title}
							description={test.description}
						/>
					}
					left={<SidebarActions>
						<SidebarActions.YourTests />
						<SidebarActions.BrowseTemplates />
						<SidebarActions.JoinTest />
					</SidebarActions>}
				>
					<div className="flex flex-col gap-8">
						<div className="flex flex-col gap-6">
							<TestFullCard test={test} />
							<CurrentAttemptCard />
						</div>

						<div className="flex flex-col gap-4">
							<h2 className="text-xl font-bold">Details</h2>
							<TabsComponent tabs={tabs(test)} defaultTabId="attempts" />
						</div>
					</div>
				</LeftLayoutTemplate >
			)}
		/>
	);
}
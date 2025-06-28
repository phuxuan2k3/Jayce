import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";
import LeftLayoutTemplate from "../../../../../components/layouts/LeftLayoutTemplate";
import { useGetTestsByTestIdQuery, TestFullSchema } from "../../../../../features/tests/api/test.api-gen-v2";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import useGetUserId from "../../../../../features/tests/hooks/useGetUserId";
import TestFullCard from "../../../../../features/tests/ui-items/test/TestFullCard";
import AttemptsTab from "../../../../../features/tests/ui-shared/test-pages/attempts-tab";
import CurrentAttemptCard from "../../../../../features/tests/ui-shared/test-pages/CurrentAttemptCard";
import FetchStateCover2 from "../../../../../features/tests/ui/fetch-states/FetchStateCover2";
import MyTabs from "../../../../../features/tests/ui/MyTabs";
import SidebarActions from "../../../../../features/tests/ui/sidebar/primitive/SidebarActions";
import FeedbackTabContent from "./components/FeedbackTabContent";
import QuestionsTabContent from "./components/QuestionsTabContent";

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
							<MyTabs tabs={tabs(test)} defaultTabId="attempts" />
						</div>
					</div>
				</LeftLayoutTemplate >
			)}
		/>
	);
}
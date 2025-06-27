import LeftLayoutTemplate from "../../../../../components/layouts/LeftLayoutTemplate";
import TabsComponent from "../../../../../infra-test/ui/TabsComponent";
import ParticipantsTab from "../../../../../infra-test/ui-shared/participants-tab";
import useGetTestIdParams from "../../../../../infra-test/hooks/useGetTestIdParams";
import DefaultSidebarActions from "../../../../../infra-test/ui/sidebar/candidate/DefaultSidebar";
import AttemptsTab from "../../../../../infra-test/ui-shared/attempts-tab";
import { TestFullSchema, useGetTestsByTestIdQuery } from "../../../../../infra-test/api/test.api-gen-v2";
import FetchStateCover2 from "../../../../../infra-test/ui/fetch-states/FetchStateCover2";
import TestFullCard from "../../../../../infra-test/ui-items/test/TestFullCard";
import UserCard from "../../../../../infra-test/ui-shared/UserCard";
import CurrentAttemptCard from "../../../../../infra-test/ui-shared/test-details/CurrentAttemptCard";
import { useCallback } from "react";
import useGetUserId from "../../../../../infra-test/hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";

export default function CandidateTestExamPage() {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const userId = useGetUserId();

	const testQuery = useGetTestsByTestIdQuery({ testId });

	const tabs = useCallback((test: TestFullSchema) => {
		if (test._detail.mode !== "EXAM") return [];
		const tabs = [
			{
				id: "attempts",
				label: "Your Attempts",
				content: <AttemptsTab
					onAttemptClick={(attempt) => navigate(paths.candidate.tests.in(testId).attempts.in(attempt.id).ROOT)}
					candidateId={userId}
				/>
			},

		];

		if (test._detail.isAllowedToSeeOtherResults) {
			tabs.push({
				id: "participants",
				label: "Participants",
				content: <ParticipantsTab />,
			});
		}
		return tabs;
	}, []);

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
					left={<DefaultSidebarActions />}
				>
					<div className="flex flex-col gap-8">
						<div>
							<TestFullCard test={test} />
							<UserCard userId={test.authorId} />
							<CurrentAttemptCard />
						</div>

						<div className="flex flex-col gap-4">
							<h2 className="text-xl font-bold">Details</h2>
							<TabsComponent tabs={tabs(test)} defaultTabId="attempts" />
						</div>
					</div>
				</LeftLayoutTemplate>
			)}
		/>
	);
}
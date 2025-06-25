import NewLeftLayoutTemplate from "../../../../../components/layouts/NewLeftLayoutTemplate";
import TabsComponent from "../../../../../infra-test/ui/TabsComponent";
import ParticipantsTabContent from "./components/ParticipantsTabContent";
import useGetTestIdParams from "../../../../../infra-test/hooks/useGetTestIdParams";
import DefaultSidebarActions from "../../../../../infra-test/ui/sidebar/candidate/DefaultSidebar";
import AttemptsTabContent from "../../../../../infra-test/ui-shared/AttemptsTabContent";
import { TestFullSchema, useGetTestsByTestIdQuery } from "../../../../../infra-test/api/test.api-gen-v2";
import FetchStateCover2 from "../../../../../infra-test/ui/fetch-states/FetchStateCover2";
import TestFullCard from "../../../../../infra-test/ui-items/test/TestFullCard";
import UserCard from "../../../../../infra-test/ui-shared/UserCard";
import CurrentAttemptCard from "../../../../../infra-test/ui-shared/CurrentAttemptCard";
import { useCallback } from "react";
import useGetUserId from "../../../../../infra-test/hooks/useGetUserId";

export default function CandidateTestExamPage() {
	const testId = useGetTestIdParams();
	const userId = useGetUserId();

	const testQuery = useGetTestsByTestIdQuery({ testId });

	const tabs = useCallback((test: TestFullSchema) => {
		if (test._detail.mode !== "EXAM") return [];
		const tabs = [
			{
				id: "attempts",
				label: "Your Attempts",
				content: <AttemptsTabContent userId={userId} />
			},

		];

		if (test._detail.isAllowedToSeeOtherResults) {
			tabs.push({
				id: "participants",
				label: "Participants",
				content: (
					<ParticipantsTabContent
					/>
				)
			});
		}
		return tabs;
	}, []);

	return (
		<FetchStateCover2
			fetchState={testQuery}
			dataComponent={(test) => (
				<NewLeftLayoutTemplate
					header={
						<NewLeftLayoutTemplate.Header
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
				</NewLeftLayoutTemplate>
			)}
		/>
	);
}
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";
import { useCallback } from "react";
import { useGetTestsByTestIdQuery, TestFullSchema } from "../../../../../features/tests/api/test.api-gen-v2";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import useGetUserId from "../../../../../features/tests/hooks/useGetUserId";
import AttemptsTab from "../../../../../features/tests/ui-shared/test-pages/attempts-tab";
import CurrentAttemptCard from "../../../../../features/tests/ui-shared/test-pages/CurrentAttemptCard";
import ParticipantsTab from "../../../../../features/tests/ui-shared/test-pages/participants-tab";
import FetchStateCover2 from "../../../../../features/tests/ui/fetch-states/FetchStateCover2";
import MyTabs from "../../../../../features/tests/ui/MyTabs";
import RightLayoutTemplate from "../../../../../components/layouts/RightLayoutTemplate";
import TitleSkeleton from "../../../../../features/tests/ui/skeletons/TitleSkeleton";
import TestFullSidebar from "../../../../../features/tests/ui-shared/sidebar/TestFullSidebar";

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

		<RightLayoutTemplate
			header={
				<FetchStateCover2
					fetchState={testQuery}
					loadingComponent={<TitleSkeleton />}
					dataComponent={(test) => (
						<RightLayoutTemplate.Header
							title={test.title}
							description={test.description}
							backButton={
								<RightLayoutTemplate.BackButton
									onClick={() => navigate(paths.candidate.tests.ROOT)}
								/>
							}
						/>
					)}
				/>
			}
			right={<TestFullSidebar testId={testId} />}
		>
			<FetchStateCover2
				fetchState={testQuery}
				dataComponent={(test) => (
					<div className="flex-1 flex flex-col gap-8">
						<div className="flex flex-col gap-2">
							<CurrentAttemptCard />
						</div>

						<div className="flex-1 flex flex-col gap-4">
							<h2 className="text-xl font-bold">Details</h2>
							<MyTabs
								tabs={tabs(test)}
								tabClassName="flex-1"
								defaultTabId="attempts"
								className="flex-1"
							/>
						</div>
					</div>
				)}
			/>
		</RightLayoutTemplate>


		// <FetchStateCover2
		// 	fetchState={testQuery}
		// 	dataComponent={(test) => (
		// 		<LeftLayoutTemplate
		// 			header={
		// 				<LeftLayoutTemplate.Header
		// 					title={test.title}
		// 					description={test.description}
		// 				/>
		// 			}
		// 			left={<Sidebar />}
		// 		>
		// 			<div className="flex flex-col gap-8">
		// 				<div>
		// 					<TestFullCard test={test} />
		// 					<UserCard userId={test.authorId} />
		// 					<CurrentAttemptCard />
		// 				</div>

		// 				<div className="flex flex-col gap-4">
		// 					<h2 className="text-xl font-bold">Details</h2>
		// 					<MyTabs tabs={tabs(test)} defaultTabId="attempts" />
		// 				</div>
		// 			</div>
		// 		</LeftLayoutTemplate>
		// 	)}
		// />
	);
}
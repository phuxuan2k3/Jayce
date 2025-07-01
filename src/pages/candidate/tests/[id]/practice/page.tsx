import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";
import { useGetTestsByTestIdQuery, TestFullSchema } from "../../../../../features/tests/api/test.api-gen-v2";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import useGetUserId from "../../../../../features/tests/hooks/useGetUserId";
import AttemptsTab from "../../../../../features/tests/ui-shared/test-pages/attempts-tab";
import FetchStateCover2 from "../../../../../features/tests/ui/fetch-states/FetchStateCover2";
import MyTabs from "../../../../../features/tests/ui/MyTabs";
import FeedbackTabContent from "./components/FeedbackTabContent";
import QuestionsTabContent from "./components/QuestionsTabContent";
import RightLayoutTemplate from "../../../../../components/layouts/RightLayoutTemplate";
import TestFullSidebar from "../../../../../features/tests/ui-shared/sidebar/TestFullSidebar";
import CurrentAttemptCard from "../../../../../features/tests/ui-shared/test-pages/CurrentAttemptCard";

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
				onAttemptClick={(attempt) => {
					if (attempt.status === "IN_PROGRESS") {
						navigate(paths.candidate.tests.in(testId).attempts.in(attempt.id).DO);
					} else {
						navigate(paths.candidate.tests.in(testId).attempts.in(attempt.id).ROOT);
					}
				}}
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
		<RightLayoutTemplate
			header={
				<FetchStateCover2
					fetchState={testQuery}
					loadingComponent={
						<div className="flex flex-col gap-2 w-[500px]">
							<div className="h-8 w-2/3 bg-gray-200 animate-pulse rounded" /> {/* Title skeleton */}
							<div className="h-4 w-1/2 bg-gray-100 animate-pulse rounded" /> {/* Description skeleton */}
						</div>
					}
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

	);
}
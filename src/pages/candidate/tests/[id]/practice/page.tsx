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
import TitleSkeleton from "../../../../../features/tests/ui/skeletons/TitleSkeleton";
import { useLanguage } from "../../../../../LanguageProvider";

export default function CandidatePracticePage() {
	const { t } = useLanguage();

	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const testQuery = useGetTestsByTestIdQuery({ testId });
	const userId = useGetUserId();

	const tabs = useCallback((test: TestFullSchema) => [
		{
			id: "attempts",
			label: t("candidate_test_tab_attempts"),
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
			label: t("candidate_test_tab_questions"),
			content: <QuestionsTabContent numberOfAttempts={test._aggregate.totalAttempts} />
		},
		{
			id: "feedback",
			label: t("candidate_test_tab_feedback"),
			content: <FeedbackTabContent />
		}
	], []);

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
							<h2 className="text-xl font-bold">{t("candidate_test_details_heading")}</h2>
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
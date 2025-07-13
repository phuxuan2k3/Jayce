import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";
import { useCallback, useState } from "react";
import { useGetTestsByTestIdQuery, TestFullSchema, useGetTestsByTestIdParticipantsAndParticipantIdQuery } from "../../../../../features/tests/api/test.api-gen-v2";
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
import InvalidDialog from "./components/InvalidDialog";
import { useLanguage } from "../../../../../LanguageProvider";

export default function CandidateTestExamPage() {
	const { t } = useLanguage();

	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const userId = useGetUserId();

	const [invalidMessage, setInvalidMessage] = useState<string | null>(null);

	const testQuery = useGetTestsByTestIdQuery({ testId });
	const userInTestQuery = useGetTestsByTestIdParticipantsAndParticipantIdQuery({
		testId,
		participantId: userId
	}, {
		skip: !userId, // Skip if userId is not available
		pollingInterval: 10000, // Poll every 10 seconds
	})

	const isTestOngoing = (test: TestFullSchema) => {
		if (test._detail.mode !== "EXAM") return true; // Only check for ongoing status if the test is an exam
		if (!test._detail.openDate || !test._detail.closeDate) return true; // If no dates are set, consider it ongoing
		const now = new Date();
		const openDate = new Date(test._detail.openDate);
		const closeDate = new Date(test._detail.closeDate);
		return now >= openDate && now <= closeDate;
	}

	const tabs = useCallback((test: TestFullSchema, attemptsCount: number) => {
		if (test._detail.mode !== "EXAM") return [];
		const tabs = [
			{
				id: "attempts",
				label: t("tab_your_attempts"),
				content: <AttemptsTab
					onAttemptClick={(attempt) => {
						navigate(paths.candidate.tests.in(testId).attempts.in(attempt.id).ROOT);
					}}
					candidateId={userId}
				/>
			},

		];

		if (test._detail.isAllowedToSeeOtherResults) {
			tabs.push({
				id: "participants",
				label: t("tab_participants"),
				content: <ParticipantsTab
					onAttemptClick={(attempt) => {
						if (attempt.candidateId !== userId && attemptsCount === 0) {
							setInvalidMessage(t("tab_participants_forbidden"));
							return;
						}
						navigate(paths.candidate.tests.in(testId).attempts.in(attempt.id).ROOT);
					}}
				/>,
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
									onClick={() => navigate(paths.candidate.tests.JOIN)}
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
							{isTestOngoing(test) === true ? (
								<CurrentAttemptCard />
							) : (
								<div className="flex flex-col items-center justify-center min-h-fit h-32 text-gray-500">
									<div className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300">
										<p className="text-lg">{t("exam_not_ongoing_1")} <span className="font-semibold">{t("exam_not_ongoing_2")}</span>.</p>
									</div>
								</div>
							)}
						</div>

						<div className="flex-1 flex flex-col gap-4">
							<h2 className="text-xl font-bold">{t("exam_details_section")}</h2>
							<FetchStateCover2
								fetchState={userInTestQuery}
								dataComponent={(userInTest) => (
									<MyTabs
										tabs={tabs(test, userInTest._aggregate.totalAttempts)}
										tabClassName="flex-1"
										defaultTabId="attempts"
										className="flex-1"
									/>
								)}
							/>
						</div>
					</div>
				)}
			/>

			{invalidMessage && (
				<InvalidDialog
					message={invalidMessage}
					onClose={() => setInvalidMessage(null)}
				/>
			)}
		</RightLayoutTemplate>
	);
}
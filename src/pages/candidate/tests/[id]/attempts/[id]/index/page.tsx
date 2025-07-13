import { format } from "date-fns";
import RightLayoutTemplate from "../../../../../../../components/layouts/RightLayoutTemplate";
import useGetTestIdParams from "../../../../../../../features/tests/hooks/useGetTestIdParams";
import AnswersList from "../../../../../../../features/tests/ui-shared/attempt-pages/AnswersList";
import AttemptSidebar from "../../../../../../../features/tests/ui-shared/sidebar/AttemptSidebar";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../../../router/paths";
import useTestWithAttemptQueries from "../../../../../../../features/tests/hooks/query/useTestWithAttemptQueries";
import FetchStateCover2 from "../../../../../../../features/tests/ui/fetch-states/FetchStateCover2";
import { AttemptCoreSchema, TestFullSchema } from "../../../../../../../features/tests/api/test.api-gen-v2";
import { useCallback } from "react";
import useGetUserId from "../../../../../../../features/tests/hooks/useGetUserId";
import TitleSkeleton from "../../../../../../../features/tests/ui/skeletons/TitleSkeleton";
import { useLanguage } from "../../../../../../../LanguageProvider";

export default function CandidateTestAttemptPage() {
	const { t } = useLanguage();

	const navigate = useNavigate();
	const userId = useGetUserId();
	const testId = useGetTestIdParams();
	const testWithAttemptQuery = useTestWithAttemptQueries();

	const isAllowedToShowAnswer = useCallback((attempt: AttemptCoreSchema, test: TestFullSchema) => {
		return (
			(userId === test.authorId) ||
			(test._detail.mode === "PRACTICE" && attempt.candidateId === test.authorId) ||
			(test._detail.mode === "EXAM" && (
				test._detail.isAnswerVisible === true ||
				userId === test.authorId
			))
		);
	}, [userId]);

	return (
		<RightLayoutTemplate
			header={
				<FetchStateCover2
					fetchState={testWithAttemptQuery}
					loadingComponent={<TitleSkeleton />}
					dataComponent={({ attempt, test }) => (
						<RightLayoutTemplate.Header
							title={`${t("attempt_title_prefix")} #${attempt.order} - ${test.title}`}
							description={`${t("attempt_start_time")} ${format(new Date(attempt.createdAt), "dd MMM yyyy, HH:mm")}`}
							backButton={<RightLayoutTemplate.BackButton onClick={() => navigate(paths.candidate.tests.in(testId).ROOT)} />}
						/>
					)}
				/>
			}
			right={
				<AttemptSidebar />
			}
		>
			<FetchStateCover2
				fetchState={testWithAttemptQuery}
				dataComponent={({ attempt, test }) => {
					return (
						<AnswersList
							isAllowedToShowAnswer={isAllowedToShowAnswer(attempt, test)}
							pollAnswers={attempt.status === "COMPLETED" ? true : false} // Poll answers only if the attempt is completed (waiting for grading)
						/>
					)
				}}
			/>
		</RightLayoutTemplate>
	);
}


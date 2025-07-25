import RightLayoutTemplate from '../../../../../../../components/layouts/RightLayoutTemplate';
import { format } from 'date-fns';
import AttemptSidebar from '../../../../../../../features/tests/ui-shared/sidebar/AttemptSidebar';
import FetchStateCover2 from '../../../../../../../features/tests/ui/fetch-states/FetchStateCover2';
import useTestWithAttemptQueries from '../../../../../../../features/tests/hooks/query/useTestWithAttemptQueries';
import TitleSkeleton from '../../../../../../../features/tests/ui/skeletons/TitleSkeleton';
import { useState } from 'react';
import ParticipantInfo from './components/ParticipantInfo';
import MyButton from '../../../../../../../features/tests/ui/buttons/MyButton';
import ScoreAnswerList from './components/ScoreAnswerList';
import ConfirmScoringDialog from './components/ConfirmScoringDialog';
import { ScoreAnswerMap } from './types';
import { testApiGenV2, usePatchAttemptsByAttemptIdScoreMutation } from '../../../../../../../features/tests/api/test.api-gen-v2';
import useGetAttemptIdParams from '../../../../../../../features/tests/hooks/useGetAttemptIdParams';
import useActionStateWatch from '../../../../../../../features/tests/hooks/useActionStateWatch';
import { toast } from 'react-toastify';
import { parseQueryError } from '../../../../../../../helpers/fetchBaseQuery.error';
import { useLanguage } from '../../../../../../../LanguageProvider';

export default function ManagerTestsAttemptPage() {
	const { t } = useLanguage();

	const attemptId = useGetAttemptIdParams();

	const [isShowAllAnswers, setIsShowAllAnswers] = useState(false);
	const testWithAttemptQuery = useTestWithAttemptQueries();
	const [showConfirmScoringDialog, setShowConfirmScoringDialog] = useState(false);
	const [scoreAnswers, setScoreAnswers] = useState<ScoreAnswerMap>({});

	const [scoreAttempt, scoreState] = usePatchAttemptsByAttemptIdScoreMutation();
	useActionStateWatch(scoreState, {
		onSuccess: () => {
			toast.success(t("attempt_scored_successfully"));
			testApiGenV2.util.invalidateTags(["Attempts", "Tests"]);
		},
		onError: (error) => {
			const errorMessage = parseQueryError(error);
			toast.error(`${t("attempt_scored_error")}: ${errorMessage}`);
		}
	});

	return (
		<RightLayoutTemplate
			header={
				<FetchStateCover2
					fetchState={testWithAttemptQuery}
					loadingComponent={<TitleSkeleton />}
					dataComponent={({ attempt, test }) => (
						<RightLayoutTemplate.Header
							title={`${t("attempt_title")} ${attempt.order} - ${test.title}`}
							description={`${t("attempt_started_at")} ${format(new Date(attempt.createdAt), "dd MMM yyyy, HH:mm")}`}
						/>
					)}
				/>
			}
			right={
				<AttemptSidebar
					scoreAttemptSection={
						<div className='flex flex-col gap-4'>
							<hr className=' border-primary-toned-300 my-1' />
							{testWithAttemptQuery.data?.attempt.status === "COMPLETED" && (
								<MyButton
									variant={"primary"}
									size={"medium"}
									className="w-full"
									onClick={() => setShowConfirmScoringDialog(true)}
									disabled={scoreState.isLoading}
								>
									{scoreState.isLoading ? t("scoring") : t("confirm_scoring")}
								</MyButton>
							)}
						</div>
					}
				/>
			}
		>
			<div className="flex flex-col w-full gap-4">
				<FetchStateCover2
					fetchState={testWithAttemptQuery}
					dataComponent={({ attempt }) => (
						<ParticipantInfo participantId={attempt.candidateId} />
					)}
				/>
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold">{t("attempt_answers_title")}</h2>
					<MyButton
						size={"medium"}
						onClick={() => setIsShowAllAnswers(!isShowAllAnswers)}
					>
						{isShowAllAnswers ? t("hide_all_answers") : t("show_all_answers")}
					</MyButton>
				</div>

				<ScoreAnswerList
					scoreAnswers={scoreAnswers}
					setScoreAnswers={setScoreAnswers}
					isShowAllAnswers={isShowAllAnswers}
				/>
			</div>

			{showConfirmScoringDialog && (
				// Assuming ConfirmScoringDialog is a component that handles the confirmation dialog
				<ConfirmScoringDialog
					onCancel={() => setShowConfirmScoringDialog(false)}
					isLoading={scoreState.isLoading}
					onConfirm={() => {
						scoreAttempt({
							attemptId,
							body: {
								evaluations: Object.entries(scoreAnswers).map(([answerId, score]) => ({
									answerId,
									points: score.points ?? 0,
									comment: score.comment ?? undefined,
								})),
							}
						});
						setShowConfirmScoringDialog(false);
					}}
				/>
			)}
		</RightLayoutTemplate>
	);
}
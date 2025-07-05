import RightLayoutTemplate from '../../../../../../../components/layouts/RightLayoutTemplate';
import { format } from 'date-fns';
import { useGetAttemptsByAttemptIdQuery, useGetTestsByTestIdQuery, AttemptCoreSchema, TestFullSchema } from '../../../../../../../features/tests/api/test.api-gen-v2';
import useGetAttemptIdParams from '../../../../../../../features/tests/hooks/useGetAttemptIdParams';
import useGetTestIdParams from '../../../../../../../features/tests/hooks/useGetTestIdParams';
import useGetUserId from '../../../../../../../features/tests/hooks/useGetUserId';
import AnswersList from '../../../../../../../features/tests/ui-shared/attempt-pages/AnswersList';
import AttemptSidebar from '../../../../../../../features/tests/ui-shared/sidebar/AttemptSidebar';
import FetchStateCover2 from '../../../../../../../features/tests/ui/fetch-states/FetchStateCover2';

export default function ManagerTestsAttemptPage() {
	const attemptId = useGetAttemptIdParams();
	const testId = useGetTestIdParams();
	const userId = useGetUserId();

	const attemptQuery = useGetAttemptsByAttemptIdQuery({ attemptId });
	const testQuery = useGetTestsByTestIdQuery({ testId });

	const isAllowedToShowAnswer = (attempt: AttemptCoreSchema, test: TestFullSchema) => {
		return (
			(userId === test.authorId) ||
			(test._detail.mode === "PRACTICE" && attempt.candidateId === test.authorId) ||
			(test._detail.mode === "EXAM" && (
				test._detail.isAnswerVisible === true ||
				userId === test.authorId
			))
		);
	}

	return (
		<FetchStateCover2
			fetchState={attemptQuery}
			dataComponent={(attempt) => (
				<FetchStateCover2
					fetchState={testQuery}
					dataComponent={(test) => (
						<RightLayoutTemplate
							header={
								<RightLayoutTemplate.Header
									title={`Attempt ${attempt.order} - ${test.title}`}
									description={`Started at ${format(new Date(attempt.createdAt), "dd MMM yyyy, HH:mm")}`}
								/>
							}
							right={
								<AttemptSidebar />
							}
						>
							<div className="w-full p-4">
								<AnswersList isAllowedToShowAnswer={isAllowedToShowAnswer(attempt, test)} />
							</div>
						</RightLayoutTemplate>
					)}
				/>
			)}
		/>
	);
}
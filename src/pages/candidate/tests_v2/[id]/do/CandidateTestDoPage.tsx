import QuestionCard from './components/QuestionCard';
import Sidebar from './components/Sidebar';
import { testSelectors } from '../../../../../features/tests/stores/testSlice';
import { useGetCandidateCurrentAttemptDoQuery, useGetCandidateCurrentAttemptStateQuery } from '../../../../../features/tests/legacy/test.api-gen';
import { useAppSelector } from '../../../../../app/hooks';
import RightLayoutTemplate from '../../../../../components/layouts/RightLayoutTemplate';

const CandidateTestDoPage = () => {
	const doQuery = useGetCandidateCurrentAttemptDoQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});
	const currentQuestionIndex = useAppSelector(testSelectors.selectCurrentQuestionIndex);
	const stateQuery = useGetCandidateCurrentAttemptStateQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});

	// TODO: Add notification upon test ends.
	// TODO: Use loading page
	if (doQuery.data == null || stateQuery.data == null) return null;
	if (stateQuery.data.currentAttempt == null) return null;

	const currentQuestion = doQuery.data.questions[currentQuestionIndex];
	const { currentAttempt } = stateQuery.data;

	return (
		<RightLayoutTemplate
			header={{
				title: doQuery.data.test.title,
				description: doQuery.data.test.description,
			}}
			right={
				<Sidebar
					currentAttempt={currentAttempt}
				/>
			}
		>
			<div className="flex flex-row w-full justify-between">
				{doQuery.data.questions.length === 0 ? (
					<div>No questions found</div>
				) : (doQuery.data &&
					<QuestionCard
						currentAttempt={currentAttempt}
						question={currentQuestion}
						totalQuestion={doQuery.data.questions.length}
					/>
				)}

			</div>
		</RightLayoutTemplate>
	);
}

export default CandidateTestDoPage
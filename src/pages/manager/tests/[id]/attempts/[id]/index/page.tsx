import usePageData from './hooks/usePageData';
import RightLayoutTemplate from '../../../../../../../components/layouts/RightLayoutTemplate';
import SumaryCard from './components/SumaryCard';
import QuestionAnswerList from './components/QuestionAnswerList';
import FetchStateCover from '../../../../../../../components/wrapper/FetchStateCover';

export default function ManagerTestsAttemptPage() {
	const queryState = usePageData();

	return (
		<RightLayoutTemplate
			header={`Attempt for ${queryState.data?.exam.title}`}
			right={
				<FetchStateCover
					queryState={queryState}
					childrenFactory={
						({ attempt, attemptAggregate, candidate, exam, manager, testAggregate }) => (
							<SumaryCard
								exam={exam}
								testAggregate={testAggregate}
								manager={manager}
								candidate={candidate}
								attempt={attempt}
								attemptAggregate={attemptAggregate}
							/>
						)
					}
				/>
			}
		>
			<FetchStateCover
				queryState={queryState}
				childrenFactory={({ questionsAnswers }) => (
					<QuestionAnswerList
						questionsAnswers={questionsAnswers}
					/>
				)}
			/>
		</RightLayoutTemplate>
	)
}

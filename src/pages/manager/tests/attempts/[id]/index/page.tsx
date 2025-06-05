import { mockAttemptAggregate, mockAttempts } from '../../../../../../infra-test/mocks/mockAttempts'
import { ExamCore } from '../../../../../../infra-test/core/test.model';
import { mockExams } from '../../../../../../infra-test/mocks/mockExams';
import { AttemptAggregate, AttemptCore } from '../../../../../../infra-test/core/attempt.model';
import { QuestionAnswer } from './types/type';
import useGetQuestionsAnswers from './hooks/useGetQuestionsAnswers';
import NewRightLayoutTemplate from '../../../../../../components/layouts/NewRightLayoutTemplate';
import SumaryCard from './components/SumaryCard';
import QuestionAnswerList from './components/QuestionAnswerList';
import { mockTestAggregateData } from "../../../../../../infra-test/mocks/mockTests";
import { CandidateCore, ManagerCore } from '../../../../../../infra-test/core/user.model';
import { mockUsers } from '../../../../../../infra-test/mocks/mockUsers';

export default function ManagerTestsAttemptPage() {
	const exam: ExamCore = mockExams[0];
	const attempt: AttemptCore = mockAttempts[0];
	const attemptAggregate: AttemptAggregate = mockAttemptAggregate;
	const testAggregate = mockTestAggregateData;
	const candidate: CandidateCore = mockUsers[0];
	const manager: ManagerCore = mockUsers[1];

	const questionsAnswers: QuestionAnswer[] = useGetQuestionsAnswers();

	return (
		<NewRightLayoutTemplate
			header={`Attempt for ${exam.title}`}
			right={
				<SumaryCard
					exam={exam}
					testAggregate={testAggregate}
					manager={manager}
					candidate={candidate}
					attempt={attempt}
					attemptAggregate={attemptAggregate}
				/>
			}
		>
			<QuestionAnswerList
				questionsAnswers={questionsAnswers}
			/>
		</NewRightLayoutTemplate>
	)
}

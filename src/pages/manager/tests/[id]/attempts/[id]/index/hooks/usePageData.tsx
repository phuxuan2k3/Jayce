import { useMemo } from 'react';
import { ManagerTestsAttemptPageModel, QuestionAnswer } from '../type'
import { useGetExamsAttemptsByAttemptIdAggregateQuery, useGetExamsAttemptsByAttemptIdAnswersQuery, useGetExamsAttemptsByAttemptIdQuery, useGetExamsByTestIdAggregateQuery, useGetExamsByTestIdQuery, useGetExamsByTestIdQuestionsWithAnswerQuery } from '../../../../../../../../infra-test/api/test.api-gen';
import { AnswerCore, AttemptAggregate, AttemptCore } from '../../../../../../../../infra-test/core/attempt.model';
import { FetchStateQuery } from '../../../../../../../../app/types';
import useFetchStatesCombine from '../../../../../../../../components/hooks/useFetchStates';
import { useGetUsersQuery } from '../../../../../../../../features/auth/api/auth-profile.api';
import { getUserCore, UserCore } from '../../../../../../../../infra-test/core/user.model';
import { ExamCore, TestAggregate, TestCore } from '../../../../../../../../infra-test/core/test.model';
import { QuestionCore } from '../../../../../../../../infra-test/core/question.model';
import useGetAttemptIdParams from '../../../../../../../../infra-test/hooks/useGetAttemptIdParams';


function useAttempt(attemptId: string): FetchStateQuery<{
	attempt: AttemptCore;
	attemptAggregate: AttemptAggregate;
}> {
	const attemptQuery = useGetExamsAttemptsByAttemptIdQuery({ attemptId });
	const attemptAggregateQuery = useGetExamsAttemptsByAttemptIdAggregateQuery({ attemptId });

	const {
		isLoading,
		error,
	} = useFetchStatesCombine({
		fetchStates: [attemptQuery, attemptAggregateQuery],
	});

	const data: {
		attempt: AttemptCore;
		attemptAggregate: AttemptAggregate;
	} | undefined = (attemptQuery.data && attemptAggregateQuery.data) ? {
		attempt: attemptQuery.data,
		attemptAggregate: attemptAggregateQuery.data,
	} : undefined;

	return {
		isLoading,
		error,
		data,
	}
}

function useAttemptBased(attempt?: AttemptCore): FetchStateQuery<{
	candidate: UserCore;
	exam: ExamCore;
	testAggregate: TestAggregate;
	questions: QuestionCore[];
	answers: AnswerCore[];
}> {
	if (!attempt) {
		return {
			isLoading: false,
			error: undefined,
			data: undefined,
		};
	}

	const attemptId = attempt.id;
	const candidateId = attempt.candidateId;
	const testId = attempt.testId;

	const candidateQuery = useGetUsersQuery({ user_ids: [candidateId] });
	const examQuery = useGetExamsByTestIdQuery({ testId });
	const testAgregateQuery = useGetExamsByTestIdAggregateQuery({ testId });
	const questionsQuery = useGetExamsByTestIdQuestionsWithAnswerQuery({ testId });
	const answersQuery = useGetExamsAttemptsByAttemptIdAnswersQuery({ attemptId });
	const {
		isLoading,
		error,
	} = useFetchStatesCombine({
		fetchStates: [candidateQuery, examQuery, testAgregateQuery, questionsQuery, answersQuery],
	});

	const data: {
		candidate: UserCore;
		exam: ExamCore;
		testAggregate: TestAggregate;
		questions: QuestionCore[];
		answers: AnswerCore[];
	} | undefined = (
		candidateQuery.data &&
		candidateQuery.data.users.length > 0 &&
		examQuery.data &&
		testAgregateQuery.data &&
		questionsQuery.data &&
		answersQuery.data
	) ? {
			candidate: getUserCore(candidateQuery.data.users[0]),
			exam: examQuery.data,
			testAggregate: testAgregateQuery.data,
			questions: questionsQuery.data,
			answers: answersQuery.data,
		} : undefined;


	return {
		isLoading,
		error,
		data,
	}
}

function useTestBased(test?: TestCore): FetchStateQuery<{
	manager: UserCore;
}> {
	if (!test) {
		return {
			isLoading: false,
			error: undefined,
			data: undefined,
		};
	}
	const managerId = test.authorId;
	const managerQuery = useGetUsersQuery({ user_ids: [managerId] });
	return {
		isLoading: managerQuery.isLoading,
		error: managerQuery.error,
		data: managerQuery.data ? { manager: getUserCore(managerQuery.data.users[0]) } : undefined,
	};
}

export default function usePageData(): FetchStateQuery<ManagerTestsAttemptPageModel> {
	const attemptId = useGetAttemptIdParams();

	const useAttemptState = useAttempt(attemptId);
	const useAttemptBasedState = useAttemptBased(useAttemptState.data?.attempt);
	const useTestBasedState = useTestBased(useAttemptBasedState.data?.exam);

	const {
		isLoading,
		error,
	} = useFetchStatesCombine({
		fetchStates: [useAttemptState, useAttemptBasedState, useTestBasedState],
	});

	if (useAttemptState.data == null || useAttemptBasedState.data == null || useTestBasedState.data == null) {
		return {
			isLoading,
			error,
			data: undefined,
		}
	}

	const { attempt, attemptAggregate } = useAttemptState.data;
	const { exam, testAggregate, candidate, answers, questions } = useAttemptBasedState.data;
	const { manager } = useTestBasedState.data;


	const questionsAnswers: QuestionAnswer[] = useMemo(() => questions.map((question) => {
		const answer = answers.find((answer) => answer.questionId === question.id) || null;
		return {
			question,
			answer
		};
	}), [questions, answers]);

	return {
		isLoading,
		error,
		data: {
			attempt,
			attemptAggregate,
			exam,
			testAggregate,
			candidate,
			manager,
			questionsAnswers,
		},
	};
}

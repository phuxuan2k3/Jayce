import { useGetAttemptsByAttemptIdQuery, useGetTestsByTestIdQuery, useGetTestsByTestIdQuestionsQuery } from '../../../../../../../../infra-test/api/test.api-gen-v2';
import useGetTestIdParams from '../../../../../../../../infra-test/hooks/useGetTestIdParams';
import useGetAttemptIdParams from '../../../../../../../../infra-test/hooks/useGetAttemptIdParams';
import { useGetAttemptsByAttemptIdAnswersQuery } from '../apis/answer';

export default function useTestDoServer() {
	const testId = useGetTestIdParams();
	const attemptId = useGetAttemptIdParams();

	const testQuery = useGetTestsByTestIdQuery({ testId });
	const testQuestionsQuery = useGetTestsByTestIdQuestionsQuery({ testId });
	const attemptQuery = useGetAttemptsByAttemptIdQuery({ attemptId });
	const attemptAnswersQuery = useGetAttemptsByAttemptIdAnswersQuery({ attemptId });

	const isLoading = testQuery.isLoading || testQuestionsQuery.isLoading || attemptQuery.isLoading || attemptAnswersQuery.isLoading;
	const error = testQuery.error || testQuestionsQuery.error || attemptQuery.error || attemptAnswersQuery.error;
	const isSuccess = testQuery.isSuccess && testQuestionsQuery.isSuccess && attemptQuery.isSuccess && attemptAnswersQuery.isSuccess;

	const data = isSuccess ? {
		test: testQuery.data,
		questions: testQuestionsQuery.data,
		attempt: attemptQuery.data,
		attemptAnswers: attemptAnswersQuery.data,
	} : undefined;

	return {
		isLoading,
		error,
		isSuccess,
		data,
	};
}

import { useGetTestsByTestIdQuery, useGetTestsByTestIdQuestionsQuery, useGetAttemptsByAttemptIdQuery } from '../../../../../../../../features/tests/api/test.api-gen-v2';
import useGetAttemptIdParams from '../../../../../../../../features/tests/hooks/useGetAttemptIdParams';
import useGetTestIdParams from '../../../../../../../../features/tests/hooks/useGetTestIdParams';
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

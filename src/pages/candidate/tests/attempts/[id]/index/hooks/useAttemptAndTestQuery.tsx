import { AttemptCoreSchema, TestFullSchema, useGetAttemptsByAttemptIdQuery, useGetTestsByTestIdQuery } from '../../../../../../../infra-test/api/test.api-gen-v2'
import { FetchState } from '../../../../../../../infra-test/types/FetchState'

export default function useAttemptAndTestQuery(testId: string, attemptId: string): FetchState<{
	test: TestFullSchema;
	attempt: AttemptCoreSchema;
}> {
	const attemptQuery = useGetAttemptsByAttemptIdQuery({ attemptId });
	const testQuery = useGetTestsByTestIdQuery({ testId });

	const isLoading = attemptQuery.isLoading || testQuery.isLoading;
	const error = attemptQuery.error || testQuery.error;
	const isSuccess = attemptQuery.isSuccess && testQuery.isSuccess;

	const data = isSuccess ? {
		test: testQuery.data,
		attempt: attemptQuery.data
	} : undefined;

	return {
		isLoading,
		error,
		data
	};
}


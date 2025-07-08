import { TestFullSchema, AttemptCoreSchema, useGetAttemptsByAttemptIdQuery, useGetTestsByTestIdQuery } from "../../api/test.api-gen-v2";
import useGetAttemptIdParams from "../useGetAttemptIdParams";
import useGetTestIdParams from "../useGetTestIdParams";
import { FetchState } from "../../types/fetch-state";

export default function useTestWithAttemptQueries(pollAttempt: boolean = false): FetchState<{
	test: TestFullSchema;
	attempt: AttemptCoreSchema;
}> {
	const attemptId = useGetAttemptIdParams();
	const testId = useGetTestIdParams();
	const attemptQuery = useGetAttemptsByAttemptIdQuery({
		attemptId
	}, {
		pollingInterval: pollAttempt ? 10000 : undefined,
	});
	const testQuery = useGetTestsByTestIdQuery({ testId });

	const isLoading = attemptQuery.isLoading || testQuery.isLoading;
	const error = attemptQuery.error || testQuery.error;
	const isSuccess = attemptQuery.isSuccess && testQuery.isSuccess;
	const data = isSuccess ? {
		test: testQuery.data,
		attempt: attemptQuery.data,
	} : undefined;

	return {
		isLoading,
		error,
		data,
	};
};

import testApi from "../../../../features/Test/api/test.api";
import { TestDoProps, TestSubmissionParams } from "./types";

const doApi = testApi.injectEndpoints({
	endpoints: (builder) => ({
		getTestDoPage: builder.query<TestDoProps, string>({
			query: (testId) => `/${testId}/do/page`
		}),

		submitTest: builder.mutation<void, TestSubmissionParams>({
			query: ({ testId, answers }) => ({
				url: `/${testId}/do/submit`,
				method: "POST",
				body: { testId, answers },
			})
		})
	}),
	overrideExisting: false,
});

export const {
	useGetTestDoPageQuery,
	useSubmitTestMutation
} = doApi;
import testApi from "../../../../features/Test/test.api";
import { TestDoProps, TestSubmissionParams } from "./types";

const doApi = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getTestDoProps: builder.query<TestDoProps, string>({
            query: (testId) => `/${testId}/do/page`
        }),

        submitTest: builder.mutation<void, TestSubmissionParams>({
            query: ({ testId, answers }) => ({
                url: `/${testId}/do/submit`,
                method: "POST",
                body: answers,
            })
        })
    }),
    overrideExisting: false,
});

export const {
    useGetTestDoPropsQuery,
    useSubmitTestMutation
} = doApi;
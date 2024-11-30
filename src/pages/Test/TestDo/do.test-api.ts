import testApi from "../../../features/Test/test.api";
import { TestQuestions } from "./types";

const doApi = testApi.injectEndpoints({
    endpoints: (builder) => ({
        doTest: builder.query<TestQuestions, string>({
            query: (testId) => `/${testId}/do`
        }),
        submitTest: builder.mutation<void, { testId: string, answers: string[] }>({
            query: ({ testId, answers }) => ({
                url: `/${testId}/do`,
                method: "POST",
                body: { answers }
            })
        })
    }),
    overrideExisting: false,
});

export const {
    useDoTestQuery,
    useSubmitTestMutation
} = doApi;
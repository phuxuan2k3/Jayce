import testApi from "../../../features/Test/test.api";
import { TestSubmissionParams } from "./types";

const createnewAPI = testApi.injectEndpoints({
    endpoints: (builder) => ({
        createnewtest: builder.mutation<void, TestSubmissionParams>({
            query: ({ testId, questionList }) => ({
                url: `/${testId}/createnew`,
                method: "POST",
                body: {
                    testId, 
                    questionList, 
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreatenewtestMutation,
} = createnewAPI;
import testApi from "../../../../features/Test/test.api";
import { TestViewAnswerProps } from "./types";

type GetTestAnswerParams = {
    testId: string;
    attemptId: string;
}

const viewAnswerApi = testApi.injectEndpoints({
    endpoints: (build) => ({
        getTestAnswers: build.query<TestViewAnswerProps, GetTestAnswerParams>({
            query: ({ testId, attemptId }) => `/${testId}/answers/${attemptId}`,
        }),
    }),
});

export const { useGetTestAnswersQuery } = viewAnswerApi;
import testApi from "../../../../features/Test/test.api";
import { TestEvaluateProps } from "./types";

type GetEvaluateParams = {
    testId: string,
    attemptId: string,
}

export const evaluateApi = testApi.injectEndpoints({
    endpoints: (build) => ({
        getEvaluate: build.query<TestEvaluateProps, GetEvaluateParams>({
            query: ({ testId, attemptId }) => `${testId}/evaluate/${attemptId}`,
        }),
    }),
});

export const { useGetEvaluateQuery } = evaluateApi;
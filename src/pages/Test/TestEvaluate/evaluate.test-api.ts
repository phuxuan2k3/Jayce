import testApi from "../../../features/Test/test.api";
import { ReviewSubmission } from "./types";

type GetEvaluateParams = {
    testId: string,
    attemptId: string,
}

export const evaluateApi = testApi.injectEndpoints({
    endpoints: (build) => ({
        getEvaluate: build.query<ReviewSubmission, GetEvaluateParams>({
            query: ({ testId, attemptId }) => `${testId}/evaluate/${attemptId}`,
        }),
    }),
});

export const { useGetEvaluateQuery } = evaluateApi;
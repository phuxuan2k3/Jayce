import testApi from "../../../features/Test/test.api";
import { ReviewSubmission } from "./types";

export const evaluateApi = testApi.injectEndpoints({
    endpoints: (build) => ({
        getEvaluate: build.query<ReviewSubmission, string>({
            query: (testId) => `tests/${testId}/evaluate`,
        }),
    }),
});

export const { useGetEvaluateQuery } = evaluateApi;
import testApi from "../../../../features/Test/test.api";
import {TestInfo,Answer } from "./types";

const submissiondetailAPI = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getTestInfo: builder.query<TestInfo, string>({
            query: (submitterId) => `/${submitterId}/submission/detail`
        }),
        getAnswer: builder.query<Answer,string>({
            query: (submitterId) => `/${submitterId}/submission/detail`
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAnswerQuery,
    useGetTestInfoQuery,
} = submissiondetailAPI;
import testApi from "../../../../features/Test/test.api";
import {Submission} from "./types";
type TestSubmissionParams={
    testId:string;
    candidateId:string;
}
const submissiondetailAPI = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getTestInfo: builder.query<Submission, TestSubmissionParams>({
            query: ({testId,candidateId}) => `/${testId}/submission/${candidateId}/detail`
        }),
        getIn: builder.query<Submission, string>({
            query: (candidateId) => `/${candidateId}/submission/detail`
        }),
       
    }),
    overrideExisting: false,
});

export const {
    useGetTestInfoQuery,
    useGetInQuery,
} = submissiondetailAPI;
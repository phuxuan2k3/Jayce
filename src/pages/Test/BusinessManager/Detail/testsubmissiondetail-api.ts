import testApi from "../../../../features/Test/test.api";
import {Submission} from "./types";
type TestSubmissionParams={
    attemptId:string;
    candidateId:string;
}
const submissiondetailAPI = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getTestInfo: builder.query<Submission, TestSubmissionParams>({
            query: ({candidateId}) => `/submission/${candidateId}/detail`
        }),
        getIn: builder.query<Submission, TestSubmissionParams>({
            query: ({attemptId,candidateId}) => `/${candidateId}/submission/${attemptId}/detail`
        }),
       
    }),
    overrideExisting: false,
});

export const {
    useGetTestInfoQuery,
    useGetInQuery,
} = submissiondetailAPI;
import testApi from "../../../../features/Test/test.api";
import {Submission} from "./types";

const submissiondetailAPI = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getTestInfo: builder.query<Submission, string>({
            query: (submitterId) => `/${submitterId}/submission/detail`
        }),
       
    }),
    overrideExisting: false,
});

export const {
    useGetTestInfoQuery,
} = submissiondetailAPI;
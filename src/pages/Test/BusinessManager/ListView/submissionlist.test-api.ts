import testApi from "../../../../features/Test/test.api";
import { Paged } from "../../../../interfaces/paged.type";
import {SubmissionItem,SubmissionOverView } from "./types";

const submissionlistAPI = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubmissionList: builder.query<Paged<SubmissionItem>, string>({
            query: () => `/submission/page`
        }),
        getSubmissionOverView: builder.query<SubmissionOverView,string>({
            query: () => `/submission/overview`
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetSubmissionListQuery,
    useGetSubmissionOverViewQuery,
} = submissionlistAPI;
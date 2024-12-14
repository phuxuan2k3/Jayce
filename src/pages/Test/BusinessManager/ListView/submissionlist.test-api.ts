import testApi from "../../../../features/Test/test.api";
import { Paged } from "../../../../interfaces/paged.type";
import {SubmissionItem,SubmissionOverView } from "./types";

const submissionlistAPI = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubmissionList: builder.query<SubmissionItem, string>({
            query: () => `/submission/list`
        }),
        getSubmissionOverView: builder.query<Paged<SubmissionOverView>,string>({
            query: () => `/submission/page`
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetSubmissionListQuery,
    useGetSubmissionOverViewQuery,
} = submissionlistAPI;
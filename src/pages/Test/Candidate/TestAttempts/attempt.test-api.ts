import testApi from "../../../../features/Test/test.api";
import { Paged } from "../../../../interfaces/paged.type";
import { Attempt, FilterParams, TestAttemptsProps } from "./types";

const attemptApi = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getTestDisplay: builder.query<TestAttemptsProps, string>({
            query: (id) => `/${id}/display`
        }),
        getAttempts: builder.query<Paged<Attempt>, FilterParams>({
            query: (filter) => ({
                url: `/${filter.testId}/attempts`,
                params: {
                    perPage: filter.perPage,
                    page: filter.page,
                },
            })
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetTestDisplayQuery,
    useLazyGetAttemptsQuery,
} = attemptApi;
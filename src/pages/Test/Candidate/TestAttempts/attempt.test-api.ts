import testApi from "../../../../features/Test/test.api";
import { TestAttemptsProps } from "./types";

const attemptApi = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getAttempts: builder.query<TestAttemptsProps, string>({
            query: (id) => `/${id}/attempts`
        }),
    }),
    overrideExisting: false,
});

export const { useGetAttemptsQuery } = attemptApi;
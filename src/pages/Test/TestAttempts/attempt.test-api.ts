import testApi from "../../../features/Test/test.api";
import { TestAttempts } from "./types";

const attemptApi = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getAttempts: builder.query<TestAttempts, string>({
            query: (id) => `/${id}/attempts`
        }),
    }),
    overrideExisting: false,
});

export const { useGetAttemptsQuery } = attemptApi;
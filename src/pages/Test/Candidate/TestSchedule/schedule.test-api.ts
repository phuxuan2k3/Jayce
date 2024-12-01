import testApi from "../../../../features/Test/test.api";
import { TestScheduleProps } from "./types";

const scheduleApi = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getScheduleForTest: builder.query<TestScheduleProps, string>({
            query: (testId) => `/${testId}/schedule`,
        }),
    }),
});

export const { useGetScheduleForTestQuery } = scheduleApi;
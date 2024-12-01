import testApi from "../../../features/Test/test.api";
import { TestDisplayProps } from "./types";

const infoApi = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getAll: builder.query<TestDisplayProps[], void>({
            query: () => `/list`
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllQuery } = infoApi;
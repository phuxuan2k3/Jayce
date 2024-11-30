import testApi from "../../../features/Test/test.api";
import { TestDisplay } from "./types";

const infoApi = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getAll: builder.query<TestDisplay[], void>({
            query: () => `/list`
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllQuery } = infoApi;
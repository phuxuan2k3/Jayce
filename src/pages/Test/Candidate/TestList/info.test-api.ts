import testApi from "../../../../features/Test/test.api";
import { Paged } from "../../../../interfaces/paged.type";
import { FilterParams, TestDisplayProps, TestListProps } from "./types";

const infoApi = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getTestListPageData: builder.query<TestListProps, void>({
            query: () => ({
                url: `/list/load`,
            })
        }),
        getFiltered: builder.query<Paged<TestDisplayProps>, FilterParams>({
            query: (filter) => ({
                url: `/list`,
                params: filter,
            })
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetTestListPageDataQuery,
    useLazyGetFilteredQuery,
} = infoApi;
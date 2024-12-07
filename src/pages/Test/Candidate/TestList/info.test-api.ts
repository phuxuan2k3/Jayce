import testApi from "../../../../features/Test/test.api";
import { FilterProps, TestDisplayProps } from "./types";


const infoApi = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getSuggestedTags: builder.query<string[], void>({
            query: () => `/list/suggested-tags`,
        }),
        getFiltered: builder.query<TestDisplayProps[], FilterProps>({
            query: (filter) => ({
                url: `/list`,
                params: filter,
            })
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetSuggestedTagsQuery,
    useLazyGetFilteredQuery,
} = infoApi;
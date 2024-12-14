import testApi from "../../features/Test/test.api";
import { YourTest } from "./types";
import { Paged } from "../../interfaces/paged.type";

const yourTestApi = testApi.injectEndpoints({
    endpoints: (builder) => ({
        getYourTestList: builder.query<Paged<YourTest>, void>({
            query: () => '/testlistview'
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetYourTestListQuery,
} = yourTestApi;

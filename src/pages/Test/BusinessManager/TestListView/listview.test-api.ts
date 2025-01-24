import testApi from "../../../../features/Test/test.api";
// import { YourTest } from "./types";
// import { Paged } from "../../interfaces/paged.type";

const yourTestApi = testApi.injectEndpoints({
    endpoints: (builder) => ({
        // getYourTestList: builder.query<Paged<YourTest>, void>({
        //     query: () => '/testlistview'
        // }), thay băng filter
        deleteTest:builder.mutation<void,string>({
            query: ( testID ) => ({
                url: `${testID}/delete/`, 
                method: "DELETE",
            }),
        }),
        deleteQuestion: builder.mutation<void, { testID: string; questionID: string }>({
            query: ({ testID, questionID }) => ({
                url: `${testID}/delete/question/${questionID}/`, 
                method: "DELETE",
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useDeleteQuestionMutation,
    useDeleteTestMutation,
    // useGetYourTestListQuery,
} = yourTestApi;
// thay bằng API filter
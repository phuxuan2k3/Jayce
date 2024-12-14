import testApi from "../../../features/Test/test.api";
import { TestDetails } from "./types";

const editdetailAPI = testApi.injectEndpoints({
    endpoints: (builder) => ({
        editdetail: builder.mutation<void, TestDetails>({
            query: ({  testId, name, description, duration, type }) => ({
                url: `/${testId}/edit/detail`,
                method: "POST",
                body: {
                    testId, 
                    name, 
                    description, 
                    duration, 
                    type, 
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useEditdetailMutation,
} = editdetailAPI;
import testApi from "../../features/Test/test.api";
import { TestDetails } from "./types";

const createtestAPI = testApi.injectEndpoints({
    endpoints: (builder) => ({
        createtest: builder.mutation<void, TestDetails>({
            query: ({ name, description, duration, type }) => ({
                url: `/test/create`,
                method: "POST",
                body: {
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
    useCreatetestMutation,
} = createtestAPI;
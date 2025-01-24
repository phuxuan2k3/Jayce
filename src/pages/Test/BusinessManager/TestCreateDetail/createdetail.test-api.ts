import testApi from "../../../../features/Test/test.api";
import { TestDetails } from "./types";

const createtestAPI = testApi.injectEndpoints({
    endpoints: (builder) => ({
        createtest: builder.mutation<{ testID: string }, TestDetails>({
            query: ({ name, description, duration }) => ({
                url: `/test/create`,
                method: "POST",
                body: {
                    name, 
                    description, 
                    duration, 
                    
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreatetestMutation,
} = createtestAPI;
import testApi from "../../../../features/Test/test.api";
import { TestDetails } from "./types";

const createtestAPI = testApi.injectEndpoints({
    endpoints: (builder) => ({
        createtest: builder.mutation<{ testID: string }, TestDetails>({
            query: ({ title, description, minutesToAnswer, difficulty }) => ({
                url: `/test/create`,
                method: "POST",
                body: {
                    title, 
                    description, 
                    minutesToAnswer, 
                    difficulty
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreatetestMutation,
} = createtestAPI;
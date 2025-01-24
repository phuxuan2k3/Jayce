import aiAPI from "../../../../features/Test/AI.api";
import { QuestionResponse, Prompt } from "./types";

const questionaiAPI = aiAPI.injectEndpoints({
    endpoints: (builder) => ({
        fetchquestion: builder.mutation<QuestionResponse, Prompt>({
            query: (prompt) => ({
                url: `/question`,
                method: "POST",
                body: prompt
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useFetchquestionMutation,
} = questionaiAPI;
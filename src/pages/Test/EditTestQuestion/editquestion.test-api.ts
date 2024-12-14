import testApi from "../../../features/Test/test.api";
import { QuestionParams } from "./types";

const editQuestionAPI = testApi.injectEndpoints({
    endpoints: (builder) => ({
        editQuestion: builder.mutation<void, QuestionParams>({
            query: ({ testID, questionList }) => ({
                url: `${testID}/edit/question`, 
                method: "POST", 
                body: questionList, 
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useEditQuestionMutation,
} = editQuestionAPI;

import testApi from "../../../features/Test/test.api";
import { QuestionParams,Question } from "./types";

const editQuestionAPI = testApi.injectEndpoints({
    endpoints: (builder) => ({
        editQuestion: builder.mutation<void, QuestionParams>({
            query: ({ testID, questionList }) => ({
                url: `${testID}/edit/question/`, 
                method: "POST", 
                body: questionList, 
            }),
        }),
        getQuestion: builder.query<Question[], string>({
            query: (testId) => `/${testId}/question`
        }),
    }),
    overrideExisting: false,
});

export const {
    useEditQuestionMutation,
} = editQuestionAPI;

import testApi from "../../../../features/tests/api/test.api";
import { QuestionParams, QuestionReturn } from "./types";

const editQuestionAPI = testApi.injectEndpoints({
	endpoints: (builder) => ({
		editQuestion: builder.mutation<void, QuestionParams>({
			query: ({ testID, questionList }) => ({
				url: `${testID}/edit/question/`,
				method: "POST",
				body: questionList,
			}),
		}),
		getQuestion: builder.query<QuestionReturn, string>({
			query: (testId) => `/${testId}/question`
		}),
	}),
	overrideExisting: false,
});

export const {
	useEditQuestionMutation,
} = editQuestionAPI;

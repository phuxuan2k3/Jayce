import promptApi from "../base/prompt.api";
import { CriteriaRequest, CriteriaResponse, GeneratedQuestionResponse, QuestionDTO } from "../types/crud";

const questionaiAPI = promptApi.injectEndpoints({
	endpoints: (builder) => ({
		criteria: builder.mutation<{ criteriaList: CriteriaResponse[] }, CriteriaRequest>({
			query: (CriteriaRequest) => ({
				url: `/v1/suggest_criteria`,
				method: "POST",
				body: CriteriaRequest
			}),
		}),
		generate: builder.mutation<QuestionDTO[], CriteriaRequest>({
			query: (CriteriaRequest) => ({
				url: `/v1/suggest_questions`,
				method: "POST",
				body: CriteriaRequest
			}),
			transformResponse: (response: GeneratedQuestionResponse) => {
				return response.questionList.map((question) => {
					return {
						text: question.questionContent,
						options: question.optionList.map((option) => option.optionContent),
						correctOption: question.optionList.find((option) => option.isCorrect)?.optionContent || 0,
						points: question.points || 0,
					}
				}) as QuestionDTO[];
			}
		}),
	}),
	overrideExisting: false,
});

export const {
	useCriteriaMutation,
	useGenerateMutation
} = questionaiAPI;
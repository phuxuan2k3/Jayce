import promptApi from "../base/prompt.api";
import { CriteriaRequest, CriteriaResponse, GeneratedQuestionResponse, QuestionDTO } from "../types/crud";

const promptApiCustom = promptApi.injectEndpoints({
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
					const correctOption = question.optionList.findIndex((option) => option.isCorrect);
					console.log("Correct option index:", correctOption);
					return {
						text: question.questionContent,
						options: question.optionList.map((option) => option.optionContent),
						correctOption: correctOption === -1 ? 0 : correctOption,
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
} = promptApiCustom;

export default promptApiCustom;
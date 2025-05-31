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

		// New

		getSuggestOutlines: builder.query<GetSuggestOutlinesResponse, GetSuggestOutlinesRequest>({
			query: (request) => ({
				url: `/v1/suggest_outlines`,
				method: "POST",
				body: request
			}),
		}),
		getSuggestQuestions: builder.query<GetSuggestQuestionsResponse, GetSuggestQuestionsRequest>({
			query: (request) => ({
				url: `/v1/suggest_questions`,
				method: "POST",
				body: request
			})
		}),
	}),
	overrideExisting: false,
});

export const {
	useCriteriaMutation,
	useGenerateMutation,

	useLazyGetSuggestQuestionsQuery,
	useLazyGetSuggestOutlinesQuery,
} = promptApiCustom;

export default promptApiCustom;

export type GetSuggestOutlinesRequest = {
	title: string;
	description: string;
	difficulty: string;
	tags: string[];
	outlines: string[]; // Những gợi ý đã điềns
};

export type GetSuggestOutlinesResponse = {
	outlines: string[];
};

export type GetSuggestQuestionsRequest = {
	title: string;
	description: string;
	minutesToAnswer: number;
	language: string;
	difficulty: string;
	tags: string[];
	outlines: string[];
	numberOfQuestions: number;
	numberOfOptions: number;
};

export type GetSuggestQuestionsResponse = {
	questions: {
		text: string;
		options: string[];
		points: number;
		correctOption: number;
	}[];
};


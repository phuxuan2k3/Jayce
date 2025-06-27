import promptApi from "./prompt.api";

const promptApiCustom = promptApi.injectEndpoints({
	endpoints: (builder) => ({
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
	useLazyGetSuggestQuestionsQuery,
	useLazyGetSuggestOutlinesQuery,
} = promptApiCustom;

export default promptApiCustom;

export type GetSuggestOutlinesRequest = {
	title: string;
	description: string;
	difficulty: string;
	tags: string[];
	outlines: string[];
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
		points: number;
		options: string[];
		correctOption: number;
	}[];
};


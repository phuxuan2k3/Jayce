import promptApi from "./prompt.api";
import { QuestionPersistCoreSchema } from "../ui-items/question/types";

const practiceGenerateApi = promptApi.injectEndpoints({
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
	useGetSuggestQuestionsQuery,
	useLazyGetSuggestQuestionsQuery,
	useLazyGetSuggestOutlinesQuery,
} = practiceGenerateApi;

export default practiceGenerateApi;

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
	difficulty: string;
	tags: string[];
	outlines: string[];

	language: string;
	minutesToAnswer: number;
	numberOfQuestions: number;
	numberOfOptions: number;

	// e.g., "MCQ", "LONG_ANSWER", "MIXED"
	// Default: MIXED
	questionType?: string;

	// Request key is a unique identifier for the request
	requestKey: string | null;
};

export type GetSuggestQuestionsResponse = {
	questions: QuestionPersistCoreSchema[];
	requestKey: string;
};

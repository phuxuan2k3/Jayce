import promptApi from "../../../../../features/tests/api/prompt.api";
import { QuestionPersistCoreSchema } from "../../../../../features/tests/ui-items/question/types";
import { LanguageType, Topic } from "../common/base-schema";

const promptApiCustom = promptApi.injectEndpoints({
	endpoints: (builder) => ({
		getGenerateExamQuestions: builder.query<GetGenerateExamQuestionsApiResponse, GetGenerateExamQuestionsApiRequest>({
			query: (data) => ({
				url: "/v2/suggest_exam_question",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useLazyGetGenerateExamQuestionsQuery,
} = promptApiCustom;

export type GetGenerateExamQuestionsApiRequest = {
	title: string;
	description: string;
	language: LanguageType; // English, Vietnamese, ...
	topics: Topic[];
	creativity: number; // Creativity level from 1 to 10
	context: {
		text: string;
		files: File[];
		links: string[];
	};
};

export type GetGenerateExamQuestionsApiResponse = {
	questions: QuestionPersistCoreSchema[];
};
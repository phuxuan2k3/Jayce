import promptApi from "../../../../../features/tests/base/prompt.api";
import { LanguageType, SeniorityType } from "../common/base-types";
import { Topic } from "../models/topic.model";

const promptApiCustom = promptApi.injectEndpoints({
	endpoints: (builder) => ({
		getGenerateExamQuestions: builder.query<GetGenerateExamQuestionsApiResponse, GetGenerateExamQuestionsApiRequest>({
			query: (data) => ({
				url: "/exam/generate",
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
	seniority: SeniorityType; // Intern, Junior, Middle, Senior, Lead, ...
	topics: Topic[];
	creativity: number; // Creativity level from 1 to 10
	context: {
		text: string;
		files: File[];
		links: string[];
	};
};

export type GetGenerateExamQuestionsApiResponse = {
	questions: {
		text: string;
		options: string[];
		points: number;
		correctOption: number;
	}[];
};
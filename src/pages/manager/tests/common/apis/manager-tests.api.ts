import promptTuningApi from "../../../../../features/tests/base/prompt-tuning.api";
import { GetSuggestNewQuestionRequest, GetSuggestNewQuestionResponse } from "./types";

const api1 = promptTuningApi.injectEndpoints({
	endpoints: (build) => ({
		suggestNewQuestion: build.query<GetSuggestNewQuestionResponse, GetSuggestNewQuestionRequest>({
			query: (question) => ({
				url: '/refine-question',
				method: 'POST',
				body: { question },
			}),
		}),
	}),
});

export const {
	useSuggestNewQuestionQuery
} = api1;
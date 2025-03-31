import aiAPI from "../../../../features/Test/api/AI.api";
import { CriteriaRequest, CriteriaResponse, GeneratedQuestionFormat } from "./types";

const questionaiAPI = aiAPI.injectEndpoints({
	endpoints: (builder) => ({
		criteria: builder.mutation<{ criteriaList: CriteriaResponse[] }, CriteriaRequest>({
			query: (CriteriaRequest) => ({
				url: `/v1/suggest_criteria`,
				method: "POST",
				body: CriteriaRequest
			}),
		}),
		generate: builder.mutation<{ questionList: GeneratedQuestionFormat[] }, CriteriaRequest>({
			query: (CriteriaRequest) => ({
				url: `/v1/suggest_questions`,
				method: "POST",
				body: CriteriaRequest
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useCriteriaMutation,
	useGenerateMutation
} = questionaiAPI;
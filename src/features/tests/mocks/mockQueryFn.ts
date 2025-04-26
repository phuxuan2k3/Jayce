import promptApiCustom from "../api/prompt.api-custom";
import { QuestionDTO } from "../types/crud";
import { mockQuestions } from "./mockData";

const mockConfig = {
	generate: false,
}

promptApiCustom.enhanceEndpoints({
	endpoints: {
		generate: {
			queryFn: async (arg, _, __, baseQuery) => {
				if (mockConfig.generate) {
					return { data: mockQuestions, error: undefined, meta: undefined };
				}
				const result = await baseQuery({
					url: `/v1/suggest_questions`,
					method: "POST",
					body: arg,
				});
				if (result.error) {
					return { error: result.error };
				}
				return {
					data: result.data as QuestionDTO[],
					meta: result.meta
				};
			},
		}
	}
});

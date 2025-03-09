import testApi from "../../../../features/Test/api/test.api";
import { Paged } from "../../../../interfaces/paged.type";
import { FilterQuestionAnswerParams, GetTestAnswerParams, TestQuestionAnswer, TestViewAnswerProps } from "./types";

const viewAnswerApi = testApi.injectEndpoints({
	endpoints: (build) => ({
		getTestViewAnswersPageData: build.query<TestViewAnswerProps, GetTestAnswerParams>({
			query: ({ testId, attemptId }) => `/${testId}/answers/${attemptId}/page`,
		}),
		getAnswers: build.query<Paged<TestQuestionAnswer>, FilterQuestionAnswerParams>({
			query: (filter) => ({
				url: `/${filter.testId}/answers/${filter.attemptId}/data`,
				params: {
					page: filter.page,
					perPage: filter.perPage,
				},
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetTestViewAnswersPageDataQuery,
	useLazyGetAnswersQuery,
} = viewAnswerApi;
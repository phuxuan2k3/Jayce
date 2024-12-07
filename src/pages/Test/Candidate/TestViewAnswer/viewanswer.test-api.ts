import testApi from "../../../../features/Test/test.api";
import { Paged } from "../../../../interfaces/paged.type";
import { FilterQuestionAnswerParams, GetTestAnswerParams, TestQuestionAnswer, TestViewAnswerProps } from "./types";

const viewAnswerApi = testApi.injectEndpoints({
    endpoints: (build) => ({
        getTestViewAnswersPageData: build.query<TestViewAnswerProps, GetTestAnswerParams>({
            query: ({ testId, attemptId }) => `/${testId}/answers/${attemptId}/page`,
        }),
        getTestQuestionAnswers: build.query<Paged<TestQuestionAnswer>, FilterQuestionAnswerParams>({
            query: ({ testId, attemptId, page, perPage }) => ({
                url: `/${testId}/answers/${attemptId}/data`,
                params: {
                    page: page,
                    perPage: perPage,
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetTestViewAnswersPageDataQuery,
    useLazyGetTestQuestionAnswersQuery
} = viewAnswerApi;
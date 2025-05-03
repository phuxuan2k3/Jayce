import { createApi } from "@reduxjs/toolkit/query/react";
import serviceBaseQueryWithReauth from "../../../app/serviceBaseQueryReAuth";
import { url } from "../../../app/env";
import { getInterviewApiMock } from "../mocks/api-mocks";

const interviewApi = createApi({
	reducerPath: 'interviewApi',
	// baseQuery: serviceBaseQueryWithReauth(url.thresh.base),
	baseQuery: async (args, api, extraOptions) => {
		const mockData = getInterviewApiMock(api.endpoint);
		if (mockData) return mockData;
		const baseQuery = serviceBaseQueryWithReauth(url.thresh.base);
		const result = await baseQuery(args, api, extraOptions);
		return result;
	},
	endpoints: (builder) => ({
		postStartInterview: builder.mutation<{ interviewId: string }, PostInterviewStartRequest>({
			query: (body) => ({
				url: '/interviews/start',
				method: 'POST',
				body,
			}),
		}),
		getQuestion: builder.query<GetInterviewQuestionResponse, {
			interviewId: string;
			questionIndex: number;
		}>({
			query: (query) => `/interviews/${query.interviewId}/questions/${query.questionIndex}`,
		}),
		postAnswer: builder.mutation<void, PostInterviewAnswerRequest>({
			query: (query) => ({
				url: `/interviews/${query.interviewId}/answer`,
				method: 'POST',
				body: { ...query, interviewId: undefined },
			}),
		}),
	}),
});

export const {
	useGetQuestionQuery,
	usePostAnswerMutation,
	usePostStartInterviewMutation,
} = interviewApi;

export default interviewApi;

export type PostInterviewStartRequest = {
	position: string;
	experience: string;
	language: string;
	models: string;
	speed: number;
	skills: string[];
	maxQuestions: number;
	skipIntro: boolean;
	skipCode: boolean;
};

export type GetInterviewQuestionResponse = {
	questionIndex: number;
	content: string;
	audio: string;
	lipsync: {
		metadata: {
			soundFile: string;
			duration: number;
		};
		mouthCues: {
			start: number;
			end: number;
			value: string;
		}[];
	};
	isLastQuestion: boolean;
}

export type PostInterviewAnswerRequest = {
	interviewId: string;
	/**
	 * The index of the question being answered.
	 */
	questionIndex: number;
	answer: string;
	/**
	 * The audio file in base64 format.
	 */
	recordProof: string;
};

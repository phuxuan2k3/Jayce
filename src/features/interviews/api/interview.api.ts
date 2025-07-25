import { createApi } from "@reduxjs/toolkit/query/react";
import serviceBaseQueryWithReauth from "../../../app/serviceBaseQueryReAuth";
import { url } from "../../../app/env";

const interviewApi = createApi({
	reducerPath: "interviewApi",
	// baseQuery: serviceBaseQueryWithReauth(url.thresh.base),
	// baseQuery: async (args, api, extraOptions) => {
	//   // const mockData = getInterviewApiMock(api.endpoint);
	//   // if (mockData) return mockData;
	//   // const baseQuery = serviceBaseQueryWithReauth(url.irelia);
	//   // const result = await baseQuery(args, api, extraOptions);
	//   // return result;

	// },
	baseQuery: serviceBaseQueryWithReauth(url.irelia),
	endpoints: (builder) => ({
		postStartInterview: builder.mutation<
			{ interviewId: string },
			PostInterviewStartRequest
		>({
			query: (body) => ({
				url: "/interviews/start",
				method: "POST",
				body,
			}),
		}),
		getQuestion: builder.query<
			GetInterviewQuestionResponse,
			{
				interviewId: string;
				questionIndex: number;
			}
		>({
			query: (query) =>
				`/interviews/${query.interviewId}/questions/${query.questionIndex}`,
		}),
		postAnswer: builder.mutation<void, PostInterviewAnswerRequest>({
			query: (query) => ({
				url: `/interviews/${query.interviewId}/answer`,
				method: "POST",
				body: {
					...query,
					recordProof: "",
					interviewId: undefined
				},
			}),
		}),
		postGetScore: builder.mutation<
			GetInterviewScoreResponse,
			PostInterviewScoreRequest
		>({
			query: ({ submissions }) => ({
				url: `/v1/score_interview`,
				method: "POST",
				body: { submissions },
			}),
		}),
		getInterviewHistory: builder.query<
			GetInterviewHistoryResponse,
			{ interviewId: string }
		>({
			query: ({ interviewId }) => `/interviews/history/${interviewId}`,
		}),
		getHistory: builder.mutation<
			InterviewHistoryResponse,
			{
				pageIndex: number;
				sort?: number;
				query?: string;
			}
		>({
			query: (params) => {
				const searchParams = new URLSearchParams();
				searchParams.append("page", String(params.pageIndex));
				if (typeof params.sort === "number") {
					searchParams.append("sort", String(params.sort));
				}
				if (params.query) {
					searchParams.append("query", params.query);
				}
				return {
					url: `/interviews/history?${searchParams.toString()}`,
					method: "GET",
				};
			},
		}),
		getInterviewOutro: builder.query<
			InterviewOutroResponse,
			{ interviewId: string }
		>({
			query: ({ interviewId }) => `/interviews/${interviewId}/submit`,
		}),
		getPublicQuestions: builder.query<
			GetPublicQuestionResponse,
			{ pos: string; lang: string; exp: string; page: number }
		>({
			query: ({ pos, exp, lang, page }) =>
				`/interviews/public-questions?pos=${pos}&lang=${lang}&exp=${exp}&page=${page}`,
		}),
	}),
});

export const {
	useGetQuestionQuery,
	usePostAnswerMutation,
	usePostStartInterviewMutation,
	usePostGetScoreMutation,
	useGetInterviewHistoryQuery,
	useLazyGetInterviewOutroQuery,
	useGetPublicQuestionsQuery,
	useGetHistoryMutation,
} = interviewApi;

export default interviewApi;

export type PostInterviewStartRequest = {
	position: string;
	experience: string;
	language: string;
	models: string;
	speed: number;
	skills: string[];
	totalQuestions: number;
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
		mouthCues:
		| {
			start: number;
			end: number;
			value: string;
		}[]
		| null;
	};
	isLastQuestion: boolean;
};

export type PostInterviewScoreRequest = {
	submissions: {
		index: number;
		question: string;
		answer: string;
	}[];
};

export type GetInterviewScoreResponse = {
	result: {
		index: number;
		comment: string;
		score: "A" | "B" | "C" | "D" | "F";
	}[];
	skills: {
		[skillName: string]: "A" | "B" | "C" | "D" | "F";
	};
	totalScore: {
		A: number;
		B: number;
		C: number;
		D: number;
		F: number;
	};
	positiveFeedback: string;
	actionableFeedback: string;
	finalComment: string;
};

export type InterviewStatus = "Full" | "Partial" | "None";

export type InterviewSubmission = {
	content: string;
	answer: string;
	comment: string;
	status: InterviewStatus;
	score: string;
};

export type InterviewTotalScore = {
	A: number;
	B: number;
	C: number;
	D: number;
	F: number;
};

export type InterviewSkillScore = {
	[skill: string]: string;
};
export type GetInterviewHistoryResponse = {
	interviewId?: string;
	submissions: InterviewSubmission[];
	totalScore: InterviewTotalScore;
	finalComment: string;
	positiveFeedback: string;
	skillsScore: InterviewSkillScore;
	actionableFeedback: string;
};

export type GetInterviewListResponse = {
	page: number;
	perPage: number;
	totalPages: number;
	result: {
		interviewId: string;
		title: string;
		createdAt: number;
		totalScore: {
			full: number;
			partial: number;
			none: number;
		};
	}[];
};

export type InterviewOutroResponse = {
	outro: {
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
	};
};

export interface InterviewHistoryResponse {
	page: number;
	perPage: number;
	totalPages: number;
	interviews: InterviewSummary[];
}

export interface GetPublicQuestionResponse {
	questions: {
		content: string;
		position: string;
		experience: string;
		baseData: {
			createdAt: string;
			updatedAt: string;
		};
	}[];
	page: number;
	perPage: number;
	totalPages: number;
	totalCount: number;
}

export interface InterviewSummary {
	interviewId: string;
	position: string;
	experience: string;
	totalScore: InterviewTotalScore;
	baseData: InterviewBaseData;
}

export interface InterviewBaseData {
	createdAt: string;
	updatedAt: string;
}

export type PostInterviewAnswerRequest = {
	interviewId: string;
	/**
	 * The index of the question being answered.
	 */
	index: number;
	answer: string;
	/**
	 * The audio file in base64 format.
	 */
	recordProof: string;
};

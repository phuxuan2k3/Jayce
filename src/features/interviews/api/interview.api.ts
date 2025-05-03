import { createApi } from "@reduxjs/toolkit/query/react";
import serviceBaseQueryWithReauth from "../../../app/serviceBaseQueryAuth";
import { url } from "../../../app/env";
import { getInterviewApiMock } from "../mocks/api-mocks";

const interviewApi = createApi({
  reducerPath: "interviewApi",
  // baseQuery: serviceBaseQueryWithReauth(url.thresh.base),
  baseQuery: async (args, api, extraOptions) => {
    const mockData = getInterviewApiMock(api.endpoint);
    if (mockData) return mockData;
    const baseQuery = serviceBaseQueryWithReauth(url.thresh.base);
    const result = await baseQuery(args, api, extraOptions);
    return result;
  },
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
        body: { ...query, interviewId: undefined },
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
  }),
});

export const {
  useGetQuestionQuery,
  usePostAnswerMutation,
  usePostStartInterviewMutation,
  usePostGetScoreMutation,
  useGetInterviewHistoryQuery,
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

export type GetInterviewHistoryResponse = {
  submissions: {
    question: string;
    answer: string;
    comment: string;
    status: "Full" | "Partial" | "None";
  }[];
  totalScore: {
    full: number;
    partial: number;
    none: number;
  };
  areasOfImprovement: string;
  finalComment: string;
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

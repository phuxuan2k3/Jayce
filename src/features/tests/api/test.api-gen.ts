import { testApi as api } from "../base/test.api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query<GetTagsApiResponse, GetTagsApiArg>({
      query: () => ({ url: `/tags` }),
    }),
    getTagsByTagId: build.query<
      GetTagsByTagIdApiResponse,
      GetTagsByTagIdApiArg
    >({
      query: (queryArg) => ({ url: `/tags/${queryArg.tagId}` }),
    }),
    postManagerTags: build.mutation<
      PostManagerTagsApiResponse,
      PostManagerTagsApiArg
    >({
      query: (queryArg) => ({
        url: `/manager/tags`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    putManagerTagsByTagId: build.mutation<
      PutManagerTagsByTagIdApiResponse,
      PutManagerTagsByTagIdApiArg
    >({
      query: (queryArg) => ({
        url: `/manager/tags/${queryArg.tagId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteManagerTagsByTagId: build.mutation<
      DeleteManagerTagsByTagIdApiResponse,
      DeleteManagerTagsByTagIdApiArg
    >({
      query: (queryArg) => ({
        url: `/manager/tags/${queryArg.tagId}`,
        method: "DELETE",
      }),
    }),
    getCandidateCurrentAttemptState: build.query<
      GetCandidateCurrentAttemptStateApiResponse,
      GetCandidateCurrentAttemptStateApiArg
    >({
      query: () => ({ url: `/candidate/current-attempt/state` }),
    }),
    postCandidateCurrentAttemptNew: build.mutation<
      PostCandidateCurrentAttemptNewApiResponse,
      PostCandidateCurrentAttemptNewApiArg
    >({
      query: (queryArg) => ({
        url: `/candidate/current-attempt/new`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getCandidateCurrentAttemptDo: build.query<
      GetCandidateCurrentAttemptDoApiResponse,
      GetCandidateCurrentAttemptDoApiArg
    >({
      query: () => ({ url: `/candidate/current-attempt/do` }),
    }),
    postCandidateCurrentAttemptSubmit: build.mutation<
      PostCandidateCurrentAttemptSubmitApiResponse,
      PostCandidateCurrentAttemptSubmitApiArg
    >({
      query: () => ({
        url: `/candidate/current-attempt/submit`,
        method: "POST",
      }),
    }),
    getTests: build.query<GetTestsApiResponse, GetTestsApiArg>({
      query: (queryArg) => ({
        url: `/tests`,
        params: {
          searchTitle: queryArg.searchTitle,
          minMinutesToAnswer: queryArg.minMinutesToAnswer,
          maxMinutesToAnswer: queryArg.maxMinutesToAnswer,
          difficulty: queryArg.difficulty,
          tags: queryArg.tags,
          managerIds: queryArg.managerIds,
          sortBy: queryArg.sortBy,
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    getTestsChallengeOfTheDay: build.query<
      GetTestsChallengeOfTheDayApiResponse,
      GetTestsChallengeOfTheDayApiArg
    >({
      query: () => ({ url: `/tests/challenge-of-the-day` }),
    }),
    getTestsByTestId: build.query<
      GetTestsByTestIdApiResponse,
      GetTestsByTestIdApiArg
    >({
      query: (queryArg) => ({ url: `/tests/${queryArg.testId}` }),
    }),
    getManagerTestsByTestIdQuestions: build.query<
      GetManagerTestsByTestIdQuestionsApiResponse,
      GetManagerTestsByTestIdQuestionsApiArg
    >({
      query: (queryArg) => ({
        url: `/manager/tests/${queryArg.testId}/questions`,
      }),
    }),
    getManagerTests: build.query<
      GetManagerTestsApiResponse,
      GetManagerTestsApiArg
    >({
      query: (queryArg) => ({
        url: `/manager/tests`,
        params: {
          searchTitle: queryArg.searchTitle,
          minMinutesToAnswer: queryArg.minMinutesToAnswer,
          maxMinutesToAnswer: queryArg.maxMinutesToAnswer,
          difficulty: queryArg.difficulty,
          tags: queryArg.tags,
          managerIds: queryArg.managerIds,
          sortBy: queryArg.sortBy,
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    postManagerTests: build.mutation<
      PostManagerTestsApiResponse,
      PostManagerTestsApiArg
    >({
      query: (queryArg) => ({
        url: `/manager/tests`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    putManagerTestsByTestId: build.mutation<
      PutManagerTestsByTestIdApiResponse,
      PutManagerTestsByTestIdApiArg
    >({
      query: (queryArg) => ({
        url: `/manager/tests/${queryArg.testId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteManagerTestsByTestId: build.mutation<
      DeleteManagerTestsByTestIdApiResponse,
      DeleteManagerTestsByTestIdApiArg
    >({
      query: (queryArg) => ({
        url: `/manager/tests/${queryArg.testId}`,
        method: "DELETE",
      }),
    }),
    getUserTestsByTestIdAttempts: build.query<
      GetUserTestsByTestIdAttemptsApiResponse,
      GetUserTestsByTestIdAttemptsApiArg
    >({
      query: (queryArg) => ({
        url: `/user/tests/${queryArg.testId}/attempts`,
        params: {
          sortByStartDate: queryArg.sortByStartDate,
          sortByScore: queryArg.sortByScore,
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    getUserAttemptsByAttemptId: build.query<
      GetUserAttemptsByAttemptIdApiResponse,
      GetUserAttemptsByAttemptIdApiArg
    >({
      query: (queryArg) => ({ url: `/user/attempts/${queryArg.attemptId}` }),
    }),
    getUserAttemptsByAttemptIdAnswers: build.query<
      GetUserAttemptsByAttemptIdAnswersApiResponse,
      GetUserAttemptsByAttemptIdAnswersApiArg
    >({
      query: (queryArg) => ({
        url: `/user/attempts/${queryArg.attemptId}/answers`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    getCandidateAttempts: build.query<
      GetCandidateAttemptsApiResponse,
      GetCandidateAttemptsApiArg
    >({
      query: (queryArg) => ({
        url: `/candidate/attempts`,
        params: {
          sortByStartDate: queryArg.sortByStartDate,
          sortByScore: queryArg.sortByScore,
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    getCandidateTestsByTestIdAttempts: build.query<
      GetCandidateTestsByTestIdAttemptsApiResponse,
      GetCandidateTestsByTestIdAttemptsApiArg
    >({
      query: (queryArg) => ({
        url: `/candidate/tests/${queryArg.testId}/attempts`,
        params: {
          sortByStartDate: queryArg.sortByStartDate,
          sortByScore: queryArg.sortByScore,
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as testApiGen };
export type GetTagsApiResponse = /** status 200 Success */ {
  id: number;
  name: string;
}[];
export type GetTagsApiArg = void;
export type GetTagsByTagIdApiResponse = /** status 200 Success */ {
  id: number;
  name: string;
};
export type GetTagsByTagIdApiArg = {
  tagId?: number | null;
};
export type PostManagerTagsApiResponse = unknown;
export type PostManagerTagsApiArg = {
  body: {
    name: string;
  };
};
export type PutManagerTagsByTagIdApiResponse = unknown;
export type PutManagerTagsByTagIdApiArg = {
  tagId?: number | null;
  body: {
    name: string;
  };
};
export type DeleteManagerTagsByTagIdApiResponse = unknown;
export type DeleteManagerTagsByTagIdApiArg = {
  tagId?: number | null;
};
export type GetCandidateCurrentAttemptStateApiResponse =
  /** status 200 Success */ {
    hasCurrentAttempt: boolean;
    currentAttempt: {
      id: number;
      secondsLeft: number;
      createdAt: string;
      endedAt: string;
      answers: {
        questionId: number;
        chosenOption: number;
      }[];
      test: {
        id: number;
        title: string;
        minutesToAnswer: number;
      };
    } | null;
  };
export type GetCandidateCurrentAttemptStateApiArg = void;
export type PostCandidateCurrentAttemptNewApiResponse = unknown;
export type PostCandidateCurrentAttemptNewApiArg = {
  body: {
    testId: number | null;
  };
};
export type GetCandidateCurrentAttemptDoApiResponse =
  /** status 200 Success */ {
    id: number;
    test: {
      id: number;
      managerId: string;
      title: string;
      description: string;
      minutesToAnswer: number;
      difficulty: string;
      createdAt: string;
      updatedAt: string;
    };
    questions: {
      id: number;
      text: string;
      options: {
        id: number;
        text: string;
      }[];
      points: number;
    }[];
  };
export type GetCandidateCurrentAttemptDoApiArg = void;
export type PostCandidateCurrentAttemptSubmitApiResponse = unknown;
export type PostCandidateCurrentAttemptSubmitApiArg = void;
export type GetTestsApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: {
    id: number;
    managerId: string;
    title: string;
    difficulty: string;
    minutesToAnswer: number;
    answerCount: number;
    tags: {
      id: number;
      name: string;
    }[];
    createdAt: string;
    updatedAt: string;
  }[];
};
export type GetTestsApiArg = {
  searchTitle?: string;
  minMinutesToAnswer?: number | null;
  maxMinutesToAnswer?: number | null;
  difficulty?: ("easy" | "medium" | "hard")[] | string;
  tags?: string[] | string;
  managerIds?: string[] | string;
  sortBy?:
    | {
        field: "createdAt" | "updatedAt" | "title";
        order: "asc" | "desc";
      }[]
    | string
    | string[];
  page?: number;
  perPage?: number | null;
};
export type GetTestsChallengeOfTheDayApiResponse = /** status 200 Success */ {
  id: number;
  managerId: string;
  title: string;
  description: string;
  difficulty: string;
  minutesToAnswer: number;
  answerCount: number;
  tags: {
    id: number;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
};
export type GetTestsChallengeOfTheDayApiArg = void;
export type GetTestsByTestIdApiResponse = /** status 200 Success */ {
  id: number;
  managerId: string;
  title: string;
  description: string;
  difficulty: string;
  minutesToAnswer: number;
  answerCount: number;
  tags: {
    id: number;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
};
export type GetTestsByTestIdApiArg = {
  testId?: number | null;
};
export type GetManagerTestsByTestIdQuestionsApiResponse =
  /** status 200 Success */ {
    id: number;
    text: string;
    options: string[];
    points: number;
    correctOption: number;
  }[];
export type GetManagerTestsByTestIdQuestionsApiArg = {
  testId?: number | null;
};
export type GetManagerTestsApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: {
    id: number;
    managerId: string;
    title: string;
    difficulty: string;
    minutesToAnswer: number;
    answerCount: number;
    tags: {
      id: number;
      name: string;
    }[];
    createdAt: string;
    updatedAt: string;
  }[];
};
export type GetManagerTestsApiArg = {
  searchTitle?: string;
  minMinutesToAnswer?: number | null;
  maxMinutesToAnswer?: number | null;
  difficulty?: ("easy" | "medium" | "hard")[] | string;
  tags?: string[] | string;
  managerIds?: string[] | string;
  sortBy?:
    | {
        field: "createdAt" | "updatedAt" | "title";
        order: "asc" | "desc";
      }[]
    | string
    | string[];
  page?: number;
  perPage?: number | null;
};
export type PostManagerTestsApiResponse = unknown;
export type PostManagerTestsApiArg = {
  body: {
    tagIds: number[];
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    minutesToAnswer: number;
    questions: {
      text: string;
      options: string[];
      points: number;
      correctOption: number;
    }[];
  };
};
export type PutManagerTestsByTestIdApiResponse = unknown;
export type PutManagerTestsByTestIdApiArg = {
  testId?: number | null;
  body: {
    tagIds?: number[];
    title?: string;
    description?: string;
    difficulty?: "easy" | "medium" | "hard";
    minutesToAnswer?: number;
    questions?: {
      text: string;
      options: string[];
      points: number;
      correctOption: number;
    }[];
  };
};
export type DeleteManagerTestsByTestIdApiResponse = unknown;
export type DeleteManagerTestsByTestIdApiArg = {
  testId?: number | null;
};
export type GetUserTestsByTestIdAttemptsApiResponse =
  /** status 200 Success */ {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: {
      id: number;
      test: {
        id: number;
        managerId: string;
        title: string;
        minutesToAnswer: number;
        tags: string[];
      };
      candidateId: string;
      startDate: string;
      secondsSpent: number;
      score: number;
      totalScore: number;
    }[];
  };
export type GetUserTestsByTestIdAttemptsApiArg = {
  testId?: number | null;
  sortByStartDate?: "asc" | "desc";
  sortByScore?: "asc" | "desc";
  page: number;
  perPage?: number;
};
export type GetUserAttemptsByAttemptIdApiResponse = /** status 200 Success */ {
  id: number;
  test: {
    id: number;
    managerId: string;
    title: string;
    minutesToAnswer: number;
    tags: string[];
  };
  candidateId: string;
  startDate: string;
  secondsSpent: number;
  score: number;
  totalScore: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  totalQuestions: number;
};
export type GetUserAttemptsByAttemptIdApiArg = {
  attemptId?: number | null;
};
export type GetUserAttemptsByAttemptIdAnswersApiResponse =
  /** status 200 Success */ {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: {
      question: {
        id: number;
        text: string;
        options: string[];
        points: number;
        correctOption: number;
      };
      chosenOption: number | null;
    }[];
  };
export type GetUserAttemptsByAttemptIdAnswersApiArg = {
  attemptId?: number | null;
  page: number;
  perPage?: number;
};
export type GetCandidateAttemptsApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: {
    id: number;
    test: {
      id: number;
      managerId: string;
      title: string;
      minutesToAnswer: number;
      tags: string[];
    };
    candidateId: string;
    startDate: string;
    secondsSpent: number;
    score: number;
    totalScore: number;
  }[];
};
export type GetCandidateAttemptsApiArg = {
  sortByStartDate?: "asc" | "desc";
  sortByScore?: "asc" | "desc";
  page: number;
  perPage?: number;
};
export type GetCandidateTestsByTestIdAttemptsApiResponse =
  /** status 200 Success */ {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: {
      id: number;
      test: {
        id: number;
        managerId: string;
        title: string;
        minutesToAnswer: number;
        tags: string[];
      };
      candidateId: string;
      startDate: string;
      secondsSpent: number;
      score: number;
      totalScore: number;
    }[];
  };
export type GetCandidateTestsByTestIdAttemptsApiArg = {
  testId?: number | null;
  sortByStartDate?: "asc" | "desc";
  sortByScore?: "asc" | "desc";
  page: number;
  perPage?: number;
};
export const {
  useGetTagsQuery,
  useLazyGetTagsQuery,
  useGetTagsByTagIdQuery,
  useLazyGetTagsByTagIdQuery,
  usePostManagerTagsMutation,
  usePutManagerTagsByTagIdMutation,
  useDeleteManagerTagsByTagIdMutation,
  useGetCandidateCurrentAttemptStateQuery,
  useLazyGetCandidateCurrentAttemptStateQuery,
  usePostCandidateCurrentAttemptNewMutation,
  useGetCandidateCurrentAttemptDoQuery,
  useLazyGetCandidateCurrentAttemptDoQuery,
  usePostCandidateCurrentAttemptSubmitMutation,
  useGetTestsQuery,
  useLazyGetTestsQuery,
  useGetTestsChallengeOfTheDayQuery,
  useLazyGetTestsChallengeOfTheDayQuery,
  useGetTestsByTestIdQuery,
  useLazyGetTestsByTestIdQuery,
  useGetManagerTestsByTestIdQuestionsQuery,
  useLazyGetManagerTestsByTestIdQuestionsQuery,
  useGetManagerTestsQuery,
  useLazyGetManagerTestsQuery,
  usePostManagerTestsMutation,
  usePutManagerTestsByTestIdMutation,
  useDeleteManagerTestsByTestIdMutation,
  useGetUserTestsByTestIdAttemptsQuery,
  useLazyGetUserTestsByTestIdAttemptsQuery,
  useGetUserAttemptsByAttemptIdQuery,
  useLazyGetUserAttemptsByAttemptIdQuery,
  useGetUserAttemptsByAttemptIdAnswersQuery,
  useLazyGetUserAttemptsByAttemptIdAnswersQuery,
  useGetCandidateAttemptsQuery,
  useLazyGetCandidateAttemptsQuery,
  useGetCandidateTestsByTestIdAttemptsQuery,
  useLazyGetCandidateTestsByTestIdAttemptsQuery,
} = injectedRtkApi;

import { testApi as api } from "../base/test.api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrentAttemptsByAttemptId: build.query<
      GetCurrentAttemptsByAttemptIdApiResponse,
      GetCurrentAttemptsByAttemptIdApiArg
    >({
      query: (queryArg) => ({ url: `/current/attempts/${queryArg.attemptId}` }),
    }),
    getCurrentTestsByTestId: build.query<
      GetCurrentTestsByTestIdApiResponse,
      GetCurrentTestsByTestIdApiArg
    >({
      query: (queryArg) => ({ url: `/current/tests/${queryArg.testId}` }),
    }),
    getCurrentAttemptsByAttemptIdAnswers: build.query<
      GetCurrentAttemptsByAttemptIdAnswersApiResponse,
      GetCurrentAttemptsByAttemptIdAnswersApiArg
    >({
      query: (queryArg) => ({
        url: `/current/attempts/${queryArg.attemptId}/answers`,
      }),
    }),
    patchCurrentAttemptsByAttemptIdAnswers: build.mutation<
      PatchCurrentAttemptsByAttemptIdAnswersApiResponse,
      PatchCurrentAttemptsByAttemptIdAnswersApiArg
    >({
      query: (queryArg) => ({
        url: `/current/attempts/${queryArg.attemptId}/answers`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    patchCurrentAttemptsByAttemptIdSubmit: build.mutation<
      PatchCurrentAttemptsByAttemptIdSubmitApiResponse,
      PatchCurrentAttemptsByAttemptIdSubmitApiArg
    >({
      query: (queryArg) => ({
        url: `/current/attempts/${queryArg.attemptId}/submit`,
        method: "PATCH",
      }),
    }),
    getExamsByTestIdAttempts: build.query<
      GetExamsByTestIdAttemptsApiResponse,
      GetExamsByTestIdAttemptsApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/${queryArg.testId}/attempts`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
          sort: queryArg.sort,
        },
      }),
    }),
    getExamsByTestIdAttemptsSelf: build.query<
      GetExamsByTestIdAttemptsSelfApiResponse,
      GetExamsByTestIdAttemptsSelfApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/${queryArg.testId}/attempts/self`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
          sort: queryArg.sort,
        },
      }),
    }),
    getExamsByTestIdAttemptsAggregate: build.query<
      GetExamsByTestIdAttemptsAggregateApiResponse,
      GetExamsByTestIdAttemptsAggregateApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/${queryArg.testId}/attempts/aggregate`,
      }),
    }),
    getExamsByTestIdParticipantsAggregate: build.query<
      GetExamsByTestIdParticipantsAggregateApiResponse,
      GetExamsByTestIdParticipantsAggregateApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/${queryArg.testId}/participants/aggregate`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    getExamsByTestIdCandidateAndCandidateIdAttempts: build.query<
      GetExamsByTestIdCandidateAndCandidateIdAttemptsApiResponse,
      GetExamsByTestIdCandidateAndCandidateIdAttemptsApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/${queryArg.testId}/candidate/${queryArg.candidateId}/attempts/`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
          sort: queryArg.sort,
        },
      }),
    }),
    getExamsByTestIdCandidateAndCandidateIdAttemptsAggregate: build.query<
      GetExamsByTestIdCandidateAndCandidateIdAttemptsAggregateApiResponse,
      GetExamsByTestIdCandidateAndCandidateIdAttemptsAggregateApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/${queryArg.testId}/candidate/${queryArg.candidateId}/attempts/aggregate`,
      }),
    }),
    getExamsAttemptsByAttemptId: build.query<
      GetExamsAttemptsByAttemptIdApiResponse,
      GetExamsAttemptsByAttemptIdApiArg
    >({
      query: (queryArg) => ({ url: `/exams/attempts/${queryArg.attemptId}` }),
    }),
    getExamsAttemptsByAttemptIdAggregate: build.query<
      GetExamsAttemptsByAttemptIdAggregateApiResponse,
      GetExamsAttemptsByAttemptIdAggregateApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/attempts/${queryArg.attemptId}/aggregate`,
      }),
    }),
    getExamsAttemptsByAttemptIdAnswers: build.query<
      GetExamsAttemptsByAttemptIdAnswersApiResponse,
      GetExamsAttemptsByAttemptIdAnswersApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/attempts/${queryArg.attemptId}/answers`,
      }),
    }),
    postExamsByTestIdAttemptsStart: build.mutation<
      PostExamsByTestIdAttemptsStartApiResponse,
      PostExamsByTestIdAttemptsStartApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/${queryArg.testId}/attempts/start`,
        method: "POST",
      }),
    }),
    getHistoryAttempts: build.query<
      GetHistoryAttemptsApiResponse,
      GetHistoryAttemptsApiArg
    >({
      query: (queryArg) => ({
        url: `/history/attempts`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
          sort: queryArg.sort,
          testId: queryArg.testId,
        },
      }),
    }),
    getHistoryAttemptsByAttemptId: build.query<
      GetHistoryAttemptsByAttemptIdApiResponse,
      GetHistoryAttemptsByAttemptIdApiArg
    >({
      query: (queryArg) => ({ url: `/history/attempts/${queryArg.attemptId}` }),
    }),
    getPracticesByTestIdAttempts: build.query<
      GetPracticesByTestIdAttemptsApiResponse,
      GetPracticesByTestIdAttemptsApiArg
    >({
      query: (queryArg) => ({
        url: `/practices/${queryArg.testId}/attempts`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
          sort: queryArg.sort,
        },
      }),
    }),
    getPracticesByTestIdAttemptsAggregate: build.query<
      GetPracticesByTestIdAttemptsAggregateApiResponse,
      GetPracticesByTestIdAttemptsAggregateApiArg
    >({
      query: (queryArg) => ({
        url: `/practices/${queryArg.testId}/attempts/aggregate`,
      }),
    }),
    getPracticesAttemptsByAttemptId: build.query<
      GetPracticesAttemptsByAttemptIdApiResponse,
      GetPracticesAttemptsByAttemptIdApiArg
    >({
      query: (queryArg) => ({
        url: `/practices/attempts/${queryArg.attemptId}`,
      }),
    }),
    getPracticesAttemptsByAttemptIdAggregate: build.query<
      GetPracticesAttemptsByAttemptIdAggregateApiResponse,
      GetPracticesAttemptsByAttemptIdAggregateApiArg
    >({
      query: (queryArg) => ({
        url: `/practices/attempts/${queryArg.attemptId}/aggregate`,
      }),
    }),
    getPracticesAttemptsByAttemptIdAnswers: build.query<
      GetPracticesAttemptsByAttemptIdAnswersApiResponse,
      GetPracticesAttemptsByAttemptIdAnswersApiArg
    >({
      query: (queryArg) => ({
        url: `/practices/attempts/${queryArg.attemptId}/answers`,
      }),
    }),
    postPracticesByTestIdAttemptsStart: build.mutation<
      PostPracticesByTestIdAttemptsStartApiResponse,
      PostPracticesByTestIdAttemptsStartApiArg
    >({
      query: (queryArg) => ({
        url: `/practices/${queryArg.testId}/attempts/start`,
        method: "POST",
      }),
    }),
    getExams: build.query<GetExamsApiResponse, GetExamsApiArg>({
      query: (queryArg) => ({
        url: `/exams`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
          searchTitle: queryArg.searchTitle,
          sort: queryArg.sort,
        },
      }),
    }),
    postExams: build.mutation<PostExamsApiResponse, PostExamsApiArg>({
      query: (queryArg) => ({
        url: `/exams`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getExamsFind: build.query<GetExamsFindApiResponse, GetExamsFindApiArg>({
      query: (queryArg) => ({
        url: `/exams/find`,
        params: {
          roomId: queryArg.roomId,
        },
      }),
    }),
    getExamsByTestId: build.query<
      GetExamsByTestIdApiResponse,
      GetExamsByTestIdApiArg
    >({
      query: (queryArg) => ({ url: `/exams/${queryArg.testId}` }),
    }),
    putExamsByTestId: build.mutation<
      PutExamsByTestIdApiResponse,
      PutExamsByTestIdApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/${queryArg.testId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteExamsByTestId: build.mutation<
      DeleteExamsByTestIdApiResponse,
      DeleteExamsByTestIdApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/${queryArg.testId}`,
        method: "DELETE",
      }),
    }),
    getExamsByTestIdAggregate: build.query<
      GetExamsByTestIdAggregateApiResponse,
      GetExamsByTestIdAggregateApiArg
    >({
      query: (queryArg) => ({ url: `/exams/${queryArg.testId}/aggregate` }),
    }),
    getExamsByTestIdParticipants: build.query<
      GetExamsByTestIdParticipantsApiResponse,
      GetExamsByTestIdParticipantsApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/${queryArg.testId}/participants`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    getExamsByTestIdQuestionsToDo: build.query<
      GetExamsByTestIdQuestionsToDoApiResponse,
      GetExamsByTestIdQuestionsToDoApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/${queryArg.testId}/questions-to-do`,
      }),
    }),
    getExamsByTestIdQuestionsWithAnswer: build.query<
      GetExamsByTestIdQuestionsWithAnswerApiResponse,
      GetExamsByTestIdQuestionsWithAnswerApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/${queryArg.testId}/questions-with-answer`,
      }),
    }),
    postExamsJoin: build.mutation<
      PostExamsJoinApiResponse,
      PostExamsJoinApiArg
    >({
      query: (queryArg) => ({
        url: `/exams/join`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getTemplates: build.query<GetTemplatesApiResponse, GetTemplatesApiArg>({
      query: (queryArg) => ({
        url: `/templates`,
        params: {
          searchName: queryArg.searchName,
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    postTemplates: build.mutation<
      PostTemplatesApiResponse,
      PostTemplatesApiArg
    >({
      query: (queryArg) => ({
        url: `/templates`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getTemplatesByTemplateId: build.query<
      GetTemplatesByTemplateIdApiResponse,
      GetTemplatesByTemplateIdApiArg
    >({
      query: (queryArg) => ({ url: `/templates/${queryArg.templateId}` }),
    }),
    putTemplatesByTemplateId: build.mutation<
      PutTemplatesByTemplateIdApiResponse,
      PutTemplatesByTemplateIdApiArg
    >({
      query: (queryArg) => ({
        url: `/templates/${queryArg.templateId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteTemplatesByTemplateId: build.mutation<
      DeleteTemplatesByTemplateIdApiResponse,
      DeleteTemplatesByTemplateIdApiArg
    >({
      query: (queryArg) => ({
        url: `/templates/${queryArg.templateId}`,
        method: "DELETE",
      }),
    }),
    getPractices: build.query<GetPracticesApiResponse, GetPracticesApiArg>({
      query: (queryArg) => ({
        url: `/practices`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
          searchTitle: queryArg.searchTitle,
          sort: queryArg.sort,
        },
      }),
    }),
    postPractices: build.mutation<
      PostPracticesApiResponse,
      PostPracticesApiArg
    >({
      query: (queryArg) => ({
        url: `/practices`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getPracticesByTestId: build.query<
      GetPracticesByTestIdApiResponse,
      GetPracticesByTestIdApiArg
    >({
      query: (queryArg) => ({ url: `/practices/${queryArg.testId}` }),
    }),
    deletePracticesByTestId: build.mutation<
      DeletePracticesByTestIdApiResponse,
      DeletePracticesByTestIdApiArg
    >({
      query: (queryArg) => ({
        url: `/practices/${queryArg.testId}`,
        method: "DELETE",
      }),
    }),
    getPracticesByTestIdAggregate: build.query<
      GetPracticesByTestIdAggregateApiResponse,
      GetPracticesByTestIdAggregateApiArg
    >({
      query: (queryArg) => ({ url: `/practices/${queryArg.testId}/aggregate` }),
    }),
    getPracticesByTestIdQuestionsToDo: build.query<
      GetPracticesByTestIdQuestionsToDoApiResponse,
      GetPracticesByTestIdQuestionsToDoApiArg
    >({
      query: (queryArg) => ({
        url: `/practices/${queryArg.testId}/questions-to-do`,
      }),
    }),
    getPracticesByTestIdQuestionsWithAnswer: build.query<
      GetPracticesByTestIdQuestionsWithAnswerApiResponse,
      GetPracticesByTestIdQuestionsWithAnswerApiArg
    >({
      query: (queryArg) => ({
        url: `/practices/${queryArg.testId}/questions-with-answer`,
      }),
    }),
    getPracticesByTestIdFeedback: build.query<
      GetPracticesByTestIdFeedbackApiResponse,
      GetPracticesByTestIdFeedbackApiArg
    >({
      query: (queryArg) => ({ url: `/practices/${queryArg.testId}/feedback` }),
    }),
    postPracticesByTestIdFeedback: build.mutation<
      PostPracticesByTestIdFeedbackApiResponse,
      PostPracticesByTestIdFeedbackApiArg
    >({
      query: (queryArg) => ({
        url: `/practices/${queryArg.testId}/feedback`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    deletePracticesByTestIdFeedback: build.mutation<
      DeletePracticesByTestIdFeedbackApiResponse,
      DeletePracticesByTestIdFeedbackApiArg
    >({
      query: (queryArg) => ({
        url: `/practices/${queryArg.testId}/feedback`,
        method: "DELETE",
      }),
    }),
    getTestsByTestId: build.query<
      GetTestsByTestIdApiResponse,
      GetTestsByTestIdApiArg
    >({
      query: (queryArg) => ({ url: `/tests/${queryArg.testId}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as testApiGen };
export type GetCurrentAttemptsByAttemptIdApiResponse =
  /** status 200 Success */ {
    id: string;
    order: number;
    testId: string;
    candidateId: string;
    hasEnded: boolean;
    secondsSpent: number;
    score: number;
    createdAt: string;
    updatedAt: string;
    test: {
      id: string;
      authorId: string;
      title: string;
      description: string;
      minutesToAnswer: number;
      language: string;
      mode: string;
      createdAt: string;
      updatedAt: string;
    };
  } | null;
export type GetCurrentAttemptsByAttemptIdApiArg = {
  attemptId: string;
};
export type GetCurrentTestsByTestIdApiResponse = /** status 200 Success */ {
  id: string;
  order: number;
  testId: string;
  candidateId: string;
  hasEnded: boolean;
  secondsSpent: number;
  score: number;
  createdAt: string;
  updatedAt: string;
  test: {
    id: string;
    authorId: string;
    title: string;
    description: string;
    minutesToAnswer: number;
    language: string;
    mode: string;
    createdAt: string;
    updatedAt: string;
  };
} | null;
export type GetCurrentTestsByTestIdApiArg = {
  testId: string;
};
export type GetCurrentAttemptsByAttemptIdAnswersApiResponse =
  /** status 200 Success */ {
    attemptId: string;
    questionId: number;
    chosenOption: number;
  }[];
export type GetCurrentAttemptsByAttemptIdAnswersApiArg = {
  attemptId: string;
};
export type PatchCurrentAttemptsByAttemptIdAnswersApiResponse = unknown;
export type PatchCurrentAttemptsByAttemptIdAnswersApiArg = {
  attemptId: string;
  body: {
    questionId: number | null;
    chosenOption?: number | null;
  };
};
export type PatchCurrentAttemptsByAttemptIdSubmitApiResponse = unknown;
export type PatchCurrentAttemptsByAttemptIdSubmitApiArg = {
  attemptId: string;
};
export type GetExamsByTestIdAttemptsApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: {
    id: string;
    order: number;
    testId: string;
    candidateId: string;
    hasEnded: boolean;
    secondsSpent: number;
    score: number;
    createdAt: string;
    updatedAt: string;
  }[];
};
export type GetExamsByTestIdAttemptsApiArg = {
  testId: string;
  page?: number;
  perPage?: number | null;
  sort: string;
};
export type GetExamsByTestIdAttemptsSelfApiResponse =
  /** status 200 Success */ {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: {
      id: string;
      order: number;
      testId: string;
      candidateId: string;
      hasEnded: boolean;
      secondsSpent: number;
      score: number;
      createdAt: string;
      updatedAt: string;
    }[];
  };
export type GetExamsByTestIdAttemptsSelfApiArg = {
  testId: string;
  page?: number;
  perPage?: number | null;
  sort: string;
};
export type GetExamsByTestIdAttemptsAggregateApiResponse =
  /** status 200 Success */ {
    totalParticipants: number;
    totalAttempts: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    averageTime: number;
  };
export type GetExamsByTestIdAttemptsAggregateApiArg = {
  testId: string;
};
export type GetExamsByTestIdParticipantsAggregateApiResponse =
  /** status 200 Success */ {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: {
      candidateId: string;
      rank: number;
      totalAttempts: number;
      averageScore: number;
      highestScore: number;
      lowestScore: number;
      averageTime: number;
    }[];
  };
export type GetExamsByTestIdParticipantsAggregateApiArg = {
  testId: string;
  page?: number;
  perPage?: number | null;
};
export type GetExamsByTestIdCandidateAndCandidateIdAttemptsApiResponse =
  /** status 200 Success */ {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: {
      id: string;
      order: number;
      testId: string;
      candidateId: string;
      hasEnded: boolean;
      secondsSpent: number;
      score: number;
      createdAt: string;
      updatedAt: string;
    }[];
  };
export type GetExamsByTestIdCandidateAndCandidateIdAttemptsApiArg = {
  testId: string;
  candidateId: string;
  page?: number;
  perPage?: number | null;
  sort: string;
};
export type GetExamsByTestIdCandidateAndCandidateIdAttemptsAggregateApiResponse =
  /** status 200 Success */ {
    candidateId: string;
    rank: number;
    totalAttempts: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    averageTime: number;
  };
export type GetExamsByTestIdCandidateAndCandidateIdAttemptsAggregateApiArg = {
  testId: string;
  candidateId: string;
};
export type GetExamsAttemptsByAttemptIdApiResponse = /** status 200 Success */ {
  id: string;
  order: number;
  testId: string;
  candidateId: string;
  hasEnded: boolean;
  secondsSpent: number;
  score: number;
  createdAt: string;
  updatedAt: string;
};
export type GetExamsAttemptsByAttemptIdApiArg = {
  attemptId: string;
};
export type GetExamsAttemptsByAttemptIdAggregateApiResponse =
  /** status 200 Success */ {
    answered: number;
    answeredCorrect: number;
  };
export type GetExamsAttemptsByAttemptIdAggregateApiArg = {
  attemptId: string;
};
export type GetExamsAttemptsByAttemptIdAnswersApiResponse =
  /** status 200 Success */ {
    attemptId: string;
    questionId: number;
    chosenOption: number;
  }[];
export type GetExamsAttemptsByAttemptIdAnswersApiArg = {
  attemptId: string;
};
export type PostExamsByTestIdAttemptsStartApiResponse = unknown;
export type PostExamsByTestIdAttemptsStartApiArg = {
  testId: string;
};
export type GetHistoryAttemptsApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: {
    id: string;
    order: number;
    testId: string;
    candidateId: string;
    hasEnded: boolean;
    secondsSpent: number;
    score: number;
    createdAt: string;
    updatedAt: string;
    test: {
      id: string;
      authorId: string;
      title: string;
      description: string;
      minutesToAnswer: number;
      language: string;
      mode: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
};
export type GetHistoryAttemptsApiArg = {
  page?: number;
  perPage?: number | null;
  sort: string;
  testId?: string;
};
export type GetHistoryAttemptsByAttemptIdApiResponse =
  /** status 200 Success */ {
    id: string;
    order: number;
    testId: string;
    candidateId: string;
    hasEnded: boolean;
    secondsSpent: number;
    score: number;
    createdAt: string;
    updatedAt: string;
    test: {
      id: string;
      authorId: string;
      title: string;
      description: string;
      minutesToAnswer: number;
      language: string;
      mode: string;
      createdAt: string;
      updatedAt: string;
    };
  };
export type GetHistoryAttemptsByAttemptIdApiArg = {
  attemptId: string;
};
export type GetPracticesByTestIdAttemptsApiResponse =
  /** status 200 Success */ {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: {
      id: string;
      order: number;
      testId: string;
      candidateId: string;
      hasEnded: boolean;
      secondsSpent: number;
      score: number;
      createdAt: string;
      updatedAt: string;
    }[];
  };
export type GetPracticesByTestIdAttemptsApiArg = {
  testId: string;
  page?: number;
  perPage?: number | null;
  sort: string;
};
export type GetPracticesByTestIdAttemptsAggregateApiResponse =
  /** status 200 Success */ {
    totalParticipants: number;
    totalAttempts: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    averageTime: number;
  };
export type GetPracticesByTestIdAttemptsAggregateApiArg = {
  testId: string;
};
export type GetPracticesAttemptsByAttemptIdApiResponse =
  /** status 200 Success */ {
    id: string;
    order: number;
    testId: string;
    candidateId: string;
    hasEnded: boolean;
    secondsSpent: number;
    score: number;
    createdAt: string;
    updatedAt: string;
  };
export type GetPracticesAttemptsByAttemptIdApiArg = {
  attemptId: string;
};
export type GetPracticesAttemptsByAttemptIdAggregateApiResponse =
  /** status 200 Success */ {
    answered: number;
    answeredCorrect: number;
  };
export type GetPracticesAttemptsByAttemptIdAggregateApiArg = {
  attemptId: string;
};
export type GetPracticesAttemptsByAttemptIdAnswersApiResponse =
  /** status 200 Success */ {
    attemptId: string;
    questionId: number;
    chosenOption: number;
  }[];
export type GetPracticesAttemptsByAttemptIdAnswersApiArg = {
  attemptId: string;
};
export type PostPracticesByTestIdAttemptsStartApiResponse = unknown;
export type PostPracticesByTestIdAttemptsStartApiArg = {
  testId: string;
};
export type GetExamsApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: {
    id: string;
    authorId: string;
    title: string;
    description: string;
    minutesToAnswer: number;
    language: string;
    mode: string;
    createdAt: string;
    updatedAt: string;
    hasPassword: boolean;
    roomId: string;
    numberOfAttemptsAllowed: number;
    isAnswerVisible: boolean;
    isAllowedToSeeOtherResults: boolean;
    openDate: string;
    closeDate: string;
  }[];
};
export type GetExamsApiArg = {
  page?: number;
  perPage?: number | null;
  searchTitle?: string;
  sort?: string;
};
export type PostExamsApiResponse = /** status 200 Success */ {
  testId: string;
};
export type PostExamsApiArg = {
  body: {
    test: {
      title: string;
      description: string;
      minutesToAnswer: number;
      language: string;
      mode: string;
    };
    questions: {
      text: string;
      options: string[];
      points: number;
      correctOption: number;
    }[];
    exam: {
      hasPassword: boolean;
      roomId: string;
      numberOfAttemptsAllowed: number;
      isAnswerVisible: boolean;
      isAllowedToSeeOtherResults: boolean;
      openDate: string;
      closeDate: string;
    };
  };
};
export type GetExamsFindApiResponse = /** status 200 Success */ {
  id: string;
  authorId: string;
  title: string;
  description: string;
  minutesToAnswer: number;
  language: string;
  mode: string;
  createdAt: string;
  updatedAt: string;
  hasPassword: boolean;
  roomId: string;
  numberOfAttemptsAllowed: number;
  isAnswerVisible: boolean;
  isAllowedToSeeOtherResults: boolean;
  openDate: string;
  closeDate: string;
  hasJoined: boolean;
};
export type GetExamsFindApiArg = {
  roomId: string;
};
export type GetExamsByTestIdApiResponse = /** status 200 Success */ {
  id: string;
  authorId: string;
  title: string;
  description: string;
  minutesToAnswer: number;
  language: string;
  mode: string;
  createdAt: string;
  updatedAt: string;
  hasPassword: boolean;
  roomId: string;
  numberOfAttemptsAllowed: number;
  isAnswerVisible: boolean;
  isAllowedToSeeOtherResults: boolean;
  openDate: string;
  closeDate: string;
};
export type GetExamsByTestIdApiArg = {
  testId: string;
};
export type PutExamsByTestIdApiResponse = unknown;
export type PutExamsByTestIdApiArg = {
  testId: string;
  body: {
    test: {
      title: string;
      description: string;
      minutesToAnswer: number;
      language: string;
      mode: string;
    };
    questions: {
      text: string;
      options: string[];
      points: number;
      correctOption: number;
    }[];
    exam: {
      hasPassword: boolean;
      roomId: string;
      numberOfAttemptsAllowed: number;
      isAnswerVisible: boolean;
      isAllowedToSeeOtherResults: boolean;
      openDate: string;
      closeDate: string;
    };
    testId: string;
  };
};
export type DeleteExamsByTestIdApiResponse = unknown;
export type DeleteExamsByTestIdApiArg = {
  testId: string;
};
export type GetExamsByTestIdAggregateApiResponse = /** status 200 Success */ {
  numberOfQuestions: number;
  totalPoints: number;
};
export type GetExamsByTestIdAggregateApiArg = {
  testId: string;
};
export type GetExamsByTestIdParticipantsApiResponse =
  /** status 200 Success */ {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: string[];
  };
export type GetExamsByTestIdParticipantsApiArg = {
  testId: string;
  page?: number;
  perPage?: number;
};
export type GetExamsByTestIdQuestionsToDoApiResponse =
  /** status 200 Success */ {
    id: number;
    testId: string;
    text: string;
    options: string[];
    points: number;
  }[];
export type GetExamsByTestIdQuestionsToDoApiArg = {
  testId: string;
};
export type GetExamsByTestIdQuestionsWithAnswerApiResponse =
  /** status 200 Success */ {
    id: number;
    testId: string;
    text: string;
    options: string[];
    points: number;
    correctOption: number;
  }[];
export type GetExamsByTestIdQuestionsWithAnswerApiArg = {
  testId: string;
};
export type PostExamsJoinApiResponse = unknown;
export type PostExamsJoinApiArg = {
  body: {
    testId: string;
    password?: string;
  };
};
export type GetTemplatesApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: {
    id: string;
    userId: string;
    name: string;
    title: string;
    description: string;
    difficulty: string;
    tags: string[];
    numberOfQuestions: number;
    numberOfOptions: number;
    outlines: string[];
    createdAt: string;
    updatedAt: string;
  }[];
};
export type GetTemplatesApiArg = {
  searchName?: string;
  page?: number;
  perPage?: number | null;
};
export type PostTemplatesApiResponse = /** status 200 Success */ {
  templateId: string;
};
export type PostTemplatesApiArg = {
  body: {
    name: string;
    title: string;
    description: string;
    difficulty: string;
    tags: string[];
    numberOfQuestions: number;
    numberOfOptions: number;
    outlines: string[];
  };
};
export type GetTemplatesByTemplateIdApiResponse = /** status 200 Success */ {
  id: string;
  userId: string;
  name: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  numberOfQuestions: number;
  numberOfOptions: number;
  outlines: string[];
  createdAt: string;
  updatedAt: string;
};
export type GetTemplatesByTemplateIdApiArg = {
  templateId: string;
};
export type PutTemplatesByTemplateIdApiResponse = unknown;
export type PutTemplatesByTemplateIdApiArg = {
  templateId: string;
  body: {
    name?: string;
    title?: string;
    description?: string;
    difficulty?: string;
    tags?: string[];
    numberOfQuestions?: number;
    numberOfOptions?: number;
    outlines?: string[];
  };
};
export type DeleteTemplatesByTemplateIdApiResponse = unknown;
export type DeleteTemplatesByTemplateIdApiArg = {
  templateId: string;
};
export type GetPracticesApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: {
    id: string;
    authorId: string;
    title: string;
    description: string;
    minutesToAnswer: number;
    language: string;
    mode: string;
    createdAt: string;
    updatedAt: string;
    difficulty: "easy" | "medium" | "hard";
    tags: string[];
    numberOfQuestions: number;
    numberOfOptions: number;
    outlines: string[];
  }[];
};
export type GetPracticesApiArg = {
  page?: number;
  perPage?: number | null;
  searchTitle?: string;
  sort?: string;
};
export type PostPracticesApiResponse = /** status 200 Success */ {
  testId: string;
};
export type PostPracticesApiArg = {
  body: {
    test: {
      title: string;
      description: string;
      minutesToAnswer: number;
      language: string;
      mode: string;
    };
    questions: {
      text: string;
      options: string[];
      points: number;
      correctOption: number;
    }[];
    practice: {
      difficulty: "easy" | "medium" | "hard";
      tags: string[];
      numberOfQuestions: number;
      numberOfOptions: number;
      outlines: string[];
    };
  };
};
export type GetPracticesByTestIdApiResponse = /** status 200 Success */ {
  id: string;
  authorId: string;
  title: string;
  description: string;
  minutesToAnswer: number;
  language: string;
  mode: string;
  createdAt: string;
  updatedAt: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  numberOfQuestions: number;
  numberOfOptions: number;
  outlines: string[];
};
export type GetPracticesByTestIdApiArg = {
  testId: string;
};
export type DeletePracticesByTestIdApiResponse = unknown;
export type DeletePracticesByTestIdApiArg = {
  testId: string;
};
export type GetPracticesByTestIdAggregateApiResponse =
  /** status 200 Success */ {
    numberOfQuestions: number;
    totalPoints: number;
  };
export type GetPracticesByTestIdAggregateApiArg = {
  testId: string;
};
export type GetPracticesByTestIdQuestionsToDoApiResponse =
  /** status 200 Success */ {
    id: number;
    testId: string;
    text: string;
    options: string[];
    points: number;
  }[];
export type GetPracticesByTestIdQuestionsToDoApiArg = {
  testId: string;
};
export type GetPracticesByTestIdQuestionsWithAnswerApiResponse =
  /** status 200 Success */ {
    id: number;
    testId: string;
    text: string;
    options: string[];
    points: number;
    correctOption: number;
  }[];
export type GetPracticesByTestIdQuestionsWithAnswerApiArg = {
  testId: string;
};
export type GetPracticesByTestIdFeedbackApiResponse =
  /** status 200 Success */ {
    practiceTestId: string;
    rating: number;
    problems: (
      | "inaccurate"
      | "un-related"
      | "poor content"
      | "incomplete"
      | "repeated"
      | "error"
      | "other"
    )[];
    comment: string;
  } | null;
export type GetPracticesByTestIdFeedbackApiArg = {
  testId: string;
};
export type PostPracticesByTestIdFeedbackApiResponse = unknown;
export type PostPracticesByTestIdFeedbackApiArg = {
  testId: string;
  body: {
    rating: number;
    problems?: (
      | "inaccurate"
      | "un-related"
      | "poor content"
      | "incomplete"
      | "repeated"
      | "error"
      | "other"
    )[];
    comment?: string;
  };
};
export type DeletePracticesByTestIdFeedbackApiResponse = unknown;
export type DeletePracticesByTestIdFeedbackApiArg = {
  testId: string;
};
export type GetTestsByTestIdApiResponse = unknown;
export type GetTestsByTestIdApiArg = {
  testId: string;
};
export const {
  useGetCurrentAttemptsByAttemptIdQuery,
  useLazyGetCurrentAttemptsByAttemptIdQuery,
  useGetCurrentTestsByTestIdQuery,
  useLazyGetCurrentTestsByTestIdQuery,
  useGetCurrentAttemptsByAttemptIdAnswersQuery,
  useLazyGetCurrentAttemptsByAttemptIdAnswersQuery,
  usePatchCurrentAttemptsByAttemptIdAnswersMutation,
  usePatchCurrentAttemptsByAttemptIdSubmitMutation,
  useGetExamsByTestIdAttemptsQuery,
  useLazyGetExamsByTestIdAttemptsQuery,
  useGetExamsByTestIdAttemptsSelfQuery,
  useLazyGetExamsByTestIdAttemptsSelfQuery,
  useGetExamsByTestIdAttemptsAggregateQuery,
  useLazyGetExamsByTestIdAttemptsAggregateQuery,
  useGetExamsByTestIdParticipantsAggregateQuery,
  useLazyGetExamsByTestIdParticipantsAggregateQuery,
  useGetExamsByTestIdCandidateAndCandidateIdAttemptsQuery,
  useLazyGetExamsByTestIdCandidateAndCandidateIdAttemptsQuery,
  useGetExamsByTestIdCandidateAndCandidateIdAttemptsAggregateQuery,
  useLazyGetExamsByTestIdCandidateAndCandidateIdAttemptsAggregateQuery,
  useGetExamsAttemptsByAttemptIdQuery,
  useLazyGetExamsAttemptsByAttemptIdQuery,
  useGetExamsAttemptsByAttemptIdAggregateQuery,
  useLazyGetExamsAttemptsByAttemptIdAggregateQuery,
  useGetExamsAttemptsByAttemptIdAnswersQuery,
  useLazyGetExamsAttemptsByAttemptIdAnswersQuery,
  usePostExamsByTestIdAttemptsStartMutation,
  useGetHistoryAttemptsQuery,
  useLazyGetHistoryAttemptsQuery,
  useGetHistoryAttemptsByAttemptIdQuery,
  useLazyGetHistoryAttemptsByAttemptIdQuery,
  useGetPracticesByTestIdAttemptsQuery,
  useLazyGetPracticesByTestIdAttemptsQuery,
  useGetPracticesByTestIdAttemptsAggregateQuery,
  useLazyGetPracticesByTestIdAttemptsAggregateQuery,
  useGetPracticesAttemptsByAttemptIdQuery,
  useLazyGetPracticesAttemptsByAttemptIdQuery,
  useGetPracticesAttemptsByAttemptIdAggregateQuery,
  useLazyGetPracticesAttemptsByAttemptIdAggregateQuery,
  useGetPracticesAttemptsByAttemptIdAnswersQuery,
  useLazyGetPracticesAttemptsByAttemptIdAnswersQuery,
  usePostPracticesByTestIdAttemptsStartMutation,
  useGetExamsQuery,
  useLazyGetExamsQuery,
  usePostExamsMutation,
  useGetExamsFindQuery,
  useLazyGetExamsFindQuery,
  useGetExamsByTestIdQuery,
  useLazyGetExamsByTestIdQuery,
  usePutExamsByTestIdMutation,
  useDeleteExamsByTestIdMutation,
  useGetExamsByTestIdAggregateQuery,
  useLazyGetExamsByTestIdAggregateQuery,
  useGetExamsByTestIdParticipantsQuery,
  useLazyGetExamsByTestIdParticipantsQuery,
  useGetExamsByTestIdQuestionsToDoQuery,
  useLazyGetExamsByTestIdQuestionsToDoQuery,
  useGetExamsByTestIdQuestionsWithAnswerQuery,
  useLazyGetExamsByTestIdQuestionsWithAnswerQuery,
  usePostExamsJoinMutation,
  useGetTemplatesQuery,
  useLazyGetTemplatesQuery,
  usePostTemplatesMutation,
  useGetTemplatesByTemplateIdQuery,
  useLazyGetTemplatesByTemplateIdQuery,
  usePutTemplatesByTemplateIdMutation,
  useDeleteTemplatesByTemplateIdMutation,
  useGetPracticesQuery,
  useLazyGetPracticesQuery,
  usePostPracticesMutation,
  useGetPracticesByTestIdQuery,
  useLazyGetPracticesByTestIdQuery,
  useDeletePracticesByTestIdMutation,
  useGetPracticesByTestIdAggregateQuery,
  useLazyGetPracticesByTestIdAggregateQuery,
  useGetPracticesByTestIdQuestionsToDoQuery,
  useLazyGetPracticesByTestIdQuestionsToDoQuery,
  useGetPracticesByTestIdQuestionsWithAnswerQuery,
  useLazyGetPracticesByTestIdQuestionsWithAnswerQuery,
  useGetPracticesByTestIdFeedbackQuery,
  useLazyGetPracticesByTestIdFeedbackQuery,
  usePostPracticesByTestIdFeedbackMutation,
  useDeletePracticesByTestIdFeedbackMutation,
  useGetTestsByTestIdQuery,
  useLazyGetTestsByTestIdQuery,
} = injectedRtkApi;

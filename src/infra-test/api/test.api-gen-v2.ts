import { testApi as api } from "../base/test.api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCandidatesByCandidateIdAttempts: build.query<
      GetCandidatesByCandidateIdAttemptsApiResponse,
      GetCandidatesByCandidateIdAttemptsApiArg
    >({
      query: (queryArg) => ({
        url: `/candidates/${queryArg.candidateId}/attempts`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
          testId: queryArg.testId,
        },
      }),
    }),
    getFeedbacks: build.query<GetFeedbacksApiResponse, GetFeedbacksApiArg>({
      query: (queryArg) => ({
        url: `/feedbacks`,
        params: {
          testId: queryArg.testId,
          sortByCreatedAt: queryArg.sortByCreatedAt,
          sortByRating: queryArg.sortByRating,
          filterByProblems: queryArg.filterByProblems,
        },
      }),
    }),
    postFeedbacks: build.mutation<
      PostFeedbacksApiResponse,
      PostFeedbacksApiArg
    >({
      query: (queryArg) => ({
        url: `/feedbacks`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getFeedbacksByFeedbackId: build.query<
      GetFeedbacksByFeedbackIdApiResponse,
      GetFeedbacksByFeedbackIdApiArg
    >({
      query: (queryArg) => ({ url: `/feedbacks/${queryArg.feedbackId}` }),
    }),
    putFeedbacksByFeedbackId: build.mutation<
      PutFeedbacksByFeedbackIdApiResponse,
      PutFeedbacksByFeedbackIdApiArg
    >({
      query: (queryArg) => ({
        url: `/feedbacks/${queryArg.feedbackId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteFeedbacksByFeedbackId: build.mutation<
      DeleteFeedbacksByFeedbackIdApiResponse,
      DeleteFeedbacksByFeedbackIdApiArg
    >({
      query: (queryArg) => ({
        url: `/feedbacks/${queryArg.feedbackId}`,
        method: "DELETE",
      }),
    }),
    getTemplates: build.query<GetTemplatesApiResponse, GetTemplatesApiArg>({
      query: (queryArg) => ({
        url: `/templates`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
          search: queryArg.search,
          sortByCreatedAt: queryArg.sortByCreatedAt,
          sortByName: queryArg.sortByName,
          filterTags: queryArg.filterTags,
          filterDifficulty: queryArg.filterDifficulty,
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
    getTests: build.query<GetTestsApiResponse, GetTestsApiArg>({
      query: (queryArg) => ({
        url: `/tests`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
          mode: queryArg.mode,
          authorId: queryArg.authorId,
          candidateId: queryArg.candidateId,
          searchTitle: queryArg.searchTitle,
          sortCreatedAt: queryArg.sortCreatedAt,
          sortTitle: queryArg.sortTitle,
        },
      }),
    }),
    postTests: build.mutation<PostTestsApiResponse, PostTestsApiArg>({
      query: (queryArg) => ({
        url: `/tests`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getTestsFindByRoom: build.query<
      GetTestsFindByRoomApiResponse,
      GetTestsFindByRoomApiArg
    >({
      query: (queryArg) => ({
        url: `/tests/find-by-room`,
        params: {
          roomId: queryArg.roomId,
        },
      }),
    }),
    getTestsByTestId: build.query<
      GetTestsByTestIdApiResponse,
      GetTestsByTestIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tests/${queryArg.testId}`,
        params: {
          viewPassword: queryArg.viewPassword,
        },
      }),
    }),
    putTestsByTestId: build.mutation<
      PutTestsByTestIdApiResponse,
      PutTestsByTestIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tests/${queryArg.testId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteTestsByTestId: build.mutation<
      DeleteTestsByTestIdApiResponse,
      DeleteTestsByTestIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tests/${queryArg.testId}`,
        method: "DELETE",
      }),
    }),
    getTestsByTestIdAttempts: build.query<
      GetTestsByTestIdAttemptsApiResponse,
      GetTestsByTestIdAttemptsApiArg
    >({
      query: (queryArg) => ({
        url: `/tests/${queryArg.testId}/attempts`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
          candidateId: queryArg.candidateId,
          status: queryArg.status,
        },
      }),
    }),
    getTestsByTestIdParticipants: build.query<
      GetTestsByTestIdParticipantsApiResponse,
      GetTestsByTestIdParticipantsApiArg
    >({
      query: (queryArg) => ({
        url: `/tests/${queryArg.testId}/participants`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
          sortByRank: queryArg.sortByRank,
        },
      }),
    }),
    postTestsByTestIdParticipants: build.mutation<
      PostTestsByTestIdParticipantsApiResponse,
      PostTestsByTestIdParticipantsApiArg
    >({
      query: (queryArg) => ({
        url: `/tests/${queryArg.testId}/participants`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    deleteTestsByTestIdParticipants: build.mutation<
      DeleteTestsByTestIdParticipantsApiResponse,
      DeleteTestsByTestIdParticipantsApiArg
    >({
      query: (queryArg) => ({
        url: `/tests/${queryArg.testId}/participants`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    getAttempts: build.query<GetAttemptsApiResponse, GetAttemptsApiArg>({
      query: (queryArg) => ({
        url: `/attempts`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
          testId: queryArg.testId,
          candidateId: queryArg.candidateId,
          status: queryArg.status,
        },
      }),
    }),
    postAttempts: build.mutation<PostAttemptsApiResponse, PostAttemptsApiArg>({
      query: (queryArg) => ({
        url: `/attempts`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getAttemptsByAttemptId: build.query<
      GetAttemptsByAttemptIdApiResponse,
      GetAttemptsByAttemptIdApiArg
    >({
      query: (queryArg) => ({ url: `/attempts/${queryArg.attemptId}` }),
    }),
    getAttemptsByAttemptIdAnswers: build.query<
      GetAttemptsByAttemptIdAnswersApiResponse,
      GetAttemptsByAttemptIdAnswersApiArg
    >({
      query: (queryArg) => ({ url: `/attempts/${queryArg.attemptId}/answers` }),
    }),
    postAttemptsByAttemptIdAnswers: build.mutation<
      PostAttemptsByAttemptIdAnswersApiResponse,
      PostAttemptsByAttemptIdAnswersApiArg
    >({
      query: (queryArg) => ({
        url: `/attempts/${queryArg.attemptId}/answers`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    patchAttemptsByAttemptIdSubmit: build.mutation<
      PatchAttemptsByAttemptIdSubmitApiResponse,
      PatchAttemptsByAttemptIdSubmitApiArg
    >({
      query: (queryArg) => ({
        url: `/attempts/${queryArg.attemptId}/submit`,
        method: "PATCH",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as testApiGenV2 };
export type GetCandidatesByCandidateIdAttemptsApiResponse =
  /** status 200 Success */ {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: AttemptCoreSchema[];
  };
export type GetCandidatesByCandidateIdAttemptsApiArg = {
  candidateId: string;
  page?: number;
  perPage?: number | null;
  testId?: string;
};
export type GetFeedbacksApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: FeedbackCoreSchema[];
};
export type GetFeedbacksApiArg = {
  testId: string;
  sortByCreatedAt?: "asc" | "desc";
  sortByRating?: "asc" | "desc";
  filterByProblems?: string[];
};
export type PostFeedbacksApiResponse = unknown;
export type PostFeedbacksApiArg = {
  body: {
    testId: string;
    rating: number;
    problems?: (
      | "inaccurate"
      | "un-related"
      | "poor content"
      | "incomplete"
      | "repeated"
      | "error"
      | "other"
      | ""
    )[];
    comment?: string;
  };
};
export type GetFeedbacksByFeedbackIdApiResponse =
  /** status 200 Success */ FeedbackCoreSchema;
export type GetFeedbacksByFeedbackIdApiArg = {
  feedbackId: string;
};
export type PutFeedbacksByFeedbackIdApiResponse = unknown;
export type PutFeedbacksByFeedbackIdApiArg = {
  feedbackId: string;
  body: {
    testId: string;
    rating: number;
    problems?: (
      | "inaccurate"
      | "un-related"
      | "poor content"
      | "incomplete"
      | "repeated"
      | "error"
      | "other"
      | ""
    )[];
    comment?: string;
  };
};
export type DeleteFeedbacksByFeedbackIdApiResponse = unknown;
export type DeleteFeedbacksByFeedbackIdApiArg = {
  feedbackId: string;
};
export type GetTemplatesApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: TemplateCoreSchema[];
};
export type GetTemplatesApiArg = {
  page?: number;
  perPage?: number | null;
  search?: string;
  sortByCreatedAt?: "asc" | "desc";
  sortByName?: "asc" | "desc";
  filterTags?: string[];
  filterDifficulty?: string[];
};
export type PostTemplatesApiResponse = /** status 200 Success */ {
  templateId: string;
};
export type PostTemplatesApiArg = {
  body: {
    name: string;
    title: string;
    description: string;
    language: string;
    minutesToAnswer: number;
    difficulty: string;
    tags: string[];
    numberOfQuestions: number;
    numberOfOptions: number;
    outlines: string[];
  };
};
export type GetTemplatesByTemplateIdApiResponse =
  /** status 200 Success */ TemplateCoreSchema;
export type GetTemplatesByTemplateIdApiArg = {
  templateId: string;
};
export type PutTemplatesByTemplateIdApiResponse = unknown;
export type PutTemplatesByTemplateIdApiArg = {
  templateId: string;
  body: {
    name: string;
    title: string;
    description: string;
    language: string;
    minutesToAnswer: number;
    difficulty: string;
    tags: string[];
    numberOfQuestions: number;
    numberOfOptions: number;
    outlines: string[];
  };
};
export type DeleteTemplatesByTemplateIdApiResponse = unknown;
export type DeleteTemplatesByTemplateIdApiArg = {
  templateId: string;
};
export type GetTestsApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: TestFullSchema[];
};
export type GetTestsApiArg = {
  page?: number;
  perPage?: number | null;
  mode?: "EXAM" | "PRACTICE";
  authorId?: string;
  candidateId?: string;
  searchTitle?: string;
  sortCreatedAt?: "asc" | "desc";
  sortTitle?: "asc" | "desc";
};
export type PostTestsApiResponse = /** status 200 Success */ {
  testId: string;
};
export type PostTestsApiArg = {
  body: {
    title: string;
    description: string;
    minutesToAnswer: number;
    language: string;
    mode: "EXAM" | "PRACTICE";
    detail:
      | {
          mode: "EXAM";
          roomId: string;
          password?: string | null;
          numberOfAttemptsAllowed?: number;
          numberOfParticipants?: number;
          isAnswerVisible: boolean;
          isAllowedToSeeOtherResults: boolean;
          openDate: string | null;
          closeDate: string | null;
          isPublic?: boolean;
        }
      | PracticeDetailCommonSchema;
    questions: {
      text: string;
      points: number;
      type: "MCQ" | "LONG_ANSWER";
      detail:
        | (McqDetailCommonSchema & {
            correctOption?: number;
          })
        | (LongAnswerDetailCommonSchema & {
            correctAnswer?: string;
          });
    }[];
  };
};
export type GetTestsFindByRoomApiResponse = /** status 200 Success */ {
  data: TestFullSchema &
    (TestCoreSchema &
      ({
        _aggregate: {
          numberOfQuestions: number;
          totalPoints: number;
          totalCandidates: number;
          totalAttempts: number;
          averageScore: number;
          highestScore: number;
          lowestScore: number;
          averageTime: number;
        };
        _detail: TestDetailCommonSchema;
      } | null));
  hasJoined?: boolean;
};
export type GetTestsFindByRoomApiArg = {
  roomId: string;
};
export type GetTestsByTestIdApiResponse =
  /** status 200 Success */ TestFullSchema;
export type GetTestsByTestIdApiArg = {
  testId: string;
  viewPassword?: "1" | "0";
};
export type PutTestsByTestIdApiResponse = unknown;
export type PutTestsByTestIdApiArg = {
  testId: string;
  body: {
    title: string;
    description: string;
    minutesToAnswer: number;
    language: string;
    mode: "EXAM" | "PRACTICE";
    detail:
      | {
          mode: "EXAM";
          roomId: string;
          password?: string | null;
          numberOfAttemptsAllowed?: number;
          numberOfParticipants?: number;
          isAnswerVisible: boolean;
          isAllowedToSeeOtherResults: boolean;
          openDate: string | null;
          closeDate: string | null;
          isPublic?: boolean;
        }
      | PracticeDetailCommonSchema;
    questions: {
      text: string;
      points: number;
      type: "MCQ" | "LONG_ANSWER";
      detail:
        | (McqDetailCommonSchema & {
            correctOption?: number;
          })
        | (LongAnswerDetailCommonSchema & {
            correctAnswer?: string;
          });
    }[];
  };
};
export type DeleteTestsByTestIdApiResponse = unknown;
export type DeleteTestsByTestIdApiArg = {
  testId: string;
};
export type GetTestsByTestIdAttemptsApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: AttemptCoreSchema[];
};
export type GetTestsByTestIdAttemptsApiArg = {
  testId: string;
  page?: number;
  perPage?: number | null;
  candidateId?: string;
  status?: "IN_PROGRESS" | "COMPLETED" | "GRADED";
};
export type GetTestsByTestIdParticipantsApiResponse =
  /** status 200 Success */ {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: CandidateCoreSchema[];
  };
export type GetTestsByTestIdParticipantsApiArg = {
  testId: string;
  page?: number;
  perPage?: number | null;
  sortByRank?: "asc" | "desc";
};
export type PostTestsByTestIdParticipantsApiResponse = unknown;
export type PostTestsByTestIdParticipantsApiArg = {
  testId: string;
  body: {
    password?: string | null;
  };
};
export type DeleteTestsByTestIdParticipantsApiResponse = unknown;
export type DeleteTestsByTestIdParticipantsApiArg = {
  testId: string;
  body: {
    participantId: string;
  };
};
export type GetAttemptsApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: AttemptCoreSchema[];
};
export type GetAttemptsApiArg = {
  page?: number;
  perPage?: number | null;
  testId?: string;
  candidateId?: string;
  status?: "IN_PROGRESS" | "COMPLETED" | "GRADED";
};
export type PostAttemptsApiResponse = /** status 200 Success */ {
  attemptId: string;
};
export type PostAttemptsApiArg = {
  body: {
    testId: string;
  };
};
export type GetAttemptsByAttemptIdApiResponse =
  /** status 200 Success */ AttemptCoreSchema;
export type GetAttemptsByAttemptIdApiArg = {
  attemptId: string;
};
export type GetAttemptsByAttemptIdAnswersApiResponse =
  /** status 200 Success */ AnswerCoreSchema[];
export type GetAttemptsByAttemptIdAnswersApiArg = {
  attemptId: string;
};
export type PostAttemptsByAttemptIdAnswersApiResponse = unknown;
export type PostAttemptsByAttemptIdAnswersApiArg = {
  attemptId: string;
  body: {
    questionId: number;
    answer: AnswerForQuestionTypeSchema &
      (
        | {
            type: "MCQ";
            chosenOption: number;
          }
        | {
            type: "LONG_ANSWER";
            answer: string;
          }
        | null
      );
  };
};
export type PatchAttemptsByAttemptIdSubmitApiResponse = unknown;
export type PatchAttemptsByAttemptIdSubmitApiArg = {
  attemptId: string;
};
export type TestCoreSchema = {
  id: string;
  authorId: string;
  title: string;
  description: string;
  minutesToAnswer: number;
  language: string;
  createdAt: string;
  updatedAt: string;
  mode: "EXAM" | "PRACTICE";
};
export type AttemptCoreSchema = {
  id: string;
  order: number;
  testId: string;
  candidateId: string;
  hasEnded: boolean;
  status: "IN_PROGRESS" | "COMPLETED" | "GRADED";
  secondsSpent: number;
  createdAt: string;
  updatedAt: string;
  _aggregate: {
    points: number;
    answered: number;
    answeredCorrect: number;
  };
  _include: {
    test: TestCoreSchema;
  };
};
export type FeedbackCoreSchema = {
  id: string;
  testId: string;
  rating: number;
  problems?: (
    | "inaccurate"
    | "un-related"
    | "poor content"
    | "incomplete"
    | "repeated"
    | "error"
    | "other"
    | ""
  )[];
  comment?: string;
  createdAt: string;
  updatedAt: string;
};
export type TemplateCoreSchema = {
  id: string;
  userId: string;
  name: string;
  title: string;
  description: string;
  language: string;
  minutesToAnswer: number;
  difficulty: string;
  tags: string[];
  numberOfQuestions: number;
  numberOfOptions: number;
  outlines: string[];
  createdAt: string;
  updatedAt: string;
};
export type ExamDetailCommonSchema = {
  mode: "EXAM";
  roomId: string;
  hasPassword: boolean;
  password?: string | null;
  numberOfAttemptsAllowed?: number;
  numberOfParticipants?: number;
  isAnswerVisible: boolean;
  isAllowedToSeeOtherResults: boolean;
  openDate: string | null;
  closeDate: string | null;
  participants: string[];
  isPublic?: boolean;
};
export type PracticeDetailCommonSchema = {
  mode: "PRACTICE";
  difficulty: string;
  tags: string[];
  numberOfQuestions: number;
  numberOfOptions: number;
  outlines: string[];
};
export type TestDetailCommonSchema =
  | ({
      mode: "EXAM";
    } & ExamDetailCommonSchema)
  | ({
      mode: "PRACTICE";
    } & PracticeDetailCommonSchema);
export type TestFullSchema = TestCoreSchema & {
  _aggregate: {
    numberOfQuestions: number;
    totalPoints: number;
    totalCandidates: number;
    totalAttempts: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    averageTime: number;
  };
  _detail: TestDetailCommonSchema;
};
export type McqDetailCommonSchema = {
  type: "MCQ";
  options: string[];
  correctOption: number | null;
};
export type LongAnswerDetailCommonSchema = {
  type: "LONG_ANSWER";
  imageLinks?: string[] | null;
  extraText?: string | null;
  correctAnswer: string | null;
};
export type CandidateCoreSchema = {
  candidateId: string;
  _aggregate: {
    rank: number;
    totalAttempts: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    averageTime: number;
  };
};
export type AnswerForQuestionTypeSchema =
  | {
      type: "MCQ";
      chosenOption: number;
    }
  | {
      type: "LONG_ANSWER";
      answer: string;
    };
export type AnswerCoreSchema = {
  id: string;
  attemptId: string;
  questionId: number;
  pointReceived?: number;
  createdAt: string;
  updatedAt: string;
  child: AnswerForQuestionTypeSchema;
};
export const {
  useGetCandidatesByCandidateIdAttemptsQuery,
  useLazyGetCandidatesByCandidateIdAttemptsQuery,
  useGetFeedbacksQuery,
  useLazyGetFeedbacksQuery,
  usePostFeedbacksMutation,
  useGetFeedbacksByFeedbackIdQuery,
  useLazyGetFeedbacksByFeedbackIdQuery,
  usePutFeedbacksByFeedbackIdMutation,
  useDeleteFeedbacksByFeedbackIdMutation,
  useGetTemplatesQuery,
  useLazyGetTemplatesQuery,
  usePostTemplatesMutation,
  useGetTemplatesByTemplateIdQuery,
  useLazyGetTemplatesByTemplateIdQuery,
  usePutTemplatesByTemplateIdMutation,
  useDeleteTemplatesByTemplateIdMutation,
  useGetTestsQuery,
  useLazyGetTestsQuery,
  usePostTestsMutation,
  useGetTestsFindByRoomQuery,
  useLazyGetTestsFindByRoomQuery,
  useGetTestsByTestIdQuery,
  useLazyGetTestsByTestIdQuery,
  usePutTestsByTestIdMutation,
  useDeleteTestsByTestIdMutation,
  useGetTestsByTestIdAttemptsQuery,
  useLazyGetTestsByTestIdAttemptsQuery,
  useGetTestsByTestIdParticipantsQuery,
  useLazyGetTestsByTestIdParticipantsQuery,
  usePostTestsByTestIdParticipantsMutation,
  useDeleteTestsByTestIdParticipantsMutation,
  useGetAttemptsQuery,
  useLazyGetAttemptsQuery,
  usePostAttemptsMutation,
  useGetAttemptsByAttemptIdQuery,
  useLazyGetAttemptsByAttemptIdQuery,
  useGetAttemptsByAttemptIdAnswersQuery,
  useLazyGetAttemptsByAttemptIdAnswersQuery,
  usePostAttemptsByAttemptIdAnswersMutation,
  usePatchAttemptsByAttemptIdSubmitMutation,
} = injectedRtkApi;

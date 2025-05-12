import { testApi as api } from "../base/test.api";
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getTests: build.query<GetTestsApiResponse, GetTestsApiArg>({
			query: (queryArg) => ({
				url: `/tests`,
				params: {
					page: queryArg.page,
					perPage: queryArg.perPage,
					authorId: queryArg.authorId,
					searchTitle: queryArg.searchTitle,
					sort: queryArg.sort,
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
		getTestsByTestIdQuestions: build.query<
			GetTestsByTestIdQuestionsApiResponse,
			GetTestsByTestIdQuestionsApiArg
		>({
			query: (queryArg) => ({ url: `/tests/${queryArg.testId}/questions` }),
		}),
		getTestsByTestIdQuestionsNoAnswer: build.query<
			GetTestsByTestIdQuestionsNoAnswerApiResponse,
			GetTestsByTestIdQuestionsNoAnswerApiArg
		>({
			query: (queryArg) => ({
				url: `/tests/${queryArg.testId}/questions-no-answer`,
			}),
		}),
		getTestsByTestIdAggregate: build.query<
			GetTestsByTestIdAggregateApiResponse,
			GetTestsByTestIdAggregateApiArg
		>({
			query: (queryArg) => ({
				url: `/tests/${queryArg.testId}/aggregate`,
				params: {
					numberOfQuestions: queryArg.numberOfQuestions,
					totalPoints: queryArg.totalPoints,
				},
			}),
		}),
		getQuestionsByQuestionId: build.query<
			GetQuestionsByQuestionIdApiResponse,
			GetQuestionsByQuestionIdApiArg
		>({
			query: (queryArg) => ({ url: `/questions/${queryArg.questionId}` }),
		}),
		getAttempts: build.query<GetAttemptsApiResponse, GetAttemptsApiArg>({
			query: (queryArg) => ({
				url: `/attempts`,
				params: {
					sort: queryArg.sort,
					candidateId: queryArg.candidateId,
					testId: queryArg.testId,
					page: queryArg.page,
					perPage: queryArg.perPage,
				},
			}),
		}),
		getAttemptsCurrent: build.query<
			GetAttemptsCurrentApiResponse,
			GetAttemptsCurrentApiArg
		>({
			query: (queryArg) => ({
				url: `/attempts/current`,
				params: {
					testId: queryArg.testId,
					candidateId: queryArg.candidateId,
				},
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
		getAttemptsByAttemptIdAggregate: build.query<
			GetAttemptsByAttemptIdAggregateApiResponse,
			GetAttemptsByAttemptIdAggregateApiArg
		>({
			query: (queryArg) => ({
				url: `/attempts/${queryArg.attemptId}/aggregate`,
				params: {
					score: queryArg.score,
					answered: queryArg.answered,
					answeredCorrect: queryArg.answeredCorrect,
				},
			}),
		}),
		getAttemptsByAttemptIdCompute: build.query<
			GetAttemptsByAttemptIdComputeApiResponse,
			GetAttemptsByAttemptIdComputeApiArg
		>({
			query: (queryArg) => ({
				url: `/attempts/${queryArg.attemptId}/compute`,
				params: {
					secondsLeft: queryArg.secondsLeft,
				},
			}),
		}),
		patchCurrentAttemptsAnswer: build.mutation<
			PatchCurrentAttemptsAnswerApiResponse,
			PatchCurrentAttemptsAnswerApiArg
		>({
			query: (queryArg) => ({
				url: `/current-attempts/answer/`,
				method: "PATCH",
				body: queryArg.body,
			}),
		}),
		patchCurrentAttemptsSubmit: build.mutation<
			PatchCurrentAttemptsSubmitApiResponse,
			PatchCurrentAttemptsSubmitApiArg
		>({
			query: (queryArg) => ({
				url: `/current-attempts/submit/`,
				method: "PATCH",
				body: queryArg.body,
			}),
		}),
		getExamTestFind: build.query<
			GetExamTestFindApiResponse,
			GetExamTestFindApiArg
		>({
			query: (queryArg) => ({
				url: `/exam-test/find`,
				params: {
					roomId: queryArg.roomId,
				},
			}),
		}),
		postExamTestJoin: build.mutation<
			PostExamTestJoinApiResponse,
			PostExamTestJoinApiArg
		>({
			query: (queryArg) => ({
				url: `/exam-test/join`,
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
		putTemplates: build.mutation<PutTemplatesApiResponse, PutTemplatesApiArg>({
			query: (queryArg) => ({
				url: `/templates`,
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
		postPracticeTests: build.mutation<
			PostPracticeTestsApiResponse,
			PostPracticeTestsApiArg
		>({
			query: (queryArg) => ({
				url: `/practice-tests`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
		deletePracticeTestsByTestId: build.mutation<
			DeletePracticeTestsByTestIdApiResponse,
			DeletePracticeTestsByTestIdApiArg
		>({
			query: (queryArg) => ({
				url: `/practice-tests/${queryArg.testId}`,
				method: "DELETE",
			}),
		}),
		getPracticeTestsByTestIdFeedback: build.query<
			GetPracticeTestsByTestIdFeedbackApiResponse,
			GetPracticeTestsByTestIdFeedbackApiArg
		>({
			query: (queryArg) => ({
				url: `/practice-tests/${queryArg.testId}/feedback`,
			}),
		}),
		postPracticeTestsByTestIdFeedback: build.mutation<
			PostPracticeTestsByTestIdFeedbackApiResponse,
			PostPracticeTestsByTestIdFeedbackApiArg
		>({
			query: (queryArg) => ({
				url: `/practice-tests/${queryArg.testId}/feedback`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
		putPracticeTestsByTestIdFeedback: build.mutation<
			PutPracticeTestsByTestIdFeedbackApiResponse,
			PutPracticeTestsByTestIdFeedbackApiArg
		>({
			query: (queryArg) => ({
				url: `/practice-tests/${queryArg.testId}/feedback`,
				method: "PUT",
				body: queryArg.body,
			}),
		}),
		deletePracticeTestsByTestIdFeedback: build.mutation<
			DeletePracticeTestsByTestIdFeedbackApiResponse,
			DeletePracticeTestsByTestIdFeedbackApiArg
		>({
			query: (queryArg) => ({
				url: `/practice-tests/${queryArg.testId}/feedback`,
				method: "DELETE",
			}),
		}),
	}),
	overrideExisting: false,
});
export { injectedRtkApi as testApiGen };
export type GetTestsApiResponse = /** status 200 Success */ {
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
	data: {
		id: string;
		title: string;
		description: string;
		minutesToAnswer: number;
		language: string;
		mode: string;
		author: {
			id: string;
			name: string;
			avatar?: string;
		};
		createdAt: string;
		updatedAt: string;
	}[];
};
export type GetTestsApiArg = {
	page?: number;
	perPage?: number | null;
	authorId?: string;
	searchTitle?: string;
	sort?: string;
};
export type GetTestsChallengeOfTheDayApiResponse = /** status 200 Success */ {
	id: string;
	title: string;
	description: string;
	minutesToAnswer: number;
	language: string;
	mode: string;
	author: {
		id: string;
		name: string;
		avatar?: string;
	};
	createdAt: string;
	updatedAt: string;
};
export type GetTestsChallengeOfTheDayApiArg = void;
export type GetTestsByTestIdApiResponse = /** status 200 Success */ {
	id: string;
	title: string;
	description: string;
	minutesToAnswer: number;
	language: string;
	mode: string;
	author: {
		id: string;
		name: string;
		avatar?: string;
	};
	createdAt: string;
	updatedAt: string;
};
export type GetTestsByTestIdApiArg = {
	testId: string;
};
export type GetTestsByTestIdQuestionsApiResponse = /** status 200 Success */ {
	id: number;
	testId: string;
	text: string;
	options: string[];
	points: number;
	correctOption: number;
}[];
export type GetTestsByTestIdQuestionsApiArg = {
	testId: string;
};
export type GetTestsByTestIdQuestionsNoAnswerApiResponse =
  /** status 200 Success */ {
	id: number;
	testId: string;
	text: string;
	options: string[];
	points: number;
}[];
export type GetTestsByTestIdQuestionsNoAnswerApiArg = {
	testId: string;
};
export type GetTestsByTestIdAggregateApiResponse = /** status 200 Success */ {
	numberOfQuestions?: number;
	totalPoints?: number;
};
export type GetTestsByTestIdAggregateApiArg = {
	testId: string;
	numberOfQuestions?: "true" | "false";
	totalPoints?: "true" | "false";
};
export type GetQuestionsByQuestionIdApiResponse = /** status 200 Success */ {
	id: number;
	testId: string;
	text: string;
	options: string[];
	points: number;
	correctOption: number;
};
export type GetQuestionsByQuestionIdApiArg = {
	questionId?: number | null;
};
export type GetAttemptsApiResponse = /** status 200 Success */ {
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
	data: {
		id: string;
		order: number;
		hasEnded: boolean;
		secondsSpent: number;
		createdAt: string;
		updatedAt: string;
		candidate: {
			id: string;
			name: string;
			avatar?: string;
		};
		test: {
			id: string;
			title: string;
			description: string;
			minutesToAnswer: number;
			language: string;
			mode: string;
			author: {
				id: string;
				name: string;
				avatar?: string;
			};
			createdAt: string;
			updatedAt: string;
		};
	}[];
};
export type GetAttemptsApiArg = {
	sort?: string;
	candidateId?: string;
	testId?: string;
	page?: number;
	perPage?: number | null;
};
export type GetAttemptsCurrentApiResponse = /** status 200 Success */ {
	id: string;
	order: number;
	hasEnded: boolean;
	secondsSpent: number;
	createdAt: string;
	updatedAt: string;
	candidate: {
		id: string;
		name: string;
		avatar?: string;
	};
	test: {
		id: string;
		title: string;
		description: string;
		minutesToAnswer: number;
		language: string;
		mode: string;
		author: {
			id: string;
			name: string;
			avatar?: string;
		};
		createdAt: string;
		updatedAt: string;
	};
};
export type GetAttemptsCurrentApiArg = {
	testId: string;
	candidateId: string;
};
export type GetAttemptsByAttemptIdApiResponse = /** status 200 Success */ {
	id: string;
	order: number;
	hasEnded: boolean;
	secondsSpent: number;
	createdAt: string;
	updatedAt: string;
	candidate: {
		id: string;
		name: string;
		avatar?: string;
	};
	test: {
		id: string;
		title: string;
		description: string;
		minutesToAnswer: number;
		language: string;
		mode: string;
		author: {
			id: string;
			name: string;
			avatar?: string;
		};
		createdAt: string;
		updatedAt: string;
	};
};
export type GetAttemptsByAttemptIdApiArg = {
	attemptId: string;
};
export type GetAttemptsByAttemptIdAnswersApiResponse =
  /** status 200 Success */ {
	attemptId: string;
	questionId: number;
	chosenOption: number;
}[];
export type GetAttemptsByAttemptIdAnswersApiArg = {
	attemptId: string;
};
export type GetAttemptsByAttemptIdAggregateApiResponse =
  /** status 200 Success */ {
	score?: number;
	answered?: number;
	answeredCorrect?: number;
};
export type GetAttemptsByAttemptIdAggregateApiArg = {
	attemptId: string;
	score?: "true" | "false";
	answered?: "true" | "false";
	answeredCorrect?: "true" | "false";
};
export type GetAttemptsByAttemptIdComputeApiResponse =
  /** status 200 Success */ {
	secondsLeft?: number;
};
export type GetAttemptsByAttemptIdComputeApiArg = {
	attemptId: string;
	secondsLeft?: "true" | "false";
};
export type PatchCurrentAttemptsAnswerApiResponse = unknown;
export type PatchCurrentAttemptsAnswerApiArg = {
	body: {
		testId: string;
		candidateId: string;
		questionId: number | null;
		chosenOption?: number | null;
	};
};
export type PatchCurrentAttemptsSubmitApiResponse = unknown;
export type PatchCurrentAttemptsSubmitApiArg = {
	body: {
		testId: string;
		candidateId: string;
	};
};
export type GetExamTestFindApiResponse = unknown;
export type GetExamTestFindApiArg = {
	roomId: string;
};
export type PostExamTestJoinApiResponse = unknown;
export type PostExamTestJoinApiArg = {
	body: {
		testId: string;
		password: string;
		candidateId: string;
	};
};
export type GetTemplatesApiResponse = /** status 200 Success */ {
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
	data: {
		id: string;
		name: string;
		title: string;
		description: string;
		difficulty: string;
		tags: string[];
		numberOfQuestions: number;
		numberOfOptions: number;
		outlines: string[];
	}[];
};
export type GetTemplatesApiArg = {
	searchName?: string;
	page?: number;
	perPage?: number | null;
};
export type PostTemplatesApiResponse = unknown;
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
export type PutTemplatesApiResponse = unknown;
export type PutTemplatesApiArg = {
	body: {
		id: string;
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
export type PostPracticeTestsApiResponse = /** status 200 Success */ {
	testId: string;
};
export type PostPracticeTestsApiArg = {
	body: {
		title: string;
		description: string;
		minutesToAnswer: number;
		language: string;
		mode: string;
		author: {
			id: string;
			name: string;
			avatar?: string;
		};
		questions: {
			text: string;
			options: string[];
			points: number;
			correctOption: number;
		}[];
		difficulty: "easy" | "medium" | "hard";
		tags: string[];
		numberOfQuestions: number;
		numberOfOptions: number;
		outlines: string[];
	};
};
export type DeletePracticeTestsByTestIdApiResponse = unknown;
export type DeletePracticeTestsByTestIdApiArg = {
	testId: string;
};
export type GetPracticeTestsByTestIdFeedbackApiResponse =
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
export type GetPracticeTestsByTestIdFeedbackApiArg = {
	testId: string;
};
export type PostPracticeTestsByTestIdFeedbackApiResponse = unknown;
export type PostPracticeTestsByTestIdFeedbackApiArg = {
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
export type PutPracticeTestsByTestIdFeedbackApiResponse = unknown;
export type PutPracticeTestsByTestIdFeedbackApiArg = {
	testId: string;
	body: {
		id: string;
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
export type DeletePracticeTestsByTestIdFeedbackApiResponse = unknown;
export type DeletePracticeTestsByTestIdFeedbackApiArg = {
	testId: string;
};
export const {
	useGetTestsQuery,
	useLazyGetTestsQuery,
	useGetTestsChallengeOfTheDayQuery,
	useLazyGetTestsChallengeOfTheDayQuery,
	useGetTestsByTestIdQuery,
	useLazyGetTestsByTestIdQuery,
	useGetTestsByTestIdQuestionsQuery,
	useLazyGetTestsByTestIdQuestionsQuery,
	useGetTestsByTestIdQuestionsNoAnswerQuery,
	useLazyGetTestsByTestIdQuestionsNoAnswerQuery,
	useGetTestsByTestIdAggregateQuery,
	useLazyGetTestsByTestIdAggregateQuery,
	useGetQuestionsByQuestionIdQuery,
	useLazyGetQuestionsByQuestionIdQuery,
	useGetAttemptsQuery,
	useLazyGetAttemptsQuery,
	useGetAttemptsCurrentQuery,
	useLazyGetAttemptsCurrentQuery,
	useGetAttemptsByAttemptIdQuery,
	useLazyGetAttemptsByAttemptIdQuery,
	useGetAttemptsByAttemptIdAnswersQuery,
	useLazyGetAttemptsByAttemptIdAnswersQuery,
	useGetAttemptsByAttemptIdAggregateQuery,
	useLazyGetAttemptsByAttemptIdAggregateQuery,
	useGetAttemptsByAttemptIdComputeQuery,
	useLazyGetAttemptsByAttemptIdComputeQuery,
	usePatchCurrentAttemptsAnswerMutation,
	usePatchCurrentAttemptsSubmitMutation,
	useGetExamTestFindQuery,
	useLazyGetExamTestFindQuery,
	usePostExamTestJoinMutation,
	useGetTemplatesQuery,
	useLazyGetTemplatesQuery,
	usePostTemplatesMutation,
	usePutTemplatesMutation,
	useDeleteTemplatesByTemplateIdMutation,
	usePostPracticeTestsMutation,
	useDeletePracticeTestsByTestIdMutation,
	useGetPracticeTestsByTestIdFeedbackQuery,
	useLazyGetPracticeTestsByTestIdFeedbackQuery,
	usePostPracticeTestsByTestIdFeedbackMutation,
	usePutPracticeTestsByTestIdFeedbackMutation,
	useDeletePracticeTestsByTestIdFeedbackMutation,
} = injectedRtkApi;

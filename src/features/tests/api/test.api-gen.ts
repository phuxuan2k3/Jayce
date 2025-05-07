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
		postTests: build.mutation<PostTestsApiResponse, PostTestsApiArg>({
			query: (queryArg) => ({
				url: `/tests`,
				method: "POST",
				body: queryArg.body,
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
		deleteTestsByTestId: build.mutation<
			DeleteTestsByTestIdApiResponse,
			DeleteTestsByTestIdApiArg
		>({
			query: (queryArg) => ({
				url: `/tests/${queryArg.testId}`,
				method: "DELETE",
			}),
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
		postAttempts: build.mutation<PostAttemptsApiResponse, PostAttemptsApiArg>({
			query: (queryArg) => ({
				url: `/attempts`,
				method: "POST",
				body: queryArg.body,
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
		patchAttemptsByAttemptIdAnswer: build.mutation<
			PatchAttemptsByAttemptIdAnswerApiResponse,
			PatchAttemptsByAttemptIdAnswerApiArg
		>({
			query: (queryArg) => ({
				url: `/attempts/${queryArg.attemptId}/answer`,
				method: "PATCH",
				params: {
					questionId: queryArg.questionId,
					chosenOption: queryArg.chosenOption,
				},
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
export type PostTestsApiResponse = /** status 200 Success */ {
	id: string;
};
export type PostTestsApiArg = {
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
export type DeleteTestsByTestIdApiResponse = unknown;
export type DeleteTestsByTestIdApiArg = {
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
		createdAt: string;
		updatedAt: string;
	}[];
};
export type GetAttemptsApiArg = {
	sort?: string;
	candidateId?: string;
	testId?: string;
	page?: number;
	perPage?: number | null;
};
export type PostAttemptsApiResponse = /** status 200 Success */ {
	attemptId: string;
};
export type PostAttemptsApiArg = {
	body: {
		testId: string;
		candidateId: string;
	};
};
export type GetAttemptsCurrentApiResponse = /** status 200 Success */ {
	id: string;
	order: number;
	hasEnded: boolean;
	secondsSpent: number;
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
	createdAt: string;
	updatedAt: string;
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
	createdAt: string;
	updatedAt: string;
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
export type PatchAttemptsByAttemptIdAnswerApiResponse = unknown;
export type PatchAttemptsByAttemptIdAnswerApiArg = {
	attemptId: string;
	questionId?: number | null;
	chosenOption?: number | null;
};
export type PatchAttemptsByAttemptIdSubmitApiResponse = unknown;
export type PatchAttemptsByAttemptIdSubmitApiArg = {
	attemptId: string;
};
export const {
	useGetTestsQuery,
	useLazyGetTestsQuery,
	usePostTestsMutation,
	useGetTestsChallengeOfTheDayQuery,
	useLazyGetTestsChallengeOfTheDayQuery,
	useGetTestsByTestIdQuery,
	useLazyGetTestsByTestIdQuery,
	useDeleteTestsByTestIdMutation,
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
	usePostAttemptsMutation,
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
	usePatchAttemptsByAttemptIdAnswerMutation,
	usePatchAttemptsByAttemptIdSubmitMutation,
} = injectedRtkApi;

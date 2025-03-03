import { testApi as api } from "../../features/Test/test.api";
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getTags: build.query<GetTagsApiResponse, GetTagsApiArg>({
			query: () => ({ url: `/tags` }),
		}),
		postTags: build.mutation<PostTagsApiResponse, PostTagsApiArg>({
			query: (queryArg) => ({
				url: `/tags`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
		getTagsId: build.query<GetTagsIdApiResponse, GetTagsIdApiArg>({
			query: (queryArg) => ({ url: `/tags/:id` }),
		}),
		putTagsId: build.mutation<PutTagsIdApiResponse, PutTagsIdApiArg>({
			query: (queryArg) => ({
				url: `/tags/:id`,
				method: "PUT",
				body: queryArg.body,
			}),
		}),
		deleteTagsId: build.mutation<DeleteTagsIdApiResponse, DeleteTagsIdApiArg>({
			query: (queryArg) => ({ url: `/tags/:id`, method: "DELETE" }),
		}),
		getTestsTestIdCurrent: build.query<
			GetTestsTestIdCurrentApiResponse,
			GetTestsTestIdCurrentApiArg
		>({
			query: (queryArg) => ({ url: `/tests/:testId/current` }),
		}),
		postTestsTestIdCurrentNew: build.mutation<
			PostTestsTestIdCurrentNewApiResponse,
			PostTestsTestIdCurrentNewApiArg
		>({
			query: (queryArg) => ({
				url: `/tests/:testId/current/new`,
				method: "POST",
			}),
		}),
		getTestsTestIdCurrentDo: build.query<
			GetTestsTestIdCurrentDoApiResponse,
			GetTestsTestIdCurrentDoApiArg
		>({
			query: (queryArg) => ({ url: `/tests/:testId/current/do` }),
		}),
		patchTestsTestIdCurrentAnswer: build.mutation<
			PatchTestsTestIdCurrentAnswerApiResponse,
			PatchTestsTestIdCurrentAnswerApiArg
		>({
			query: (queryArg) => ({
				url: `/tests/:testId/current/answer`,
				method: "PATCH",
				body: queryArg.body,
			}),
		}),
		postTestsTestIdCurrentSubmit: build.mutation<
			PostTestsTestIdCurrentSubmitApiResponse,
			PostTestsTestIdCurrentSubmitApiArg
		>({
			query: (queryArg) => ({
				url: `/tests/:testId/current/submit`,
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
					page: queryArg.page,
					perPage: queryArg.perPage,
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
		getTestsTestId: build.query<
			GetTestsTestIdApiResponse,
			GetTestsTestIdApiArg
		>({
			query: (queryArg) => ({ url: `/tests/:testId` }),
		}),
		putTestsTestId: build.mutation<
			PutTestsTestIdApiResponse,
			PutTestsTestIdApiArg
		>({
			query: (queryArg) => ({
				url: `/tests/:testId`,
				method: "PUT",
				body: queryArg.body,
			}),
		}),
		deleteTestsTestId: build.mutation<
			DeleteTestsTestIdApiResponse,
			DeleteTestsTestIdApiArg
		>({
			query: (queryArg) => ({ url: `/tests/:testId`, method: "DELETE" }),
		}),
		getTestsTestIdQuestions: build.query<
			GetTestsTestIdQuestionsApiResponse,
			GetTestsTestIdQuestionsApiArg
		>({
			query: (queryArg) => ({ url: `/tests/:testId/questions` }),
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
					page: queryArg.page,
					perPage: queryArg.perPage,
				},
			}),
		}),
		getTestsTestIdAttempts: build.query<
			GetTestsTestIdAttemptsApiResponse,
			GetTestsTestIdAttemptsApiArg
		>({
			query: (queryArg) => ({
				url: `/tests/:testId/attempts`,
				params: {
					sortByStartDate: queryArg.sortByStartDate,
					sortByScore: queryArg.sortByScore,
					page: queryArg.page,
					perPage: queryArg.perPage,
				},
			}),
		}),
		getAttemptsAttemptId: build.query<
			GetAttemptsAttemptIdApiResponse,
			GetAttemptsAttemptIdApiArg
		>({
			query: (queryArg) => ({ url: `/attempts/:attemptId` }),
		}),
		getAttemptsAttemptIdAnswers: build.query<
			GetAttemptsAttemptIdAnswersApiResponse,
			GetAttemptsAttemptIdAnswersApiArg
		>({
			query: (queryArg) => ({
				url: `/attempts/:attemptId/answers`,
				params: {
					sortByStartDate: queryArg.sortByStartDate,
					sortByScore: queryArg.sortByScore,
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
		getCandidateTestsTestIdAttempts: build.query<
			GetCandidateTestsTestIdAttemptsApiResponse,
			GetCandidateTestsTestIdAttemptsApiArg
		>({
			query: (queryArg) => ({
				url: `/candidate/tests/:testId/attempts`,
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
export { injectedRtkApi as testApiV2 };
export type GetTagsApiResponse = /** status 200 Success */ {
	id: number;
	name: string;
}[];
export type GetTagsApiArg = void;
export type PostTagsApiResponse = unknown;
export type PostTagsApiArg = {
	/** Request body */
	body: {
		name: string;
	};
};
export type GetTagsIdApiResponse = /** status 200 Success */ {
	id: number;
	name: string;
};
export type GetTagsIdApiArg = {
	tagId?: number | null;
};
export type PutTagsIdApiResponse = unknown;
export type PutTagsIdApiArg = {
	tagId?: number | null;
	/** Request body */
	body: {
		name: string;
	};
};
export type DeleteTagsIdApiResponse = unknown;
export type DeleteTagsIdApiArg = {
	tagId?: number | null;
};
export type GetTestsTestIdCurrentApiResponse = /** status 200 Success */ {
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
		chosenOption: number;
	}[];
	startedAt: string;
	endedAt: string;
};
export type GetTestsTestIdCurrentApiArg = {
	testId?: number | null;
};
export type PostTestsTestIdCurrentNewApiResponse = unknown;
export type PostTestsTestIdCurrentNewApiArg = {
	testId?: number | null;
};
export type GetTestsTestIdCurrentDoApiResponse = /** status 200 Success */ {
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
		chosenOption: number;
	}[];
	startedAt: string;
	endedAt: string;
};
export type GetTestsTestIdCurrentDoApiArg = {
	testId?: number | null;
};
export type PatchTestsTestIdCurrentAnswerApiResponse = unknown;
export type PatchTestsTestIdCurrentAnswerApiArg = {
	testId?: number | null;
	/** Request body */
	body: {
		questionId: number | null;
		optionId?: number | null;
	};
};
export type PostTestsTestIdCurrentSubmitApiResponse = unknown;
export type PostTestsTestIdCurrentSubmitApiArg = {
	testId?: number | null;
};
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
		tags: string[];
		createdAt: string;
		updatedAt: string;
	}[];
};
export type GetTestsApiArg = {
	searchTitle?: string;
	minMinutesToAnswer?: number | null;
	maxMinutesToAnswer?: number | null;
	difficulty?: ("easy" | "medium" | "hard")[] | string;
	tags?: (number | null)[];
	page?: number;
	perPage?: number | null;
};
export type PostTestsApiResponse = unknown;
export type PostTestsApiArg = {
	/** Request body */
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
export type GetTestsTestIdApiResponse = /** status 200 Success */ {
	id: number;
	managerId: string;
	title: string;
	description: string;
	difficulty: string;
	minutesToAnswer: number;
	answerCount: number;
	tags: string[];
	createdAt: string;
	updatedAt: string;
};
export type GetTestsTestIdApiArg = {
	testId?: number | null;
};
export type PutTestsTestIdApiResponse = unknown;
export type PutTestsTestIdApiArg = {
	testId?: number | null;
	/** Request body */
	body: {
		tagIds?: number[];
		title?: string;
		description?: string;
		difficulty?: "easy" | "medium" | "hard";
		minutesToAnswer?: number;
		questions?: any[];
	};
};
export type DeleteTestsTestIdApiResponse = unknown;
export type DeleteTestsTestIdApiArg = {
	testId?: number | null;
};
export type GetTestsTestIdQuestionsApiResponse = /** status 200 Success */ {
	id: number;
	text: string;
	options: string[];
	points: number;
	correctOption: number;
}[];
export type GetTestsTestIdQuestionsApiArg = {
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
		tags: string[];
		createdAt: string;
		updatedAt: string;
	}[];
};
export type GetManagerTestsApiArg = {
	searchTitle?: string;
	minMinutesToAnswer?: number | null;
	maxMinutesToAnswer?: number | null;
	difficulty?: ("easy" | "medium" | "hard")[] | string;
	tags?: (number | null)[];
	page?: number;
	perPage?: number | null;
};
export type GetTestsTestIdAttemptsApiResponse = /** status 200 Success */ {
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
		timeSpent: number;
		score: number;
	}[];
};
export type GetTestsTestIdAttemptsApiArg = {
	testId?: number | null;
	sortByStartDate?: "asc" | "desc";
	sortByScore?: "asc" | "desc";
	page: number;
	perPage?: number;
};
export type GetAttemptsAttemptIdApiResponse = /** status 200 Success */ {
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
	timeSpent: number;
	score: number;
	totalCorrectAnswers: number;
	totalWrongAnswers: number;
	totalQuestions: number;
};
export type GetAttemptsAttemptIdApiArg = {
	attemptId?: number | null;
};
export type GetAttemptsAttemptIdAnswersApiResponse = /** status 200 Success */ {
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
		chosenOption: number;
	}[];
};
export type GetAttemptsAttemptIdAnswersApiArg = {
	attemptId?: number | null;
	sortByStartDate?: "asc" | "desc";
	sortByScore?: "asc" | "desc";
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
		timeSpent: number;
		score: number;
	}[];
};
export type GetCandidateAttemptsApiArg = {
	sortByStartDate?: "asc" | "desc";
	sortByScore?: "asc" | "desc";
	page: number;
	perPage?: number;
};
export type GetCandidateTestsTestIdAttemptsApiResponse =
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
		timeSpent: number;
		score: number;
	}[];
};
export type GetCandidateTestsTestIdAttemptsApiArg = {
	testId?: number | null;
	sortByStartDate?: "asc" | "desc";
	sortByScore?: "asc" | "desc";
	page: number;
	perPage?: number;
};
export const {
	useGetTagsQuery,
	usePostTagsMutation,
	useGetTagsIdQuery,
	usePutTagsIdMutation,
	useDeleteTagsIdMutation,
	useGetTestsTestIdCurrentQuery,
	usePostTestsTestIdCurrentNewMutation,
	useGetTestsTestIdCurrentDoQuery,
	usePatchTestsTestIdCurrentAnswerMutation,
	usePostTestsTestIdCurrentSubmitMutation,
	useGetTestsQuery,
	usePostTestsMutation,
	useGetTestsTestIdQuery,
	usePutTestsTestIdMutation,
	useDeleteTestsTestIdMutation,
	useGetTestsTestIdQuestionsQuery,
	useGetManagerTestsQuery,
	useGetTestsTestIdAttemptsQuery,
	useGetAttemptsAttemptIdQuery,
	useGetAttemptsAttemptIdAnswersQuery,
	useGetCandidateAttemptsQuery,
	useGetCandidateTestsTestIdAttemptsQuery,
} = injectedRtkApi;

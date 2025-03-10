import { testApi as api } from "D:\\Projects\\skillsharp\\skillsharp-frontend\\generator/../src/features/Test/api/test.api";
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
		getTagsByTagId: build.query<
			GetTagsByTagIdApiResponse,
			GetTagsByTagIdApiArg
		>({
			query: (queryArg) => ({ url: `/tags/${queryArg.tagId}` }),
		}),
		putTagsByTagId: build.mutation<
			PutTagsByTagIdApiResponse,
			PutTagsByTagIdApiArg
		>({
			query: (queryArg) => ({
				url: `/tags/${queryArg.tagId}`,
				method: "PUT",
				body: queryArg.body,
			}),
		}),
		deleteTagsByTagId: build.mutation<
			DeleteTagsByTagIdApiResponse,
			DeleteTagsByTagIdApiArg
		>({
			query: (queryArg) => ({
				url: `/tags/${queryArg.tagId}`,
				method: "DELETE",
			}),
		}),
		getTestsByTestIdCurrent: build.query<
			GetTestsByTestIdCurrentApiResponse,
			GetTestsByTestIdCurrentApiArg
		>({
			query: (queryArg) => ({ url: `/tests/${queryArg.testId}/current` }),
		}),
		postTestsByTestIdCurrentNew: build.mutation<
			PostTestsByTestIdCurrentNewApiResponse,
			PostTestsByTestIdCurrentNewApiArg
		>({
			query: (queryArg) => ({
				url: `/tests/${queryArg.testId}/current/new`,
				method: "POST",
			}),
		}),
		getTestsByTestIdCurrentDo: build.query<
			GetTestsByTestIdCurrentDoApiResponse,
			GetTestsByTestIdCurrentDoApiArg
		>({
			query: (queryArg) => ({ url: `/tests/${queryArg.testId}/current/do` }),
		}),
		patchTestsByTestIdCurrentAnswer: build.mutation<
			PatchTestsByTestIdCurrentAnswerApiResponse,
			PatchTestsByTestIdCurrentAnswerApiArg
		>({
			query: (queryArg) => ({
				url: `/tests/${queryArg.testId}/current/answer`,
				method: "PATCH",
				body: queryArg.body,
			}),
		}),
		postTestsByTestIdCurrentSubmit: build.mutation<
			PostTestsByTestIdCurrentSubmitApiResponse,
			PostTestsByTestIdCurrentSubmitApiArg
		>({
			query: (queryArg) => ({
				url: `/tests/${queryArg.testId}/current/submit`,
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
		getTestsByTestId: build.query<
			GetTestsByTestIdApiResponse,
			GetTestsByTestIdApiArg
		>({
			query: (queryArg) => ({ url: `/tests/${queryArg.testId}` }),
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
		getTestsByTestIdQuestions: build.query<
			GetTestsByTestIdQuestionsApiResponse,
			GetTestsByTestIdQuestionsApiArg
		>({
			query: (queryArg) => ({ url: `/tests/${queryArg.testId}/questions` }),
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
		getTestsByTestIdAttempts: build.query<
			GetTestsByTestIdAttemptsApiResponse,
			GetTestsByTestIdAttemptsApiArg
		>({
			query: (queryArg) => ({
				url: `/tests/${queryArg.testId}/attempts`,
				params: {
					sortByStartDate: queryArg.sortByStartDate,
					sortByScore: queryArg.sortByScore,
					page: queryArg.page,
					perPage: queryArg.perPage,
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
			query: (queryArg) => ({
				url: `/attempts/${queryArg.attemptId}/answers`,
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
export type PostTagsApiResponse = unknown;
export type PostTagsApiArg = {
	/** Request body */
	body: {
		name: string;
	};
};
export type GetTagsByTagIdApiResponse = /** status 200 Success */ {
	id: number;
	name: string;
};
export type GetTagsByTagIdApiArg = {
	tagId?: number | null;
};
export type PutTagsByTagIdApiResponse = unknown;
export type PutTagsByTagIdApiArg = {
	tagId?: number | null;
	/** Request body */
	body: {
		name: string;
	};
};
export type DeleteTagsByTagIdApiResponse = unknown;
export type DeleteTagsByTagIdApiArg = {
	tagId?: number | null;
};
export type GetTestsByTestIdCurrentApiResponse = /** status 200 Success */ {
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
export type GetTestsByTestIdCurrentApiArg = {
	testId?: number | null;
};
export type PostTestsByTestIdCurrentNewApiResponse = unknown;
export type PostTestsByTestIdCurrentNewApiArg = {
	testId?: number | null;
};
export type GetTestsByTestIdCurrentDoApiResponse = /** status 200 Success */ {
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
export type GetTestsByTestIdCurrentDoApiArg = {
	testId?: number | null;
};
export type PatchTestsByTestIdCurrentAnswerApiResponse = unknown;
export type PatchTestsByTestIdCurrentAnswerApiArg = {
	testId?: number | null;
	/** Request body */
	body: {
		questionId: number | null;
		optionId?: number | null;
	};
};
export type PostTestsByTestIdCurrentSubmitApiResponse = unknown;
export type PostTestsByTestIdCurrentSubmitApiArg = {
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
export type GetTestsByTestIdApiResponse = /** status 200 Success */ {
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
export type GetTestsByTestIdApiArg = {
	testId?: number | null;
};
export type PutTestsByTestIdApiResponse = unknown;
export type PutTestsByTestIdApiArg = {
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
export type DeleteTestsByTestIdApiResponse = unknown;
export type DeleteTestsByTestIdApiArg = {
	testId?: number | null;
};
export type GetTestsByTestIdQuestionsApiResponse = /** status 200 Success */ {
	id: number;
	text: string;
	options: string[];
	points: number;
	correctOption: number;
}[];
export type GetTestsByTestIdQuestionsApiArg = {
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
export type GetTestsByTestIdAttemptsApiResponse = /** status 200 Success */ {
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
export type GetTestsByTestIdAttemptsApiArg = {
	testId?: number | null;
	sortByStartDate?: "asc" | "desc";
	sortByScore?: "asc" | "desc";
	page: number;
	perPage?: number;
};
export type GetAttemptsByAttemptIdApiResponse = /** status 200 Success */ {
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
export type GetAttemptsByAttemptIdApiArg = {
	attemptId?: number | null;
};
export type GetAttemptsByAttemptIdAnswersApiResponse =
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
		chosenOption: number;
	}[];
};
export type GetAttemptsByAttemptIdAnswersApiArg = {
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
		timeSpent: number;
		score: number;
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
	usePostTagsMutation,
	useGetTagsByTagIdQuery,
	useLazyGetTagsByTagIdQuery,
	usePutTagsByTagIdMutation,
	useDeleteTagsByTagIdMutation,
	useGetTestsByTestIdCurrentQuery,
	useLazyGetTestsByTestIdCurrentQuery,
	usePostTestsByTestIdCurrentNewMutation,
	useGetTestsByTestIdCurrentDoQuery,
	useLazyGetTestsByTestIdCurrentDoQuery,
	usePatchTestsByTestIdCurrentAnswerMutation,
	usePostTestsByTestIdCurrentSubmitMutation,
	useGetTestsQuery,
	useLazyGetTestsQuery,
	usePostTestsMutation,
	useGetTestsByTestIdQuery,
	useLazyGetTestsByTestIdQuery,
	usePutTestsByTestIdMutation,
	useDeleteTestsByTestIdMutation,
	useGetTestsByTestIdQuestionsQuery,
	useLazyGetTestsByTestIdQuestionsQuery,
	useGetManagerTestsQuery,
	useLazyGetManagerTestsQuery,
	useGetTestsByTestIdAttemptsQuery,
	useLazyGetTestsByTestIdAttemptsQuery,
	useGetAttemptsByAttemptIdQuery,
	useLazyGetAttemptsByAttemptIdQuery,
	useGetAttemptsByAttemptIdAnswersQuery,
	useLazyGetAttemptsByAttemptIdAnswersQuery,
	useGetCandidateAttemptsQuery,
	useLazyGetCandidateAttemptsQuery,
	useGetCandidateTestsByTestIdAttemptsQuery,
	useLazyGetCandidateTestsByTestIdAttemptsQuery,
} = injectedRtkApi;

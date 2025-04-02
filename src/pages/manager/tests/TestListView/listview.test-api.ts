import testApi from "../../../../app/bases/test.api";
import { Paged } from "../../../../interfaces/paged.type";
// import { YourTest } from "./types";
// import { Paged } from "../../interfaces/paged.type";


export type DifficultyLevel = "Easy" | "Medium" | "Hard" | "";

export type FilterParams = {
	minMinute: number;
	maxMinute: number;
	difficulty: DifficultyLevel;
	tags: string[];
	searchName: string;
	page: number;
	perPage: number;
};

export type TestWithNoCompany = Omit<TestDisplayProps, "company"> & { companyId: string };
export type TestListProps = {
	suggestedTags: string[];
}

export type TestDisplayProps = {
	ID: string;
	company: string;
	createdAt: string;
	title: string;
	description: string;
	minutesToAnswer: number;
	tags: string[];
	answerCount: number;
}

const yourTestApi = testApi.injectEndpoints({
	endpoints: (builder) => ({
		getTestListPageData: builder.query<TestListProps, void>({
			query: () => ({
				url: `/list/page`,
			})
		}),
		getFiltered: builder.query<Paged<TestWithNoCompany>, FilterParams>({
			query: (filter) => ({
				url: `/list/data`,
				params: filter,
			})
		}),
		deleteTest: builder.mutation<void, string>({
			query: (testID) => ({
				url: `${testID}/delete/`,
				method: "DELETE",
			}),
		}),
		deleteQuestion: builder.mutation<void, { testID: string; questionID: string }>({
			query: ({ testID, questionID }) => ({
				url: `${testID}/delete/question/${questionID}/`,
				method: "DELETE",
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetTestListPageDataQuery,
	useGetFilteredQuery,
	useLazyGetFilteredQuery,
	useDeleteQuestionMutation,
	useDeleteTestMutation,
} = yourTestApi;
import testApi from "../../../../features/Test/api/test.api";
import { Paged } from "../../../../interfaces/paged.type";
import { TestDisplayProps, TestListProps } from "./props";

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

const infoApi = testApi.injectEndpoints({
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
	}),
	overrideExisting: false,
});

export const {
	useGetTestListPageDataQuery,
	useLazyGetFilteredQuery,
} = infoApi;
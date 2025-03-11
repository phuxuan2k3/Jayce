import testApi from "../../features/Test/api/test.api";
import { Paged } from "../../interfaces/paged.type";
import { Attempt, FilterParams, TestAttemptsProps } from "./types";

export type TestAttemptsResponse = Omit<TestAttemptsProps, "company"> & { companyId: string };

const attemptApi = testApi.injectEndpoints({
	endpoints: (builder) => ({
		getTestDisplay: builder.query<TestAttemptsResponse, string>({
			query: (testId) => `/${testId}/attempts/page`
		}),
		getAttempts: builder.query<Paged<Attempt>, FilterParams>({
			query: (filter) => ({
				url: `/${filter.testId}/attempts/data`,
				params: {
					perPage: filter.perPage,
					page: filter.page,
				},
			})
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetTestDisplayQuery,
	useLazyGetAttemptsQuery,
} = attemptApi;
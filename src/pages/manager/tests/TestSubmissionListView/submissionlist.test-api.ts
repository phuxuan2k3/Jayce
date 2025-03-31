import testApi from "../../../../features/tests/api/test.api";
import { SubmissionItem, SubmissionOverView } from "./types";

const submissionlistAPI = testApi.injectEndpoints({
	endpoints: (builder) => ({
		getSubmissionList: builder.query<SubmissionItem[], string>({
			query: (testId) => `/${testId}/submission/page`
		}),
		getSubmissionOverView: builder.query<SubmissionOverView, string>({
			query: (testId) => `/${testId}/submission/overview`
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetSubmissionListQuery,
	useGetSubmissionOverViewQuery,
} = submissionlistAPI;
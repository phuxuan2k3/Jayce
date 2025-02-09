import testApi from "../../../../features/Test/test.api";
import { TestDetails } from "./types";

const createtestAPI = testApi.injectEndpoints({
	endpoints: (builder) => ({
		createtest: builder.mutation<{ testID: string }, TestDetails>({
			query: ({ title, description, minutesToAnswer, difficulty }) => ({
				url: `/create`,
				method: "POST",
				body: {
					title,
					description,
					minutesToAnswer,
					difficulty,
					companyId: "1" // Todo: Replace with actual company ID,
				},
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useCreatetestMutation,
} = createtestAPI;
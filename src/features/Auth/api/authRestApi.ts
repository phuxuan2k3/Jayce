import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from "../../../app/env"

const baseQuery = fetchBaseQuery({
	baseUrl: url.bulbasaur,
	prepareHeaders: (headers) => {
		headers.set('Content-Type', 'application/json');
		return headers;
	},
});

export const authRestApi = createApi({
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		verificationEmail: builder.mutation<void, { email: string }>({
			query: ({ email }) => ({
				url: `/account/verify/email`,
				method: "POST",
				body: { email },
			})
		})
	}),
});

export default authRestApi;
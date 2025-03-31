import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from "../../../app/env"
import { Token, UserInfo } from '../store/authSlice';

const baseQuery = fetchBaseQuery({
	baseUrl: url.bulbasaur,
	prepareHeaders: (headers) => {
		headers.set('Content-Type', 'application/json');
		return headers;
	},
});

const authRestApi = createApi({
	reducerPath: 'authRestApi',
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		verificationEmail: builder.mutation<void, { email: string }>({
			query: ({ email }) => ({
				url: `/account/verify/email`,
				method: "POST",
				body: { email },
			})
		}),
		login: builder.mutation<{ token_info: Token, user: UserInfo }, { email: string; password: string }>({
			query: ({ email, password }) => ({
				url: '/account/login',
				method: 'POST',
				body: {
					local: {
						email,
						password,
					}
				},
			}),
		}),
		google: builder.mutation<{ token_info: Token, user: UserInfo }, { credential: string }>({
			query: ({ credential }) => ({
				url: '/account/google',
				method: 'POST',
				body: { credential },
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useGoogleMutation,
	useVerificationEmailMutation
} = authRestApi;

export default authRestApi;
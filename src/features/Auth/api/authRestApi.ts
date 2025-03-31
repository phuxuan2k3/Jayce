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
		register: builder.mutation<{ token_info: Token, user: UserInfo }, { local: any, role: number, metadata: any }>({
			query: ({ local, role, metadata }) => ({
				url: '/account/register',
				method: 'POST',
				body: {
					local,
					role,
					metadata
				},
			}),
		}),
		verificationEmail: builder.mutation<void, { email: string }>({
			query: ({ email }) => ({
				url: `/account/verify/email`,
				method: "POST",
				body: { email },
			}),
		}),
		reqResetPassword: builder.mutation<void, { email: string }>({
			query: ({ email }) => ({
				url: `/account/generate/resetcode`,
				method: "POST",
				body: { email },
			})
		}),
		verifyResetCode: builder.mutation<{ email: string }, { resetCode: string }>({
			query: ({ resetCode }) => ({
				url: `/account/verify/resetcode`,
				method: "POST",
				body: { resetCode },
			}),
		}),
		resetPassword: builder.mutation<void, { email: string; resetCode: string; newPassword: string }>({
			query: ({ email, resetCode, newPassword }) => ({
				url: `/account/resetpassword`,
				method: "POST",
				body: { email, resetCode, newPassword },
			}),
		})
	}),
});

export const {
	useLoginMutation,
	useGoogleMutation,
	useRegisterMutation,
	useVerificationEmailMutation,
	useResetPasswordMutation,
	useReqResetPasswordMutation,
	useVerifyResetCodeMutation,
} = authRestApi;

export default authRestApi;
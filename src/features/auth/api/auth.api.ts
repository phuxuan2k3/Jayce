import { createApi } from '@reduxjs/toolkit/query/react';
import { url } from "../../../app/env";
import serviceBaseQueryNoAuth from '../../../app/serviceBaseQueryNoAuth';
import { AuthResponse, RefreshRequest, RefreshResponse } from '../types/auth';

const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: serviceBaseQueryNoAuth(url.bulbasaur),
	endpoints: (builder) => ({
		login: builder.mutation<AuthResponse, { email: string; password: string }>({
			query: ({ email, password }) => ({
				url: '/login',
				method: 'POST',
				body: {
					local: {
						email,
						password,
					}
				},
			}),
		}),
		register: builder.mutation<AuthResponse, { local: any, role: number, metadata: any }>({
			query: ({ local, role, metadata }) => ({
				url: '/register',
				method: 'POST',
				body: {
					local,
					role,
					metadata
				},
			}),
		}),
		refresh: builder.mutation<RefreshResponse, RefreshRequest["token_info"]>({
			query: (request) => ({
				url: '/refresh',
				method: 'POST',
				body: { token_info: request },
			}),
		}),
		googleLogin: builder.mutation<AuthResponse, { credential: string }>({
			query: ({ credential }) => ({
				url: '/login',
				method: 'POST',
				body: {
					google: {
						credential
					}
				},
			}),
		}),
		googleRegister: builder.mutation<AuthResponse, { credential: string, role: number, metadata: {} }>({
			query: ({ credential, role, metadata }) => ({
				url: '/register',
				method: 'POST',
				body: {
					google: {
						credential
					},
					role,
					metadata
				},
			}),
		}),
		verificationEmail: builder.mutation<void, { email: string, username: string }>({
			query: ({ email, username }) => ({
				url: `/verify/email`,
				method: "POST",
				body: { email, username },
			}),
		}),
		reqResetPassword: builder.mutation<void, { email: string }>({
			query: ({ email }) => ({
				url: `/generate/resetcode`,
				method: "POST",
				body: { email },
			})
		}),
		verifyResetCode: builder.mutation<{ email: string }, { resetCode: string }>({
			query: ({ resetCode }) => ({
				url: `/verify/resetcode`,
				method: "POST",
				body: { resetCode },
			}),
		}),
		resetPassword: builder.mutation<void, { email: string; resetCode: string; newPassword: string }>({
			query: ({ email, resetCode, newPassword }) => ({
				url: `/resetpassword`,
				method: "POST",
				body: { email, resetCode, newPassword },
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useGoogleLoginMutation,
	useGoogleRegisterMutation,
	useRegisterMutation,
	useRefreshMutation,
	useVerificationEmailMutation,
	useResetPasswordMutation,
	useReqResetPasswordMutation,
	useVerifyResetCodeMutation,
} = authApi;

export default authApi;

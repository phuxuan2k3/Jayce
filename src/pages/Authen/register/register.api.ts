import authRestApi from '../../../features/Auth/api/authRestApi';

export const registerApi = authRestApi.injectEndpoints({
	endpoints: (builder) => ({
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
		}),
	}),
	overrideExisting: false,
});

export const {
	useVerificationEmailMutation,
	useResetPasswordMutation,
	useReqResetPasswordMutation,
	useVerifyResetCodeMutation
} = registerApi;
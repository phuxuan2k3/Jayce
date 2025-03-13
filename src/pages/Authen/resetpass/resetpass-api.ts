import loginAPI from "../../../features/Test/login.api";

const resetAPI = loginAPI.injectEndpoints({
	endpoints: (builder) => ({

		resetPassword: builder.mutation<void, { email: string }>({
			query: ({ email }) => ({
				url: `/account/generate/resetcode`,
				method: "POST",
				body: { email },
			})
		})
	}),
	overrideExisting: false,
});

export const {
	useResetPasswordMutation
} = resetAPI;

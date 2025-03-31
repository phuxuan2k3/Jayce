import authRestApi from "../../../features/Auth/api/authRestApi";

const resetAPI = authRestApi.injectEndpoints({
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

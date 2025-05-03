import { createApi } from "@reduxjs/toolkit/query/react";
import { url } from "../../../app/env";
import serviceBaseQueryWithReauth from "../../../app/serviceBaseQueryReAuth";
import { UserInfo } from "../store/authSlice";

const logoutApi = createApi({
	reducerPath: "logoutApi",
	baseQuery: serviceBaseQueryWithReauth(url.ivysaur),
	endpoints: (builder) => ({
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'GET',
			}),
		}),
		updateMetadata: builder.mutation<void, { metadata: any }>({
			query: (body) => ({
				url: '/update',
				method: 'POST',
				body,
			}),
		}),
		me: builder.mutation<{ user: UserInfo }, void>({
			query: () => ({
				url: '/me',
				method: 'GET',
			}),
		}),
		changePassword: builder.mutation<void, { oldPassword: string, newPassword: string, confirmNewPassword: string }>({
			query: (body) => ({
				url: '/changepassword',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export default logoutApi;

export const {
	useLogoutMutation,
	useUpdateMetadataMutation,
	useMeMutation,
	useChangePasswordMutation,
} = logoutApi;

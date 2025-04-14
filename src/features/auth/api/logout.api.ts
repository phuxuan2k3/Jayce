import { createApi } from "@reduxjs/toolkit/query/react";
import { url } from "../../../app/env";
import serviceBaseQueryWithReauth from "../../../app/serviceBaseQueryAuth";

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
	}),
});

export default logoutApi;

export const {
	useLogoutMutation
} = logoutApi;

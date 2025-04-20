import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { mock, noAuth } from "./env";
import { RootState } from "./store";
import { authActions, authSelectors } from "../features/auth/store/authSlice";
import { Role } from "../features/auth/types/auth";
import { RefreshRequest } from "../features/auth/types/auth";
import { Mutex } from 'async-mutex';
import authApi from "../features/auth/api/auth.api";

const mutex = new Mutex();

const serviceBaseQueryAuth = (serviceUrl: string) => fetchBaseQuery({
	baseUrl: serviceUrl,
	prepareHeaders: async (headers, { getState }) => {
		headers.set('Content-Type', 'application/json');
		const tokens = authSelectors.selectTokens(getState() as RootState);
		if (tokens?.access_token) {
			headers.set('Authorization', `Bearer ${tokens.access_token}`);
		}
		// No API gateway, decode JWT with mock data
		if (noAuth == true) {
			headers.set('x-role-id', mock.roleId);
			headers.set('x-user-id', mock.userId);
		}
		return headers;
	},
});

const serviceBaseQueryWithReauth: (serviceUrl: string) => BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = (serviceUrl) => async (args, api, extraOptions) => {
	await mutex.waitForUnlock();

	const baseQuery = serviceBaseQueryAuth(serviceUrl);
	const rootState = (api.getState() as RootState);

	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		const isAuthenticated = authSelectors.selectIsAuthenticated(rootState);
		if (!isAuthenticated) return result;

		if (mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const tokens = authSelectors.selectTokens(rootState);
				const role = authSelectors.selectRole(rootState);
				const userId = authSelectors.selectUserId(rootState);

				if (!tokens || role === Role.None || !userId) {
					api.dispatch(authActions.clearAuthState);
					return result;
				}

				const requestData: RefreshRequest = {
					token_info: {
						access_token: tokens.access_token,
						refresh_token: tokens.refresh_token,
						role: role,
						user_id: userId,
						safe_id: tokens.safe_id,
					}
				}
				const refreshResult = await api.dispatch(authApi.endpoints.refresh.initiate(requestData.token_info));
				if (refreshResult.data) {
					result = await baseQuery(args, api, extraOptions);
				}
				else {
					api.dispatch(authActions.clearAuthState);
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export default serviceBaseQueryWithReauth;
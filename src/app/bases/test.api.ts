import { BaseQueryFn, createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from "../store";
import { setAuthState, selectTokens, selectUserInfo } from "../../features/Auth/store/authSlice";
import { grpcRefreshToken } from '../../features/Auth/api/grpcClient';
import { noAuth, url } from '../env';

const baseQuery = fetchBaseQuery({
	baseUrl: url.thresh.base,
	prepareHeaders: async (headers, { getState }) => {
		headers.set('Content-Type', 'application/json');
		// Skip token verification and decode to role, user_id
		if (noAuth == true) {
			headers.set('x-role-id', '1');
			headers.set('x-user-id', '1');
			return headers;
		}
		const tokens = selectTokens(getState() as RootState);
		console.log("tokens in baseQuery: ", tokens)
		if (tokens?.access_token) {
			console.log("token in baseQuery: ", tokens.access_token)
			headers.set('Authorization', `Bearer ${tokens.access_token}`);
		}
		return headers;
	},
});

const baseQueryWithReauth: BaseQueryFn<any, any, FetchBaseQueryError> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		const user = selectUserInfo(api.getState() as RootState);
		const tokens = selectTokens(api.getState() as RootState);

		if (tokens?.refresh_token) {
			try {
				const refreshResult = await grpcRefreshToken({
					safe_id: tokens.safe_id,
					refresh_token: tokens.refresh_token,
					access_token: tokens.access_token,
					role: tokens.role,
					user_id: tokens.user_id,
				});

				if (refreshResult?.token_info) {
					const newTokens = {
						access_token: refreshResult.token_info.access_token,
						refresh_token: refreshResult.token_info.refresh_token,
						role: refreshResult.token_info.role,
						safe_id: refreshResult.token_info.safe_id,
						user_id: refreshResult.token_info.user_id,
					};

					api.dispatch(setAuthState({ user: user, tokens: newTokens }));

					console.log("Retrying request after token refresh");
					result = await baseQuery(args, api, extraOptions); // Retry
				} else {
					api.dispatch(setAuthState({ user: null, tokens: null }));
				}
			} catch (error) {
				console.error("Failed to refresh token", error);
				api.dispatch(setAuthState({ user: null, tokens: null }));
			}
		}
	}

	return result;
};

export const testApi = createApi({
	reducerPath: 'testApi',
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
});

export default testApi;
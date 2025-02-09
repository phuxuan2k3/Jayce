import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from '../../app/env';
// import { RootState } from '../../app/store';
import { AuthStateResponse, clearAuthState, selectTokens } from '../../global/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface LoginRequest {
	email: string;
	password: string;
}

interface RegisterRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

const authApiReducerPath = 'authApi';

const customFetchQuery = async (args: FetchArgs, api: BaseQueryApi, extraOptions: {}): Promise<{ data: any } | { error: FetchBaseQueryError }> => {
	const { url, method } = args;

	// Todo: Remove mock timeout for loading effect
	await new Promise(resolve => setTimeout(resolve, 2000));

	// Todo: Remove mock data
	if ((url === 'auth/login' || url === 'auth/register' || url === 'auth/refresh') && method === 'POST') {
		// Test error effect
		const email = args.body.email as string;
		if (email != null && email === '') {
			return {
				error: {
					status: 'FETCH_ERROR',
					error: 'Invalid credentials',
				},
			}
		}
		if (args.body.refreshToken) {
			const refreshToken = args.body.refreshToken.refreshToken as string;
			if (refreshToken != null && refreshToken === '') {
				console.log('Invalid refresh token');
				return {
					error: {
						status: 'FETCH_ERROR',
						error: 'Invalid refresh token',
					},
				}
			}
		}
		return {
			data: {
				user: {
					email: 'test@gmail.com',
					firstName: 'John',
					lastName: 'Doe',
					avatarPath: 'https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg',
				},
				tokens: {
					accessToken: 'mockAccessToken',
					refreshToken: 'mockRefreshToken',
				},
			},
		};
	}

	const backendFetchQuery = fetchBaseQuery({ baseUrl: backendEndpoint });
	return backendFetchQuery(args, api, extraOptions);
};

const authApi = createApi({
	reducerPath: authApiReducerPath,
	baseQuery: customFetchQuery,
	endpoints: (builder) => ({
		login: builder.mutation<AuthStateResponse, LoginRequest>({
			query: (creadentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: creadentials,
			}),
		}),

		register: builder.mutation<AuthStateResponse, RegisterRequest>({
			query: (createNew) => ({
				url: 'auth/register',
				method: 'POST',
				body: createNew,
			}),
		}),

		refresh: builder.mutation<AuthStateResponse, { refreshToken: string }>({
			query: (refreshToken) => ({
				url: 'auth/refresh',
				method: 'POST',
				body: { refreshToken },
			}),
		}),

		// Special case for logout: The token is removed from the state before the query is executed, so we need to add the token manually.
		// The queryFn is called with the baseQuery and body (with refreshToken retrived from the store), not the args (so its void).
		logout: builder.mutation<void, void>({
			// Must omit the args from the queryFn, because the queryFn is called with the baseQuery and body, not the args (it will cause conflict).
			queryFn: async (_, __, ___, baseQuery) => {
				const tokens = useAppSelector(selectTokens);
				const dispatch = useAppDispatch();
				dispatch(clearAuthState());
				if (tokens != null) {
					const result = await baseQuery({
						url: 'auth/logout',
						method: 'POST',
						body: { refreshToken: tokens.refreshToken },
					});
					if ('error' in result) {
						return result;
					}
				}
				return { data: void 0 };
			},
		}),
	})
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useRefreshMutation,
	useLogoutMutation
} = authApi;

export default authApi;
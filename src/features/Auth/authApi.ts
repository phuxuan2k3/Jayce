import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from '../../app/env';
// import { RootState } from '../../app/store';
import { AuthStateResponse, clearAuthState, selectTokens } from '../../app/redux/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { grpcSignUp, grpcSignIn, grpcSignInGoogle, grpcMe, grpcRefreshToken } from './grpcClient';
import { bulbasaur } from './api/bulbasaur';

interface LoginRequest {
	username: string;
	password: string;
}

interface RegisterRequest {
	username: string;
	email: string;
	password: string;
	confirm_password: string;
}

const authApiReducerPath = 'authApi';

const customFetchQuery = async (args: FetchArgs, api: BaseQueryApi, extraOptions: {}): Promise<{ data: any } | { error: FetchBaseQueryError }> => {
	const { url, method } = args;

	// Todo: Remove mock timeout for loading effect
	// await new Promise(resolve => setTimeout(resolve, 2000));

	// Todo: Remove mock data
	if ((url === 'auth/login' || url === 'auth/register' || url === 'auth/refresh' || url === 'auth/google' || url === 'auth/profile') && method === 'POST') {
		// Test error effect
		// const email = args.body.email as string;
		// if (email != null && email === '') {
		// 	return {
		// 		error: {
		// 			status: 'FETCH_ERROR',
		// 			error: 'Invalid credentials',
		// 		},
		// 	}
		// }

		if (url === 'auth/login') {
			const username = args.body.username as string;
			const password = args.body.password as string;
			const response = await grpcSignIn(username, password);

			const meResponse = await grpcMe(response.token_info.access_token);

			console.log("token_info:", response.token_info);

			// await new Promise(resolve => setTimeout(resolve, 2000));

			// const testResponse = await grpcRefreshToken({ safe_id: response.token_info.safe_id, refresh_token: response.token_info.refresh_token, access_token: response.token_info.access_token, role: response.token_info.role });

			// console.log('testResponse:', testResponse.token_info);

			// await new Promise(resolve => setTimeout(resolve, 2000));

			// const testResponse2 = await grpcRefreshToken({ safe_id: testResponse.token_info.safe_id, refresh_token: testResponse.token_info.refresh_token, access_token: testResponse.token_info.access_token, role: testResponse.token_info.role });

			// console.log('testResponse:', testResponse2.token_info);

			return {
				data: {
					user: {
						email: meResponse.user.email,
						username: meResponse.user.username,
						avatarPath: 'https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg',
					},
					tokens: {
						access_token: response.token_info.access_token,
						refresh_token: response.token_info.refresh_token,
						role: response.token_info.role,
						safe_id: response.token_info.safe_id,
						user_id: response.token_info.user_id,
					}
				}
			};
		}

		if (url === 'auth/google') {
			const credential = args.body.credential as string;
			const response = await grpcSignInGoogle(credential);
			return {
				data: response
			}
		}

		if (url === 'auth/register') {
			const username = args.body.username as string;
			const email = args.body.email as string;
			const password = args.body.password as string;
			const response = await grpcSignUp(username, email, password, password);

			const meResponse = await grpcMe(response.token_info.access_token);

			return {
				data: {
					user: {
						email: meResponse.user.email,
						username: meResponse.user.username,
						avatarPath: 'https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg',
					},
					tokens: {
						access_token: response.token_info.access_token,
						refresh_token: response.token_info.refresh_token,
						role: response.token_info.role,
						safe_id: response.token_info.safe_id,
						user_id: response.token_info.user_id,
					}
				}
			};
		}

		if (url === 'auth/refresh') {
			const token = args.body.token as { safe_id?: string | undefined, refresh_token?: string, access_token?: string, role?: bulbasaur.Role | undefined, user_id?: number | undefined };
			const response = await grpcRefreshToken({ safe_id: token.safe_id, refresh_token: token.refresh_token, access_token: token.access_token, role: token.role, user_id: token.user_id });

			const meResponse = await grpcMe(response.token_info.access_token);

			return {
				data: {
					user: {
						email: meResponse.user.email,
						username: meResponse.user.username,
						avatarPath: 'https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg',
					},
					tokens: {
						access_token: response.token_info.access_token,
						refresh_token: response.token_info.refresh_token,
						role: response.token_info.role,
						safe_id: response.token_info.safe_id,
						user_id: response.token_info.user_id,
					}
				}
			};
		}

		return {
			error: {
				status: 'FETCH_ERROR',
				error: 'oh no',
			},
		}
	}

	const backendFetchQuery = fetchBaseQuery({ baseUrl: backendEndpoint });
	return backendFetchQuery(args, api, extraOptions);
};

const authApi = createApi({
	reducerPath: authApiReducerPath,
	baseQuery: customFetchQuery,
	endpoints: (builder) => ({
		login: builder.mutation<AuthStateResponse, LoginRequest>({
			query: (credentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: credentials,
			}),
		}),

		google: builder.mutation<AuthStateResponse, { credential: string }>({
			query: (credentials) => ({
				url: 'auth/google',
				method: 'POST',
				body: credentials,
			}),
		}),

		register: builder.mutation<AuthStateResponse, RegisterRequest>({
			query: (createNew) => ({
				url: 'auth/register',
				method: 'POST',
				body: createNew,
			}),
		}),

		refresh: builder.mutation<AuthStateResponse, { token: { safe_id?: string | undefined, refresh_token?: string | undefined, access_token?: string | undefined, role?: bulbasaur.Role | undefined, user_id?: number | undefined } }>({
			query: (token) => ({
				url: 'auth/refresh',
				method: 'POST',
				body: token,
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
						body: { refreshToken: tokens.refresh_token },
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
	useGoogleMutation,
	useRegisterMutation,
	useRefreshMutation,
	useLogoutMutation,
} = authApi;

export default authApi;
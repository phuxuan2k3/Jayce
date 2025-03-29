import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from '../../../app/env';
import { AuthStateResponse, clearAuthState, Token } from '../store/authSlice';
import { grpcSignUp, grpcSignIn, grpcSignInGoogle, grpcMe, grpcRefreshToken } from './grpcClient';

interface LoginRequest {
	username: string;
	password: string;
}

interface RegisterRequest {
	local: {
		username: string;
		password: string;
		confirm_password: string;
		email: string;
		otp: string;
	};
	metadata: any;
	role: number;
}

const customFetchQuery = async (args: FetchArgs, api: BaseQueryApi, extraOptions: {}): Promise<{ data: any } | { error: FetchBaseQueryError }> => {
	const { url, method } = args;
	// TODO: where is logout??
	if ((
		url === 'auth/login' ||
		url === 'auth/register' ||
		url === 'auth/refresh' ||
		url === 'auth/google' ||
		url === 'auth/profile'
	) && method === 'POST') {
		try {
			if (url === 'auth/login') {
				const username = args.body.username as string;
				const password = args.body.password as string;
				const response = await grpcSignIn(username, password);
				return {
					data: {
						user: {
							username: response.user.username,
							email: response.user.email,
							role: response.user.role,
							id: response.user.id,
							metadata: response.user.metadata,
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
				const local = args.body.local;
				const metadata = args.body.metadata;
				const role = args.body.role;
				console.log('url', args.body)
				const response = await grpcSignUp(local, metadata, role);
				return {
					data: {
						user: {
							username: response.user.username,
							email: response.user.email,
							role: response.user.role,
							id: response.user.id,
							metadata: response.user.metadata,
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
				const token = args.body.token as Token;
				const response = await grpcRefreshToken(token);
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
		} catch (error: any) {
			let message = 'Unknown error';
			if ('message' in error) {
				message = error.message.toString();
			}
			return {
				error: {
					status: 400,
					data: error,
				}
			}
		}
		return {
			error: {
				status: 'FETCH_ERROR',
				error: 'Not implemented',
			},
		}
	}

	const backendFetchQuery = fetchBaseQuery({ baseUrl: backendEndpoint });
	return backendFetchQuery(args, api, extraOptions);
};

const authApi = createApi({
	reducerPath: 'authApi',
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

		refresh: builder.mutation<AuthStateResponse, Token>({
			query: (token) => ({
				url: 'auth/refresh',
				method: 'POST',
				body: token,
			}),
		}),

		logout: builder.mutation<void, void>({
			queryFn: async (_, { dispatch }) => {
				dispatch(clearAuthState());
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
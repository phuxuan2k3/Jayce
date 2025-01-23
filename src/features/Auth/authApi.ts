import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from '../../app/env';
import { RootState } from '../../app/store';

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

interface Token {
	accessToken: string;
	refreshToken: string;
}

interface AuthResponse {
	email: string;
	firstName: string;
	lastName: string;
	token: Token;
}

const authApiReducerPath = 'authApi';

const customFetchQuery = async (args: FetchArgs, api: BaseQueryApi, extraOptions: {}): Promise<{ data: any } | { error: FetchBaseQueryError }> => {
	const { url, method } = args;

	await new Promise(resolve => setTimeout(resolve, 5000));

	// Todo: Remove mock data
	if ((url === 'auth/login' || url === 'auth/register') && method === 'POST') {
		// Test error effect
		const email = args.body.email as string;
		console.log('==> email: ', email);
		console.log('==> email: ', email === '');
		if (email === '') {
			return {
				error: {
					status: 'FETCH_ERROR',
					error: 'Invalid credentials',
				},
			}
		}
		return {
			data: {
				user: {
					email: email,
					firstName: 'John',
					lastName: 'Doe',
				},
				token: {
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
		login: builder.mutation<AuthResponse, LoginRequest>({
			query: (creadentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: creadentials,
			}),
		}),

		register: builder.mutation<AuthResponse, RegisterRequest>({
			query: (createNew) => ({
				url: 'auth/register',
				method: 'POST',
				body: createNew,
			}),
		}),

		refresh: builder.mutation<AuthResponse, { refreshToken: string }>({
			query: (refreshToken) => ({
				url: 'auth/refresh',
				method: 'POST',
				body: { refreshToken },
			}),
		}),

		logout: builder.mutation<void, void>({
			queryFn: async (_, api, __, baseQuery) => {
				try {
					const token = (api.getState() as RootState).auth.tokens;
					if (token == null) {
						return { data: void 0 };
					}
					const response = await baseQuery({
						url: 'auth/logout',
						method: 'POST',
						headers: { Authorization: `Bearer ${token.accessToken}` },
					});
					if ('error' in response) {
						return { error: response.error };
					}
					return { data: void 0 };
				}
				catch (error) {
					return { error: { status: 'FETCH_ERROR', error: String(error) } };
				}
			},
		}),
	})
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useRefreshMutation,
} = authApi;

export type { AuthResponse, Token };
export default authApi;
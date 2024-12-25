import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from '../../app/env';
import { RootState } from '../../app/store';
import ClientError from '../../error/client.error';

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
const backendFetchQuery = fetchBaseQuery({ baseUrl: backendEndpoint });

// Define a service using a base URL and expected endpoints
const authApi = createApi({
	reducerPath: authApiReducerPath,
	baseQuery: backendFetchQuery,
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
					const token = (api.getState() as RootState).auth.token;
					if (token == null) {
						throw new ClientError('Unauthorized');
					}
					const response = await baseQuery({
						url: 'auth/logout',
						method: 'POST',
						headers: { Authorization: `Bearer ${token.accessToken}` },
					});
					if (response.error) {
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
	useRefreshMutation
} = authApi;

export type { AuthResponse, Token };
export default authApi;
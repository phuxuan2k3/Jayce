import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from "../../app/env"
import { Token, UserInfo } from '../../global/authSlice';

const loginBackendURL = backendEndpoint + '/bulbasaur';

const baseQuery = fetchBaseQuery({
    baseUrl: loginBackendURL,
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
		verificationEmail: builder.mutation<void, { email: string }>({
			query: ({ email }) => ({
				url: `/account/verify/email`,
				method: "POST",
				body: {email },
			})
		}),
        login: builder.mutation<{ token_info: Token, user: UserInfo }, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: '/account/login',
                method: 'POST',
                body: {
                    local: {
                        email,
                        password,
                    }
                },
            }),
        }),
        google: builder.mutation<{ token_info: Token, user: UserInfo }, { credential: string }>({
            query: ({ credential }) => ({
                url: '/account/google',
                method: 'POST',
                body: { credential },
            }),
        }),
	}),
});

export const { useVerificationEmailMutation, useLoginMutation, useGoogleMutation } = loginAPI;

export default loginAPI;
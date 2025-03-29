import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from "../../../app/env";
import { Token, UserInfo } from '../../../global/authSlice';

const registerBackendURL = backendEndpoint + '/bulbasaur';

const baseQuery = fetchBaseQuery({
    baseUrl: registerBackendURL,
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

export const registerAPI = createApi({
    reducerPath: 'registerAPI',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        register: builder.mutation<{ token_info: Token, user: UserInfo }, { local: any, role: number, metadata: any }>({
            query: ({ local, role, metadata }) => ({
                url: '/account/register',
                method: 'POST',
                body: { 
                    local,
                    role,
                    metadata
                 },
            }),
        }),
        verificationEmail: builder.mutation<void, { email: string }>({
            query: ({ email }) => ({
                url: `/account/verify/email`,
                method: "POST",
                body: { email },
            }),
        }),
        reqResetPassword: builder.mutation<void, { email: string }>({
            query: ({ email }) => ({
                url: `/account/generate/resetcode`,
                method: "POST",
                body: { email },
            })
        }),
        verifyResetCode: builder.mutation<{ email: string }, { resetCode: string }>({
            query: ({ resetCode }) => ({
                url: `/account/verify/resetcode`,
                method: "POST",
                body: { resetCode },
            }),
        }),
        resetPassword: builder.mutation<void, { email: string; resetCode: string; newPassword: string }>({
            query: ({ email, resetCode, newPassword }) => ({
                url: `/account/resetpassword`,
                method: "POST",
                body: { email, resetCode, newPassword },
            }),
        }),
    }),
});

export const { useRegisterMutation, useVerificationEmailMutation, useResetPasswordMutation ,useReqResetPasswordMutation,useVerifyResetCodeMutation} = registerAPI;

export default registerAPI;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from "../../../app/env";

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

export const { useVerificationEmailMutation, useResetPasswordMutation ,useReqResetPasswordMutation,useVerifyResetCodeMutation} = registerAPI;

export default registerAPI;

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
    }),
});

export const { useVerificationEmailMutation } = registerAPI;

export default registerAPI;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendURL } from "../../app/env"
import { TestDisplay } from '../../pages/Test/TestList/types';

const testBackendURL = backendURL + '/test';

const baseQuery = fetchBaseQuery({
    baseUrl: testBackendURL,
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', `Bearer token`); // todo: replace with actual token
        return headers;
    },
});

export const testApi = createApi({
    reducerPath: 'testApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getTestList: builder.query<TestDisplay[], void>({
            query: () => '/list',
        }),
    }),
});

export const {
    useGetTestListQuery,
} = testApi;

export default testApi;
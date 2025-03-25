import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from "../../app/env"

const testBackendURL = backendEndpoint + '/darius';
// "http://localhost:8080",
const baseQuery = fetchBaseQuery({
    baseUrl: testBackendURL,
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

export const aiAPI = createApi({
    reducerPath: 'aiApi',
    baseQuery: baseQuery,
    endpoints: () => ({}),
});

export default aiAPI;
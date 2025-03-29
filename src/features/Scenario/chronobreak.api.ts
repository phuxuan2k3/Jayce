import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from "../../app/env"

const chronobreakBackendURL = backendEndpoint + '/chronobreak';
console.log('chronobreakBackendURL:', chronobreakBackendURL);

const baseQuery = fetchBaseQuery({
    baseUrl: chronobreakBackendURL
});

export const chronobreakApi = createApi({
    reducerPath: 'chronobreakApi',
    baseQuery: baseQuery,
    endpoints: () => ({}),
});

export default chronobreakApi;
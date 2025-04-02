import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from "../env"

const baseQuery = fetchBaseQuery({
	baseUrl: url.darius,
	prepareHeaders: (headers) => {
		headers.set('Content-Type', 'application/json');
		return headers;
	},
});

export const promptApi = createApi({
	reducerPath: 'aiApi',
	baseQuery: baseQuery,
	endpoints: () => ({}),
});

export default promptApi;
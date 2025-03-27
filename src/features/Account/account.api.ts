import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from "../../app/env"

const accountBackendURL = backendEndpoint + '/akali/account';

const baseQuery = fetchBaseQuery({
	baseUrl: accountBackendURL,
	prepareHeaders: (headers) => {
		headers.set('Content-Type', 'application/json');
		headers.set('Authorization', `Bearer token`); // todo: replace with actual token
		return headers;
	},
});

export type CompanyResponse = {
	ID: string;
	name: string;
	imageUrl: string;
}

const accountApi = createApi({
	reducerPath: 'accountApi',
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		getCompanies: builder.query<CompanyResponse[], string[]>({
			query: (ids) => ({
				url: `/company/many`,
				method: "POST",
				body: JSON.stringify({ ids }),
			})
		}),
	}),
});

export const {
	useGetCompaniesQuery,
	useLazyGetCompaniesQuery
} = accountApi;

export default accountApi;
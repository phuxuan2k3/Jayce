import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { noAuth } from "./env";
import mockAuthResponse from "../mocks/auth";
import { AuthResponse } from "../features/auth/types/auth";

const serviceBaseQueryNoAuth = (serviceUrl: string) => {
	const baseQuery = fetchBaseQuery({
		baseUrl: serviceUrl,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	});

	const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
		let endpoint: string;
		if (typeof args === 'string') {
			endpoint = args
		} else if (typeof args === 'object' && args.url) {
			endpoint = args.url
		} else {
			throw new Error("Invalid argument type for args. Expected string or object with url property.");
		}
		if (noAuth === true) {
			switch (endpoint) {
				case '/login':
					return {
						data: mockAuthResponse as AuthResponse
					};
				case '/refresh':
					return {
						data: mockAuthResponse as AuthResponse
					};
				default:
					return baseQuery(args, api, extraOptions);
			}
		}
		// Otherwise, proceed with the actual fetchBaseQuery
		return baseQuery(args, api, extraOptions);
	};

	return customBaseQuery;
};

export default serviceBaseQueryNoAuth;
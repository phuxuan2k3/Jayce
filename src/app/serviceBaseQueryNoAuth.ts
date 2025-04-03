import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const serviceBaseQueryNoAuth = (serviceUrl: string) => fetchBaseQuery({
	baseUrl: serviceUrl,
	prepareHeaders: (headers) => {
		headers.set('Content-Type', 'application/json');
		return headers;
	},
});

export default serviceBaseQueryNoAuth;
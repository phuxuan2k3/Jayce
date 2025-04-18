import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import serviceBaseQueryWithReauth from "../../../app/serviceBaseQueryAuth";
import { url } from "../../../app/env";

const mockBaseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extra) => {
	const serviceBaseQuery = serviceBaseQueryWithReauth(url.thresh.base);
	const baseQuery = serviceBaseQuery(args, api, extra);
	return baseQuery;
}
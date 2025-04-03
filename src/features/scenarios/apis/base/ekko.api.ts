import { createApi } from "@reduxjs/toolkit/query/react";
import serviceBaseQueryWithReauth from "../../../../app/serviceBaseQueryAuth";
import { url } from "../../../../app/env";

export const ekkoApi = createApi({
	reducerPath: 'ekkoApi',
	baseQuery: serviceBaseQueryWithReauth(url.ekko),
	endpoints: () => ({}),
});

export default ekkoApi;
import { createApi } from "@reduxjs/toolkit/query";
import { url } from "../../../app/env";
import serviceBaseQueryWithReauth from "../../../app/serviceBaseQueryAuth";

const accountApi = createApi({
	reducerPath: "accountApi",
	baseQuery: serviceBaseQueryWithReauth(url.ivysaur),
	endpoints: (builder) => ({
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'GET',
			}),
		}),

	}),
});

export default accountApi;
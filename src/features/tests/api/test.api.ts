import { createApi } from '@reduxjs/toolkit/query/react';
import serviceBaseQueryWithReauth from '../../../app/serviceBaseQueryReAuth';
import { url } from '../../../app/env';

export const testApi = createApi({
	reducerPath: 'testApi',
	baseQuery: async (args, api, extra) => {
		return await serviceBaseQueryWithReauth(url.thresh.base)(args, api, extra);
	},
	endpoints: () => ({}),
});

export default testApi;
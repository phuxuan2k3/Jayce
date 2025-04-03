import { createApi } from '@reduxjs/toolkit/query/react';
import { url } from '../../../app/env';
import serviceBaseQueryWithReauth from '../../../app/serviceBaseQueryAuth';

export const testApi = createApi({
	reducerPath: 'testApi',
	baseQuery: serviceBaseQueryWithReauth(url.thresh.base),
	endpoints: () => ({}),
});

export default testApi;
import { createApi } from '@reduxjs/toolkit/query/react';
import serviceBaseQueryWithReauth from '../../../app/serviceBaseQueryReAuth';
import { url } from '../../../app/env';

export const promptApi = createApi({
	reducerPath: 'promptApi',
	baseQuery: serviceBaseQueryWithReauth(url.darius),
	endpoints: () => ({}),
});

export default promptApi;
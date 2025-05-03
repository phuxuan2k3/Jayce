import { createApi } from '@reduxjs/toolkit/query/react';
import { url } from '../../../app/env';
import serviceBaseQueryWithReauth from '../../../app/serviceBaseQueryReAuth';

export const promptApi = createApi({
	reducerPath: 'aiApi',
	baseQuery: serviceBaseQueryWithReauth(url.darius),
	endpoints: () => ({}),
});

export default promptApi;
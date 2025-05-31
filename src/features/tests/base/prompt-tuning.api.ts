import { createApi } from '@reduxjs/toolkit/query/react';
import { url } from '../../../app/env';
import serviceBaseQueryWithReauth from '../../../app/serviceBaseQueryReAuth';

export const promptTuningApi = createApi({
	reducerPath: 'promptTuningApi',
	baseQuery: serviceBaseQueryWithReauth(url.darius),
	endpoints: () => ({}),
});

export default promptTuningApi;
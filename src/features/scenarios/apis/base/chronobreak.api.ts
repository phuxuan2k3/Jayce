import { createApi } from '@reduxjs/toolkit/query/react';
import serviceBaseQueryWithReauth from '../../../../app/serviceBaseQueryReAuth';
import { url } from '../../../../app/env';

export const chronobreakApi = createApi({
	reducerPath: 'chronobreakApi',
	baseQuery: serviceBaseQueryWithReauth(url.chronobreak),
	endpoints: () => ({}),
});

export default chronobreakApi;
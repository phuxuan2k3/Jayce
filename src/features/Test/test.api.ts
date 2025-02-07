import { BaseQueryFn, createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from "../../app/env"
import { RootState } from "../../app/store";
import { setAuthState, selectTokens, selectUserInfo } from "../../global/authSlice";
import { grpcRefreshToken } from '../Auth/grpcClient';

const testBackendURL = backendEndpoint + '/thresh/api/test';
console.log('testBackendURL:', testBackendURL);

const baseQuery = fetchBaseQuery({
    baseUrl: testBackendURL,
    prepareHeaders: (headers, { getState }) => {
        const tokens = selectTokens(getState() as RootState);
        if (tokens) {
            headers.set('Authorization', `Bearer ${tokens.accessToken}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<any, any, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const user = selectUserInfo(api.getState() as RootState);
        const tokens = selectTokens(api.getState() as RootState);
        
        if (tokens?.refreshToken) {
            try {
                const refreshResult = await grpcRefreshToken({
                    safe_id: tokens.safe_id,
                    refresh_token: tokens.refreshToken,
                    access_token: tokens.accessToken,
                    role: tokens.role,
                });

                if (refreshResult?.token_info) {
                    const newTokens = {
                        accessToken: refreshResult.token_info.access_token,
                        refreshToken: refreshResult.token_info.refresh_token,
                        role: refreshResult.token_info.role,
                        safe_id: refreshResult.token_info.safe_id,
                    };

                    api.dispatch(setAuthState({ user: user, tokens: newTokens }));
                    
                    result = await baseQuery(args, api, extraOptions); // Retry
                } else {
                    api.dispatch(setAuthState({ user: null, tokens: null }));
                }
            } catch (error) {
                console.error("Failed to refresh token", error);
                api.dispatch(setAuthState({ user: null, tokens: null }));
            }
        }
    }

    return result;
};

export const testApi = createApi({
    reducerPath: 'testApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});

export default testApi;
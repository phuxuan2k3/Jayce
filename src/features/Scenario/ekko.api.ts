import { BaseQueryFn, createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from "../../app/env"
import { RootState } from "../../app/store";
import { setAuthState, selectTokens, selectUserInfo } from "../../global/authSlice";
import { grpcRefreshToken } from '../Auth/grpcClient';

const ekkoBackendURL = backendEndpoint + '/ekko';
console.log('ekkoBackendURL:', ekkoBackendURL);

const baseQuery = fetchBaseQuery({
    baseUrl: ekkoBackendURL,
    prepareHeaders: async (headers, { getState }) => {
        const tokens = selectTokens(getState() as RootState);
        console.log("tokens in baseQuery: ", tokens)
        if (tokens?.access_token) {
            console.log("token in baseQuery: ", tokens.access_token)
            headers.set('Authorization', `Bearer ${tokens.access_token}`);
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
        
        if (tokens?.refresh_token) {
            try {
                const refreshResult = await grpcRefreshToken({
                    safe_id: tokens.safe_id,
                    refresh_token: tokens.refresh_token,
                    access_token: tokens.access_token,
                    role: tokens.role,
                    user_id: tokens.user_id,
                });

                if (refreshResult?.token_info) {
                    const newTokens = {
                        access_token: refreshResult.token_info.access_token,
                        refresh_token: refreshResult.token_info.refresh_token,
                        role: refreshResult.token_info.role,
                        safe_id: refreshResult.token_info.safe_id,
                        user_id: refreshResult.token_info.user_id,
                    };

                    api.dispatch(setAuthState({ user: user, tokens: newTokens }));
                    
                    console.log("Retrying request after token refresh");
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

export const ekkoApi = createApi({
    reducerPath: 'ekkoApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});

export default ekkoApi;
import { BaseQueryFn, createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from "../../app/env";
import { RootState } from "../../app/store";
import { setAuthState, selectTokens, selectUserInfo } from "../../global/authSlice";
import { grpcRefreshToken } from '../Auth/grpcClient';

const createBaseQuery = (basePath: string) => {
    return fetchBaseQuery({
        baseUrl: `${backendEndpoint}/${basePath}`,
        prepareHeaders: async (headers, { getState }) => {
            const tokens = selectTokens(getState() as RootState);
            console.log(`Tokens in ${basePath} baseQuery: `, tokens);

            if (tokens?.access_token) {
                console.log(`Access Token in ${basePath} baseQuery: `, tokens.access_token);
                headers.set('Authorization', `Bearer ${tokens.access_token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    });
};

const createBaseQueryWithReauth = (basePath: string): BaseQueryFn<any, any, FetchBaseQueryError> => {
    const baseQuery = createBaseQuery(basePath);

    return async (args, api, extraOptions) => {
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

                        api.dispatch(setAuthState({ user, tokens: newTokens }));

                        console.log(`Retrying request after token refresh for ${basePath}`);
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        api.dispatch(setAuthState({ user: null, tokens: null }));
                    }
                } catch (error) {
                    console.error(`Failed to refresh token for ${basePath}`, error);
                    api.dispatch(setAuthState({ user: null, tokens: null }));
                }
            }
        }

        return result;
    };
};

export const createApiWithAuth = (reducerPath: string, basePath: string) => {
    return createApi({
        reducerPath,
        baseQuery: createBaseQueryWithReauth(basePath),
        endpoints: () => ({}),
    });
};

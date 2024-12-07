import React from 'react';
import { toErrorMessage } from '../../../error/fetchBaseQuery.error';

interface UseQueryHookResult<T> {
    data?: T;
    error?: unknown;
    isLoading: boolean;
}

interface FetchWithStateResult<T> {
    fetchStateContent: React.ReactNode | null; // Loading or error content
    data: T | null;                  // Fetched data or null
}

// Define the custom hook
export default function useFetchWithState<T, U>(queryHook: (args: U) => UseQueryHookResult<T>, args: U): FetchWithStateResult<T> {
    const { data, error, isLoading } = queryHook(args);

    if (isLoading) {
        return {
            fetchStateContent: <div>Loading...</div>,
            data: null
        };
    }

    if (error) {
        return {
            fetchStateContent: <div>Error: {toErrorMessage(error)}</div>,
            data: null
        };
    }

    if (!data) {
        return {
            fetchStateContent: <div>No data found</div>,
            data: null
        }
    }

    return {
        fetchStateContent: null,
        data: data
    };
};

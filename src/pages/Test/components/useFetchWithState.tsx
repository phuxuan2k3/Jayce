import React from 'react';
import { toErrorMessage } from '../../../helpers/fetchBaseQuery.error';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';

interface UseQueryHookResult<T> {
	data?: T;
	error?: unknown;
	isLoading: boolean;
	skeletonHeight?: number;
}

interface FetchWithStateResult<T> {
	fetchStateContent: React.ReactNode | null; // Loading or error content
	data: T | null;                  // Fetched data or null
}

// Define the custom hook
export default function useFetchWithState<T, U>(queryHook: (args: U) => UseQueryHookResult<T>, args: U): FetchWithStateResult<T> {
	const { data, error, isLoading, skeletonHeight } = queryHook(args);

	if (isLoading) {
		return {
			fetchStateContent: <Skeleton variant="rounded" height={skeletonHeight || 120} />,
			data: null
		};
	}

	if (error) {
		return {
			fetchStateContent: <Alert severity="error">{toErrorMessage(error)}</Alert>,
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

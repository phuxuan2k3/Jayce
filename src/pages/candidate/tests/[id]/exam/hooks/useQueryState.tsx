import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React from 'react'
import SpinnerLoading from '../../../../../../components/ui/loading/SpinnerLoading';
import { FetchError } from '../../../../../../app/server-error';

export default function useQueryState({
	queries,
	loadingComponent = <SpinnerLoading />,
	onError = (error) => { throw new FetchError(error) },
}: {
	queries: {
		isLoading: boolean;
		error?: FetchBaseQueryError | SerializedError | unknown;
	}[];
	loadingComponent?: React.ReactNode;
	onError?: (error: FetchBaseQueryError | SerializedError | unknown) => void;
}) {
	const isLoading = queries.some((query) => query.isLoading);
	const error = queries.find((query) => query.error);

	if (isLoading) return loadingComponent;
	if (error) onError(error.error);

	return null;
}

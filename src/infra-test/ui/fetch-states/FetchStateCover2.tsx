import React from 'react'
import { FetchError, FetchState } from '../../types/FetchState'
import LoadingCover from './LoadingCover';
import ErrorCover from './ErrorCover';
import NoDataAvailibleCover from './NoDataAvailibleCover';

export default function FetchStateCover2<T>({
	fetchState,
	loadingComponent,
	errorComponent,
	nodataComponent,
	dataComponent,
	children,
}: {
	fetchState: FetchState<T>;
	loadingComponent?: React.ReactNode;
	errorComponent?: (error: FetchError) => React.ReactNode;
	nodataComponent?: React.ReactNode;
	dataComponent?: (data: T) => React.ReactNode;
	children?: React.ReactNode;
}) {
	if (fetchState.isLoading) return loadingComponent || <LoadingCover />;
	if (fetchState.error) {
		return errorComponent
			? errorComponent(fetchState.error)
			: <ErrorCover error={fetchState.error} />;
	}
	if (!fetchState.data) return nodataComponent || <NoDataAvailibleCover />;
	return dataComponent
		? dataComponent(fetchState.data)
		: <>{children}</>;
}

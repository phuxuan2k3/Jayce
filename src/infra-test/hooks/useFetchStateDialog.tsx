import { useEffect } from 'react'
import { FetchStateMutate } from '../../app/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import fetchStateSlice from '../stores/fetchStateSlice';
import { parseQueryError } from '../../helpers/fetchBaseQuery.error';

export default function useFetchStateDialog({
	isLoading,
	error,
	isSuccess,
	onRetry,
	onSuccess,
}: Omit<FetchStateMutate, "data"> & {
	onRetry: () => void;
	onSuccess: () => void;
}) {
	const isRetrying = useAppSelector((state) => state.fetchState.isRetrying);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const errorMessage = parseQueryError(error);
		dispatch(fetchStateSlice.actions.fetchStateChange({
			isLoading,
			errorMessage,
		}))
	}, [isLoading, error, dispatch]);

	useEffect(() => {
		if (isRetrying) {
			onRetry();
		}
	}, [isRetrying]);

	useEffect(() => {
		if (isSuccess) {
			dispatch(fetchStateSlice.actions.clear());
			onSuccess();
		}
	}, [isSuccess, dispatch, onSuccess]);
}

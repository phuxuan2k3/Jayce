import { useEffect } from 'react'
import { FetchError } from '../types/fetch-state';
import { parseQueryError } from '../../../helpers/fetchBaseQuery.error';

type ActionState<T> = {
	isLoading: boolean;
	isSuccess: boolean;
	error?: FetchError;
	data?: T;
}

type Options<T> = {
	onLoading?: () => void;
	onSuccess?: (data: T) => void;
	onError?: (error: FetchError) => void;
	onErrorMessage?: (errorMessage: string) => string;
}

export default function useActionStateWatch<T>(actionState: ActionState<T>, options?: Options<T>) {
	const { isLoading, isSuccess, error, data } = actionState;
	const { onLoading, onSuccess, onError, onErrorMessage } = options || {};
	useEffect(() => {
		if (isLoading) onLoading?.();
	}, [isLoading, onLoading]);

	useEffect(() => {
		if (isSuccess && data) onSuccess?.(data);
	}, [isSuccess, data, onSuccess]);

	useEffect(() => {
		const errorMessage = parseQueryError(error);
		if (error) {
			onError?.(error);
		}
		if (errorMessage) {
			onErrorMessage?.(errorMessage);
		}
	}, [error, onError, onErrorMessage]);
}

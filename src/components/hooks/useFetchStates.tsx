import { FetchState } from '../../app/types'
import { parseQueryError } from '../../helpers/fetchBaseQuery.error';

export default function useFetchStatesCombine({
	fetchStates,
}: {
	fetchStates: FetchState<unknown>[];
}): FetchState<unknown> & { errorMessage: string | null } {
	const isLoading = fetchStates.some(state => state.isLoading);
	const error = fetchStates.find(state => state.error)?.error;
	const errorMessage = parseQueryError(error) || null;
	return {
		isLoading,
		error,
		errorMessage,
		data: fetchStates.reduce((acc, state) => {
			if (state.data) {
				return { ...acc, ...state.data };
			}
			return acc;
		}, {}),
	}
}

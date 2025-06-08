import { FetchStateQuery } from '../../app/types'
import { parseQueryError } from '../../helpers/fetchBaseQuery.error';

export default function useFetchStatesCombine({
	fetchStates,
}: {
	fetchStates: FetchStateQuery<unknown>[];
}): FetchStateQuery<unknown> & { errorMessage: string | null } {
	const isLoading = fetchStates.some(state => state.isLoading);
	const error = fetchStates.find(state => state.error)?.error;
	const errorMessage = parseQueryError(error) || null;
	const data = fetchStates.some(state => state.data == null)
		? undefined
		: fetchStates.map(state => state.data);

	return {
		isLoading,
		error,
		errorMessage,
		data,
	}
}

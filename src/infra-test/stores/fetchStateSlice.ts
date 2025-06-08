import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
	isLoading: boolean;
	errorMessage: string | null;
	isRetrying: boolean;
};

const initialState: State = {
	isLoading: false,
	errorMessage: null,
	isRetrying: false,
};

const fetchStateSlice = createSlice({
	name: 'fetchState',
	initialState,
	reducers: {
		fetchStateChange(state, action: PayloadAction<{
			isLoading: boolean;
			errorMessage: string | null;
		}>) {
			const { isLoading, errorMessage } = action.payload;
			state.isLoading = isLoading;
			state.errorMessage = errorMessage;
		},
		setRetrying(state, action: PayloadAction<boolean>) {
			state.isRetrying = action.payload;
		},
		clear(state) {
			state.isLoading = false;
			state.errorMessage = null;
			state.isRetrying = false;
		},
	}
});

export default fetchStateSlice;
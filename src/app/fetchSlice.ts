import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FetchState {
	loading: boolean;
	error: boolean;
	errorMessage: string | null;
}

const initialState: FetchState = {
	loading: false,
	error: false,
	errorMessage: null,
};

const fetchSlice = createSlice({
	name: 'fetch',
	reducerPath: 'fetch',
	initialState,
	reducers: {
		fetchStart: (state) => {
			state.loading = true;
			state.error = false;
			state.errorMessage = null;
		},
		fetchSuccess: (state) => {
			state.loading = false;
			state.error = false;
			state.errorMessage = null;
		},
		fetchFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = true;
			state.errorMessage = action.payload;
		},
		clearFetchState: (state) => {
			state.loading = false;
			state.error = false;
			state.errorMessage = null;
		}
	}
});

export default fetchSlice;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store.ts';
import authApi, { AuthResponse, Token } from '../features/Auth/authApi.ts';
import LocalStorageService from '../services/localstorage.service.ts';

interface AuthState {
	user: {
		email: string;
		firstName: string;
		lastName: string;
		avatarPath?: string;
	} | null,
	tokens: Token | null,
};

const initialState: AuthState = ((): AuthState => {
	return {
		user: null,
		tokens: null,
	}
})();

function _setAuthState(state: AuthState, action: PayloadAction<AuthResponse>) {
	state.user = {
		email: action.payload.email,
		firstName: action.payload.firstName,
		lastName: action.payload.lastName,
	};
	state.tokens = action.payload.token;
	LocalStorageService.setTokens(action.payload.token);
}

function _clearAuthState(state: AuthState) {
	state.user = null;
	state.tokens = null;
	LocalStorageService.clearTokens();
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearAuthState: _clearAuthState
	},
	extraReducers: (builder) => {
		builder
			// Login
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, action) => {
					_setAuthState(state, action);
				})

			// Register
			.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, action) => {
					_setAuthState(state, action);
				})

			// Refresh
			.addMatcher(
				authApi.endpoints.refresh.matchFulfilled,
				(state, action) => {
					_setAuthState(state, action);
				})
			.addMatcher(
				authApi.endpoints.refresh.matchRejected,
				(state) => {
					_clearAuthState(state);
				}
			)

			// Logout
			.addMatcher(
				(action) =>
					authApi.endpoints.logout.matchFulfilled(action) ||
					authApi.endpoints.logout.matchRejected(action),
				(state) => {
					_clearAuthState(state);
				})

	},
});

/**
 * Since the app startup, the tokens are loaded from the local storage and being verified with auth/refresh endpoint and being reduced to the authSlice (if valid) or set null in the authSlice. Therefore, tokens in authSlice are 100% valid, NOT the ones in localStorage.
 */
export const selectIsAuthenticated = (state: RootState) => state.auth.tokens != null && state.auth.user != null;

export const { clearAuthState } = authSlice.actions;

export default authSlice.reducer;
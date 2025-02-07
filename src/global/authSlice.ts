import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store.ts';
import LocalStorageService from '../services/localstorage.service.ts';
import authApi from '../features/Auth/authApi.ts';
import { bulbasaur } from '../features/Auth/protos/bulbasaur.ts';

export type UserInfo = {
	email: string;
	username: string;
	avatarPath: string;
}

export type Token = {
	accessToken: string;
	refreshToken: string;
	role: bulbasaur.Role;
	safe_id: string;
}

export interface AuthState {
	user: UserInfo | null,
	tokens: Token | null,
};

export interface AuthStateResponse {
	user: UserInfo | null,
	tokens: Token | null,
}

const initialState: AuthState = ((): AuthState => {
	return {
		user: null,
		tokens: null,
	}
})();

function _setAuthState(state: AuthState, action: PayloadAction<AuthStateResponse>) {
	state.tokens = action.payload.tokens;
	state.user = action.payload.user;
	LocalStorageService.setAuthState(state);
}

function _clearAuthState(state: AuthState) {
	state.user = null;
	state.tokens = null;
	LocalStorageService.clearAuthState();
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearAuthState: _clearAuthState,
		setAuthState: _setAuthState,
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
					_clearAuthState(state); // Todo: clear again needed?
					console.log('Logout completed');
				})

	},
});

/**
 * Since the app startup, the tokens are loaded from the local storage and being verified with auth/refresh endpoint and being reduced to the authSlice (if valid) or set null in the authSlice. Therefore, tokens in authSlice are 100% valid, NOT the ones in localStorage.
 */
export const selectIsAuthenticated = (state: RootState) => state.auth.tokens != null && state.auth.user != null;
export const selectUserInfo = (state: RootState) => state.auth.user;
export const selectTokens = (state: RootState) => state.auth.tokens;

export const { clearAuthState, setAuthState } = authSlice.actions;

export default authSlice.reducer;
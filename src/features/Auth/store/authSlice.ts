import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store.ts';
import authApi from '../api/authApi.ts';
import { bulbasaur } from '../grpc/bulbasaur.ts';
import { Role } from '../../../app/enum.ts';

export type UserInfo = {
	username: string;
	email: string;
	metadata: any;
	avatarPath?: string;
}

export type Token = {
	access_token: string;
	refresh_token: string;
	role: bulbasaur.Role;
	safe_id: string;
	user_id: number;
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
}

function _clearAuthState(state: AuthState) {
	state.user = null;
	state.tokens = null;
	console.log("Cleared auth state");
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearAuthState: _clearAuthState,
		setAuthState: _setAuthState,
	},
	selectors: {
		selectIsAuthenticated: (state: AuthState) => state.tokens != null && state.user != null,
		selectUserInfo: (state: AuthState) => {
			const user = state.user;
			if (user == null) {
				throw new Error("User is null");
			}
			return user;
		},
		selectTokens: (state: AuthState) => {
			if (state.tokens == null) {
				throw new Error("Tokens are null");
			}
			state.tokens
		},
		selectRole: (state: AuthState): Role => {
			const _role = state.tokens?.role;
			if (_role == null) {
				return Role.None;
			}
			switch (_role) {
				case bulbasaur.Role.ROLE_CANDIDATE:
					return Role.Candidate;
				case bulbasaur.Role.ROLE_BUSINESS_MANAGER:
					return Role.Manager;
				case bulbasaur.Role.ROLE_UNKNOWN:
					return Role.None;
			}
		}
	},
	extraReducers: (builder) => {
		builder
			// Login
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, action) => {
					console.log("Login fulfilled");
					_setAuthState(state, action);
				})

			// Register
			.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, action) => {
					console.log("Register fulfilled");
					_setAuthState(state, action);
				})

			// Refresh
			.addMatcher(
				authApi.endpoints.refresh.matchFulfilled,
				(state, action) => {
					console.log("Refresh fulfilled");
					_setAuthState(state, action);
				})
			.addMatcher(
				authApi.endpoints.refresh.matchRejected,
				(state) => {
					console.log("Refresh rejected");
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

export const selectIsAuthenticated = (state: RootState) => state.auth.tokens != null && state.auth.user != null;

export const selectUserInfo = (state: RootState) => {
	const user = state.auth.user;
	if (user == null) {
		throw new Error("User is null");
	}
	return user;
}

export const selectTokens = (state: RootState) => state.auth.tokens;

export const selectRole = (state: RootState): Role => {
	const _role = state.auth.tokens?.role;
	if (_role == null) {
		return Role.None;
	}
	switch (_role) {
		case bulbasaur.Role.ROLE_CANDIDATE:
			return Role.Candidate;
		case bulbasaur.Role.ROLE_BUSINESS_MANAGER:
			return Role.Manager;
		case bulbasaur.Role.ROLE_UNKNOWN:
			return Role.None;
	}
}

export const { clearAuthState, setAuthState } = authSlice.actions;

export default authSlice.reducer;
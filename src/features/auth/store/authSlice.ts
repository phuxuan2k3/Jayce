import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from "../types/auth.ts";
import { AuthResponse } from '../types/auth.ts';
import authApi from '../api/auth.api.ts';
import logoutApi from '../api/logout.api.ts';

export type UserInfo = {
	id: string;
	role: Role;
	username: string;
	email: string;
	metadata: any;
	avatarPath?: string;
}

export type Token = {
	access_token: string;
	refresh_token: string;
	safe_id: string;
}

export interface AuthState {
	isAuthenticated: boolean;
	user: UserInfo | null,
	tokens: Token | null,
};

const initialState: AuthState = ((): AuthState => {
	return {
		isAuthenticated: false,
		user: null,
		tokens: null,
	}
})();

function _setAuthStateFromResponse(state: AuthState, action: PayloadAction<AuthResponse>) {
	const data = action.payload;
	state.isAuthenticated = true;
	state.user = {
		id: data.user.id.toString(),
		email: data.user.email,
		role: data.user.role,
		username: data.user.username,
		avatarPath: data.user.metadata?.avatarPath,
		metadata: data.user.metadata,
	};
	state.tokens = {
		access_token: data.token_info.access_token,
		refresh_token: data.token_info.refresh_token,
		safe_id: data.token_info.safe_id,
	};
}

function _clearAuthState(state: AuthState) {
	state.isAuthenticated = false;
	state.user = null;
	state.tokens = null;
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearAuthState: (state) => {
			_clearAuthState(state);
		},
		setAuthStateFromResponse: (state, action: PayloadAction<AuthResponse>) => {
			_setAuthStateFromResponse(state, action);
		},
	},
	selectors: {
		selectUserInfo: (state: AuthState) => {
			return state.user;
		},
		selectTokens: (state: AuthState) => {
			return state.tokens;
		},
		selectRole: (state: AuthState): Role => {
			const role = state.user?.role;
			if (role == null) {
				return Role.None;
			}
			return role;
		},
		selectUserId: (state: AuthState): string | null => {
			return state.user?.id || null;
		},
		selectUserIdStrict: (state: AuthState): string => {
			if (state.user == null) {
				throw new Error('User ID is null');
			}
			return state.user.id;
		},
		selectIsAuthenticated: (state: AuthState): boolean => {
			return state.isAuthenticated;
		},
	},
	extraReducers: (builder) => {
		builder
			// Login
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, action) => {
					_setAuthStateFromResponse(state, action);
				})
			// Register
			.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, action) => {
					_setAuthStateFromResponse(state, action);
				})
			// Login with Google
			.addMatcher(
				authApi.endpoints.googleLogin.matchFulfilled,
				(state, action) => {
					_setAuthStateFromResponse(state, action);
				}
			)
			// Register with Google
			.addMatcher(
				authApi.endpoints.googleRegister.matchFulfilled,
				(state, action) => {
					_setAuthStateFromResponse(state, action);
				}
			)
			// Logout
			.addMatcher(
				(action) =>
					logoutApi.endpoints.logout.matchFulfilled(action) ||
					logoutApi.endpoints.logout.matchRejected(action),
				(state) => {
					_clearAuthState(state);
				}
			)
			// Refresh Token
			.addMatcher(
				authApi.endpoints.refresh.matchFulfilled,
				(state, action) => {
					state.isAuthenticated = true;
					state.tokens = {
						access_token: action.payload.token_info.access_token,
						refresh_token: action.payload.token_info.refresh_token,
						safe_id: action.payload.token_info.safe_id,
					};
				}
			)
			.addMatcher(
				authApi.endpoints.refresh.matchRejected,
				(state) => {
					_clearAuthState(state);
				}
			)
			// Me
			.addMatcher(
				logoutApi.endpoints.me.matchFulfilled,
				(state, action) => {
					state.isAuthenticated = true;
					state.user = {
						id: action.payload.user.id.toString(),
						email: action.payload.user.email,
						role: action.payload.user.role,
						username: action.payload.user.username,
						avatarPath: action.payload.user.metadata?.avatarPath,
						metadata: action.payload.user.metadata,
					};
				}
			)
	},
});

export const authActions = authSlice.actions;
export const authSelectors = authSlice.selectors;

export default authSlice.reducer;

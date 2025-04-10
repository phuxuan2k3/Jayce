import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from "../types/auth.ts";
import { AuthResponse } from '../types/auth.ts';
import authApi from '../api/auth.api.ts';
import accountApi from '../api/account.api.ts';

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
	user: UserInfo | null,
	tokens: Token | null,
};

const initialState: AuthState = ((): AuthState => {
	return {
		user: null,
		tokens: null,
	}
})();

function _setAuthStateFromResponse(state: AuthState, action: PayloadAction<AuthResponse>) {
	const data = action.payload;
	const authState: AuthState = {
		user: {
			id: data.user.id.toString(),
			email: data.user.email,
			role: data.user.role,
			username: data.user.username,
			avatarPath: data.user.metadata?.avatarPath,
			metadata: data.user.metadata,
		},
		tokens: {
			access_token: data.token_info.access_token,
			refresh_token: data.token_info.refresh_token,
			safe_id: data.token_info.safe_id,
		}
	}
	state.user = authState.user;
	state.tokens = authState.tokens;
}

function _clearAuthState(state: AuthState) {
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
		}
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
				authApi.endpoints.google.matchFulfilled,
				(state, action) => {
					_setAuthStateFromResponse(state, action);
				}
			)
			// Logout
			.addMatcher(
				(action) =>
					accountApi.endpoints.logout.matchFulfilled(action) ||
					accountApi.endpoints.logout.matchRejected(action),
				(state) => {
					_clearAuthState(state);
				}
			)
	},
});

export const authActions = authSlice.actions;
export const authSelectors = authSlice.selectors;

export default authSlice.reducer;
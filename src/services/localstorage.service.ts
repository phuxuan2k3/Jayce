import { AuthState } from "../global/authSlice";

class LocalStorageService {
	private static readonly authStateKey: string = 'authState';

	static getAuthState(): AuthState | null {
		const authState = localStorage.getItem(this.authStateKey);
		if (authState) {
			return JSON.parse(authState) as AuthState;
		}
		return null;
	}

	static setAuthState(authState: AuthState) {
		localStorage.setItem(this.authStateKey, JSON.stringify(authState));
	}

	static clearAuthState() {
		localStorage.removeItem(this.authStateKey);
	}
}

export default LocalStorageService;
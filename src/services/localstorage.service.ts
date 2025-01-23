import { Token } from "../features/Auth/authApi";

class LocalStorageService {
	private static ACCESS_TOKEN_KEY = 'access_token';
	private static REFRESH_TOKEN_KEY = 'refresh_token';

	static getAccessToken(): string | null {
		return localStorage.getItem(this.ACCESS_TOKEN_KEY);
	}

	static getRefreshToken(): string | null {
		return localStorage.getItem(this.REFRESH_TOKEN_KEY);
	}

	static getTokens(): Token | null {
		const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
		const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
		if (accessToken == null || refreshToken == null) {
			return null;
		}
		return {
			accessToken, refreshToken
		};
	}

	static setTokens(token: Token): void {
		localStorage.setItem(this.ACCESS_TOKEN_KEY, token.accessToken);
		localStorage.setItem(this.REFRESH_TOKEN_KEY, token.refreshToken);
	}

	static clearTokens(): void {
		localStorage.removeItem(this.ACCESS_TOKEN_KEY);
		localStorage.removeItem(this.REFRESH_TOKEN_KEY);
	}
}

export default LocalStorageService;
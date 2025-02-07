import { bulbasaur } from './protos/bulbasaur';

const client = new bulbasaur.BulbasaurClient('http://46.202.162.37:8081');

export const grpcSignUp = (username: string, email: string, password: string, confirm_password: string): Promise<bulbasaur.SignUpResponse> => {
    return new Promise((resolve, reject) => {
        const signUpRequest = new bulbasaur.SignUpRequest();
        const localCredentials = new bulbasaur.SignUpRequest.Local();

        localCredentials.username = username;
        localCredentials.password = password;
        localCredentials.confirm_password = confirm_password;
        localCredentials.email = email;

        signUpRequest.local = localCredentials;
        signUpRequest.role = bulbasaur.Role.ROLE_CANDIDATE;

        client.SignUp(signUpRequest, null, (err: Error | null, response: bulbasaur.SignUpResponse) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
};

export const grpcSignIn = (username: string, password: string): Promise<bulbasaur.SignInResponse> => {
    return new Promise((resolve, reject) => {
        const signInRequest = new bulbasaur.SignInRequest();
        const localCredentials = new bulbasaur.SignInRequest.Local();

        localCredentials.username = username;
        localCredentials.password = password;

        signInRequest.local = localCredentials;

        client.SignIn(signInRequest, null, (err: Error | null, response: bulbasaur.SignInResponse) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
};

export const grpcRefreshToken = (token: { safe_id?: string | undefined, refresh_token?: string | undefined, access_token?: string | undefined, role?: bulbasaur.Role | undefined }): Promise<bulbasaur.RefreshTokenResponse> => {
    return new Promise((resolve, reject) => {
        const refreshTokenRequest = new bulbasaur.RefreshTokenRequest();
        const tokenInfo = new bulbasaur.TokenInfo(token);

        refreshTokenRequest.token_info = tokenInfo;

        client.RefreshToken(refreshTokenRequest, null, (err: Error | null, response: bulbasaur.RefreshTokenResponse) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
};

export const grpcSignInGoogle = (credential: string): Promise<bulbasaur.SignInResponse> => {
    return new Promise((resolve, reject) => {
        const signInRequest = new bulbasaur.SignInRequest();
        const googleCredentials = new bulbasaur.SignInRequest.Google();

        googleCredentials.credential = credential;

        signInRequest.google = googleCredentials;

        client.SignIn(signInRequest, null, (err: Error | null, response: bulbasaur.SignInResponse) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
};
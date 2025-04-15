import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { toErrorMessage } from "../../../helpers/fetchBaseQuery.error";
import GradientBorder from "../../../components/ui/border/GradientBorder";
import { useGoogleLoginMutation, useLoginMutation } from "../../../features/auth/api/auth.api";
import SpinnerLoading from "../../../components/ui/loading/SpinnerLoading";
import AlertError from "../../../components/ui/error/AlertError";
import paths from "../../../router/paths";
import React from "react";
import { authActions } from "../../../features/auth/store/authSlice";
import axios from "axios";

const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [login, { isLoading, error }] = useLoginMutation();
	const [ggLogin, { }] = useGoogleLoginMutation();
	const [googleError, setGoogleError] = useState<string | null>(null);
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const errorMessage = toErrorMessage(error as FetchBaseQueryError | SerializedError | undefined);
	const [errors, setErrors] = useState({ email: "", password: "" });

	const validateForm = () => {
		let newErrors = { email: "", password: "" };
		let isValid = true;

		if (!password.trim()) {
			newErrors.password = "Password is required.";
			isValid = false;
		} else if (password.length < 6) {
			newErrors.password = "Password must be at least 6 characters long.";
			isValid = false;
		} else if (!/[A-Z]/.test(password)) {
			newErrors.password = "Password must contain at least one uppercase letter.";
			isValid = false;
		} else if (!/[a-z]/.test(password)) {
			newErrors.password = "Password must contain at least one lowercase letter.";
			isValid = false;
		} else if (!/[0-9]/.test(password)) {
			newErrors.password = "Password must contain at least one number.";
			isValid = false;
		} else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
			newErrors.password = "Password must contain at least one special character.";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// const formData = new FormData(e.target as HTMLFormElement);
		// const username = formData.get('username') as string;
		// const password = formData.get('password') as string;

		if (!validateForm()) {
			return;
		}

		try {
			const response = await login({ email, password });
			console.log(response.data)
			console.log(response.error)
			if (response.data) {
				dispatch(authActions.setAuthStateFromResponse(response.data));
				navigate(paths._layout);
			}
		} catch (error) {
			console.log("Login failed:", error);
		}
	}

	const toSignUp = () => {
		navigate(paths.auth.CHOOSE_ROLE);
	}

	// const handleGoogleSuccess = async (credentialResponse: CredentialResponse): Promise<void> => {
	// 	try {
	// 		if (!credentialResponse.credential) {
	// 			console.log("Google login failed: No credential");
	// 			return;
	// 		}

	// 		console.log("Google credential:", credentialResponse.credential);

	// 		const response = await ggLogin({ credential: credentialResponse.credential });
	// 		if (response.data) {
	// 			dispatch(authActions.setAuthStateFromResponse(response.data));
	// 			navigate(paths._layout);
	// 		} else {
	// 			console.log("Google login failed: No data in response");
	// 		}
	// 		console.log(response);
	// 	} catch (error: any) {
	// 		console.log("Google login failed:", error);
	// 	}
	// };

	// const handleGoogleError = () => {
	// 	alert("Google login failed");
	// };

	const googleLogin = useGoogleLogin({
		flow: 'auth-code',
		scope: 'openid email profile',
		onSuccess: async ({ code }) => {
			try {
				setGoogleError(null);
				const { data } = await axios.post(
					'https://oauth2.googleapis.com/token',
					{
						code,
						client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
						client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
						grant_type: 'authorization_code',
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				const idToken = data.id_token;
				console.log('ID Token:', idToken);

				const response = await ggLogin({ credential: idToken });
				if (response.data) {
					console.log("Google login response:", response.data);
					dispatch(authActions.setAuthStateFromResponse(response.data));
					navigate(paths._layout);
				} else {
					console.log("Google login failed: No data in response");
					console.log("error", response.error);
					if ((response.error as FetchBaseQueryError)?.data && (response.error as { data: { code: number } }).data.code === 2 && (response.error as { data: { message: string } }).data.message === "google account is exist") {
						const loginResponse = await ggLogin({ credential: idToken });
						if (loginResponse.data) {
							dispatch(authActions.setAuthStateFromResponse(loginResponse.data));
							navigate(paths._layout);
						} else {
							setGoogleError("Something went wrong with Google authentication.");
						}
					}
					else {
						setGoogleError("Something went wrong with Google authentication.");
					}
				}
			} catch (error) {
				console.error('Failed to get ID token:', error);
				setGoogleError("Something went wrong with Google authentication.");
			}
		},
		onError: (error) => {
			console.error('Login Error:', error);
			setGoogleError("Google authentication failed");
		},
	});

	return <div>
		<div className="w-full flex-col text-center text-[32px] font-bold">
			<span>Welcome to SkillSharp</span>
		</div>
		<div className="w-full flex-row mt-9">
			<button className="px-3 w-1/2 rounded-s-lg font-bold text-xl py-2  border-2 border-[var(--primary-color)] bg-[var(--primary-color)] text-white">Log In</button>
			<button onClick={() => {
				toSignUp()
			}} className="px-3 w-1/2 rounded-e-lg font-bold text-xl py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 hover:bg-[var(--primary-color)] hover:text-white">Sign Up</button>
		</div>

		<GradientBorder className="mt-8 hover:shadow-gradient duration-150 w-full p-[1px] rounded-lg">
			<div className="flex h-12 justify-center items-center gap-2 text-center z-10 bg-white rounded-lg p-4 cursor-pointer" onClick={() => googleLogin()}>
				<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
					<path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
				</svg>
				Sign in with Google
			</div>
		</GradientBorder>

		<div className="flex mt-8 items-center space-x-4">
			<hr className="flex-grow border-t border-gray-300" />
			<span className="text-gray-500">or</span>
			<hr className="flex-grow border-t border-gray-300" />
		</div>

		{isLoading && <SpinnerLoading />}
		{errorMessage && <AlertError errorMessage={errorMessage} />}
		{googleError && <AlertError errorMessage={googleError} />}

		<form onSubmit={handleFormSubmit} className="flex-col ">
			<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
				<input
					type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" "
					className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
				/>
				<label
					className={`bg-white absolute left-2 transform text-sm text-gray-500 transition-all
							${email !== "" ? "top-2 -translate-y-4 scale-75" : ""}
							${email.trim() === "" ? "top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100" : ""}
							peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600`}>
					Email
				</label>
			</GradientBorder>
			{errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}
			<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
				<input
					type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" "
					className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
				/>
				<label
					className={`bg-white absolute left-2 transform text-sm text-gray-500 transition-all
							${password !== "" ? "top-2 -translate-y-4 scale-75" : ""}
							${password.trim() === "" ? "top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100" : ""}
							peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600`}>
					Password
				</label>
			</GradientBorder>
			{errors.password && <span className="text-red-400 text-sm">{errors.password}</span>}
			<div className="w-full p-2 mt-14 text-center">
				Forgot your password? <Link className="text-[var(--primary-color)]" to={paths.auth.RESET_PASSWORD}>Reset it here.</Link>
			</div>
			<button type="submit" className="w-full bg-[var(--primary-color)] text-lg font-bold text-white p-4 rounded-lg m-1">
				Login <FontAwesomeIcon icon={faArrowRight} />
			</button>
		</form>
	</div>
}

export default LoginForm;
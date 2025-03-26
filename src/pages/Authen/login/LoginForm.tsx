import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GradientBorder from "../../../components/ui/border/GradientBorder"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useGoogleMutation } from "../../../features/Auth/authApi";
import { toErrorMessage } from "../../../helpers/fetchBaseQuery.error";
import AlertError from "../../../components/ui/error/AlertError";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useState } from "react";
import SpinnerLoading from "../../../components/ui/loading/SpinnerLoading";

const LoginForm = () => {
	const navigate = useNavigate();
	const [login, { isLoading, error }] = useLoginMutation();
	const [google, { }] = useGoogleMutation();
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const errorMessage = toErrorMessage(error as FetchBaseQueryError | SerializedError | undefined);

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// const formData = new FormData(e.target as HTMLFormElement);
		// const username = formData.get('username') as string;
		// const password = formData.get('password') as string;

		try {
			await login({ username, password });

			if (error === null) {
				navigate('/')
			}
		} catch (error) {
			console.log("Login failed:", error);
		}
	}

	const toSignUp = () => {
		navigate('/register')
	}

	const handleGoogleSuccess = async (credentialResponse: CredentialResponse): Promise<void> => {
		try {
			if (!credentialResponse.credential) {
				console.log("Google login failed: No credential");
				return;
			}

			console.log("Google credential:", credentialResponse.credential);

			const response = await google({ credential: credentialResponse.credential });

			console.log(response);
		} catch (error: any) {
			console.log("Google login failed:", error);
		}
	};

	const handleGoogleError = () => {
		alert("Google login failed");
	};

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

		<GradientBorder className="mt-14 hover:shadow-gradient duration-150 w-full p-[1px] rounded-lg">
			<div className=" flex h-12 justify-center items-center  bg-white rounded-lg p-4">
				<img src="./svg/google.svg" alt="google logo" />
				<span className="ml-4"> Sign in with Google</span>
			</div>
		</GradientBorder>
		<GradientBorder className="mt-14 hover:shadow-gradient duration-150 w-full p-[1px] rounded-lg">
			<GoogleLogin
				onSuccess={handleGoogleSuccess}
				onError={handleGoogleError}
			/>
		</GradientBorder>
		<GradientBorder className="mt-8 hover:shadow-gradient duration-150 w-full p-[1px] rounded-lg">
			<div className="flex h-12 justify-center items-center  text-center z-10 bg-white rounded-lg p-4">
				Sign in with University
			</div>
		</GradientBorder>

		<div className="flex mt-8 items-center space-x-4">
			<hr className="flex-grow border-t border-gray-300" />
			<span className="text-gray-500">or</span>
			<hr className="flex-grow border-t border-gray-300" />
		</div>

		{isLoading && <SpinnerLoading />}
		{errorMessage && <AlertError errorMessage={errorMessage} />}

		<form onSubmit={handleFormSubmit} className="flex-col ">
			<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
				<input
					type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder=" "
					className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
				/>
				<label
					className={`bg-white absolute left-2 transform text-sm text-gray-500 transition-all
							${username !== "" ? "top-2 -translate-y-4 scale-75" : ""}
							${username.trim() === "" ? "top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100" : ""}
							peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600`}>
					Username
				</label>
			</GradientBorder>
			<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
				<input
					type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" "
					className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
				/>
				<label
					className={`bg-white absolute left-2 transform text-sm text-gray-500 transition-all
							${password !== "" ? "top-2 -translate-y-4 scale-75" : ""}
							${password.trim() === "" ? "top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100" : ""}
							peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600`}>
					Password
				</label>
			</GradientBorder>
			<div className="w-full p-2 mt-14 text-center">
				Forgot your password? <a className="text-[var(--primary-color)]" href="/reset">Reset it here.</a>
			</div>
			<button type="submit" className="w-full bg-[var(--primary-color)] text-lg font-bold text-white p-4 rounded-lg m-1">
				Login <FontAwesomeIcon icon={faArrowRight} />
			</button>
		</form>
	</div>
}

export default LoginForm
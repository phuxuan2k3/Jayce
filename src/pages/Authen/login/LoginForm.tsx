import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GradientBorder from "../../../components/GradientBorder"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useGoogleMutation } from "../../../features/Auth/authApi";
import { toErrorMessage } from "../../../error/fetchBaseQuery.error";
import LocalLoading from "../../../components/LocalLoading";
import LocalError from "../../../components/LocalError";
import { useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectIsAuthenticated } from "../../../global/authSlice";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

const LoginForm = () => {
	const navigate = useNavigate();
	const [login, { isLoading, error }] = useLoginMutation();
	const [google, { }] = useGoogleMutation();
	const errorMessage = toErrorMessage(error);

	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}
	}, [isAuthenticated])

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		try {
			await login({ username, password });

			navigate('/')
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

		{isLoading && <LocalLoading />}
		{errorMessage && <LocalError errorMessage={errorMessage} />}

		<form onSubmit={handleFormSubmit} className="flex-col ">
			<GradientBorder className="mt-8 w-full p-[1px] rounded-lg">
				<input className="w-full p-4 rounded-lg" name="username" id="username" placeholder="Username" />
			</GradientBorder>
			<GradientBorder className="mt-8 w-full p-[1px] rounded-lg">
				<input className="w-full p-4 rounded-lg" type="password" name="password" id="password" placeholder="Password" />
			</GradientBorder>
			<div className="w-full p-2 mt-14 text-center">
				Forgot your password? <a className="text-[var(--primary-color)]" href="#reset">Reset it here.</a>
			</div>
			<button type="submit" className="w-full bg-[var(--primary-color)] text-lg font-bold text-white p-4 rounded-lg m-1">
				Login <FontAwesomeIcon icon={faArrowRight} />
			</button>
		</form>
	</div>
}

export default LoginForm
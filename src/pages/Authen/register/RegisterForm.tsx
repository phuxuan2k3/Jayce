import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GradientBorder from "../../../components/GradientBorder"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../features/Auth/authApi";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectIsAuthenticated } from "../../../global/authSlice";
import { toErrorMessage } from "../../../error/fetchBaseQuery.error";
import LocalError from "../../../components/LocalError";
import LocalLoading from "../../../components/LocalLoading";
import LocalSuccess from "../../../components/LocalSuccess";

const RegisterForm = () => {
	const navigate = useNavigate();
	const [register, { isLoading, error }] = useRegisterMutation();
	const errorMessage = toErrorMessage(error);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}
	}, [isAuthenticated])

	const handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSuccessMessage(null);
		const formData = new FormData(e.target as HTMLFormElement);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const username = formData.get('username') as string;

		try {
			await register({ username, email, password, confirm_password: password });

			if (error === null) {
				navigate('/')
			}
		} catch (error) {
			console.log("Register failed:", error);
		}
	}

	const toLogin = () => {
		navigate('/login')
	}

	return <div>
		<div className="w-full flex-col text-center text-[32px] font-bold">
			<span>Welcome to SkillSharp</span>
		</div>
		<div className="w-full flex-row mt-9">
			<button onClick={() => {
				toLogin()
			}} className="px-3 w-1/2 rounded-s-lg font-bold text-xl py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 hover:bg-[var(--primary-color)] hover:text-white">Log In</button>
			<button className="px-3 w-1/2 rounded-e-lg font-bold text-xl py-2  border-2 border-[var(--primary-color)] bg-[var(--primary-color)] text-white">Sign Up</button>
		</div>

		<GradientBorder className="mt-14 hover:shadow-gradient duration-150 w-full p-[1px] rounded-lg">
			<div className=" flex h-12 justify-center items-center  bg-white rounded-lg p-4">
				<img src="./svg/google.svg" alt="google logo" />
				<span className="ml-4"> Sign in with Google</span>
			</div>
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
		{successMessage && <LocalSuccess successMessage={successMessage} />}

		<form onSubmit={handleFormSubmit} className="flex-col ">
			<GradientBorder className="mt-8 w-full p-[1px] rounded-lg">
				<input className="w-full p-4 rounded-lg" name="username" id="username" placeholder="Username" />
			</GradientBorder>
			<GradientBorder className="mt-8 w-full p-[1px] rounded-lg">
				<input className="w-full p-4 rounded-lg" name="email" id="email" placeholder="Email Address" />
			</GradientBorder>
			<GradientBorder className="mt-8 w-full p-[1px] rounded-lg">
				<input className="w-full p-4 rounded-lg" type="password" name="password" id="password" placeholder="Password" />
			</GradientBorder>
			<button type="submit" className="mt-20 w-full bg-[var(--primary-color)] text-lg font-bold text-white p-4 rounded-lg ">
				Sign Up <FontAwesomeIcon icon={faArrowRight} />
			</button>
			<div className="w-full p-4 text-center">
				By creating an account, you agree to our <a className="text-[var(--primary-color)]" href="#reset">terms of service and privacy policy</a>.
			</div>
		</form>
	</div>
}

export default RegisterForm
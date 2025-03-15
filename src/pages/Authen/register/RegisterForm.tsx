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
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useVerificationEmailMutation } from "./register.api";

const RegisterForm = () => {
	const navigate = useNavigate();
	const [register, { isLoading, error }] = useRegisterMutation();
	const errorMessage = toErrorMessage(error as FetchBaseQueryError | SerializedError | undefined);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [verificationEmail] = useVerificationEmailMutation();
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const [otp, setOtp] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}
	}, [isAuthenticated])

	const handleFormSubmit = async () => {
		try {
			alert(password);
			await register({
				local: {
					username,
					email,
					password: password,
					confirm_password: password,
					otp,
				},
				metadata: {
					fullname: "I Am Miboy",
					company: "Cty",
					country: "Viet Nam",
					jobTitle: "CEO",
					avatarPath: "https://thumbs.dreamstime.com/b/female-avatar-icon-women-clipart-png-vector-girl-avatar-women-clipart-bor-bisiness-icon-png-vector-233362315.jpg"
				},
				role: 1
			});
			if (error === null) {
				navigate('/')
			}
		} catch (error) {
			console.log("Register failed:", error);
		}
	}
	const handleVerifyEmail = async () => {
		console.log('1');
		if (!email) {
			console.log('2');
			alert("Please enter your email.");
			return;
		}
		try {
			console.log('3');
			await verificationEmail({ email }).unwrap();
			alert("Verification email sent successfully!");
			setIsOpenModal(true);
		} catch (error) {
			console.error("Verification failed:", error);
		}
	};
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

		<div className="flex-col ">
			{username} - {email} - {password}
			<GradientBorder className="mt-8 w-full p-[1px] rounded-lg">
				<input className="w-full p-4 rounded-lg" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
			</GradientBorder>
			<GradientBorder className="mt-8 w-full p-[1px] rounded-lg">
				<input className="w-full p-4 rounded-lg" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
			</GradientBorder>
			<GradientBorder className="mt-8 w-full p-[1px] rounded-lg">
				<input className="w-full p-4 rounded-lg" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
			</GradientBorder>
			<button onClick={() => { handleVerifyEmail() }} className="mt-20 w-full bg-[var(--primary-color)] text-lg font-bold text-white p-4 rounded-lg ">
				Sign Up <FontAwesomeIcon icon={faArrowRight} />
			</button>
			<div className="w-full p-4 text-center">
				By creating an account, you agree to our <a className="text-[var(--primary-color)]" href="#reset">terms of service and privacy policy</a>.
			</div>
		</div>
		{isOpenModal &&
			(<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
				<div className="bg-white w-96 p-6 rounded-lg shadow-lg">
					<span>OTP</span><input type="text" className="w-full border" value={otp} onChange={(e) => setOtp(e.target.value)} />
					<div className="flex  gap-1 mt-4">
						<button onClick={() => setIsOpenModal(false)} className="w-1/2 px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
						<button onClick={() => handleFormSubmit()} className=" text-center w-1/2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-md ">Submit</button>
					</div>
				</div>

			</div>)
		}

	</div>
}

export default RegisterForm
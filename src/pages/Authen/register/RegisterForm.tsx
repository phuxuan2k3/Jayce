import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GradientBorder from "../../../components/GradientBorder"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
// import { useRegisterMutation } from "../../../features/Auth/authApi";
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
import { useRegisterMutation } from "./register.api";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../../global/authSlice";

const RegisterForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
	const [errors, setErrors] = useState({ username: "", email: "", password: "" });
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}
	}, [isAuthenticated])
	const validateForm = () => {
		let newErrors = { username: "", email: "", password: "" };
		let isValid = true;

		if (!username.trim()) {
			newErrors.username = "Username is required.";
			isValid = false;
		} else if (username.length < 3) {
			newErrors.username = "Username must be at least 3 characters long.";
			isValid = false;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email.trim()) {
			newErrors.email = "Email is required.";
			isValid = false;
		} else if (!emailRegex.test(email)) {
			newErrors.email = "Invalid email format.";
			isValid = false;
		}

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
	const handleFormSubmit = async () => {
		try {
			alert(password);
			const response = await register({
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
			console.log(response);
			dispatch(setAuthState({ user: response.data?.user ?? null, tokens: response.data?.token_info ?? null }));
			console.log(error);
			if (error === null) {
				navigate('/')
			}
		} catch (error) {
			console.log("Register failed:", error);
		}
	}
	const handleVerifyEmail = async () => {
		if (!validateForm()) return;
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
			<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
				<input
					type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder=" "
					className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
				/>
				<label
					className={`bg-white absolute left-2 transform text-sm text-gray-500 transition-all
							${username !== "" ? "top-2 -translate-y-4 scale-75" : ""}
							${username.trim() === "" ? "top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100" : ""}
							peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600`}>
					Username
				</label>
			</GradientBorder>
			{errors.username && <span className="text-red-400 text-sm">{errors.username}</span>}
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
			<button onClick={() => { handleVerifyEmail() }} className="mt-20 w-full bg-[var(--primary-color)] text-lg font-bold text-white p-4 rounded-lg ">
				Sign Up <FontAwesomeIcon icon={faArrowRight} />
			</button>
			<div className="w-full p-4 text-center">
				By creating an account, you agree to our <a className="text-[var(--primary-color)]" href="#reset">terms of service and privacy policy</a>.
			</div>
		</div>
		{isOpenModal &&
			(<div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center">
				<div className="bg-white w-96 p-6 rounded-lg shadow-lg relative text-center space-y-2">
					<img src="https://cdn-icons-png.flaticon.com/512/3841/3841620.png" className="w-9 mx-auto" alt="" />
					<div className="text-3xl font-bold">Check your email</div>
					<div className="text-gray-400">Enter the verification code sent to</div>
					<div className="pb-10">{email}</div>
					<div onClick={() => setIsOpenModal(false)} ><img src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png" className="w-4 absolute top-4 right-4" /></div>
					{/* <span>OTP</span><input type="text" className="w-full border" value={otp} onChange={(e) => setOtp(e.target.value)} /> */}
					<div className="relative ">
						<input
							type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder=" "
							className="peer block w-full rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
						/>
						<label
							className={`bg-white absolute left-2 transform text-sm text-gray-500 transition-all
							${otp !== "" ? "top-2 -translate-y-4 scale-75" : ""}
							${otp.trim() === "" ? "top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100" : ""}
							peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600`}>
							Nhập OTP
						</label>
					</div>
					
					<div className="flex  gap-1 pt-8 ">
						<button onClick={() => handleFormSubmit()} className=" text-center w-full px-4 py-2 bg-[var(--primary-color)] text-white rounded-md ">Verify email</button>
					</div>
					<div className="p-[6px]">
						<span>Didn't get a code?</span> <span onClick={() => handleVerifyEmail()} className="underline text-[var(--primary-color)]">Resend </span>
					</div>
				</div>

			</div>)
		}

	</div>
}

export default RegisterForm
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GradientBorder from "../../../components/ui/border/GradientBorder"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../features/Auth/api/authApi";
import { useEffect, useState } from "react";
import { toErrorMessage } from "../../../helpers/fetchBaseQuery.error";
import AlertError from "../../../components/ui/error/AlertError";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useVerificationEmailMutation } from "./register.api";
import SpinnerLoading from "../../../components/ui/loading/SpinnerLoading";
import paths2 from "../../../router/paths";

const RegisterForm = () => {
	const navigate = useNavigate();
	const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
	const errorMessage = toErrorMessage(error as FetchBaseQueryError | SerializedError | undefined);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [verificationEmail] = useVerificationEmailMutation();
	const [otp, setOtp] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [errors, setErrors] = useState({ username: "", email: "", password: "" });

	useEffect(() => {
		if (error === null) {
			navigate(paths2._layout);
		}
	}, [isSuccess]);

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

	// TODO: Fullfill the data
	const handleFormSubmit = async () => {
		register({
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
		navigate(paths2.auth.LOGIN);
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

		<div className="flex mt-8 items-center space-x-4">
			<hr className="flex-grow border-t border-gray-300" />
			<span className="text-gray-500">or</span>
			<hr className="flex-grow border-t border-gray-300" />
		</div>

		{isLoading && <SpinnerLoading />}
		{errorMessage && <AlertError errorMessage={errorMessage} />}

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
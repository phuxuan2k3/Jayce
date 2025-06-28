import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../features/auth/api/auth.api";
import { useEffect, useState } from "react";
import { parseQueryError } from "../../../helpers/fetchBaseQuery.error";
import AlertError from "../../../components/ui/alert/AlertError";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import {
	useVerificationEmailMutation,
	useGoogleRegisterMutation,
	useGoogleLoginMutation,
} from "../../../features/auth/api/auth.api";
import SpinnerLoading from "../../../components/ui/loading/SpinnerLoading";
import paths from "../../../router/paths";
import { useGoogleLogin } from "@react-oauth/google";
import { authActions } from "../../../features/auth/store/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const RegisterForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
	const [ggRegister, { }] = useGoogleRegisterMutation();
	const [ggLogin, { }] = useGoogleLoginMutation();
	const [googleError, setGoogleError] = useState<string | null>(null);
	const errorMessage = parseQueryError(
		error as FetchBaseQueryError | SerializedError | undefined
	);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [verificationEmail] = useVerificationEmailMutation();
	const [otp, setOtp] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [errors, setErrors] = useState({
		username: "",
		email: "",
		password: "",
	});

	useEffect(() => {
		if (isSuccess) {
			navigate(paths._layout);
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
			newErrors.password =
				"Password must contain at least one uppercase letter.";
			isValid = false;
		} else if (!/[a-z]/.test(password)) {
			newErrors.password =
				"Password must contain at least one lowercase letter.";
			isValid = false;
		} else if (!/[0-9]/.test(password)) {
			newErrors.password = "Password must contain at least one number.";
			isValid = false;
		} else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
			newErrors.password =
				"Password must contain at least one special character.";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	// TODO: Fullfill the data
	const handleFormSubmit = async () => {
		setGoogleError(null);
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
				avatarPath:
					"https://thumbs.dreamstime.com/b/female-avatar-icon-women-clipart-png-vector-girl-avatar-women-clipart-bor-bisiness-icon-png-vector-233362315.jpg",
			},
			role: 1,
		});
	};

	const handleVerifyEmail = async () => {
		if (!validateForm()) return;
		console.log("1");
		if (!email) {
			console.log("2");
			alert("Please enter your email.");
			return;
		}
		try {
			console.log("3");
			await verificationEmail({ email }).unwrap();
			alert("Verification email sent successfully!");
			setIsOpenModal(true);
		} catch (error) {
			console.error("Verification failed:", error);
		}
	};

	const googleRegister = useGoogleLogin({
		flow: "auth-code",
		scope: "openid email profile",
		onSuccess: async ({ code }) => {
			try {
				setGoogleError(null);
				const { data } = await axios.post(
					"https://oauth2.googleapis.com/token",
					{
						code,
						client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
						client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
						redirect_uri: import.meta.env.VITE_REDIRECT_URI,
						grant_type: "authorization_code",
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const idToken = data.id_token;
				console.log("ID Token:", idToken);

				const response = await ggRegister({
					credential: idToken,
					role: 1,
					metadata: {},
				});
				if (response.data) {
					dispatch(authActions.setAuthStateFromResponse(response.data));
					navigate(paths._layout);
				} else {
					console.log("Google login failed: No data in response");
					console.log("error", response.error);
					if (
						(response.error as FetchBaseQueryError)?.data &&
						(response.error as { data: { code: number } }).data.code === 2 &&
						(response.error as { data: { message: string } }).data.message ===
						"google account is exist"
					) {
						const loginResponse = await ggLogin({ credential: idToken });
						if (loginResponse.data) {
							dispatch(
								authActions.setAuthStateFromResponse(loginResponse.data)
							);
							navigate(paths._layout);
						} else {
							setGoogleError(
								"Something went wrong with Google authentication."
							);
						}
					} else {
						setGoogleError("Something went wrong with Google authentication.");
					}
				}
			} catch (error) {
				console.error("Failed to get ID token:", error);
				setGoogleError("Something went wrong with Google authentication.");
			}
		},
		onError: (error) => {
			console.error("Login Error:", error);
			setGoogleError("Google authentication failed");
		},
	});

	return (
		<div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 px-8 pb-4 pt-8">
			<div className="text-center text-3xl font-extrabold mb-2 text-primary-toned-600 font-arya tracking-tight">
				SkillSharp
			</div>
			<div className="text-center text-base text-gray-500 mb-8 font-asap">
				Create your account to get started.
			</div>
			{/* Nút chuyển tab Log In / Sign Up */}
			{/* <div className="flex mb-8">
        <button
          onClick={toLogin}
          className="w-1/2 rounded-s-3xl font-bold text-xl py-2 border-2 border-[var(--primary-color)] text-[var(--primary-color)] bg-white hover:bg-[var(--primary-color)] hover:text-white transition-all duration-150"
        >
          Log In
        </button>
        <button
          className="w-1/2 rounded-e-3xl font-bold text-xl py-2 border-2 border-[var(--primary-color)] bg-[var(--primary-color)] text-white transition-all duration-150"
          disabled
        >
          Sign Up
        </button>
      </div> */}

			{/* Google login */}
			<button
				type="button"
				className="flex w-full items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 font-semibold text-gray-700 mb-7 shadow-sm"
				onClick={() => googleRegister()}
				disabled={isLoading}
			>
				<svg width="22" height="22" viewBox="0 0 48 48">
					<g>
						<path
							fill="#fbc02d"
							d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
						></path>
						<path
							fill="#e53935"
							d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
						></path>
						<path
							fill="#4caf50"
							d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
						></path>
						<path
							fill="#1565c0"
							d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
						></path>
					</g>
				</svg>
				Sign up with Google
			</button>

			<div className="flex items-center my-6">
				<hr className="flex-grow border-t border-gray-200" />
				<span className="mx-3 text-gray-400 font-asap text-sm">or</span>
				<hr className="flex-grow border-t border-gray-200" />
			</div>

			{isLoading && (
				<div className="flex justify-center mb-4">
					<SpinnerLoading />
				</div>
			)}
			{errorMessage && <AlertError errorMessage={errorMessage} />}
			{googleError && <AlertError errorMessage={googleError} />}

			<form
				className="space-y-6"
				onSubmit={(e) => {
					e.preventDefault();
					handleVerifyEmail();
				}}
			>
				{/* Username */}
				<div className="relative">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
						{/* User icon */}
						<svg
							width="20"
							height="20"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
						>
							<circle cx="10" cy="7" r="4" />
							<path d="M2 18c0-3.314 3.134-6 7-6s7 2.686 7 6" />
						</svg>
					</span>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder=" "
						className="peer block w-full rounded-lg border border-gray-300 pl-10 pr-3 pb-2.5 pt-4 text-base text-gray-900 bg-gray-50 focus:border-primary-toned-600 focus:outline-none focus:ring-0 transition"
					/>
					<label
						className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-toned-600
        ${username ? "top-2 text-xs text-primary-toned-600" : ""}
      `}
					>
						Username
					</label>
				</div>
				{errors.username && (
					<span className="text-red-400 text-sm">{errors.username}</span>
				)}
				{/* Email */}
				<div className="relative">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
						{/* Email icon */}
						<svg
							width="20"
							height="20"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
						>
							<rect x="3" y="5" width="14" height="10" rx="2" />
							<path d="M3 7l7 5 7-5" />
						</svg>
					</span>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder=" "
						className="peer block w-full rounded-lg border border-gray-300 pl-10 pr-3 pb-2.5 pt-4 text-base text-gray-900 bg-gray-50 focus:border-primary-toned-600 focus:outline-none focus:ring-0 transition"
					/>
					<label
						className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-toned-600
        ${email ? "top-2 text-xs text-primary-toned-600" : ""}
      `}
					>
						Email
					</label>
				</div>
				{errors.email && (
					<span className="text-red-400 text-sm">{errors.email}</span>
				)}
				{/* Password */}
				<div className="relative">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
						{/* Lock icon */}
						<svg
							width="20"
							height="20"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
						>
							<rect x="5" y="9" width="10" height="7" rx="2" />
							<path d="M7 9V7a3 3 0 1 1 6 0v2" />
							<circle cx="10" cy="13" r="1" />
						</svg>
					</span>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder=" "
						className="peer block w-full rounded-lg border border-gray-300 pl-10 pr-3 pb-2.5 pt-4 text-base text-gray-900 bg-gray-50 focus:border-primary-toned-600 focus:outline-none focus:ring-0 transition"
					/>
					<label
						className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-toned-600
        ${password ? "top-2 text-xs text-primary-toned-600" : ""}
      `}
					>
						Password
					</label>
				</div>
				{errors.password && (
					<span className="text-red-400 text-sm">{errors.password}</span>
				)}
				<button
					type="submit"
					className="w-full bg-[var(--primary-color)] text-lg font-bold text-white py-3 rounded-full mt-6 transition-all duration-150 hover:bg-[#2E808A] flex items-center justify-center gap-2"
					disabled={isLoading}
				>
					Sign Up <FontAwesomeIcon icon={faArrowRight} />
				</button>
				<div className="w-full text-center text-xs text-gray-500 mt-2">
					By creating an account, you agree to our{" "}
					<a
						className="text-primary-toned-600 font-semibold hover:underline"
						href="#reset"
					>
						terms of service and privacy policy
					</a>
					.
				</div>
			</form>

			{/* OTP Modal */}
			{isOpenModal && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
					<div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl relative text-center space-y-3 border border-gray-100">
						<button
							type="button"
							onClick={() => setIsOpenModal(false)}
							className="absolute top-4 right-4 text-gray-400 hover:text-primary-toned-600 transition"
							aria-label="Close"
						>
							<svg width="18" height="18" fill="none" viewBox="0 0 20 20">
								<path
									d="M6 6l8 8M6 14L14 6"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
						</button>
						<div className="flex justify-center mt-2 mb-1">
							<div className="relative flex items-center justify-center">
								<div className="relative z-10  rounded-full p-3 shadow flex items-center justify-center">
									<svg width="48" height="48" fill="none" viewBox="0 0 48 48">
										<rect
											width="48"
											height="48"
											rx="24"
											fill="#39A0AD"
											opacity="0.12"
										/>
										<path
											d="M12 18a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V18zm2 0v.01L24 27l10-8.99V18M24 27l-10-8.99"
											stroke="#39A0AD"
											strokeWidth="2"
											strokeLinejoin="round"
											fill="none"
										/>
									</svg>
								</div>
							</div>
						</div>
						<div className="text-2xl font-extrabold text-primary-toned-600 mb-1 font-arya">
							Check your email
						</div>
						<div className="text-gray-500 font-asap">
							Enter the verification code sent to
						</div>
						<div className="pb-2 font-semibold text-primary-toned-600 text-base">
							{email}
						</div>
						<div className="relative mt-1">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-toned-600">
								{/* Icon thư nhỏ */}
								<svg width="18" height="18" fill="none" viewBox="0 0 20 20">
									<rect
										x="2"
										y="4"
										width="16"
										height="12"
										rx="2"
										stroke="#39A0AD"
										strokeWidth="1.5"
									/>
									<path d="M2 6l8 6 8-6" stroke="#39A0AD" strokeWidth="1.5" />
								</svg>
							</span>
							<input
								type="text"
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								placeholder=" "
								className="peer block w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-3 pb-2.5 pt-4 text-base text-gray-900 focus:border-primary-toned-600 focus:outline-none focus:ring-0 transition"
							/>
							<label
								className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all
            peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-toned-600
            ${otp ? "top-2 text-xs text-primary-toned-600" : ""}
          `}
							>
								Enter OTP
							</label>
						</div>
						<button
							onClick={handleFormSubmit}
							className="mt-4 w-full px-4 py-2 bg-[var(--primary-color)] text-white rounded-full font-bold text-lg transition-all duration-150 hover:bg-[#2E808A] flex items-center justify-center gap-2"
						>
							Verify email
						</button>
						<div className="pt-1 text-xs text-gray-500 font-asap">
							<span>Didn't get a code?</span>{" "}
							<span
								onClick={handleVerifyEmail}
								className="underline text-primary-toned-600 cursor-pointer font-semibold hover:text-primary-toned-800"
							>
								Resend
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default RegisterForm;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
// import { useRegisterMutation } from "../../../features/Auth/authApi";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import GradientBorder from "../../../components/ui/border/GradientBorder";
import { selectIsAuthenticated, setAuthState } from "../../../features/auth/store/authSlice";
import { useRegisterMutation } from "../../../features/auth/api/authApi";
import { useVerificationEmailMutation } from "../../../features/auth/api/authRestApi";

const BusinessRegisterForm = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [register, { error }] = useRegisterMutation();
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [verificationEmail] = useVerificationEmailMutation();
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const [otp, setOtp] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [fullname, setFullname] = useState("");
	const [company, setCompany] = useState("");
	const [country, setCountry] = useState("");
	const [job, setJob] = useState("");
	const [avatar, setAvatar] = useState("");
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
					fullname: fullname,
					company: company,
					country: country,
					jobTitle: job,
					avatarPath: avatar
				},
				role: 1
			});
			console.log(response);
			dispatch(setAuthState({
				user: response.data?.user ?? null,
				tokens: response.data?.tokens ?? null
			}));
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

	return <div className="w-full">
		<div className="w-full flex-col text-center text-[32px] font-bold">
			<span>Welcome to SkillSharp</span>
		</div>
		<div className=" w-full">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
						<input
							type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder=" "
							className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 "
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
				</div>
				<div>
					<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
						<input
							type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" "
							className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
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
				</div>
				<div>
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
				</div>
				<div>
					<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
						<input
							type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder=" "
							className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
						/>
						<label
							className={`bg-white absolute left-2 transform text-sm text-gray-500 transition-all
							${fullname !== "" ? "top-2 -translate-y-4 scale-75" : ""}
							${fullname.trim() === "" ? "top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100" : ""}
							peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600`}>
							Full name
						</label>
					</GradientBorder>
				</div>

				<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
					<input
						type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder=" "
						className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
					/>
					<label
						className={`bg-white absolute left-2 transform text-sm text-gray-500 transition-all
							${company !== "" ? "top-2 -translate-y-4 scale-75" : ""}
							${company.trim() === "" ? "top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100" : ""}
							peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600`}>
						Company
					</label>
				</GradientBorder>
				<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
					<input
						type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder=" "
						className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
					/>
					<label
						className={`bg-white absolute left-2 transform text-sm text-gray-500 transition-all
							${country !== "" ? "top-2 -translate-y-4 scale-75" : ""}
							${country.trim() === "" ? "top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100" : ""}
							peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600`}>
						Country
					</label>
				</GradientBorder>
				<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
					<input
						type="text" value={job} onChange={(e) => setJob(e.target.value)} placeholder=" "
						className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
					/>
					<label
						className={`bg-white absolute left-2 transform text-sm text-gray-500 transition-all
							${job !== "" ? "top-2 -translate-y-4 scale-75" : ""}
							${job.trim() === "" ? "top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100" : ""}
							peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600`}>
						Job title
					</label>
				</GradientBorder>
				<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
					<input
						type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder=" "
						className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 "
					/>
					<label
						className={`bg-white absolute left-2 transform text-sm text-gray-500 transition-all
							${avatar !== "" ? "top-2 -translate-y-4 scale-75" : ""}
							${avatar.trim() === "" ? "top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100" : ""}
							peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600`}>
						Avatar
					</label>
				</GradientBorder>
			</div>
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
					<div className="relative ">
						<input
							type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder=" "
							className="peer block w-full rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
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

export default BusinessRegisterForm
import { useEffect, useState } from "react";
import logo from "/svg/logo.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import GradientBorder from "../../../components/ui/border/GradientBorder";
import { useResetPasswordMutation, useVerifyResetCodeMutation } from "../../../features/Auth/api/authRestApi";
import React from "react";

export default function NewPasswordPage() {
	const [email, setEmail] = useState("");
	const [searchParams] = useSearchParams();
	const resetCodeFromURL = searchParams.get("key") || "";
	const [resetCode, setResetCode] = useState(resetCodeFromURL);
	const [newPassword, setNewPassword] = useState("");
	const [verifyResetCode] = useVerifyResetCodeMutation();
	const [resetPassword] = useResetPasswordMutation();
	const [errors, setErrors] = useState('');
	const navigate = useNavigate();
	const validateForm = () => {
		let newErrors = "";
		let isValid = true;

		if (!newPassword.trim()) {
			newErrors = "Password is required.";
			isValid = false;
		} else if (newPassword.length < 6) {
			newErrors = "Password must be at least 6 characters long.";
			isValid = false;
		} else if (!/[A-Z]/.test(newPassword)) {
			newErrors = "Password must contain at least one uppercase letter.";
			isValid = false;
		} else if (!/[a-z]/.test(newPassword)) {
			newErrors = "Password must contain at least one lowercase letter.";
			isValid = false;
		} else if (!/[0-9]/.test(newPassword)) {
			newErrors = "Password must contain at least one number.";
			isValid = false;
		} else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
			newErrors = "Password must contain at least one special character.";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};
	const handleVerifyResetCode = async (code: string) => {
		try {
			// alert(resetCode);
			const response = await verifyResetCode({ resetCode: code }).unwrap();
			setEmail(response.email);
		} catch (error) {
			alert("Invalid reset code. Please try again.");
		}
	};
	const handleResetPassword = async () => {
		if (!validateForm()) return;
		try {
			await resetPassword({ email, resetCode, newPassword }).unwrap();
			alert("Password reset successfully!");
		} catch (error) {
			alert("Failed to reset password.");
		}
	};
	useEffect(() => {
		if (resetCodeFromURL) {
			handleVerifyResetCode(resetCodeFromURL);
		}
	}, [resetCodeFromURL]);

	return (
		<div className="w-1/3 mx-auto text-center">
			<div className="font-arya font-bold mt-16 text-[24px]">
				Reset your password
				<div>
					<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
						<input
							type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder=" "
							className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0   "
						/>
						<label
							className={`bg-white absolute left-2 transform text-sm text-gray-500 transition-all
							${newPassword !== "" ? "top-2 -translate-y-4 scale-75" : ""}
							${newPassword.trim() === "" ? "top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100" : ""}
							peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600`}>
							Password
						</label>
					</GradientBorder>
					{errors && <span className="text-red-400 text-sm">{errors}</span>}
					<div onClick={() => { handleResetPassword() }} className="bg-[var(--primary-color)] text-white text-[20px] rounded-lg font-bold mt-8 p-2">
						Submit
					</div>


					<div onClick={() => navigate('/')} className="underline text-[var(--primary-color)] mt-2">
						Or go back
					</div>
				</div>
				<img src={logo} className="absolute opacity-25 bottom-0 right-0 w-52" alt="logo" />
			</div>
		</div>
	);
}

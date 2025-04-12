import { useState } from "react";
import logo from "/svg/logo.svg";
import { useNavigate } from "react-router-dom";
import GradientBorder from "../../../components/ui/border/GradientBorder";
import { useReqResetPasswordMutation } from "../../../features/auth/api/auth.api";

export default function AuthResetPasswordPage() {
	const [submitted, setSubmitted] = useState(false);
	const [email, setEmail] = useState("");
	const [resetPassword] = useReqResetPasswordMutation();
	const navigate = useNavigate();
	const handleResetPassword = async () => {
		try {
			await resetPassword({ email }).unwrap();
			alert("Password reset email sent! Please check your inbox.");
		} catch (error) {
			console.error("Reset password failed:", error);
			alert("Failed to send reset password email. Try again.");
		}
	};
	return (
		<>
			<div className="w-1/3 mx-auto text-center">
				<div className="font-arya font-bold mt-16 text-[24px]">
					Reset your password
				</div>
				{!submitted ?
					(<div>
						<GradientBorder className="relative mt-8 w-full p-[1px] rounded-lg">
							<input
								type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" "
								className="peer block w-full rounded-lg border border-gray-300  px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0   "
							/>
							<label
								className={`bg-white absolute left-2 transform text-sm text-gray-500 transition-all
							${email !== "" ? "top-2 -translate-y-4 scale-75" : ""}
							${email.trim() === "" ? "top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100" : ""}
							peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600`}>
								Email
							</label>
						</GradientBorder>
						<div onClick={() => { setSubmitted(true); handleResetPassword() }} className="bg-[var(--primary-color)] text-white text-[20px] rounded-lg font-bold mt-8 p-2">
							Submit
						</div>

					</div>
					)
					: (<div className="text-center text-[20px] mt-8">Thanks! Check your email for a reset link!</div>)
				}
				<div onClick={() => navigate('/')} className="underline text-[var(--primary-color)] mt-2">
					Or go back
				</div>
			</div>
			<img src={logo} className="absolute opacity-25 bottom-0 right-0 w-52" alt="logo" />
		</>
	);
}

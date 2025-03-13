import { useState } from "react";
import logo from "/svg/logo.svg";
import { useResetPasswordMutation } from "./resetpass-api";
import Navbar from "../../../trash/Navbar";
export default function ResetPassword() {
	const [submitted, setSubmitted] = useState(false);
	const [email, setEmail] = useState("");
	const [resetPassword] = useResetPasswordMutation();
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
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<div className="w-1/3 mx-auto text-center">
				<div className="font-arya font-bold mt-16 text-[24px]">
					Reset your password
				</div>
				{!submitted ?
					(<div>
						<div>
							<input type="text" placeholder="Email" className="p-2 px-3 border rounded-lg w-full mt-8"
								value={email}
								onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div onClick={() => { setSubmitted(true); handleResetPassword() }} className="bg-[var(--primary-color)] text-white text-[20px] rounded-lg font-bold mt-8 p-2">
							Submit
						</div>

					</div>
					)
					: (<div className="text-center text-[20px] mt-8">Thanks! Check your email for a reset link!</div>)
				}
				<div className="underline text-[var(--primary-color)] mt-2">
					Or go back
				</div>
			</div>
			<img src={logo} className="absolute opacity-25 bottom-0 right-0 w-52" alt="logo" />

		</div>
	);
}

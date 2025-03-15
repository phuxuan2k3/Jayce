import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import logo from "/svg/logo.svg";
import { useSearchParams } from "react-router-dom";
import { useResetPasswordMutation, useVerifyResetCodeMutation } from "../register/register.api";
export default function NewPassword() {
    const [email, setEmail] = useState("");
    const [searchParams] = useSearchParams();
    const resetCodeFromURL = searchParams.get("key") || "";
    const [resetCode, setResetCode] = useState(resetCodeFromURL);
    const [newPassword, setNewPassword] = useState("");
    const [verifyResetCode] = useVerifyResetCodeMutation();
    const [resetPassword] = useResetPasswordMutation();

    const handleVerifyResetCode = async (code: string) => {
        try {
            alert(resetCode);
            const response = await verifyResetCode({ resetCode: code }).unwrap();
            setEmail(response.email);
        } catch (error) {
            alert("Invalid reset code. Please try again.");
        }
    };
    const handleResetPassword = async () => {
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
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="w-1/3 mx-auto text-center">
                <div className="font-arya font-bold mt-16 text-[24px]">
                    Reset your password
                    <div>
                        <div>
                            <input type="text" placeholder="New Password" className="p-2 px-3 border rounded-lg w-full mt-8"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div onClick={() => {handleResetPassword() }} className="bg-[var(--primary-color)] text-white text-[20px] rounded-lg font-bold mt-8 p-2">
                            Submit
                        </div>


                        <div className="underline text-[var(--primary-color)] mt-2">
                            Or go back
                        </div>
                    </div>
                    <img src={logo} className="absolute opacity-25 bottom-0 right-0 w-52" alt="logo" />
                </div>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import logo from "/svg/logo.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useResetPasswordMutation,
  useVerifyResetCodeMutation,
} from "../../../features/auth/api/auth.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

export default function AuthNewPasswordPage() {
  const [email, setEmail] = useState("");
  const [searchParams] = useSearchParams();
  const resetCodeFromURL = searchParams.get("key") || "";
  const [resetCode, _] = useState(resetCodeFromURL);
  const [newPassword, setNewPassword] = useState("");
  const [verifyResetCode] = useVerifyResetCodeMutation();
  const [resetPassword] = useResetPasswordMutation();
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
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
      //   alert("Invalid reset code. Please try again.");
    }
  };
  const handleResetPassword = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await resetPassword({ email, resetCode, newPassword }).unwrap();
      setSuccess(true);
    } catch (error) {
      setErrors("Failed to reset password.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (resetCodeFromURL) {
      handleVerifyResetCode(resetCodeFromURL);
    }
  }, [resetCodeFromURL]);

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, []);
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eaf6fa] via-[#f7fafc] to-[#d5eef1] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-[-100px] top-[-100px] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(57,160,173,0.18)_0%,transparent_80%)] animate-pulse-slow"></div>
        <div className="absolute right-[-80px] bottom-[-80px] w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle,rgba(57,160,173,0.10)_0%,transparent_80%)] animate-pulse"></div>
        <div className="absolute left-1/2 top-0 w-[120px] h-[120px] rounded-full bg-[radial-gradient(circle,rgba(57,160,173,0.08)_0%,transparent_80%)] animate-pulse-fast"></div>
      </div>
      <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 px-8 py-10 flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex items-center justify-center mb-2">
            <span
              className="absolute w-24 h-24 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(57,160,173,0.12) 0%, rgba(57,160,173,0.04) 70%, transparent 100%)",
                filter: "blur(2px)",
              }}
            ></span>
            <span
              className="absolute w-16 h-16 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(57,160,173,0.18) 0%, rgba(57,160,173,0.08) 70%, transparent 100%)",
                filter: "blur(1px)",
              }}
            ></span>
            <span
              className="absolute w-12 h-12 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(57,160,173,0.22) 0%, transparent 80%)",
              }}
            ></span>
            <div className="relative z-10 bg-white rounded-full p-4 shadow flex items-center justify-center">
              <FontAwesomeIcon
                icon={faLock}
                className="text-primary-toned-600 text-3xl"
              />
            </div>
          </div>
          <div className="font-arya font-extrabold text-2xl text-primary-toned-600 tracking-tight">
            Set a new password
          </div>
          <div className="text-base text-gray-500 font-asap mb-2">
            Your new password must be strong and unique.
          </div>
        </div>
        {!success ? (
          <form
            className="w-full mt-6 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleResetPassword();
            }}
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-toned-600">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder=" "
                required
                className="peer block w-full rounded-lg border border-gray-300 pl-10 pr-3 pb-2.5 pt-4 text-base text-gray-900 bg-gray-50 focus:border-primary-toned-600 focus:outline-none focus:ring-0 transition"
              />
              <label
                className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all
                  peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-toned-600
                  ${newPassword ? "top-2 text-xs text-primary-toned-600" : ""}
                `}
              >
                New Password
              </label>
            </div>
            {errors && <span className="text-red-400 text-sm">{errors}</span>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary-color)] text-lg font-bold text-white py-3 rounded-full mt-2 transition-all duration-150 hover:bg-[#2E808A] flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <>
                  Submit <FontAwesomeIcon icon={faArrowRight} />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center mt-8 gap-2 animate-fade-in">
            <div className="text-xl font-bold text-primary-toned-600 mb-1">
              Success!
            </div>
            <div className="text-base text-gray-500 font-asap">
              Your password has been reset.
              <br />
              You can now log in with your new password.
            </div>
            <button
              onClick={() => navigate("/auth/login")}
              className="w-full bg-[var(--primary-color)] text-white font-bold py-2 rounded-full mt-4 flex items-center justify-center gap-2 hover:bg-[#2E808A] transition"
            >
              Go to Login <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        )}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 underline text-primary-toned-600 mt-6 font-semibold hover:text-primary-toned-800 transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Or go back
        </button>
      </div>
      <img
        src={logo}
        className="absolute opacity-20 bottom-0 right-0 w-52 pointer-events-none select-none"
        alt="logo"
        draggable={false}
      />
      {/* <style>
        {`
          .animate-pulse-slow {
            animation: pulseGlow 3.5s cubic-bezier(.4,0,.6,1) infinite;
          }
          .animate-pulse-fast {
            animation: pulseGlow 1.8s cubic-bezier(.4,0,.6,1) infinite;
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.7; transform: scale(1);}
            50% { opacity: 1; transform: scale(1.08);}
          }
          .animate-fade-in {
            animation: fadeIn 0.7s cubic-bezier(.4,0,.6,1);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style> */}
    </div>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { parseQueryError } from "../../../helpers/fetchBaseQuery.error";
import {
  useGoogleLoginMutation,
  useLoginMutation,
  useGoogleRegisterMutation,
} from "../../../features/auth/api/auth.api";
import SpinnerLoading from "../../../components/ui/loading/SpinnerLoading";
import AlertError from "../../../components/ui/error/AlertError";
import paths from "../../../router/paths";
import React from "react";
import { authActions } from "../../../features/auth/store/authSlice";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const [ggLogin, {}] = useGoogleLoginMutation();
  const [ggRegister, {}] = useGoogleRegisterMutation();
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const errorMessage = parseQueryError(
    error as FetchBaseQueryError | SerializedError | undefined
  );
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const formData = new FormData(e.target as HTMLFormElement);
    // const username = formData.get('username') as string;
    // const password = formData.get('password') as string;

    if (!validateForm()) {
      return;
    }

    try {
      const response = await login({ email, password });
      console.log(response.data);
      console.log(response.error);
      if (response.data) {
        dispatch(authActions.setAuthStateFromResponse(response.data));
        navigate(paths._layout);
      }
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  const toSignUp = () => {
    navigate(paths.auth.CHOOSE_ROLE);
  };

  // const handleGoogleSuccess = async (credentialResponse: CredentialResponse): Promise<void> => {
  // 	try {
  // 		if (!credentialResponse.credential) {
  // 			console.log("Google login failed: No credential");
  // 			return;
  // 		}

  // 		console.log("Google credential:", credentialResponse.credential);

  // 		const response = await ggLogin({ credential: credentialResponse.credential });
  // 		if (response.data) {
  // 			dispatch(authActions.setAuthStateFromResponse(response.data));
  // 			navigate(paths._layout);
  // 		} else {
  // 			console.log("Google login failed: No data in response");
  // 		}
  // 		console.log(response);
  // 	} catch (error: any) {
  // 		console.log("Google login failed:", error);
  // 	}
  // };

  // const handleGoogleError = () => {
  // 	alert("Google login failed");
  // };

  const googleLogin = useGoogleLogin({
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

        const response = await ggLogin({ credential: idToken });
        if (response.data) {
          console.log("Google login response:", response.data);
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
          } else if (
            (response.error as FetchBaseQueryError)?.data &&
            (response.error as { data: { code: number } }).data.code === 2 &&
            (response.error as { data: { message: string } }).data.message ===
              "ent: user not found"
          ) {
            const registerResponse = await ggRegister({
              credential: idToken,
              role: 1,
              metadata: {},
            });
            if (registerResponse.data) {
              dispatch(
                authActions.setAuthStateFromResponse(registerResponse.data)
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
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 px-8 pb-4 pt-8 ">
      <div className="text-center text-3xl font-extrabold mb-2 text-primary-toned-600 font-arya tracking-tight">
        SkillSharp
      </div>
      <div className="text-center text-base text-gray-500 mb-8 font-asap">
        Welcome back! Please login to your account.
      </div>
      {/* Nút chuyển tab Log In / Sign Up */}
      {/* <div className="flex mb-8">
        <button
          className="w-1/2 rounded-s-3xl font-bold text-xl py-2 border-2 border-[var(--primary-color)] bg-[var(--primary-color)] text-white transition-all duration-150"
          disabled
        >
          Log In
        </button>
        <button
          onClick={toSignUp}
          className="w-1/2 rounded-e-3xl font-bold text-xl py-2 border-2 border-[var(--primary-color)] text-[var(--primary-color)] bg-white hover:bg-[var(--primary-color)] hover:text-white transition-all duration-150"
        >
          Sign Up
        </button>
      </div> */}

      {/* Google login */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 font-semibold text-gray-700 mb-7 shadow-sm"
        onClick={() => googleLogin()}
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
        Sign in with Google
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

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Email */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
            {/* Icon khóa */}
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
        {/* Forgot password */}
        <div className="w-full text-right text-sm mb-2">
          <Link
            className="text-primary-toned-600 hover:underline"
            to={paths.auth.RESET_PASSWORD}
          >
            Forgot your password?
          </Link>
        </div>
        {/* Login button */}
        <button
          type="submit"
          className="w-full bg-[var(--primary-color)] text-lg font-bold text-white py-3 rounded-full mt-2 transition-all duration-150 hover:bg-[#2E808A] flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          Login <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </form>
      {/* Đăng ký nhanh cho mobile */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        Don't have an account?{" "}
        <span
          className="text-primary-toned-600 font-semibold cursor-pointer hover:underline"
          onClick={toSignUp}
        >
          Sign up
        </span>
      </div>
    </div>
  );
};

export default LoginForm;

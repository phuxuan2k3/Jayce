import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBuilding,
  faEnvelope,
  faGlobe,
  faIdBadge,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// import { useRegisterMutation } from "../../../features/Auth/authApi";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../../features/auth/api/auth.api";
import { useVerificationEmailMutation } from "../../../features/auth/api/auth.api";
import paths from "../../../router/paths";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
import { isFetchBaseQueryError } from "../../../helpers/fetchBaseQuery.error";
import { useLanguage } from "../../../LanguageProvider";

const BusinessRegisterForm = () => {
  const { t } = useLanguage();

  const navigate = useNavigate();
  const [register, { isSuccess }] = useRegisterMutation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [verificationEmail] = useVerificationEmailMutation();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [job, setJob] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const validateForm = () => {
    let newErrors = { username: "", email: "", password: "" };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = t("business_register_username_required");
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = t("business_register_username_min_length");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = t("business_register_email_required");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = t("business_register_email_invalid");
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = t("business_register_password_required");
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = t("business_register_password_min_length");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = t("business_register_password_uppercase");
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = t("business_register_password_lowercase");
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = t("business_register_password_number");
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = t("business_register_password_special");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = async () => {
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
        avatarPath: "",
      },
      role: 2,
    });

    if ('error' in response) {
      const err = response.error;

      if (
        isFetchBaseQueryError(err) &&
        typeof err.data === 'object' &&
        err.data !== null &&
        'message' in err.data
      ) {
        toast.error((err.data as any).message ?? t("business_register_registration_failed"));
      } else {
        toast.error(t("business_register_registration_failed"));
      }

      return;
    }
  };

  const handleVerifyEmail = async () => {
    if (isSending) return;
    if (cooldown > 0) {
      toast.error(t("business_register_verification_wait"));
      return;
    }
    if (!validateForm()) return;
    if (!email) {
      // alert("Please enter your email.");
      return (
        <Alert
          sx={{
            width: "100%",
            mt: 1,
            mb: 3,
          }}
          severity="success"
        >
          {t("business_register_enter_email")}
        </Alert>
      );
    }
    try {
      setIsSending(true);
      await verificationEmail({ email, username }).unwrap();
      // alert("Verification email sent successfully!");
      setIsOpenModal(true);
      setCooldown(30);
      toast.success(t("business_register_verification_success"));
      return (
        <Alert
          sx={{
            width: "100%",
            mt: 1,
            mb: 3,
          }}
          severity="success"
        >
          {t("business_register_verification_success")}
        </Alert>
      );
    } catch (error: any) {
      console.error("Verification failed:", error);
      toast.error(error?.data?.message || t("business_register_verification_failed"));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-100 px-10 py-8">
        <div className="text-center text-3xl font-extrabold mb-2 text-primary-toned-600    tracking-tight">
          {t("business_register_title")}
        </div>
        <div className="text-center text-base text-gray-500 mb-8  ">
          {t("business_register_subtitle")}
        </div>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyEmail();
          }}
        >
          {/* Username */}
          <div className="relative col-span-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faUser} />
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
              {t("business_register_username")}
            </label>
            {errors.username && (
              <span className="text-red-400 text-sm">{errors.username}</span>
            )}
          </div>
          {/* Email */}
          <div className="relative col-span-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faEnvelope} />
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
              {t("business_register_email")}
            </label>
            {errors.email && (
              <span className="text-red-400 text-sm">{errors.email}</span>
            )}
          </div>
          {/* Password */}
          <div className="relative col-span-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faLock} />
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
              {t("business_register_password")}
            </label>
            {errors.password && (
              <span className="text-red-400 text-sm">{errors.password}</span>
            )}
          </div>
          {/* Full name */}
          <div className="relative col-span-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faIdBadge} />
            </span>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder=" "
              className="peer block w-full rounded-lg border border-gray-300 pl-10 pr-3 pb-2.5 pt-4 text-base text-gray-900 bg-gray-50 focus:border-primary-toned-600 focus:outline-none focus:ring-0 transition"
            />
            <label
              className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-toned-600
                ${fullname ? "top-2 text-xs text-primary-toned-600" : ""}
              `}
            >
              {t("business_register_fullname")}
            </label>
          </div>
          {/* Company */}
          <div className="relative col-span-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faBuilding} />
            </span>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder=" "
              className="peer block w-full rounded-lg border border-gray-300 pl-10 pr-3 pb-2.5 pt-4 text-base text-gray-900 bg-gray-50 focus:border-primary-toned-600 focus:outline-none focus:ring-0 transition"
            />
            <label
              className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-toned-600
                ${company ? "top-2 text-xs text-primary-toned-600" : ""}
              `}
            >
              {t("business_register_company")}
            </label>
          </div>
          {/* Country */}
          <div className="relative col-span-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faGlobe} />
            </span>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder=" "
              className="peer block w-full rounded-lg border border-gray-300 pl-10 pr-3 pb-2.5 pt-4 text-base text-gray-900 bg-gray-50 focus:border-primary-toned-600 focus:outline-none focus:ring-0 transition"
            />
            <label
              className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-toned-600
                ${country ? "top-2 text-xs text-primary-toned-600" : ""}
              `}
            >
              {t("business_register_country")}
            </label>
          </div>
          {/* Job title */}
          <div className="relative col-span-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faIdBadge} />
            </span>
            <input
              type="text"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              placeholder=" "
              className="peer block w-full rounded-lg border border-gray-300 pl-10 pr-3 pb-2.5 pt-4 text-base text-gray-900 bg-gray-50 focus:border-primary-toned-600 focus:outline-none focus:ring-0 transition"
            />
            <label
              className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-toned-600
                ${job ? "top-2 text-xs text-primary-toned-600" : ""}
              `}
            >
              {t("business_register_job_title")}
            </label>
          </div>
          {/* Avatar */}
          {/* <div className="relative col-span-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faImage} />
            </span>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder=" "
              className="peer block w-full rounded-lg border border-gray-300 pl-10 pr-3 pb-2.5 pt-4 text-base text-gray-900 bg-gray-50 focus:border-primary-toned-600 focus:outline-none focus:ring-0 transition"
            />
            <label
              className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-toned-600
                ${avatar ? "top-2 text-xs text-primary-toned-600" : ""}
              `}
            >
              Avatar URL
            </label>
          </div> */}
          {/* Submit button */}
          <div className="col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-[var(--primary-color)] text-lg font-bold text-white py-3 rounded-full transition-all duration-150 hover:bg-[#2E808A] flex items-center justify-center gap-2"
              disabled={isSending}
            >
              {isSending ? t("business_register_sign_up_loading") : t("business_register_sign_up")} <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <div className="w-full text-center text-xs text-gray-500 mt-2">
              {t("business_register_agree_terms")}{" "}
              <a
                className="text-primary-toned-600 font-semibold hover:underline"
                href="#reset"
              >
                {t("business_register_terms_link")}
              </a>
              .
            </div>
          </div>
        </form>
      </div>
      {/* OTP Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-2xl relative text-center space-y-4 border border-gray-100">
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
            <div className="flex justify-center">
              <div className="relative flex items-center justify-center">
                {/* Hào quang tự nhiên */}
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
                <div className="relative z-10 bg-white rounded-full p-3 shadow flex items-center justify-center">
                  <svg width="32" height="32" fill="none" viewBox="0 0 48 48">
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
            <div className="text-2xl font-extrabold text-primary-toned-600 mb-1   ">
              {t("business_register_check_email_title")}
            </div>
            <div className="text-gray-500  ">
              {t("business_register_check_email_subtitle")}
            </div>
            <div className="pb-2 font-semibold text-primary-toned-600 text-base">
              {email}
            </div>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-toned-600">
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
                {t("business_register_enter_otp")}
              </label>
            </div>
            <button
              onClick={handleFormSubmit}
              className="mt-4 w-full px-4 py-2 bg-[var(--primary-color)] text-white rounded-full font-bold text-lg transition-all duration-150 hover:bg-[#2E808A] flex items-center justify-center gap-2"
            >
              {t("business_register_verify_email_button")}
            </button>
            <div className="pt-1 text-xs text-gray-500  ">
              <span>{t("business_register_resend_question")}</span>{" "}
              <span
                onClick={cooldown > 0 ? undefined : handleVerifyEmail}
                className="underline text-primary-toned-600 cursor-pointer font-semibold hover:text-primary-toned-800"
              >
                {cooldown > 0 ? t("business_register_resend_cooldown").replace("{{seconds}}", cooldown.toString()) : t("business_register_resend_code")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessRegisterForm;

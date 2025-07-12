import { ArrowBackIos } from "@mui/icons-material";
import { useLanguage } from "../../../../LanguageProvider";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  return (
    <div className="fixed w-[100wv] inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#feffff] via-[#ffffff] to-[#acfdfd] animate-fade-in">
      <div className="relative flex flex-col items-center">
        <h1 className="mt-8 text-[48px]  font-bold text-gradient-animated ">
          {t("loading")}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-primary animate-fade-in animate-pulse-slow">
          {t("loading_please_wait")}
        </p>
        <div className="flex text-gradient-animated gap-2 mt-10">
          <span
            className="w-3 h-3 rounded-full bg-[#14bb91] animate-bounce"
            style={{ animationDelay: "0s" }}
          ></span>
          <span
            className="w-3 h-3 rounded-full bg-[#0b6d55] animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="w-3 h-3 rounded-full bg-[#095643] animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>
        <div
          onClick={() => navigate("/candidate/interviews?tab=History")}
          className="cursor-pointer bg-primary flex items-center font-bold text-white px-8 py-2 rounded-full mt-10 text-xl"
        >
          <ArrowBackIos sx={{ fontSize: 20 }} />
          Back
        </div>
        <div className="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden z-20">
          <div className="absolute left-[-40%] top-[30%] w-[200%] h-32 bg-gradient-to-r from-transparent via-blue-200/70 to-transparent blur-2xl opacity-30 animate-[shine_2.5s_infinite_linear]" />
        </div>
      </div>
    </div>
  );
}

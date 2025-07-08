import { useLanguage } from "../../../../LanguageProvider";

export default function Loading() {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#feffff] via-[#ffffff] to-[#acfdfd] animate-fade-in">
      <div className="relative flex flex-col items-center">
        {/* Glow Circle Pastel */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="block w-56 h-56 bg-gradient-to-tr from-[#99d6ea] via-[#92e6a7] to-[#d1ccbb] rounded-full blur-2xl opacity-50 animate-pulse-fast" />
        </div>

        <h1 className="mt-8 text-4xl md:text-5xl    font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#34c759] to-[#facc15] animate-fade-in">
          {t("loading")}
        </h1>
        <p className="mt-2 text-lg md:text-xl    text-primary animate-fade-in animate-pulse-slow">
          {t("loading_please_wait")}
        </p>
        <div className="flex gap-2 mt-10">
          <span
            className="w-3 h-3 rounded-full bg-[#34c759] animate-bounce"
            style={{ animationDelay: "0s" }}
          ></span>
          <span
            className="w-3 h-3 rounded-full bg-[#38bdf8] animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="w-3 h-3 rounded-full bg-[#facc15] animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>

        <div className="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden z-20">
          <div className="absolute left-[-40%] top-[30%] w-[200%] h-32 bg-gradient-to-r from-transparent via-blue-200/70 to-transparent blur-2xl opacity-30 animate-[shine_2.5s_infinite_linear]" />
        </div>
      </div>
    </div>
  );
}

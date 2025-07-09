import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../LanguageProvider";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const options = [
    { value: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" },
    {
      value: "vi",
      label: "Tiếng Việt",
      flag: "https://flagcdn.com/w40/vn.png",
    },
  ];

  const current = options.find((o) => o.value === language);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-100 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        type="button"
      >
        <img
          src={current?.flag}
          alt={current?.label}
          className="h-5 w-5 object-cover rounded-full"
        />
        {current?.label}
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-40 rounded-lg bg-white border shadow-lg py-2 ">
          {options.map((opt) => (
            <button
              key={opt.value}
              className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 ${
                language === opt.value ? "font-semibold text-primary" : ""
              }`}
              onClick={() => {
                setLanguage(opt.value as "en" | "vi");
                setOpen(false);
              }}
            >
              <img
                src={opt.flag}
                alt={opt.label}
                className="mr-2 h-5 w-5 object-cover rounded-full"
              />
              {opt.label}
              {language === opt.value && (
                <svg
                  className="ml-auto w-4 h-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

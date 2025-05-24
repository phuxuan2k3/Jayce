import classNames from "classnames";
import { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const slides = [
  {
    quote:
      "Unlock your potential with SkillSharp. Learn, grow, and break your own limits every day.",
    image: (
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#39A0AD" opacity="0.12" />
        <rect x="40" y="60" width="100" height="60" rx="18" fill="#39A0AD" />
        <rect x="60" y="80" width="60" height="20" rx="8" fill="#fff" />
        <rect x="75" y="110" width="30" height="8" rx="4" fill="#fff" />
      </svg>
    ),
  },
  {
    quote:
      "A dynamic learning community, connect with like-minded people and grow together.",
    image: (
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#F59E42" opacity="0.12" />
        <ellipse cx="90" cy="110" rx="50" ry="20" fill="#F59E42" />
        <circle cx="70" cy="90" r="15" fill="#fff" />
        <circle cx="110" cy="90" r="15" fill="#fff" />
        <circle cx="90" cy="80" r="18" fill="#F59E42" />
      </svg>
    ),
  },
  {
    quote:
      "Track your progress, get feedback, and achieve your learning goals with smart tools.",
    image: (
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#4CAF50" opacity="0.12" />
        <rect x="60" y="70" width="60" height="40" rx="12" fill="#4CAF50" />
        <rect x="80" y="90" width="20" height="20" rx="6" fill="#fff" />
        <rect x="70" y="80" width="40" height="8" rx="4" fill="#fff" />
      </svg>
    ),
  },
];

export default function Carousel({ className }: { className?: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={classNames(
        "relative w-full h-full  flex flex-col justify-center items-center overflow-hidden rounded-2xl ",
        className
      )}
    >
      <div className="fixed h-[100vh] inset-0 z-[-1] w-[100vw] bg-gradient-to-br from-[#D5EEF1] via-[#e0f7fa] to-[#f8fafc] " />
      {/* Hiệu ứng nền động */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-primary-toned-600 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#39A0AD] opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-[#39A0AD] via-[#F59E42] to-[#4CAF50] opacity-10 rounded-full blur-2xl"></div>
      </div>
      {/* Slide content */}
      <div className="lg:h-[600px] h-[350px] flex flex-col justify-center items-center relative z-10 w-full">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={classNames(
              "transition-all duration-700 ease-in-out absolute left-0 right-0 mx-auto flex flex-col items-center",
              idx === current
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            )}
            style={{ minHeight: "300px" }}
          >
            <div className="mb-6 animate-fade-in-up">{slide.image}</div>
            <FaQuoteLeft className="text-4xl text-primary-toned-600 mb-4 drop-shadow-lg" />
            <div className="text-2xl lg:text-3xl font-bold text-primary-toned-700 px-10 text-center font-asap max-w-2xl drop-shadow animate-fade-in-up">
              {slide.quote}
            </div>
          </div>
        ))}
      </div>
      {/* Indicator */}
      <div className="z-30 flex space-x-4 mt-10 justify-center items-center relative">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={classNames(
              "w-4 h-4 rounded-full transition-all duration-300 border-2",
              idx === current
                ? "bg-primary-toned-600 border-primary-toned-600 scale-125 shadow-lg"
                : "bg-white border-gray-300 hover:bg-primary-toned-100"
            )}
            aria-current={idx === current ? "true" : "false"}
            aria-label={`Slide ${idx + 1}`}
            onClick={() => setCurrent(idx)}
          ></button>
        ))}
      </div>
      {/* Animation keyframes */}
      <style>
        {`
          .animate-fade-in-up {
            animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both;
          }
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

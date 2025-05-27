import { useNavigate } from "react-router-dom";
import paths from "../../../router/paths";

const GuestPage = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Practice and learn to get dream job",
      description:
        "Developers can join SkillSharp community to practice interviewing with various tests and scenarios.",
      linkText: "Learn more →",
      image: "/defaults/landing_img_316.png",
    },
    {
      title: "Search for tech talent",
      description:
        "Businesses Manager can attract Candidates by creating challenges relevant to hiring position. Our QuickGenerate AI could help you sets up in couple of minutes.",
      linkText: "Learn more →",
      image: "/defaults/landing_img_319.png",
    },
    {
      title: "Prepare with Mock Interview",
      description:
        "Developers can practice Interviewing with real interview questions. Our AI models can replace to real employers, while SkillSharp analyzes and give detailed feedbacks for your performances.",
      linkText: "Learn more →",
      image: "/defaults/landing_img_322.png",
    },
  ];

  return (
    <div>
      <section className="relative text-center overflow-hidden">
        {/* Hiệu ứng background động */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute left-[-120px] top-[-120px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(57,160,173,0.15)_0%,transparent_80%)] animate-pulse-slow blur-md"></div>
          <div className="absolute right-[-100px] bottom-[-100px] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(57,160,173,0.10)_0%,transparent_80%)] animate-pulse blur"></div>
          <div className="absolute left-1/2 top-0 w-[160px] h-[160px] rounded-full bg-[radial-gradient(circle,rgba(57,160,173,0.08)_0%,transparent_80%)] animate-pulse-fast blur-sm"></div>
          {/* Sóng SVG phía dưới */}
          <svg
            className="absolute bottom-0 left-0 w-full h-32 z-10"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#d5eef1"
              fillOpacity="1"
              d="M0,224L60,197.3C120,171,240,117,360,117.3C480,117,600,171,720,186.7C840,203,960,181,1080,154.7C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div
          className="relative z-10 text-center flex flex-col justify-center h-[100vh] bg-no-repeat bg-cover bg-center animate-fade-in"
          style={{ backgroundImage: "url('/svg/landing.svg')" }}
        >
          <h1
            className="text-4xl font-black mb-4 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Everything you need
            <p>
              to <span className="text-gradient-animated">sharpen</span> your{" "}
              <span className="text-gradient-animated">interview skills</span>
            </p>
          </h1>
          <p
            className="text-lg font-semibold max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.25s" }}
          >
            Get better at technical interviews, communication skills and get
            detailed feedback on exactly what you need to work on.
          </p>
          <div
            className="flex gap-8 mx-auto justify-center mt-12 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div
              onClick={() => navigate(paths.auth.REGISTER)}
              className="px-10 bg-[var(--primary-color)] rounded-lg text-white py-2 font-bold cursor-pointer shadow-lg hover:shadow-[0_0_24px_0_rgba(57,160,173,0.25)] hover:scale-105 transition-all duration-200 active:scale-95 ring-2 ring-transparent hover:ring-[var(--primary-color)]"
            >
              For Candidates
            </div>
            <div
              onClick={() => navigate(paths.auth.BUSINESS_REGISTER)}
              className="px-10 border border-[var(--primary-color)] rounded-lg text-primary py-2 font-bold cursor-pointer bg-white shadow hover:shadow-[0_0_24px_0_rgba(57,160,173,0.15)] hover:scale-105 transition-all duration-200 active:scale-95 ring-2 ring-transparent hover:ring-[var(--primary-color)]"
            >
              For Businesses
            </div>
          </div>
        </div>
      </section>

      <h2 className="text-center text-4xl font-bold text-primary mt-10 mb-8">
        SkillSharp - The all-in-one interview prep platforms
      </h2>
      <div className="space-y-10 px-6 md:px-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-8 rounded-lg p-6`}
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="mb-3">{feature.description}</p>
              <a href="#" className="text-primary font-medium hover:underline">
                {feature.linkText}
              </a>
            </div>
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full md:w-96 rounded-lg object-cover"
            />
          </div>
        ))}
      </div>

      <h2 className="text-center text-4xl font-bold text-primary mt-10 mb-8">
        Do everything easier with AI assistants!
      </h2>
      <div className="flex justify-center mt-20 mb-20">
        <div className="w-full md:w-2/3 bg-primary-toned-50 py-16 rounded-xl">
          <div className="max-w-4xl mx-auto space-y-6 px-2">
            <div className="flex flex-col justify-center md:flex-row md:justify-between md:items-center items-start gap-6">
              <div className="flex items-start gap-4">
                <img
                  src="/svg/check.svg"
                  alt="Check icon"
                  className="h-6 w-6 text-black"
                />
                <p className="text-md">
                  Detailed feedback for your technical attempts when taking
                  tests, scenarios and interviews
                </p>
              </div>
              <button
                onClick={() => navigate(paths.auth.REGISTER)}
                className="bg-[var(--primary-color)] rounded-lg text-white font-semibold px-3 py-2"
              >
                Start with candidates
              </button>
            </div>
            <div className="flex flex-col justify-center md:flex-row md:justify-between md:items-center items-start gap-6">
              <div className="flex items-start gap-4">
                <img
                  src="/svg/check.svg"
                  alt="Check icon"
                  className="h-6 w-6 text-black"
                />
                <p className="text-md">
                  Costs saving up multiple times for creating questions and
                  searching technical candidates
                </p>
              </div>
              <button
                onClick={() => navigate(paths.auth.BUSINESS_REGISTER)}
                className="bg-[var(--primary-color)] rounded-lg text-white font-semibold px-3 py-2"
              >
                Start with businesses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestPage;

import { useNavigate } from "react-router-dom";
import paths from "../../router/paths";

const HomePage = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Courses that you need to get the job",
      linkText: "View courses →",
    },
    {
      title: "Real interview questions",
      linkText: "View questions →",
    },
    {
      title: "Details, actionable feedbacks from experts",
      linkText: "View mock →",
    },
  ];

  return (
    <div>
      <section className="text-center py-16 px-4">
        <div className="text-center py-16 px-4 bg-no-repeat h-[100vh] bg-gradient-to-br from-[#bff3f9] to-[#f4c5b9]">
          <h1 className="text-4xl font-black mb-4 my-20">
            Everything you need
            <p>
              to <span className="text-gradient">sharpen</span> your{" "}
              <span className="text-gradient">interview skills</span>
            </p>
          </h1>
          <p className="text-lg font-semibold max-w-2xl mx-auto">
            Get better at technical interviews, communication skills and get
            detailed feedback on exactly what you need to work on.
          </p>
          <div className="flex gap-8 mx-auto justify-center mt-12">
            <div
              onClick={() => navigate(paths.auth.REGISTER)}
              className="px-10 bg-[var(--primary-color)] rounded-lg text-white py-2 font-bold "
            >
              Join Us
            </div>
          </div>
        </div>
      </section>
      <h2 className="text-center text-4xl font-bold text-teal-600 mb-8">
        Our features
      </h2>
      <div className="space-y-6 px-20">
        {features.map((feature, index) => (
          <div key={index} className="flex bg-white shadow-md  rounded-lg h-60">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <a href="#" className="text-teal-600 font-medium hover:underline">
                {feature.linkText}
              </a>
            </div>
            <div className="w-80 h-full bg-gray-300 rounded-md ml-auto"></div>
          </div>
        ))}
      </div>
      <h2 className="text-center text-3xl font-bold text-teal-600  pt-20">
        Our community
      </h2>
      <h2 className="text-center text-3xl font-bold  mb-8">
        Join SkillSharp users' community via{" "}
        <a className=" text-teal-600 underline" href="#">
          Discord
        </a>
      </h2>
      <h2 className="text-center text-3xl font-bold">Get it a try?</h2>
      <div className="flex justify-center p-10">
        <button className="w-[260px] bg-[var(--primary-color)] text-lg font-bold text-white p-4 rounded-lg m-1">
          Get started for free
        </button>
      </div>
    </div>
  );
};

export default HomePage;

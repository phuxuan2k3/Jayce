import { FC } from "react";
import { JobSetupData } from "./setup";
import { useLanguage } from "../../../../LanguageProvider";

const SetUpStep1: FC<{
  onNext: () => void;
  data: JobSetupData;
  onChange: (data: Partial<JobSetupData>) => void;
}> = ({ data, onChange, onNext }) => {
  const { t } = useLanguage();
  const isValid =
    !!data.position &&
    !!data.experience &&
    !!data.skills &&
    data.skills.trim() !== "";

  const positions = [
    "Software Engineer",
    "Data Analyst",
    "DevOps Engineer",
    "Cybersecurity Analyst",
    "Cloud Engineer",
    "Full-Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Mobile Developer (iOS/Android)",
    "Machine Learning Engineer",
    "AI Engineer",
    "Data Scientist",
    "Product Manager",
    "Project Manager (IT)",
    "UI/UX Designer",
    "Network Engineer",
    "System Administrator",
    "Database Administrator (DBA)",
    "QA Engineer / Test Automation Engineer",
    "Business Analyst (IT)",
    "Solutions Architect",
    "Technical Support Specialist",
    "IT Consultant",
    "Scrum Master",
    "Site Reliability Engineer (SRE)",
    "Embedded Systems Engineer",
    "Game Developer",
    "Blockchain Developer",
    "Robotics Engineer",
    "IT Auditor",
  ];

  return (
    <>
      <div className="text-primary-toned-600 text-[32px] leading-[24px] mt-4    font-black w-full text-center ">
        {t("job_detail")}
      </div>
      <div className="text-md text-gray-800 w-full text-center ">
        {t("job_detail_desc")}
      </div>

      <div className="flex justify-between w-full mt-2">
        <div className="mb-4 text-[var(--primary-color)] ">
          <div className="font-medium text-lg w-full">{t("position")}</div>
          <select
            value={data.position}
            onChange={(e) => onChange({ position: e.target.value })}
            className="py-2 pe-12 ps-2 text-md shadow rounded-md focus:outline-none focus:ring focus:ring-teal-300"
          >
            {/* <option value="">{t("select_position")}</option> */}
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>
        <div className=" text-primary-toned-600">
          <div className="font-medium text-lg ">{t("experience")}</div>
          <select
            value={data.experience}
            onChange={(e) => onChange({ experience: e.target.value })}
            className="require text-md py-2 pe-12 ps-2 shadow rounded-md focus:outline-none focus:ring focus:ring-teal-300"
          >
            <option value="">{t("select_experience")}</option>
            <option value="intern">{t("experience_intern")}</option>
            <option value="fresher">{t("experience_fresher")}</option>
            <option value="junior">{t("experience_junior")}</option>
            <option value="mid">{t("experience_mid")}</option>
            <option value="senior">{t("experience_senior")}</option>
            <option value="lead">{t("experience_lead")}</option>
            <option value="manager">{t("experience_manager")}</option>
            <option value="director">{t("experience_director")}</option>
          </select>
        </div>
      </div>

      <div className="text-primary-toned-700 w-full font-bold text-xl">
        {t("key_skills")}
      </div>
      <div className="text-primary-toned-700 w-full flex justify-between">
        <div>{t("key_skills_desc")}</div>
        <div className="font-bold underline text-xl">{t("paste_job_desc")}</div>
      </div>

      <input
        type="text"
        placeholder={t("skills_placeholder")}
        value={data.skills}
        onChange={(e) => onChange({ skills: e.target.value })}
        className="w-full py-2 px-4 border rounded-lg"
      />
      <button
        onClick={onNext}
        disabled={!isValid}
        className={`my-[72px] bg-primary text-center text-white px-24 py-1.5 rounded-lg transition
          ${!isValid ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"}`}
      >
        {t("next")}
      </button>
    </>
  );
};
export default SetUpStep1;

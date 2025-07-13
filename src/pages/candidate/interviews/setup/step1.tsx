import { FC } from "react";
import { JobSetupData } from "./setup";
import { useLanguage } from "../../../../LanguageProvider";
import MySelect from "../../../../features/tests/ui/forms/MySelect";
import { Button } from "@mui/material";

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

  const positionOptions = positions.map((pos) => ({
    value: pos,
    label: pos,
  }));

  const experienceOptions = [
    { value: "intern", label: t("experience_intern") },
    { value: "fresher", label: t("experience_fresher") },
    { value: "junior", label: t("experience_junior") },
    { value: "mid", label: t("experience_mid") },
    { value: "senior", label: t("experience_senior") },
    { value: "lead", label: t("experience_lead") },
    { value: "manager", label: t("experience_manager") },
    { value: "director", label: t("experience_director") },
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
          <MySelect
            label={""}
            options={positionOptions}
            value={data.position}
            placeholder={t("select_position")}
            onChange={(value) => onChange({ position: value as string })}
            className="w-[280px]"
            size="md"
          />
        </div>
        <div className=" text-primary-toned-600">
          <div className="font-medium text-lg ">{t("experience")}</div>
          <MySelect
            label={""}
            options={experienceOptions}
            value={data.experience}
            placeholder={t("select_experience")}
            onChange={(value) => onChange({ experience: value as string })}
            className="w-[280px]"
            size="md"
            required
          />
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
      <Button
        sx={{
          textAlign: "left",
          justifyContent: "flex-start",
          fontFamily: "Space Grotesk, sans-serif",
          textTransform: "none",
        }}
        onClick={onNext}
        disabled={!isValid}
        className={`my-[72px] bg-primary text-center text-white px-24 py-1.5 rounded-lg transition
          ${!isValid ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"}`}
      >
        {t("next")}
      </Button>
    </>
  );
};
export default SetUpStep1;

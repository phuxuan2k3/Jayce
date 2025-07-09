import { useState } from "react";
import SetUpStep1 from "./step1";
import SetUpStep2 from "./step2";
import { useLanguage } from "../../../../LanguageProvider";

export interface JobSetupData {
  position: string;
  experience: string;
  skills: string;
}

interface SetUpPageProps {
  position?: string;
  experience?: string;
}

const SetUpPage: React.FC<SetUpPageProps> = ({ position, experience }) => {
  const [step, setStep] = useState(1);

  const [jobData, setJobData] = useState<JobSetupData>({
    position: position || "",
    experience: experience || "",
    skills: "",
  });

  const handleUpdateData = (newData: Partial<JobSetupData>) => {
    setJobData((prev) => ({ ...prev, ...newData }));
  };

  const { t } = useLanguage();
  const isValid =
    !!jobData.position &&
    !!jobData.experience &&
    !!jobData.skills &&
    jobData.skills.trim() !== "";
  return (
    <div className="bg-opacity-5 h-[100%] rounded-3xl">
      <div className="    flex-wrap flex justify-center px-20 mx-auto gap-1.5">
        <div className="flex    items-center font-bold text-[28px] w-full mt-6">
          <div
            onClick={() => setStep(1)}
            className="size-8 cursor-pointer text-white bg-primary text-center items-center flex justify-center text-lg font-bold rounded-3xl"
          >
            <span>1</span>
          </div>
          <span className="ms-4">{t("job_des")}</span>
          <hr className="flex-1" />
          <div
            onClick={() => {
              if (isValid) setStep(2);
            }}
            className={`size-8 text-white ${
              step === 1 ? "bg-gray-300" : "bg-primary"
            } text-center cursor-pointer items-center flex justify-center text-lg font-bold rounded-3xl`}
          >
            2
          </div>
          <span className="ms-4">{t("interview_context_models")}</span>
        </div>

        {step === 1 && (
          <SetUpStep1
            onNext={() => setStep(2)}
            data={jobData}
            onChange={handleUpdateData}
          />
        )}
        {step === 2 && <SetUpStep2 data={jobData} />}
      </div>
    </div>
  );
};

export default SetUpPage;

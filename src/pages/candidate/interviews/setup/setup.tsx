import { useState } from "react";
import SetUpStep1 from "./step1";
import SetUpStep2 from "./step2";

export interface JobSetupData {
  position: string;
  experience: string;
  skills: string;
}

const SetUpPage = () => {
  const [step, setStep] = useState(1);

  const [jobData, setJobData] = useState<JobSetupData>({
    position: "",
    experience: "",
    skills: "",
  });

  const handleUpdateData = (newData: Partial<JobSetupData>) => {
    setJobData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="bg-primary bg-opacity-5 h-[100vh]">
      <div className=" font-asap flex-wrap flex justify-center w-[800px] mx-auto gap-1.5">
        <div onClick={() => setStep(1)}>1</div>
        <div onClick={() => setStep(2)}>2</div>
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

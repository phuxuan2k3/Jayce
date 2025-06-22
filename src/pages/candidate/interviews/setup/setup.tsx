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
    <div className=" bg-opacity-5 h-[100%] rounded-3xl">
      <div className=" font-asap flex-wrap flex justify-center w-[800px] mx-auto gap-1.5">
        <div className="flex font-arya items-center font-bold text-[28px] w-full mt-6">
          <div
            onClick={() => setStep(1)}
            className="size-8 text-white bg-primary text-center items-center flex justify-center text-lg font-bold rounded-3xl"
          >
            <span>1</span>
          </div>
          <span className="ms-4">Job description</span>
          <hr className="flex-1" />
          <div
            onClick={() => setStep(2)}
            className={`size-8 text-white ${
              step === 1 ? "bg-gray-300" : "bg-primary"
            } text-center items-center flex justify-center text-lg font-bold rounded-3xl`}
          >
            2
          </div>
          <span className="ms-4">Interview context & models</span>
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

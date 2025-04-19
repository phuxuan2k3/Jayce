import { FC } from "react";
import { JobSetupData } from "./setup";

const SetUpStep1: FC<{
  onNext: () => void;
  data: JobSetupData;
  onChange: (data: Partial<JobSetupData>) => void;
}> = ({ data, onChange, onNext }) => {
  return (
    <>
      <div className="fotn-back text-[48px] font-arya w-full text-center mt-6">
        Job Detail
      </div>
      <div className="text-[24px] text-gray-800 w-full text-center mb-8">
        For better result, we need to learn more about this job position.
      </div>

      <div className="flex justify-between w-full">
        <div className="mb-10 text-[var(--primary-color)] ">
          <div className="font-medium mb-1 text-xl w-full">Position</div>
          <select
            value={data.position}
            onChange={(e) => onChange({ position: e.target.value })}
            className="py-2 pe-12 ps-2  shadow rounded-md focus:outline-none focus:ring focus:ring-teal-300"
          >
            <option value="">Select your position</option>
            <option value="softengineer">Software Engineer</option>
            <option value="dataanalyst">Data Analyst</option>
            <option value="projectmanager">Project Manager</option>
          </select>
        </div>
        <div className=" mb-10 text-[var(--primary-color)]">
          <div className="font-medium mb-1 text-xl ">Experience</div>
          <select
            value={data.experience}
            onChange={(e) => onChange({ experience: e.target.value })}
            className="py-2 pe-12 ps-2 shadow rounded-md focus:outline-none focus:ring focus:ring-teal-300"
          >
            <option value="">Select your experience</option>
            <option value="inter">Intern</option>
            <option value="fresher">Fresher</option>
            <option value="junior">Junior</option>
          </select>
        </div>
      </div>

      <div className="text-primary-toned-700 w-full font-bold text-xl">
        Key skills
      </div>
      <div className="text-primary-toned-700 w-full flex justify-between">
        <div>Key skills required for this position (comma separated)</div>
        <div className="font-bold underline text-xl">
          Or paste job description
        </div>
      </div>

      <input
        type="text"
        placeholder="eg: SQL, Python, C++"
        value={data.skills}
        onChange={(e) => onChange({ skills: e.target.value })}
        className="w-full py-2 px-4 border rounded-lg"
      />
      <div
        onClick={onNext}
        className="mt-24 bg-primary text-center text-white px-24 py-1.5 rounded-lg"
      >
        Next
      </div>
    </>
  );
};
export default SetUpStep1;

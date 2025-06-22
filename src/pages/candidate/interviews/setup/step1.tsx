import { FC } from "react";
import { JobSetupData } from "./setup";

const SetUpStep1: FC<{
  onNext: () => void;
  data: JobSetupData;
  onChange: (data: Partial<JobSetupData>) => void;
}> = ({ data, onChange, onNext }) => {
  const isValid =
    !!data.position &&
    !!data.experience &&
    !!data.skills &&
    data.skills.trim() !== "";
  return (
    <>
      <div className=" text-primary-toned-600 text-[32px] leading-[24px] mt-4 font-arya font-black w-full text-center ">
        Job Detail
      </div>
      <div className="text-md text-gray-800 w-full text-center ">
        For better result, we need to learn more about this job position.
      </div>

      <div className="flex justify-between w-full mt-2">
        <div className="mb-4 text-[var(--primary-color)] ">
          <div className="font-medium text-lg w-full">Position</div>
          <select
            value={data.position}
            onChange={(e) => onChange({ position: e.target.value })}
            className="py-2 pe-12 ps-2 text-md shadow rounded-md focus:outline-none focus:ring focus:ring-teal-300"
          >
            <option value="">Select your position</option>
            <option value="Soft Engineer">Software Engineer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Project Manager">Project Manager</option>
          </select>
        </div>
        <div className=" text-primary-toned-600">
          <div className="font-medium text-lg ">Experience</div>
          <select
            value={data.experience}
            onChange={(e) => onChange({ experience: e.target.value })}
            className="require text-md py-2 pe-12 ps-2 shadow rounded-md focus:outline-none focus:ring focus:ring-teal-300"
          >
            <option value="">Select your experience</option>
            <option value="intern">Intern</option>
            <option value="fresher">Fresher</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Team Lead</option>
            <option value="manager">Engineering Manager</option>
            <option value="director">Director</option>
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
      <button
        onClick={onNext}
        disabled={!isValid}
        className={`my-[72px] bg-primary text-center text-white px-24 py-1.5 rounded-lg transition
          ${!isValid ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"}`}
      >
        Next
      </button>
    </>
  );
};
export default SetUpStep1;

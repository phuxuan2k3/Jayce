import { FC, useState } from "react";
import { JobSetupData } from "./setup";
import ModalCheckSound from "./ModalCheckSound";

const SetUpStep2: FC<{ data: JobSetupData }> = ({ data }) => {
  const [speechRate, setSpeechRate] = useState(0);
  const [numQuestion, setNumQuestion] = useState(4);
  const [skipIntro, setSkipIntro] = useState(false);
  const [skipCode, setSkipCode] = useState(false);
  const [language, setLanguage] = useState<string>("English");

  const [isOpen, setIsopen] = useState<boolean>(false);
  return (
    <>
      <div className="fotn-back text-[32px] font-arya w-full text-center leading-[24px] mt-4">
        Interview Context & Models
      </div>
      <div className="text-md text-gray-800 w-full text-center mb-2">
        Then, choose AI interviewer & set up informations for the interview
        session.
      </div>
      <div className="flex w-full">
        <div className="w-7/12">
          <div className="mb-2 text-[var(--primary-color)] ">
            <div className="font-medium mb-1 text-lg w-full">Language</div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="py-2 pe-12 ps-2  shadow rounded-md focus:outline-none focus:ring focus:ring-teal-300"
            >
              <option value="en">English</option>
              <option value="vi">VietNamese</option>
            </select>
            <div className="mt-4 mb-2">Models (English)</div>
            <div className="grid grid-cols-2  gap-4">
              <img
                className="size-[200px] rounded-lg bg-gray-300"
                src="/textures/aliceAvatar.png"
                alt=""
              />
              <img
                className="size-[200px] rounded-lg bg-gray-300"
                src="/textures/peterAvatar.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="w-5/12 text-lg text-primary font-semibold">
          <div className="leading-[20px]">Speech rate</div>
          <input
            type="range"
            min="-20"
            max="20"
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
            className=" range  h-5 [--range-thumb-size:40px]  [--range-p:3px]   [--range-thumb:#2e808a] text-primary "
          />
          <div className="flex text-sm justify-between  mb-3 font-medium text-primary-toned-700">
            <div>Low</div>
            <div>Fast</div>
          </div>
          <div className="text-lg leading-[20px]">Number of questions</div>

          <input
            type="range"
            min="1"
            max="16"
            value={numQuestion}
            onChange={(e) => setNumQuestion(Number(e.target.value))}
            className="range  h-5 [--range-thumb-size:40px]  [--range-p:3px] [--range-thumb:#2e808a] text-primary "
          />
          <div className="flex justify-between text-sm  mb-4 font-medium text-primary-toned-700">
            <div>1</div>
            <div>16</div>
          </div>

          <div className="flex justify-between">
            <span> Skip intro question</span>
            <input
              type="checkbox"
              checked={skipIntro}
              onChange={(e) => setSkipIntro(e.target.checked)}
              className="checkbox   checked:bg-primary checked:text-white size-8"
            />
          </div>
          <div className="flex justify-between my-4">
            <div className="w-3/5">
              <div> Skip coding question</div>
              <div className="text-[12px] leading-[18px] font-medium">
                (If you choose not to skip, the last question would be a coding
                problem)
              </div>
            </div>
            <input
              type="checkbox"
              checked={skipCode}
              onChange={(e) => setSkipCode(e.target.checked)}
              className="checkbox   checked:bg-primary checked:text-white size-8"
            />
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          // handleStartInterview();
          setIsopen(true);
        }}
        className="mb-4 bg-primary text-center text-white px-24 py-1.5 rounded-lg"
      >
        Start
      </div>
      {/* {interviewId && ( */}
      <ModalCheckSound
        isOpen={isOpen}
        onClose={() => setIsopen(false)}
        data={data}
        language={language}
        speechRate={speechRate}
        numQuestion={numQuestion}
        skipIntro={skipIntro}
        skipCode={skipCode}
      />
      {/* )} */}
    </>
  );
};
export default SetUpStep2;

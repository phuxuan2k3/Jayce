import { FC } from "react";
import { GetInterviewScoreResponse } from "../../../../features/interviews/api/interview.api";

const Strength: FC<{ scoreData: GetInterviewScoreResponse }> = ({
  scoreData,
}) => {
  return (
    <div className=" w-full h-full p-16 flex  gap-10">
      <div className="border w-1/2 shadow-md rounded-lg h-[60vh] bg-primary-toned-50 p-4">
        <div>Strengs in your response</div>
        <div className="w-full h-[90%] mt-2 rounded-lg  bg-white ">
          {scoreData.positiveFeedback}
        </div>
      </div>
      <div className="border w-1/2 shadow-md rounded-lg h-[60vh] bg-primary-toned-50">
        <div>Areas of improvement</div>
        <div className="w-full h-[90%] mt-2 rounded-lg  bg-white ">
          {scoreData.actionableFeedback}
        </div>
      </div>
    </div>
  );
};
export default Strength;

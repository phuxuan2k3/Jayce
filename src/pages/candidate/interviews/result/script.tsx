import { FC } from "react";
import { GetInterviewScoreResponse } from "../../../../features/interviews/api/interview.api";

const Script: FC<{ scoreData: GetInterviewScoreResponse }> = ({
  scoreData,
}) => {
  return (
    <div className=" w-full h-full p-16 flex  gap-10">
      <div className="h-fit w-full  border shadow-md rounded-lg p-3 ">
        <div>Question 1</div>
        <div className="border p-3 mt-2 rounded-lg">Your respones</div>
        {scoreData.result.map((res, index) => (
          <div
            key={index}
            className="border p-4 mt-4 rounded-lg shadow-sm bg-white"
          >
            <div className="font-semibold text-lg mb-2">
              Question {res.index + 1}
            </div>
            <div className="text-gray-700 mb-2">
              <strong>Comment:</strong> {res.comment}
            </div>
            <div className="text-gray-700">
              <strong>Score:</strong> {res.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Script;

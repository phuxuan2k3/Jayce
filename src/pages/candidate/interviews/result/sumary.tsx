import { FC } from "react";
import { Pie } from "react-chartjs-2";
import { GetInterviewScoreResponse } from "../../../../features/interviews/api/interview.api";

const acceptanceRateData = {
  labels: ["Excellent", "Good", "Fair", "Below Average", "Not Experienced"],
  datasets: [
    {
      data: [20, 20, 20, 20, 30],
      backgroundColor: ["#527853", "#8DBDE2", "#E1C03E", "#DA772C", "#D85353"],
    },
  ],
};

const Summary: FC<{ scoreData: GetInterviewScoreResponse }> = ({
  scoreData,
}) => {
  return (
    <div className=" w-full h-full p-16 flex  gap-10">
      <div className="border w-3/5 shadow-md rounded-lg h-[60vh] bg-primary-toned-50 p-4">
        <div>Overall feedback</div>
        <div className="h-[90%] mt-5 rounded-lg w-full p-4 bg-white">
          {scoreData.finalComment}
        </div>
      </div>
      <div className="flex-1">
        <div className="border shadow-md rounded-lg  h-[20vh]"></div>
        <div className=" border mt-10 shadow-md rounded-lg  h-[35vh] flex flex-wrap justify-center items-center">
          <h4 className="font-semibold mb-2 text-center w-full">
            Acceptance rate of scenarios responses
          </h4>
          <div className="w-[180px] h-[180px] ">
            <Pie
              data={acceptanceRateData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
          <div className="ml-6">
            <ul className="space-y-2">
              {acceptanceRateData.labels.map((label, index) => (
                <li key={label} className="flex items-center">
                  <div
                    className="w-4 h-4 mr-2"
                    style={{
                      backgroundColor:
                        acceptanceRateData.datasets[0].backgroundColor[index],
                    }}
                  ></div>
                  <span className="text-lg font-medium">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Summary;

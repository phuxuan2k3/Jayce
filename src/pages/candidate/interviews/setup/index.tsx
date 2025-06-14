import { useState } from "react";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faHistory } from "@fortawesome/free-solid-svg-icons";
import SetUpPage from "./setup";
import HistoryPage from "./history";

const navItems = [
  { id: "Interview", label: "Interview", icon: faChartPie },
  { id: "History", label: "History", icon: faHistory },
];

const InterviewPage = () => {
  const [tab, setTab] = useState("Interview");

  const renderTabContent = () => {
    switch (tab) {
      case "Interview":
        return <SetUpPage />;
      case "History":
        return <HistoryPage />;
      default:
        return <SetUpPage />;
    }
  };

  return (
    <div className="bg-white h-fit  mx-12">
      <div className="text-3xl font-black font-arya  mt-4 text-primary-toned-600 drop-shadow">
        Interview Result
      </div>
      <div className=" font-arya mb-4 text-gray-700">
        <p>Congratulations on completing the interview!</p>
        <p>Let's take a look at the result!</p>
      </div>
      <Box className="w-full flex justify-center ">
        <div className="w-[340px] h-[500px] bg-white/90 rounded-3xl shadow p-6 flex flex-col gap-2 items-center mr-10">
          {navItems.map((item) => {
            const isSelected = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-4 py-4 px-6 rounded-2xl text-lg font-bold transition-all duration-150 mb-2
                  ${
                    isSelected
                      ? "bg-primary-toned-600 text-white shadow-md scale-105"
                      : "bg-gray-50 text-primary-toned-700 hover:bg-primary-toned-50 hover:text-primary-toned-600"
                  }
                  `}
                style={{
                  boxShadow: isSelected
                    ? "0 8px 32px 0 rgba(46,128,138,0.14)"
                    : undefined,
                }}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`text-2xl ${
                    isSelected ? "text-white" : "text-primary-toned-600"
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
        <Box className="flex-1 bg-transparent h-fit mb-10 ">
          <div className="rounded-3xl shadow-lg bg-white/80  h-full">
            {renderTabContent()}
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default InterviewPage;

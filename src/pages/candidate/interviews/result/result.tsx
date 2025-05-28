import { useState } from "react";
import { useGetInterviewHistoryQuery } from "../../../../features/interviews/api/interview.api";
import { CircularProgress, Box } from "@mui/material";
import Strength from "./strength";
import Script from "./script";
import Summary from "./sumary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faScroll,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { id: "summary", label: "Summary", icon: faChartPie },
  { id: "script", label: "Scripts", icon: faScroll },
  { id: "strength", label: "Areas of Improvement", icon: faArrowTrendUp },
];

const ResultPage = () => {
  const [tab, setTab] = useState("summary");

  const interviewInfo = JSON.parse(
    localStorage.getItem("interviewInfo") || "{}"
  );
  const interviewId = interviewInfo.interviewId || "1";
  const { data, isLoading, error } = useGetInterviewHistoryQuery({
    interviewId,
  });

  const renderTabContent = () => {
    switch (tab) {
      case "summary":
        return data ? <Summary scoreData={data} /> : null;
      case "script":
        return data ? <Script scoreData={data} /> : null;
      case "strength":
        return data ? <Strength scoreData={data} /> : null;
      default:
        return data ? <Summary scoreData={data} /> : null;
    }
  };

  if (isLoading) {
    return (
      <Box className="flex flex-col items-center justify-center min-h-[50vh]">
        <CircularProgress />
        <div className="mt-4">Đang tải kết quả...</div>
      </Box>
    );
  }
  if (error) return <div>Lỗi khi tải dữ liệu!</div>;
  if (!data) return <div>Không có dữ liệu.</div>;

  return (
    <div className="bg-[#f7fafc] min-h-screen pb-20">
      <div className="text-[40px] font-black font-arya text-center mt-10 text-primary-toned-600 drop-shadow-lg">
        Interview Result
      </div>
      <div className="text-center text-[20px] font-arya mb-10 text-gray-700">
        <p>Congratulations on completing the interview!</p>
        <p>Let's take a look at the result!</p>
      </div>
      <Box className="w-full flex justify-center">
        <div className="w-[340px] bg-white/90 rounded-3xl shadow-2xl p-6 flex flex-col gap-2 items-center mr-10">
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
        <Box className="flex-1 bg-transparent min-h-[90vh] ml-4">
          <div className="rounded-3xl shadow-2xl bg-white/80 p-8 h-full">
            {renderTabContent()}
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default ResultPage;

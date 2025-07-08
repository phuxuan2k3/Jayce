import { useEffect, useState } from "react";
import { useGetInterviewHistoryQuery } from "../../../../features/interviews/api/interview.api";
import { Box } from "@mui/material";
import Strength from "./strength";
import Script from "./script";
import Summary from "./sumary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faScroll,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "./loading";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../../../LanguageProvider";

const ResultPage = () => {
  const { t } = useLanguage();

  const [tab, setTab] = useState("summary");
  const navItems = [
    { id: "summary", label: t("result_summary"), icon: faChartPie },
    { id: "script", label: t("result_scripts"), icon: faScroll },
    {
      id: "strength",
      label: t("result_areas_of_improvement"),
      icon: faArrowTrendUp,
    },
  ];
  const location = useLocation();
  const interviewId = location.state?.interviewId;
  // const { data, isLoading, error, refetch } = useGetInterviewHistoryQuery({
  //   interviewId,
  // });

  // useEffect(() => {
  //   if (data && !data.finalComment) {
  //     const timeoutId = setTimeout(() => {
  //       refetch();
  //     }, 100);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [data, refetch]);

  // useEffect(() => {
  //   if (data?.finalComment) {
  //     refetch();
  //   }
  // }, [data?.finalComment, refetch]);

  const [stopPolling, setStopPolling] = useState(false);
  const { data, isLoading } = useGetInterviewHistoryQuery(
    { interviewId },
    {
      pollingInterval: stopPolling ? 0 : 2000,
      skip: !interviewId,
    }
  );

  useEffect(() => {
    if (data?.finalComment) {
      setStopPolling(true);
    }
  }, [data]);

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

  if (isLoading || (data && !data.finalComment)) {
    return <Loading />;
  }
  if (!data) return <div>{t("result_no_data")}</div>;

  return (
    <div className="bg-white h-fit pb-20 container">
      <div className="text-[40px] font-black    text-start mt-10 text-primary-toned-600 drop-shadow">
        {t("result_title")}
      </div>
      <div className="text-start text-[20px]    mb-3 text-gray-700">
        <p>{t("result_congrats")}</p>
        <p>{t("result_lets_take_a_look")}</p>
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
        <Box className="flex-1 bg-transparent h-fit  ">
          <div className="rounded-3xl shadow-lg bg-white/80 p-8 h-full">
            {renderTabContent()}
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default ResultPage;

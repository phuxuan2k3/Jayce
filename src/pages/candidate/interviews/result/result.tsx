import { useEffect, useState } from "react";
import { useGetInterviewHistoryQuery } from "../../../../features/interviews/api/interview.api";
import { Box, Button } from "@mui/material";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../LanguageProvider";
import { ArrowBackIos } from "@mui/icons-material";

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

  const navigate = useNavigate();
  if (isLoading || (data && !data.finalComment)) {
    return <Loading />;
  }
  if (!data) return <div>{t("result_no_data")}</div>;

  return (
    <div className=" h-fit container">
      <div className=" my-4  h-[104px] bg-white/90 rounded-lg shadow shadow-primary p-6 flex flex-col gap-2">
        <div className="flex gap-1 cursor-pointer items-center">
          <ArrowBackIos
            className="text-primary-toned-500 cursor-pointer hover:text-primary-toned-600 transition-colors"
            onClick={() => navigate("/candidate/interviews?tab=History")}
          />
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("result_title")}
          </h2>
        </div>
        <div className="text-sm text-primary-toned-500">
          {t("result_congrats")}
        </div>
      </div>
      <Box className="w-full flex justify-center mb-4">
        <div className="w-[340px] sticky top-20 h-[500px] bg-white/90 rounded-lg shadow shadow-primary p-6 flex flex-col gap-2 items-center mr-5">
          {navItems.map((item) => {
            const isSelected = tab === item.id;
            return (
              <Button
                sx={{
                  textAlign: "left",
                  justifyContent: "flex-start",
                  fontFamily: "Space Grotesk, sans-serif",
                  textTransform: "none",
                }}
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-4 py-4 px-6 rounded-lg text-lg font-bold transition-all duration-150 mb-2
                  ${
                    isSelected
                      ? "bg-primary-toned-600 text-white shadow-md scale-105"
                      : "bg-gradient-to-br from-primary-toned-50 to-primary-toned-100 text-primary-toned-700 hover:bg-primary-toned-50 hover:text-primary-toned-600"
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
              </Button>
            );
          })}
          <button
            onClick={() => navigate("/candidate/interviews?tab=History")}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-lg transition-all text-secondary bg-gradient-to-r from-secondary-toned-50 to-secondary-toned-100 hover:shadow-md hover:translate-y-[-2px] mt-auto"
          >
            <div className="rounded-full p-2 text-white max-w-10 max-h-10 w-10 h-10 flex items-center justify-center bg-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-arrow-left h-5 w-5"
                aria-hidden="true"
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
            </div>
            <div className="text-left">
              <div className="font-semibold">{t("back_history")}</div>
              <div className="text-xs text-secondary-toned-500">
                {t("back_des_his")}
              </div>
            </div>
          </button>
        </div>
        <Box className="flex-1 bg-transparent h-fit  ">
          <div className="rounded-lg sticky top-20 shadow shadow-primary bg-white/80 p-8 h-full">
            {renderTabContent()}
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default ResultPage;

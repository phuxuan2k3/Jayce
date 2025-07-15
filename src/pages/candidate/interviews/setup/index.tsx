import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faHistory,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import SetUpPage from "./setup";
import HistoryPage from "./history";
import { useLanguage } from "../../../../LanguageProvider";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PublicQuestionsPage from "./PublicQuestions";

const navTabKeys = [
  { id: "Interview", labelKey: "tab_interview", icon: faChartPie },
  { id: "History", labelKey: "tab_history", icon: faHistory },
  {
    id: "PublicQuestions",
    labelKey: "tab_public_questions",
    icon: faQuestionCircle,
  },
];

const InterviewPage = () => {
  const location = useLocation();
  const position = location.state?.position || "";
  const experience = location.state?.experience || "";

  const [tab, setTab] = useState("Interview");
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "Interview") {
      setTab("Interview");
    } else if (tabParam === "History") {
      setTab("History");
    } else if (tabParam === "PublicQuestions") {
      setTab("PublicQuestions");
    }
  }, [searchParams]);

  const renderTabContent = () => {
    switch (tab) {
      case "Interview":
        return <SetUpPage position={position} experience={experience} />;
      case "History":
        return <HistoryPage />;
      case "PublicQuestions":
        return <PublicQuestionsPage />;
      default:
        return <SetUpPage position={position} experience={experience} />;
    }
  };

  return (
    <div className="   container   h-fit">
      <div className=" mt-4  h-[104px] bg-white/90 rounded-lg shadow shadow-primary p-6 flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-bold">
          {t("interview_tilte")}
        </h2>
        <div className="text-sm text-primary-toned-500">
          {t("interview_description")}
        </div>
      </div>
      <Box className="w-full flex justify-center ">
        <div className=" mb-8 mt-4 sticky top-20 w-[340px] h-[500px] bg-white/90 rounded-lg shadow shadow-primary  p-6 flex flex-col gap-2 items-center mr-5">
          {navTabKeys.map((item) => {
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
                onClick={() => navigate(`?tab=${item.id}`)}
                className={`w-full flex items-center gap-4 py-4 px-4 rounded-lg text-lg font-bold transition-all duration-150 mb-2
                  ${
                    isSelected
                      ? "!bg-primary-toned-600 text-white shadow-md scale-105"
                      : " text-primary-toned-700  bg-gradient-to-br from-primary-toned-50 to-primary-toned-100  hover:bg-primary-toned-50 hover:text-primary-toned-600"
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
                <span>{t(item.labelKey)}</span>
              </Button>
            );
          })}
          <button
            onClick={() => navigate("/candidate")}
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
              <div className="font-semibold">{t("back_dashboard")}</div>
              <div className="text-xs text-secondary-toned-500">
                {t("back_des_dashboard")}
              </div>
            </div>
          </button>
        </div>
        <Box className="flex-1  bg-transparent h-fit mb-10 mt-5">
          <div className="rounded-lg  shadow shadow-primary bg-white/80  h-full">
            {renderTabContent()}
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default InterviewPage;

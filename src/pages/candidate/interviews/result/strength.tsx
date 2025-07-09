import { FC } from "react";
import { GetInterviewHistoryResponse } from "../../../../features/interviews/api/interview.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faArrowTrendUp,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../../../LanguageProvider";

const Strength: FC<{ scoreData: GetInterviewHistoryResponse }> = ({
  scoreData,
}) => {
  const { t } = useLanguage();
  return (
    <div>
      <div className="text-center text-2xl font-extrabold mb-2 text-primary-toned-600    tracking-tight">
        {t("strength_interview_feedback")}
      </div>
      <div className="flex  gap-6 mb-3">
        {/* Strengths */}
        <div className=" transition-all duration-200 hover:scale-[1.02]  rounded-2xl border border-primary-toned-400 bg-primary-toned-50/80 px-6 py-5 w-full gap-2 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-primary-toned-600 text-lg"
            />
            <span className="font-bold text-primary-toned-600    tracking-tight text-lg">
              {t("strength_strengths")}
            </span>
          </div>
          <div className="whitespace-pre-line text-base    text-gray-800 min-h-[100px]">
            {scoreData.positiveFeedback}
          </div>
        </div>
        {/* Areas of Improvement */}
        <div className=" transition-all duration-200 hover:scale-[1.02]   rounded-2xl border border-yellow-400 bg-yellow-50 px-6 py-5 w-full gap-2 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <FontAwesomeIcon
              icon={faArrowTrendUp}
              className="text-yellow-600 text-lg"
            />
            <span className="font-bold text-yellow-600    tracking-tight text-lg">
              {t("strength_areas_of_improvement")}
            </span>
          </div>
          <div className="whitespace-pre-line text-base    text-yellow-600 min-h-[100px]">
            {scoreData.actionableFeedback}
          </div>
        </div>
      </div>

      {/* Final Comment */}
      <div className=" transition-all duration-200 hover:scale-[1.02]   rounded-2xl border border-primary-toned-600 bg-primary-toned-50 px-6 py-5 flex flex-col gap-2 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <FontAwesomeIcon
            icon={faLightbulb}
            className="text-primary-toned-700 text-lg"
          />
          <span className="font-bold text-primary-toned-700    tracking-tight text-lg">
            {t("strength_final_comment")}
          </span>
        </div>
        <div className="whitespace-pre-line text-base    text-primary-toned-600 min-h-[100px]">
          {scoreData.finalComment}
        </div>
      </div>
    </div>
  );
};

export default Strength;

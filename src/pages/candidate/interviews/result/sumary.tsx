import { FC, useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import { GetInterviewHistoryResponse } from "../../../../features/interviews/api/interview.api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faChartLine,
  faChartPie,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import { useLanguage } from "../../../../LanguageProvider";
import { Button, ButtonGroup } from "@mui/material";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const getPieData = (totalScore: GetInterviewHistoryResponse["totalScore"]) => {
  const labelToGradeKey: Record<string, keyof typeof totalScore> = {
    Excellent: "A",
    Good: "B",
    Fair: "C",
    "Below Average": "D",
    "Not Experienced": "F",
  };

  const labels = Object.keys(labelToGradeKey);
  const colors = [
    "#527853", // Excellent - Green
    "#8DBDE2", // Good - Blue
    "#E1C03E", // Fair - Yellow
    "#DA772C", // Below Average - Orange
    "#D85353", // Not Experienced - Red
  ];

  const data = labels.map((label) => {
    const key = labelToGradeKey[label];
    return totalScore?.[key] ?? 0;
  });
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 10,
      },
    ],
  };
};

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom" as const,
      labels: {
        font: {
          size: 36,
          family: "var(--  , Arial, sans-serif)",
          weight: "bold" as const,
        },
        color: "#2E808A",
        padding: 32,
        boxWidth: 90,
        // filter: () => true,
      },
    },
    title: {
      display: false,
    },
  },
};

const getLineData = (totalScore: GetInterviewHistoryResponse["totalScore"]) => {
  const labels = [
    "Excellent",
    "Good",
    "Fair",
    "Below Average",
    "Not Experienced",
  ];
  const values = (["A", "B", "C", "D", "F"] as const).map(
    (key) => totalScore?.[key] ?? 0
  );
  return {
    labels,
    datasets: [
      {
        label: "Score Distribution",
        data: values,
        borderColor: "#2E808A",
        backgroundColor: "#8DBDE2",
        tension: 0.3,
        fill: true,
      },
    ],
  };
};

const getBarData = (totalScore: GetInterviewHistoryResponse["totalScore"]) => {
  const labels = [
    "Excellent",
    "Good",
    "Fair",
    "Below Average",
    "Not Experienced",
  ];
  const values = (["A", "B", "C", "D", "F"] as const).map(
    (key) => totalScore?.[key] ?? 0
  );
  return {
    labels,
    datasets: [
      {
        label: "Score Distribution",
        data: values,
        backgroundColor: [
          "#527853",
          "#8DBDE2",
          "#E1C03E",
          "#DA772C",
          "#D85353",
        ],
        borderWidth: 1,
      },
    ],
  };
};

const chartTypes = ["pie", "line", "bar"] as const;

type ChartType = (typeof chartTypes)[number];

const Summary: FC<{ scoreData: GetInterviewHistoryResponse }> = ({
  scoreData,
}) => {
  const { t } = useLanguage();

  const [chartType, setChartType] = useState<ChartType>("pie");

  useEffect(() => {
    const interval = setInterval(() => {
      setChartType((prev) => {
        const nextIndex = (chartTypes.indexOf(prev) + 1) % chartTypes.length;
        return chartTypes[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-0 md:p-8 flex flex-col md:flex-row gap-8">
      {/* Feedback Card */}

      <Card className="w-3/5 shadow rounded-lg bg-white/90 border border-gray-100">
        <CardContent>
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon
              icon={faChartPie}
              className="text-primary-toned-600 text-xl"
            />
            <Typography
              variant="subtitle1"
              className="font-bold text-primary-toned-600   "
            >
              {t("summary_grade_distribution")}
            </Typography>
          </div>
          <Divider />

          <div className="w-full flex justify-end px-8 pt-2 mb-9">
            <ButtonGroup
              variant="text"
              className="text-primary gap-2 bg-primary-toned-100 p-1 rounded-full"
            >
              <Button
                onClick={() => setChartType("pie")}
                className={`px-3 py-1  border-0 ${
                  chartType === "pie"
                    ? "rounded-full bg-primary text-white"
                    : "text-primary"
                }`}
              >
                <FontAwesomeIcon icon={faChartPie} className="text-xl" />
              </Button>
              <Button
                onClick={() => setChartType("line")}
                className={`px-3 py-1  border-0 ${
                  chartType === "line"
                    ? "rounded-full bg-primary text-white"
                    : "text-primary"
                }`}
              >
                <FontAwesomeIcon icon={faChartLine} className="text-xl" />
              </Button>
              <Button
                onClick={() => setChartType("bar")}
                className={`px-3 py-1  border-0 ${
                  chartType === "bar"
                    ? "rounded-full bg-primary text-white"
                    : "text-primary"
                }`}
              >
                <FontAwesomeIcon icon={faChartBar} className="text-xl" />
              </Button>
            </ButtonGroup>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <div className="w-full h-[500px]  relative">
              {/* <Pie
                data={getPieData(scoreData.totalScore)}
                options={pieOptions}
              /> */}
              {chartType === "pie" && (
                <Pie
                  data={getPieData(scoreData.totalScore)}
                  options={pieOptions}
                />
              )}
              {chartType === "line" && (
                <Line
                  data={getLineData(scoreData.totalScore)}
                  options={pieOptions}
                />
              )}
              {chartType === "bar" && (
                <Bar
                  data={getBarData(scoreData.totalScore)}
                  options={pieOptions}
                />
              )}
            </div>
          </div>
          <div className="mx-auto text-center mt-3">{t("tilte_chart")}</div>
        </CardContent>
      </Card>
      {/* Pie Chart + Skill Score */}
      <div className="flex-1 flex flex-col gap-8">
        <Card className=" w-full shadow rounded-lg bg-white/90 border border-gray-100">
          <CardContent>
            <div className="flex items-center gap-3 mb-2">
              <FontAwesomeIcon
                icon={faChartPie}
                className="text-primary-toned-600 text-2xl"
              />
              <Typography
                variant="h5"
                className="font-black text-primary-toned-600 tracking-tight   "
              >
                {t("summary_overall_feedback")}
              </Typography>
            </div>
            <Divider />
            <div className="mt-4 min-h-[120px] whitespace-pre-line bg-gray-50 rounded-lg p-4 text-lg    text-gray-800">
              {scoreData.finalComment}
            </div>
          </CardContent>
        </Card>
        {/* Skill Score */}
        <Card className="shadow rounded-lg bg-white/90 border border-gray-100">
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon
                icon={faStar}
                className="text-primary-toned-600 text-xl"
              />
              <Typography
                variant="subtitle1"
                className="font-bold text-primary-toned-600   "
              >
                {t("summary_skill_scores")}
              </Typography>
            </div>
            <Divider />
            <div className="flex flex-wrap gap-4 mt-4">
              {scoreData.skillsScore &&
                Object.entries(scoreData.skillsScore).map(([skill, grade]) => (
                  <div
                    key={skill}
                    className="bg-primary-toned-50 text-primary-toned-700 px-4 py-2 rounded-lg font-semibold shadow border border-primary-toned-100 text-base    min-w-[120px] flex items-center gap-2"
                  >
                    <span className="font-bold">{skill}:</span>
                    <span>{grade}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Summary;

import { FC } from "react";
import { GetInterviewHistoryResponse } from "../../../../features/interviews/api/interview.api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faCheckCircle,
  faCircleQuestion,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const statusColor: Record<string, string> = {
  Full: "text-green-600",
  Partial: "text-yellow-600",
  None: "text-red-500",
};

const statusBgColor: Record<string, string> = {
  Full: "bg-green-50 border-green-300",
  Partial: "bg-yellow-50 border-yellow-300",
  None: "bg-red-50 border-red-300",
};

const statusIcon: Record<string, any> = {
  Full: faCheckCircle,
  Partial: faCircleQuestion,
  None: faCircleQuestion,
};

const Script: FC<{ scoreData: GetInterviewHistoryResponse }> = ({
  scoreData,
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="w-full ">
        <CardContent>
          <Typography
            variant="h4"
            className="font-extrabold mb-8 text-primary-toned-600 text-center tracking-tight font-arya"
          >
            <FontAwesomeIcon
              icon={faCommentDots}
              className="mr-2 text-primary-toned-600"
            />
            Interview Scripts & Comments
          </Typography>
          <Divider />
          <div className="mt-8 flex flex-col gap-8">
            {scoreData.submissions?.map((res, index) => (
              <Card
                key={index}
                className={`transition-all duration-200 rounded-2xl border-2 shadow-md hover:scale-[1.02] ${statusBgColor[res.status]}`}
              >
                <CardContent>
                  {/* Question header */}
                  <div className="flex items-center mb-3 gap-3">
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary-toned-100 shadow-inner">
                      <span className="text-lg font-bold text-primary-toned-600">
                        {index + 1}
                      </span>
                    </div>
                    <Typography
                      variant="h6"
                      className="font-bold text-gray-900 font-arya"
                    >
                      {res.question}
                    </Typography>
                  </div>
                  <div className="pl-12 flex flex-col gap-1">
                    {/* Answer */}
                    <div className="mb-2 flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="text-primary-toned-600 text-xl mt-0.5"
                      />
                      <span className="font-semibold text-gray-700">
                        Your Answer:
                      </span>
                      <span className="ml-2 text-gray-800">
                        {res.answer && res.answer.trim() ? (
                          res.answer
                        ) : (
                          <span className="italic text-gray-400">
                            No answer provided
                          </span>
                        )}
                      </span>
                    </div>
                    {/* Comment */}
                    <div className="mb-2 flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faCommentDots}
                        className="text-primary-toned-600 text-xl mt-0.5"
                      />
                      <span className="font-semibold text-gray-700">
                        Comment:
                      </span>
                      <span className="ml-2 text-gray-800">{res.comment}</span>
                    </div>
                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={statusIcon[res.status]}
                        className={`${statusColor[res.status]} text-lg`}
                      />
                      <span className="font-semibold text-gray-700">
                        Status:
                      </span>
                      <span
                        className={`font-bold ${statusColor[res.status]} ml-1`}
                      >
                        {res.status}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default Script;

import { useLocation, useNavigate } from "react-router-dom";
import {
  useLazyGetInterviewOutroQuery,
  usePostAnswerMutation,
} from "../../../../../../features/interviews/api/interview.api";
import { useQuestionContext } from "../../contexts/question-context";
import BottomMenu from "./BottomMenu";
import InterviewStatus from "./InterviewStatus";
import Record from "./Record";
import { useState } from "react";
import ModalSubmitting from "./sub/ModalSubmit";

// type AnswerData = {
//   questionIndex: number;
//   answer: string;
//   recordProof: string;
// };
export default function Overlay() {
  const { goToNextQuestion, questionIndex } = useQuestionContext();
  const [postAnswer] = usePostAnswerMutation();

  const [triggerSubmit] = useLazyGetInterviewOutroQuery();
  const [showSubmittingModal, setShowSubmittingModal] = useState(false);
  const navigate = useNavigate();
  const totalQuestion = localStorage.getItem("totalQuestion") || "5";
  const location = useLocation();
  const interviewId = location.state?.interviewId;
  console.log("totalQuestion", totalQuestion);
  console.log("questionIndex", questionIndex);
  const handleAnswerRecorded = async (
    transcript: string
    // base64Audio: string
  ) => {
    console.log("interviewId từ navigate:", interviewId);
    if (!interviewId) {
      alert("Không tìm thấy interviewId!");
      return;
    }

    try {
      await postAnswer({
        interviewId,
        index: questionIndex,
        answer: transcript,
        recordProof: "base64Audio",
      }).unwrap();
      if (questionIndex >= parseInt(totalQuestion)) {
        setShowSubmittingModal(true);
        await triggerSubmit({ interviewId }).unwrap();
        setShowSubmittingModal(false);
        navigate("/candidate/interviews/result", { state: { interviewId } });
      } else {
        goToNextQuestion();
      }
    } catch (e) {
      alert("Có lỗi khi gửi đáp án. Vui lòng thử lại.");
      console.error(e);
    }
  };
  return (
    <div className="grid grid-cols-12 grid-rows-5 w-full h-full">
      <div className="col-start-2 col-end-4 row-start-3 row-end-3 flex items-center justify-center p-4">
        <InterviewStatus
          currentQuestion={questionIndex}
          totalQuestion={parseInt(totalQuestion) || 5}
        />
      </div>
      <div className="col-start-10 col-end-10 row-start-3 row-end-3 flex items-center justify-center">
        <Record onAnswerRecorded={handleAnswerRecorded} />
      </div>
      <div className="col-start-5 col-end-9 row-start-5 row-end-5 group">
        <div className="flex items-end py-4 w-full h-full ">
          <BottomMenu />
        </div>
      </div>{" "}
      <ModalSubmitting isOpen={showSubmittingModal} />
    </div>
  );
}

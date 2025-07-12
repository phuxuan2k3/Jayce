import { memo, useEffect, useRef, useState } from "react";
import { Repeat } from "lucide-react";
import { useQuestionContext } from "../../contexts/question-context";
import { useAudioContext } from "../../contexts/audio.context";
import Record from "./Record";
import { Alert } from "@mui/material";
import {
  useLazyGetInterviewOutroQuery,
  usePostAnswerMutation,
} from "../../../../../../features/interviews/api/interview.api";
import { useLocation, useNavigate } from "react-router-dom";
import ModalSubmitting from "./sub/ModalSubmit";

export default memo(function InterviewStatus({
  currentQuestion,
}: {
  currentQuestion: number;
}) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const totalBarRef = useRef<HTMLDivElement | null>(null);
  const { goToNextQuestion, questionIndex } = useQuestionContext();
  const [postAnswer] = usePostAnswerMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const totalQuestion: number = parseInt(
    localStorage.getItem("totalQuestion") || "5"
  );

  const interviewId = location.state?.interviewId;
  const [triggerSubmit] = useLazyGetInterviewOutroQuery();
  const [showSubmittingModal, setShowSubmittingModal] = useState(false);

  useEffect(() => {
    if (progressBarRef.current && totalBarRef.current) {
      const totalWidth = totalBarRef.current.clientWidth;
      const progressWidth = (currentQuestion / totalQuestion) * totalWidth;
      progressBarRef.current.style.width = `${progressWidth}px`;
    }
  }, [
    currentQuestion,
    totalQuestion,
    progressBarRef.current,
    totalBarRef.current,
  ]);
  const { playAudio } = useAudioContext();

  const handleRepeat = () => {
    playAudio();
  };

  const handleAnswerRecorded = async (
    transcript: string,
    base64Audio: string
  ) => {
    console.log("interviewId từ navigate:", interviewId);
    if (!interviewId) {
      // alert("Không tìm thấy interviewId!");
      return (
        <Alert
          sx={{
            width: "100%",
            mt: 1,
            mb: 3,
          }}
          severity="success"
        >
          Not found interviewId!
        </Alert>
      );
    }

    try {
      await postAnswer({
        interviewId,
        index: questionIndex,
        answer: transcript,
        recordProof: base64Audio,
      }).unwrap();
      if (questionIndex >= totalQuestion) {
        setShowSubmittingModal(true);
        await triggerSubmit({ interviewId }).unwrap();
        setShowSubmittingModal(false);
        navigate("/candidate/interviews/result", { state: { interviewId } });
      } else {
        goToNextQuestion();
      }
    } catch (e) {
      // alert("Có lỗi khi gửi đáp án. Vui lòng thử lại.");
      console.error(e);
      return (
        <Alert
          sx={{
            width: "100%",
            mt: 1,
            mb: 3,
          }}
          severity="success"
        >
          Submit error!
        </Alert>
      );
    }
  };

  return (
    <div className="bg-transparent text-white border-2 border-white rounded-lg shadow-lg flex items-center justify-center flex-col w-full h-full px-8 py-4 hover:bg-white hover:text-primary-toned-700 hover:shadow-primary/80 hover:border-transparent transition-all duration-300 ease-in-out gap-y-4 group">
      <div className="flex items-center w-full">
        <span className="font-semibold ">
          Question {questionIndex} of {totalQuestion}
        </span>
        <button className="ml-auto" onClick={() => handleRepeat()}>
          <Repeat size={20} />
        </button>
      </div>

      <div
        ref={totalBarRef}
        className="w-full h-3 relative bg-transparent border-white hover:border-none group-hover:bg-gray-300 rounded-full overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div
          className="bg-white group-hover:bg-primary rounded-full overflow-hidden h-full z-10 p-1 transition-all duration-300 ease-in-out"
          ref={progressBarRef}
        ></div>
      </div>
      <div className="col-start-10 col-end-10 row-start-3 row-end-3 flex items-center justify-center">
        <Record onAnswerRecorded={handleAnswerRecorded} />
      </div>
      <ModalSubmitting isOpen={showSubmittingModal} />
    </div>
  );
});

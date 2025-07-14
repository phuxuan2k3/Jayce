import { memo, useEffect, useRef, useState } from "react";
import { Repeat } from "lucide-react";
import { useQuestionContext } from "../../contexts/question-context";
import { useAudioContext } from "../../contexts/audio.context";
import Record from "./Record";
import { Alert, Button } from "@mui/material";
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
    <div className="bg-transparent text-white border-2 border-white rounded-lg shadow-lg flex flex-col items-center justify-between w-full h-full px-8 py-4 hover:bg-primary-toned-800  hover:shadow-primary/80 hover:border-transparent transition-all duration-300 ease-in-out gap-y-4 group">
      <div className="flex flex-col w-full gap-6">
        {" "}
        <div className="flex items-center w-full">
          <span className="font-semibold ">
            Question {questionIndex} of {totalQuestion}
          </span>
        </div>
        <div
          ref={totalBarRef}
          className="w-full h-3 relative border border-white bg-transparent  hover:border-none group-hover:bg-gray-300 rounded-full overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div
            className="bg-white  group-hover:bg-primary rounded-full overflow-hidden h-full z-10 p-1 transition-all duration-300 ease-in-out"
            ref={progressBarRef}
          ></div>
        </div>
        <div className=" w-full hover:!text-primary flex items-center justify-center">
          <Record onAnswerRecorded={handleAnswerRecorded} />
        </div>
      </div>

      <Button
        sx={{
          textAlign: "left",
          justifyContent: "flex-start",
          fontFamily: "Space Grotesk, sans-serif",
          textTransform: "none",
          fontSize: "16px",
        }}
        className="bg-gradient-to-br from-primary to-secondary  rounded-lg  w-[116px] flex justify-center text-white"
        onClick={() => handleRepeat()}
      >
        <span className="mr-2">Repeat</span>
        <Repeat size={20} />
      </Button>
      <ModalSubmitting isOpen={showSubmittingModal} />
    </div>
  );
});

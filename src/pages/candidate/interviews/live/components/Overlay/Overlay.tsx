import { useNavigate } from "react-router-dom";
import {
  useLazyGetInterviewOutroQuery,
  usePostAnswerMutation,
} from "../../../../../../features/interviews/api/interview.api";
import { useQuestionContext } from "../../contexts/question-context";
import BottomMenu from "./BottomMenu";
import InterviewStatus from "./InterviewStatus";
import Record from "./Record";

type AnswerData = {
  questionIndex: number;
  answer: string;
  recordProof: string;
};
export default function Overlay() {
  const { goToNextQuestion, questionIndex } = useQuestionContext();
  const [postAnswer, { isLoading: isPosting }] = usePostAnswerMutation();

  const [triggerSubmit] = useLazyGetInterviewOutroQuery();

  const navigate = useNavigate();
  const handleAnswerRecorded = async (transcript: string) => {
    const interviewInfo = JSON.parse(
      localStorage.getItem("interviewInfo") || "{}"
    );
    const interviewId = interviewInfo?.interviewId;

    if (!interviewId) {
      alert("Không tìm thấy interviewId!");
      return;
    }

    try {
      await postAnswer({
        interviewId,
        index: questionIndex,
        answer: transcript,
        recordProof: "",
      }).unwrap();
      if (questionIndex + 1 >= 3) {
        await triggerSubmit({ interviewId }).unwrap();
        navigate("/candidate/interviews/result");
      } else {
        // Nếu chưa phải cuối thì chỉ chuyển câu hỏi
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
        <InterviewStatus currentQuestion={2} totalQuestion={5} />
      </div>

      <div className="col-start-10 col-end-10 row-start-3 row-end-3 flex items-center justify-center">
        <Record onAnswerRecorded={handleAnswerRecorded} />
      </div>

      <div className="col-start-5 col-end-9 row-start-5 row-end-5 group">
        <div className="flex items-end py-4 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <BottomMenu />
        </div>
      </div>
    </div>
  );
}

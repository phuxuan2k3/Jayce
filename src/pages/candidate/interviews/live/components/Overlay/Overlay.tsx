import { useQuestionContext } from "../../contexts/question-context";
import BottomMenu from "./BottomMenu";
import InterviewStatus from "./InterviewStatus";

export default function Overlay() {
  const { questionIndex } = useQuestionContext();
  return (
    <div className="grid grid-cols-12 grid-rows-5 w-full h-full">
      <div className="col-start-2 col-end-4 row-start-2 row-end-4 p-4">
        <InterviewStatus currentQuestion={questionIndex} />
      </div>
      <div className="col-start-5 col-end-9 row-start-5 row-end-5 group">
        <div className="flex items-end py-4 w-full h-full ">
          <BottomMenu />
        </div>
      </div>
    </div>
  );
}

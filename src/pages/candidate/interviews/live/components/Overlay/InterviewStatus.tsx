import { memo, useEffect, useRef } from "react";
import { Repeat } from "lucide-react";
import { useQuestionContext } from "../../contexts/question-context";
import { useAudioContext } from "../../contexts/audio.context";

export default memo(function InterviewStatus({
  currentQuestion,
  totalQuestion,
}: {
  currentQuestion: number;
  totalQuestion: number;
}) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const totalBarRef = useRef<HTMLDivElement | null>(null);
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
  const { questionIndex } = useQuestionContext();
  const { playAudio } = useAudioContext();

  const handleRepeat = () => {
    playAudio();
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
    </div>
  );
});

import { BackgroundContextProvider } from "./contexts/background-context";
import CandidateInterviewLiveMain from "./CandidateInterviewLiveMain";
import { ModelContextProvider } from "./contexts/model-context";
import { AudioContextProvider } from "./contexts/audio.context";
import { QuestionContextProvider } from "./contexts/question-context";

export default function CandidateInterviewLivePage() {
  return (
    <BackgroundContextProvider>
      <ModelContextProvider>
        <QuestionContextProvider>
          <AudioContextProvider>
            <CandidateInterviewLiveMain />
          </AudioContextProvider>
        </QuestionContextProvider>
      </ModelContextProvider>
    </BackgroundContextProvider>
  );
}

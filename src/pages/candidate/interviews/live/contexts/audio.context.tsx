import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from "react";
import { MouthCue } from "../types/render";
import { useGetQuestionQuery } from "../../../../../features/interviews/api/interview.api";
import { useQuestionContext } from "./question-context";
import { useLocation } from "react-router-dom";

interface AudioContextType {
  audio: HTMLAudioElement;
  mouthCues: MouthCue[];
  refetch: () => void;
  playAudio: () => void;
  isPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const AudioContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [needPolling, setNeedPolling] = useState(false);
  const { questionIndex } = useQuestionContext();
  const location = useLocation();
  const interviewId = location.state?.interviewId;
  const [isPlaying, setIsPlaying] = useState(false);
  const { data, error, refetch } = useGetQuestionQuery(
    {
      interviewId,
      questionIndex,
    },
    {
      pollingInterval: needPolling ? 10000 : undefined,
    }
  );

  const audio = useMemo(() => {
    if (!data?.audio) {
      return new Audio();
    }
    const audio = transcribeAudioFromBase64(data.audio);
    audio.preload = "none";
    return audio;
  }, [data?.audio]);
  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio]);

  useEffect(() => {
    const hasAudio = !!data?.audio?.length;
    const hasMouthCues = !!data?.lipsync?.mouthCues?.length;

    if (!hasAudio || !hasMouthCues) {
      setNeedPolling(true);
    } else {
      setNeedPolling(false);
    }
  }, [data?.lipsync?.mouthCues, data?.audio]);

  const playAudio = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(console.error);
    }
  };
  if (error) {
    return (
      <div className="text-red-500 p-4">
        <strong>Lỗi khi tải câu hỏi:</strong>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <AudioContext.Provider
      value={{
        audio,
        mouthCues: data?.lipsync?.mouthCues || [],
        refetch,
        playAudio,
        isPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useNewContext must be used within its provider");
  }
  return context;
};

function transcribeAudioFromBase64(base64: string): HTMLAudioElement {
  try {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    return audio;
  } catch (error) {
    console.error("Error transcribing audio from base64:", error);
    return new Audio();
  }
}

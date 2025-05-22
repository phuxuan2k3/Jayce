import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { MouthCue } from "../types/render";
import { useGetQuestionQuery } from "../../../../../features/interviews/api/interview.api";
import { useQuestionContext } from "./question-context";

interface AudioContextType {
  audio: HTMLAudioElement;
  mouthCues: MouthCue[];
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const AudioContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const { questionIndex } = useQuestionContext();
  const { data } = useGetQuestionQuery({
    interviewId: "1",
    questionIndex,
  });

  const audio = useMemo(() => {
    if (!data?.audio) {
      return new Audio();
    }
    const audio = transcribeAudioFromBase64(data.audio);
    audio.preload = "none";
    return audio;
  }, [data?.audio]);

  return (
    <AudioContext.Provider
      value={{
        audio,
        mouthCues: data?.lipsync.mouthCues || [],
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

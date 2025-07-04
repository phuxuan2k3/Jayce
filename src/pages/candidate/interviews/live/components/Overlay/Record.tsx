import { Mic, StopCircle } from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import SoundWaveVisualizer from "./sub/SoundWaveVisualizer";
import { useEffect, useRef, useState } from "react";

export default function Record({
  onAnswerRecorded,
}: {
  // Bổ sung base64Audio vào callback, giữ transcript như cũ
  onAnswerRecorded: (transcript: string, base64Audio: string) => void;
}) {
  const {
    listening,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
    isMicrophoneAvailable,
    transcript,
  } = useSpeechRecognition();

  // MediaRecorder setup
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Start media recorder
  const startRecording = async () => {
    if (!navigator.mediaDevices) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new window.MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    audioChunks.current = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.current.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudioBase64(reader.result as string);
      };
      reader.readAsDataURL(audioBlob);
    };
    mediaRecorder.start();
  };

  // Stop media recorder
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  useEffect(() => {
    // Khi transcript hoàn thành và đã có base64 audio, callback trả về cả 2
    if (
      listening === false &&
      finalTranscript !== "" &&
      transcript === finalTranscript &&
      audioBase64 !== null
    ) {
      onAnswerRecorded(finalTranscript, audioBase64);
      resetTranscript();
      setAudioBase64(null); // reset
    }
    // eslint-disable-next-line
  }, [listening, finalTranscript, transcript, audioBase64]);

  const startListening = () => {
    if (
      listening === false &&
      browserSupportsContinuousListening &&
      isMicrophoneAvailable
    ) {
      // Bắt đầu ghi âm song song với speech recognition
      startRecording();
      SpeechRecognition.startListening({
        continuous: true,
        interimResults: false,
      }).catch((error) => {
        console.error("Error starting speech recognition:", error);
      });
    }
  };

  const stopListening = async () => {
    if (listening === true) {
      stopRecording(); // Dừng ghi âm
      SpeechRecognition.stopListening().catch((error) => {
        console.error("Error stopping speech recognition:", error);
      });
    }
  };

  if (
    !browserSupportsSpeechRecognition ||
    !browserSupportsContinuousListening ||
    !isMicrophoneAvailable
  ) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div className="font-semibold text-white">
      {listening === false ? (
        <button
          className={`flex items-center px-4 py-2 gap-x-2 rounded-lg bg-primary shadow-lg hover:shadow-lg hover:shadow-primary/80 transition-all duration-200 ease-in-out `}
          onClick={startListening}
        >
          <span>Answer</span>
          <Mic size={20} />
        </button>
      ) : (
        <div
          className={`flex flex-col items-center px-4 py-2 gap-x-2 rounded-lg bg-transparent border-2 border-primary shadow-lg hover:shadow-lg hover:shadow-primary/80 transition-all duration-200 ease-in-out cursor-pointer`}
          onClick={stopListening}
        >
          <div className="flex items-center px-4 py-2 gap-x-2 rounded-lg">
            <span>Stop</span>
            <StopCircle size={20} />
          </div>
          <div className="flex-1 w-full relative p-2 bg-primary/10 rounded-lg overflow-visible">
            <SoundWaveVisualizer />
          </div>
        </div>
      )}
    </div>
  );
}

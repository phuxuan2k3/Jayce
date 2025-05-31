import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from "react";
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
const interviewInfo = JSON.parse(localStorage.getItem("interviewInfo") || "{}");
const interviewId = interviewInfo.interviewId || "1";
export const AudioContextProvider: React.FC<ProviderProps> = ({ children }) => {
	const [needPolling, setNeedPolling] = useState(false);
	const { questionIndex } = useQuestionContext();

	console.log("interviewId", interviewId);

	const { data, error } = useGetQuestionQuery({
		interviewId,
		questionIndex,
	}, {
		pollingInterval: needPolling ? 10000 : undefined,
	});

	const audio = useMemo(() => {
		if (!data?.audio) {
			return new Audio();
		}
		const audio = transcribeAudioFromBase64(data.audio);
		audio.preload = "none";
		return audio;
	}, [data?.audio]);

	useEffect(() => {
		if (
			data?.lipsync.mouthCues &&
			data.lipsync.mouthCues.length > 0 &&
			data?.audio != null &&
			data.audio.length > 0
		) {
			setNeedPolling(true);
		} else {
			setNeedPolling(false);
		}
	}, [
		data?.lipsync?.mouthCues,
		data?.audio
	]);

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

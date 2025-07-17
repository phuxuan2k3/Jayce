import { useCallback } from "react";
import { useTranscribeMutation } from "../../../../../../../features/interviews/api/speech-to-text.api";

export default function useTranscribe({
	language
}: {
	language: string;
}): {
	handleTranscribe: (audioBlob: Blob) => Promise<{ transcript: string }>;
} {
	const [transcribe] = useTranscribeMutation();

	const handleTranscribe = useCallback(async (audioBlob: Blob) => {
		const res = await transcribe({
			audio: audioBlob,
			language: language
		}).unwrap();
		return res;
	}, [transcribe, language]);

	return {
		handleTranscribe,
	};
}

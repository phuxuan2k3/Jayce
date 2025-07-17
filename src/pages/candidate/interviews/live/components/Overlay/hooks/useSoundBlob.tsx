import { useRef, useState } from "react";

interface UseSoundBlobReturn {
	startListening: () => Promise<void>;
	stopListening: () => Promise<void>;
	isAudioAvailable: boolean;
	isRecording: boolean;
}

export default function useSoundBlob({
	onRecorded,
}: {
	onRecorded: (blob: Blob) => void;
}): UseSoundBlobReturn {
	const [isAudioAvailable, setIsAudioAvailable] = useState<boolean>(true);
	const [isRecording, setIsRecording] = useState<boolean>(false);

	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunks = useRef<Blob[]>([]);

	const startListening = async () => {
		if (!navigator.mediaDevices) return;
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;

			audioChunks.current = [];
			mediaRecorder.ondataavailable = (e) => {
				if (e.data.size > 0) {
					audioChunks.current.push(e.data);
				}
			};
			mediaRecorder.onstop = () => {
				const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
				onRecorded(audioBlob);

				// Reset the states
				stream.getTracks().forEach((track) => track.stop());
				setIsRecording(false);
			};

			// Start recording
			setIsRecording(true);
			mediaRecorder.start();
		} catch (error) {
			if (
				error instanceof DOMException &&
				(error.name === "NotAllowedError" || error.name === "NotFoundError")
			) {
				setIsAudioAvailable(false);
			}
		}
	};

	const stopListening = async () => {
		if (mediaRecorderRef.current && isRecording) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		}
	};

	return {
		startListening,
		stopListening,
		isRecording,
		isAudioAvailable,
	}
}

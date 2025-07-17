import { Mic, StopCircle } from "lucide-react";
import SoundWaveVisualizer from "./sub/SoundWaveVisualizer";
import { useState } from "react";
import { useAudioContext } from "../../contexts/audio.context";
import useSoundBlob from "./hooks/useSoundBlob";
import useTranscribe from "./hooks/useTranscribe";

export default function Record2({
	onAnswerRecorded,
}: {
	onAnswerRecorded: (transcript: string, base64Audio: string) => void;
}) {
	const language = localStorage.getItem("language") || "English";

	const { isPlaying } = useAudioContext();
	const [error, setError] = useState<string | null>(null);

	const {
		startListening,
		stopListening,
		isRecording,
		isAudioAvailable,
	} = useSoundBlob({
		onRecorded: async (blob: Blob) => {
			try {
				const { transcript } = await handleTranscribe(blob)
				const reader = new FileReader();
				reader.onloadend = () => {
					onAnswerRecorded(transcript, reader.result as string);
				};
				reader.readAsDataURL(blob);
			}
			catch (err) {
				setError(`Failed to transcribe audio.`);
				console.error('Transcription error:', err);
			}
		}
	});

	const { handleTranscribe } = useTranscribe({ language });

	if (isAudioAvailable === false) {
		return (
			<div className="flex items-center justify-center h-full bg-gray-100 p-4 rounded-lg shadow-md">
				<p className="text-red-500">Microphone access is not available. Please check your browser settings.</p>
			</div>
		)
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-full bg-red-100 border border-red-300 p-4 rounded-lg shadow-md">
				<p className="text-red-500">{error}</p>
			</div>
		);
	}

	return (
		<div className="font-semibold text-white ">
			{isRecording === false ? (
				<button
					className={`flex items-center px-4 py-2 gap-x-2 rounded-lg ${isPlaying
						? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 transform-none "
						: " bg-primary shadow-lg  transition-all duration-200 ease-in-out cursor-pointer"
						}`}
					onClick={startListening}
					disabled={isPlaying}
				>
					<span>Answer</span>
					<Mic size={20} />
				</button>
			) : (
				<div
					className={`flex flex-col items-center px-4 py-2 gap-x-2 rounded-lg bg-transparent border-2 border-primary shadow-lg hover:shadow-lg hover:shadow-primary/80 transition-all duration-200 ease-in-out cursor-pointer`}
					onClick={stopListening}
				>
					<div className="flex items-center  px-4 py-2 gap-x-2 rounded-lg">
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

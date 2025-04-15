import { Mic, StopCircle } from "lucide-react"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import SoundWaveVisualizer2 from "./SoundWaveVisualizer2";

export default function Record({
	onAnswerRecorded,
}: {
	onAnswerRecorded: (transcript: string) => void,
}) {
	const {
		listening,
		finalTranscript,
		resetTranscript,
		browserSupportsSpeechRecognition,
		browserSupportsContinuousListening,
		isMicrophoneAvailable,
	} = useSpeechRecognition();

	const startListening = () => {
		if (listening == false && browserSupportsContinuousListening && isMicrophoneAvailable) {
			SpeechRecognition.startListening({
				continuous: true,
				interimResults: false,
			}).catch((error) => {
				console.error("Error starting speech recognition:", error);
			});
		}
	}

	const stopListening = () => {
		if (listening == true) {
			SpeechRecognition.stopListening().then(() => {
				if (finalTranscript) {
					onAnswerRecorded(finalTranscript);
					resetTranscript();
				}
			}).catch((error) => {
				console.error("Error stopping speech recognition:", error);
			});
		}
	}

	if (
		!browserSupportsSpeechRecognition ||
		!browserSupportsContinuousListening ||
		!isMicrophoneAvailable
	) {
		return <span>Browser does not support speech recognition.</span>;
	}

	return (
		<div className='font-semibold text-white'>
			{listening == false ? (
				<button className={`flex items-center px-4 py-2 gap-x-2 rounded-lg bg-primary shadow-lg hover:shadow-lg hover:shadow-primary/80 transition-all duration-200 ease-in-out `}
					onClick={startListening}
				>
					<span>Answer</span>
					<Mic size={20} />
				</button>
			) : (
				<div className={`flex flex-col items-center px-4 py-2 gap-x-2 rounded-lg bg-transparent border-2 border-primary shadow-lg hover:shadow-lg hover:shadow-primary/80 transition-all duration-200 ease-in-out cursor-pointer`}
					onClick={stopListening}
				>
					<div className="flex items-center px-4 py-2 gap-x-2 rounded-lg">
						<span>Stop</span>
						<StopCircle size={20} />
					</div>

					<div className="flex-1 w-full relative p-2 bg-primary/10 rounded-lg overflow-visible">
						<SoundWaveVisualizer2 />
					</div>
				</div>
			)}
		</div>
	)
}
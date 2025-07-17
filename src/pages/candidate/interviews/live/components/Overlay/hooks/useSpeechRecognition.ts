import { useState, useRef } from 'react';

interface UseSpeechRecognitionReturn {
	isRecording: boolean;
	transcript: string;
	startRecording: () => void;
	stopRecording: () => void;
	error: string | null;
}

const languageMapping: Record<string, string> = {
	English: 'en',
	Vietnamese: 'vi',
};

export const useSpeechRecognition = ({
	language = 'English',
}): UseSpeechRecognitionReturn => {
	const [isRecording, setIsRecording] = useState(false);
	const [transcript, setTranscript] = useState('');
	const [error, setError] = useState<string | null>(null);

	const mediaRecorder = useRef<MediaRecorder | null>(null);
	const audioChunks = useRef<Blob[]>([]);

	const startRecording = async () => {
		try {
			setError(null);
			setTranscript('');

			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder.current = new MediaRecorder(stream);
			audioChunks.current = [];

			mediaRecorder.current.ondataavailable = (event) => {
				audioChunks.current.push(event.data);
			};

			mediaRecorder.current.onstop = async () => {
				const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
				await transcribeAudio(audioBlob);

				// Stop all tracks to release the microphone
				stream.getTracks().forEach(track => track.stop());
			};

			mediaRecorder.current.start();
			setIsRecording(true);
		} catch (err) {
			setError('Failed to start recording. Please check microphone permissions.');
			console.error('Recording error:', err);
		}
	};

	const stopRecording = () => {
		if (mediaRecorder.current && isRecording) {
			mediaRecorder.current.stop();
			setIsRecording(false);
		}
	};

	const transcribeAudio = async (audioBlob: Blob) => {
		try {
			const apiKey = process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY;

			if (!apiKey) {
				throw new Error('AssemblyAI API key not found');
			}

			// First, upload the audio file
			const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
				method: 'POST',
				headers: {
					'authorization': apiKey,
					'content-type': 'application/octet-stream',
				},
				body: audioBlob,
			});

			if (!uploadResponse.ok) {
				throw new Error('Failed to upload audio');
			}

			const { upload_url } = await uploadResponse.json();

			// Then, request transcription
			const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
				method: 'POST',
				headers: {
					'authorization': apiKey,
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					audio_url: upload_url,
					language_code: languageMapping[language] || 'en-US',
				}),
			});

			if (!transcriptResponse.ok) {
				throw new Error('Failed to request transcription');
			}

			const { id } = await transcriptResponse.json();

			// Poll for transcription completion
			const pollTranscription = async (): Promise<void> => {
				const pollingResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${id}`, {
					headers: {
						'authorization': apiKey,
					},
				});

				const transcriptionResult = await pollingResponse.json();

				if (transcriptionResult.status === 'completed') {
					setTranscript(transcriptionResult.text || '');
				} else if (transcriptionResult.status === 'error') {
					throw new Error('Transcription failed');
				} else {
					// Still processing, poll again after 3 seconds
					setTimeout(pollTranscription, 3000);
				}
			};

			await pollTranscription();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Transcription failed');
			console.error('Transcription error:', err);
		}
	};

	return {
		isRecording,
		transcript,
		startRecording,
		stopRecording,
		error,
	};
};

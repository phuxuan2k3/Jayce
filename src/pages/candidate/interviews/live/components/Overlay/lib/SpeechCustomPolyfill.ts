// Custom Speech Recognition Polyfill
// Implementation based on W3C Web Speech API specification

// Event Interfaces
interface SpeechRecognitionErrorEventInit extends EventInit {
	error: string;
	message?: string;
}

interface SpeechRecognitionEventInit extends EventInit {
	resultIndex: number;
	results: SpeechRecognitionResultList;
}

// Custom Events
class SpeechRecognitionErrorEvent extends Event {
	error: string;
	message: string;

	constructor(type: string, eventInitDict: SpeechRecognitionErrorEventInit) {
		super(type, eventInitDict);
		this.error = eventInitDict.error;
		this.message = eventInitDict.message || '';
	}
}

class SpeechRecognitionEvent extends Event {
	resultIndex: number;
	results: SpeechRecognitionResultList;

	constructor(type: string, eventInitDict: SpeechRecognitionEventInit) {
		super(type, eventInitDict);
		this.resultIndex = eventInitDict.resultIndex;
		this.results = eventInitDict.results;
	}
}

// Result Interfaces
class SpeechRecognitionAlternative {
	private _transcript: string;
	private _confidence: number;

	constructor(transcript: string, confidence: number) {
		this._transcript = transcript;
		this._confidence = confidence;
	}

	get transcript(): string {
		return this._transcript;
	}

	get confidence(): number {
		return this._confidence;
	}
}

class SpeechRecognitionResult {
	private _alternatives: SpeechRecognitionAlternative[];
	private _isFinal: boolean;

	constructor(alternatives: SpeechRecognitionAlternative[], isFinal: boolean) {
		this._alternatives = alternatives;
		this._isFinal = isFinal;
	}

	get length(): number {
		return this._alternatives.length;
	}

	item(index: number): SpeechRecognitionAlternative | null {
		return index < this._alternatives.length ? this._alternatives[index] : null;
	}

	[index: number]: SpeechRecognitionAlternative;

	get isFinal(): boolean {
		return this._isFinal;
	}
}

class SpeechRecognitionResultList {
	private _results: SpeechRecognitionResult[];

	constructor(results: SpeechRecognitionResult[]) {
		this._results = results;
	}

	get length(): number {
		return this._results.length;
	}

	item(index: number): SpeechRecognitionResult | null {
		return index < this._results.length ? this._results[index] : null;
	}

	[index: number]: SpeechRecognitionResult;
}

// Main Speech Recognition Polyfill Class
export class SpeechRecognitionPolyfill extends EventTarget {
	// Required properties
	private _continuous: boolean = false;
	private _lang: string = 'en-US';
	private _interimResults: boolean = false;

	// Event handlers (required for react-speech-recognition)
	private _onresult: ((event: SpeechRecognitionEvent) => void) | null = null;
	private _onend: ((event: Event) => void) | null = null;
	private _onerror: ((event: SpeechRecognitionErrorEvent) => void) | null = null;
	private _onstart: ((event: Event) => void) | null = null;

	// Additional event handlers for better compatibility
	private _onaudiostart: ((event: Event) => void) | null = null;
	private _onaudioend: ((event: Event) => void) | null = null;
	private _onsoundstart: ((event: Event) => void) | null = null;
	private _onsoundend: ((event: Event) => void) | null = null;
	private _onspeechstart: ((event: Event) => void) | null = null;
	private _onspeechend: ((event: Event) => void) | null = null;
	private _onnomatch: ((event: Event) => void) | null = null;

	// Internal state
	private _isListening: boolean = false;
	private _mediaRecorder: MediaRecorder | null = null;
	private _audioStream: MediaStream | null = null;
	private _recognitionTimeout: number | null = null;
	private _silenceTimeout: number | null = null;
	private _audioChunks: Blob[] = [];

	constructor() {
		super();
	}

	// Required properties with getters and setters
	get continuous(): boolean {
		return this._continuous;
	}

	set continuous(value: boolean) {
		this._continuous = value;
	}

	get lang(): string {
		return this._lang;
	}

	set lang(value: string) {
		this._lang = value;
	}

	get interimResults(): boolean {
		return this._interimResults;
	}

	set interimResults(value: boolean) {
		this._interimResults = value;
	}

	// Event handler properties
	get onresult(): ((event: SpeechRecognitionEvent) => void) | null {
		return this._onresult;
	}

	set onresult(handler: ((event: SpeechRecognitionEvent) => void) | null) {
		this._onresult = handler;
	}

	get onend(): ((event: Event) => void) | null {
		return this._onend;
	}

	set onend(handler: ((event: Event) => void) | null) {
		this._onend = handler;
	}

	get onerror(): ((event: SpeechRecognitionErrorEvent) => void) | null {
		return this._onerror;
	}

	set onerror(handler: ((event: SpeechRecognitionErrorEvent) => void) | null) {
		this._onerror = handler;
	}

	get onstart(): ((event: Event) => void) | null {
		return this._onstart;
	}

	set onstart(handler: ((event: Event) => void) | null) {
		this._onstart = handler;
	}

	// Additional event handler properties for better compatibility
	get onaudiostart(): ((event: Event) => void) | null {
		return this._onaudiostart;
	}

	set onaudiostart(handler: ((event: Event) => void) | null) {
		this._onaudiostart = handler;
	}

	get onaudioend(): ((event: Event) => void) | null {
		return this._onaudioend;
	}

	set onaudioend(handler: ((event: Event) => void) | null) {
		this._onaudioend = handler;
	}

	get onsoundstart(): ((event: Event) => void) | null {
		return this._onsoundstart;
	}

	set onsoundstart(handler: ((event: Event) => void) | null) {
		this._onsoundstart = handler;
	}

	get onsoundend(): ((event: Event) => void) | null {
		return this._onsoundend;
	}

	set onsoundend(handler: ((event: Event) => void) | null) {
		this._onsoundend = handler;
	}

	get onspeechstart(): ((event: Event) => void) | null {
		return this._onspeechstart;
	}

	set onspeechstart(handler: ((event: Event) => void) | null) {
		this._onspeechstart = handler;
	}

	get onspeechend(): ((event: Event) => void) | null {
		return this._onspeechend;
	}

	set onspeechend(handler: ((event: Event) => void) | null) {
		this._onspeechend = handler;
	}

	get onnomatch(): ((event: Event) => void) | null {
		return this._onnomatch;
	}

	set onnomatch(handler: ((event: Event) => void) | null) {
		this._onnomatch = handler;
	}

	// Required methods
	async start(): Promise<void> {
		if (this._isListening) {
			this._dispatchError('aborted', 'Recognition is already active');
			return;
		}

		try {
			// Request microphone permission
			this._audioStream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true
				}
			});

			// Check if MediaRecorder is supported
			if (!MediaRecorder.isTypeSupported('audio/webm')) {
				this._dispatchError('audio-capture', 'Audio recording not supported');
				return;
			}

			this._mediaRecorder = new MediaRecorder(this._audioStream, {
				mimeType: 'audio/webm'
			});

			this._audioChunks = [];
			this._isListening = true;

			this._mediaRecorder.ondataavailable = (event: BlobEvent) => {
				if (event.data.size > 0) {
					this._audioChunks.push(event.data);
				}
			};

			this._mediaRecorder.onstop = () => {
				this._processAudioData();
			};

			this._mediaRecorder.start(100); // Collect data every 100ms

			// Dispatch start event
			const startEvent = new Event('start');
			this.dispatchEvent(startEvent);
			if (this._onstart) {
				this._onstart(startEvent);
			}

			// Set up automatic stopping if not continuous
			if (!this._continuous) {
				this._recognitionTimeout = window.setTimeout(() => {
					this.stop();
				}, 5000); // Stop after 5 seconds for non-continuous recognition
			}

			// Set up silence detection
			this._setupSilenceDetection();

		} catch (error) {
			this._dispatchError('not-allowed', 'Microphone access denied');
		}
	}

	stop(): void {
		if (!this._isListening) {
			return;
		}

		this._cleanup();

		if (this._mediaRecorder && this._mediaRecorder.state !== 'inactive') {
			this._mediaRecorder.stop();
		}
	}

	abort(): void {
		if (!this._isListening) {
			return;
		}

		this._cleanup();

		if (this._mediaRecorder && this._mediaRecorder.state !== 'inactive') {
			this._mediaRecorder.stop();
		}

		// Dispatch end event immediately for abort
		this._dispatchEnd();
	}

	// Private helper methods
	private _cleanup(): void {
		this._isListening = false;

		if (this._recognitionTimeout) {
			clearTimeout(this._recognitionTimeout);
			this._recognitionTimeout = null;
		}

		if (this._silenceTimeout) {
			clearTimeout(this._silenceTimeout);
			this._silenceTimeout = null;
		}

		if (this._audioStream) {
			this._audioStream.getTracks().forEach(track => track.stop());
			this._audioStream = null;
		}
	}

	private _setupSilenceDetection(): void {
		// Simple silence detection - in a real implementation this would analyze audio
		this._silenceTimeout = window.setTimeout(() => {
			if (this._isListening && !this._continuous) {
				this.stop();
			}
		}, 3000); // Stop after 3 seconds of assumed silence
	}

	private _processAudioData(): void {
		// This is a mock implementation - in a real polyfill, you would:
		// 1. Convert audio blob to appropriate format
		// 2. Send to speech recognition service
		// 3. Parse response and create proper result objects

		// In a real implementation, you would process the audio blob:
		// new Blob(this._audioChunks, { type: 'audio/webm' });

		// Mock recognition results
		setTimeout(() => {
			this._simulateRecognitionResult();
		}, 100);
	}

	private _simulateRecognitionResult(): void {
		// Create mock recognition results
		const alternatives = [
			new SpeechRecognitionAlternative('Hello world', 0.95),
			new SpeechRecognitionAlternative('Hello word', 0.85)
		];

		const result = new SpeechRecognitionResult(alternatives, true);
		const resultList = new SpeechRecognitionResultList([result]);

		// Create and dispatch result event
		const resultEvent = new SpeechRecognitionEvent('result', {
			resultIndex: 0,
			results: resultList
		});

		this.dispatchEvent(resultEvent);
		if (this._onresult) {
			this._onresult(resultEvent);
		}

		// Dispatch end event
		this._dispatchEnd();
	}

	private _dispatchError(error: string, message: string): void {
		const errorEvent = new SpeechRecognitionErrorEvent('error', {
			error,
			message
		});

		this.dispatchEvent(errorEvent);
		if (this._onerror) {
			this._onerror(errorEvent);
		}
	}

	private _dispatchEnd(): void {
		const endEvent = new Event('end');
		this.dispatchEvent(endEvent);
		if (this._onend) {
			this._onend(endEvent);
		}
	}
}

// Add polyfill to global scope if SpeechRecognition is not available
declare global {
	interface Window {
		SpeechRecognition?: any;
		webkitSpeechRecognition?: any;
	}
}

// Auto-polyfill if needed
if (typeof window !== 'undefined') {
	if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
		window.SpeechRecognition = SpeechRecognitionPolyfill;
		window.webkitSpeechRecognition = SpeechRecognitionPolyfill;
	}
}

export default SpeechRecognitionPolyfill;

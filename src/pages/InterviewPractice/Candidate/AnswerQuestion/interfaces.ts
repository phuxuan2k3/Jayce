export interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}
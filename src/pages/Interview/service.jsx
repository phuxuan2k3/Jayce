import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:9000/api',
    timeout: 50000,
    headers: { 'Content-Type': 'application/json' },
});

export const services = {
    ConvertTextToSpeech: (text, language, gender) => {
        return instance.post(`/tts`, { content: text, language, gender }, { responseType: 'blob' })
            .then((res) => {
                const blob = res.data;
                const audioUrl = URL.createObjectURL(blob);
                return audioUrl;
            })
            .catch((err) => {
                console.error("TTS Error:", err);
                return null;
            });
    }
    ,
    GetLibSync: (text, language, gender) => instance.post(`/lip-sync`, { content: text, language, gender }),
    CreateInterview: (interviewInfo) => instance.post(`/interview`, interviewInfo),
    GetInitialQuestions: (interviewID) => instance.get(`/interviews/${interviewID}/questions/initial`),
    GetNextQuestions: (interviewID) => instance.get(`/interviews/${interviewID}/questions/next`),
    SubmitAnswer: (interviewID, questionID, answer) => instance.post(`/interviews/${interviewID}/answers`, {questionID, answer}),
}
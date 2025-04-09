import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3141/interviews",
  timeout: 50000,
  headers: { "Content-Type": "application/json" },
});

export const services = {
  //   ConvertTextToSpeech: (text, language, gender) => {
  //     return instance
  //       .post(
  //         `/tts`,
  //         { content: text, language, gender },
  //         { responseType: "blob" }
  //       )
  //       .then((res) => {
  //         const blob = res.data;
  //         const audioUrl = URL.createObjectURL(blob);
  //         return audioUrl;
  //       })
  //       .catch((err) => {
  //         console.error("TTS Error:", err);
  //         return null;
  //       });
  //   },
  //   GetLibSync: (text, language, gender) =>
  //     instance.post(`/lip-sync`, { content: text, language, gender }),
  CreateInterview: (interviewInfo) =>
    instance.post(`/start`, interviewInfo),
  //   GetInitialQuestions: (interviewID) =>
  //     instance.get(`/interviews/${interviewID}/questions/initial`),
  GetNextQuestion: (interviewID, questionIndex) =>
    instance.get(`/${interviewID}/${questionIndex}`),
  //   /**
  //    * @deprecated This function is deprecated. Use GetNextQuestion instead.
  //    */
  //   GetNextQuestions: (interviewID) =>
  //     instance.get(`/interviews/${interviewID}/questions/next`),
  SubmitAnswer: (interviewID, questionIndex, answer, recordProof = null) =>
    instance.post(`/${interviewID}/answer`, {
      index: questionIndex,
      answer,
      recordProof,
    }),
};

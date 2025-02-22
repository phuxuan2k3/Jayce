import { useState } from "react";
import { FaChevronRight, FaKeyboard, FaMicrophone, FaTrash, FaVolumeUp, FaStopCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { grpcSubmitAnswer } from "../../../../features/grpcScenario/grpcScenario";
// import { SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from "./interfaces";
type Question = {
    id: number;
    content: string;
    hint: string;
    question: string;
};
const AnswerQuestion = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const scenario = location.state?.scenario;
    const field = location.state?.field;
    const questions: Question[] = location.state?.questions || [];
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const attempt = "1";
    const handleSubmit = () => {
        setShowConfirmDialog(true);
    };

    const confirmSubmit = async () => {
        setShowConfirmDialog(false);
        // Chuyển đổi answers thành mảng các đối tượng { question_id, answer }
        const answerArray = Object.keys(answers).map((key) => ({
            question_id: Number(key),
            answer: answers[Number(key)]
        }));
        try {
            await grpcSubmitAnswer(scenario.id, answerArray);
            alert("Your answers have been submitted!");
            navigate("/ipractice/review", { state: { scenario, field, answers, questions } });
        } catch (err) {
            console.error("Error submitting answers:", err);
            alert("Error submitting your answers. Please try again.");
        }
    };

    const handleQuestionClick = (question: Question) => {
        setSelectedQuestion(question);
        setShowHint(false);


    };

    const [answers, setAnswers] = useState<string[]>(questions.map(() => ""));
    const [isSpeechSupported, setIsSpeechSupported] = useState<boolean>(true);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        setIsSpeechSupported(false);
    }

    const startListening = () => {
        setIsListening(true);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    };


    // VinhHung
    // const stopListening = () => {
    //     // setIsProcessing(true);
    //     // setTimeout(() => {
    //     //     setIsListening(false);
    //     //     SpeechRecognition.stopListening();
    //     //     setAnswer((prevAnswer) => prevAnswer + " " + transcript);
    //     //     setIsProcessing(false);
    //     // }, 4000);
    //     setIsListening(false);
    //     SpeechRecognition.stopListening();
    //     setAnswers((prevAnswer) => prevAnswer + " " + transcript);
    //     setIsProcessing(false);
    // };

    const stopListening = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
        if (selectedQuestion) {
          setAnswers((prev) => ({
            ...prev,
            [selectedQuestion.id]: (prev[selectedQuestion.id] || "") + " " + transcript,
          }));
        }
        setIsProcessing(false);
      };
    
    
    // const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    // if (!SpeechRecognition) {
    //     setIsSpeechSupported(false);
    // }

    // const recognition = new SpeechRecognition();
    // recognition.continuous = false;
    // recognition.lang = "en-US";
    // recognition.interimResults = true;
    // recognition.maxAlternatives = 1;

    // const startListening = () => {
    //     setIsListening(true);
    //     recognition.start();
    // };

    // const stopListening = () => {
    //     setIsListening(false);
    //     recognition.stop();
    // };

    // recognition.onresult = (event: SpeechRecognitionEvent) => {
    //     const transcript = event.results[0][0].transcript;
    //     setAnswer((prevAnswer) => prevAnswer + " " + transcript);
    // };

    // recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    //     console.error("Speech recognition error:", event.error, event.message);
    //     setIsListening(false);
    // };

    // recognition.onend = () => {
    //     setIsListening(false);
    // };

    // const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setAnswer(event.target.value);
    // };
    const handleAnswerChange = (questionId: number, value: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
      };

    return (
        <>

            <div className="flex gap-4 mt-10 font-arya">
                <div className="w-[65%]  mx-12">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-10">
                            <span className="text-3xl font-bold">{scenario.name}</span>
                        </div>
                        <div className="rounded-lg bg-[var(--primary-color)] py-1 px-4 font-bold text-white flex gap-2 items-center" onClick={handleSubmit}>Submit</div>
                    </div>
                    <div className="mt-4 text-xl">
                        {field}
                    </div>
                    <hr className=" border-gray-400 mb-4 mt-2" />
                    <div className="max-h-96 overflow-y-auto" style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "var(--primary-color)",
                    }}>
                        <span className="text-2xl font-bold text-[var(--primary-color)] flex gap-2 items-center">
                            Question {selectedQuestion ? questions.findIndex(q => q === selectedQuestion) + 1 : ""} <FaVolumeUp />
                        </span>

                        <p>{selectedQuestion ? selectedQuestion.content : "Select a question to view its content."}</p>

                    </div>
                    <hr className=" border-gray-400 my-4" />
                    <span className="cursor-pointer text-[var(--primary-color)]" onClick={() => setShowHint(!showHint)}>Hint</span>
                    {showHint && <p className="mt-2">{selectedQuestion ? selectedQuestion.hint : "There is no hint."}</p>}
                    <hr className=" border-gray-400 my-4" />
                    {isSpeechSupported ? (
                        // <div
                        //     className={`w-52 rounded-lg mb-4 py-2 px-4 font-bold text-white text-center flex gap-2 justify-center items-center cursor-pointer transition-all duration-300 ${isProcessing
                        //             ? "bg-gray-400 cursor-not-allowed"
                        //             : isListening
                        //                 ? "bg-red-600"
                        //                 : "bg-[var(--primary-color)]"
                        //         }`}
                        //     onClick={isProcessing ? undefined : isListening ? stopListening : startListening}
                        // >
                        //     {isProcessing
                        //         ? "Processing..."
                        //         : isListening
                        //             ? "Recording..."
                        //             : "Record your answer"}
                        //     {isProcessing ? null : isListening ? <FaStopCircle /> : <FaMicrophone />}
                        // </div>
                        <div className={`w-52 rounded-lg mb-4 py-2 px-4 font-bold text-white text-center flex gap-2 justify-center items-center cursor-pointer transition-all duration-300 ${isListening ? "bg-red-600" : "bg-[var(--primary-color)]"}`} onClick={isListening ? stopListening : startListening}>{isListening ? "Recording..." : "Record your answer"}{isListening ? <FaStopCircle /> : <FaMicrophone />}</div>
                    ) : (
                        <div className="w-52 rounded-lg mb-4 py-2 px-4 font-bold text-white text-center flex gap-2 justify-center items-center cursor-pointer transition-all duration-300 bg-red-600">Recording not supported</div>
                    )}
                    <span className="text-xl font-bold">Transcribe</span>

                    <div>
                    <textarea
              className="w-full h-40 p-2 border-2 border-gray-400 rounded-lg mt-4"
              placeholder="Your answer for the selected question..."
              value={selectedQuestion ? (answers[selectedQuestion.id] || "") : ""}
              onChange={(e) =>
                selectedQuestion && handleAnswerChange(selectedQuestion.id, e.target.value)
              }
              disabled={isListening}
            ></textarea>
                    </div>

                    <div className="flex justify-between mt-12">
                        <div className="flex gap-4">
                            <div className=" rounded-lg bg-[var(--primary-color)] py-1 px-4 font-bold text-white flex gap-2 items-center">Edit <FaKeyboard /></div>
                            <div className="rounded-lg bg-red-400 py-1 px-4 font-bold text-white flex gap-2 items-center">Discard <FaTrash /> </div>

                        </div>
                        <div className=" rounded-lg bg-[var(--primary-color)] py-1 px-4 font-bold text-white flex gap-2 items-center">Next question</div>

                    </div>
                </div>



                <div className="w-[35%]">
                    <span className="text-2xl font-bold text-[var(--primary-color)]">
                        Question
                    </span>
                    <div className="mt-8">
                        <hr className="border-gray-400" />
                    </div>
                    <ul className="w-full text-[var(--primary-color)]">
                        {questions.length > 0 ? (
                            questions.map((item: any, index: any) => (
                                <div key={index}>
                                    <li onClick={() => handleQuestionClick(item)} key={index} className="flex justify-between font-bold items-center py-3 text-[var(--primary-color)] hover:text-red-600 ">
                                        <span className="font-semibold truncate">{index + 1}. <span className="font-semibold truncate">{item.content}</span></span>
                                        <FaChevronRight />
                                    </li>
                                    {index !== questions.length - 1 && <hr className="border-gray-400" />}

                                </div>

                            ))
                        ) : (
                            <li>No questions available</li>
                        )}
                    </ul>
                </div>
            </div>

            {showConfirmDialog && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-72 items-center">
                        <h2 className="text-lg font-bold mb-4 text-center w-48 ms-4">Do you want to submit all your answer?</h2>
                        <div className="flex justify-between gap-4 mt-4 w-75 mx-12">
                            <button
                                className="px-6 py-2 bg-gray-300 rounded-md"
                                onClick={() => setShowConfirmDialog(false)}  >
                                No
                            </button>
                            <button
                                className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-md"
                                onClick={confirmSubmit}           >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AnswerQuestion
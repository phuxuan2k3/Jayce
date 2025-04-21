import * as React from "react";
import { FaChevronRight, FaMicrophone, FaVolumeUp, FaStopCircle } from "react-icons/fa";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useSubmitAnswerMutation } from "../../../../../features/scenarios/apis/concrete/ekko.scenario-api";
import { useGetScenarioMutation } from "../../../../../features/scenarios/apis/concrete/chronobreak.scenario-api";
import { Question, Scenario, SubmittedAnswer } from "../../../../../features/scenarios/types";
import paths from "../../../../../router/paths";

const CandidateScenarioAnswerPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	// const scenarioId = location.state?.scenarioId;
	const scenarioId = useParams().scenarioId || location.state?.scenarioId;
	if (!scenarioId) {
		navigate(paths.candidate.scenarios._layout);
		return null;
	}

	const [scenario, setScenario] = React.useState<Scenario | null>(null);
	const [questions, setQuestions] = React.useState<Question[]>([]);
	const [selectedQuestion, setSelectedQuestion] = React.useState<Question | null>(null);

	const [getScenario] = useGetScenarioMutation();
	React.useEffect(() => {
		const fetchScenario = async () => {
			try {
				const response = await getScenario({ id: scenarioId });
				setScenario(response.data?.scenario || null);
				setQuestions(response.data?.scenario?.questions || []);
				setSelectedQuestion(response.data?.scenario?.questions[0] || null);
			} catch (err) {
				console.error("Error fetching scenario:", err);
			}
		}

		fetchScenario();
	}, []);

	const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
	const [showHint, setShowHint] = React.useState(false);
	const [answers, setAnswers] = React.useState<{ [key: number]: string }>({});

	const [isSpeechSupported, setIsSpeechSupported] = React.useState<boolean>(true);
	const [isListening, setIsListening] = React.useState<boolean>(false);
	const [_, setIsProcessing] = React.useState<boolean>(false);

	const { transcript, listening: __, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

	if (!browserSupportsSpeechRecognition) {
		setIsSpeechSupported(false);
	}

	const handleSubmit = () => {
		if (submitting) return;
		setShowConfirmDialog(true);
	};

	const [submitting, setSubmitting] = React.useState(false);

	const [submitAnswer] = useSubmitAnswerMutation();
	const confirmSubmit = async () => {
		setShowConfirmDialog(false);
		const answerArray: SubmittedAnswer[] = Object.keys(answers).map((key) => ({
			question_id: Number(key),
			answer: answers[Number(key)] || ""
		}));
		console.log("Submitting answers:", answerArray);
		try {
			setSubmitting(true);
			console.log("Submitting answers:", scenarioId, answerArray);
			const response = await submitAnswer({ scenario_id: scenarioId, answers: answerArray });
			if (response.error) {
				console.error("Error submitting answers:", response.error);
				setSubmitting(false);
				return;
			}
			navigate(paths.candidate.scenarios.in(scenario?.id).REVIEW, { state: { scenario: scenario, attempt: response.data.attempt } });
		} catch (err) {
			console.error("Error submitting answers:", err);
		} finally {
			setSubmitting(false);
		}
	};

	const startListening = () => {
		setIsListening(true);
		resetTranscript();
		SpeechRecognition.startListening({ continuous: true, language: "en-US" });
	};

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

	const handleQuestionClick = (question: Question) => {
		setSelectedQuestion(question);
		setShowHint(false);
	};

	const handleAnswerChange = (questionId: number, value: string) => {
		setAnswers((prev) => ({ ...prev, [questionId]: value }));
	};

	const handlePreviousQuestion = () => {
		const currentIndex = questions.findIndex((q) => q === selectedQuestion);
		if (currentIndex === 0) return;
		const prevIndex = currentIndex - 1;
		if (prevIndex >= 0) {
			setSelectedQuestion(questions[prevIndex]);
			setAnswers((prev) => ({ ...prev, [questions[prevIndex].id]: answers[questions[prevIndex].id] || "" })); // Initialize answer for previous question if not already set
		}
	}

	const handleNextQuestion = () => {
		const currentIndex = questions.findIndex((q) => q === selectedQuestion);
		if (currentIndex === questions.length - 1) return;
		const nextIndex = currentIndex + 1;
		if (nextIndex < questions.length) {
			setSelectedQuestion(questions[nextIndex]);
			setAnswers((prev) => ({ ...prev, [questions[nextIndex].id]: answers[questions[nextIndex].id] || "" }));
		}
	};

	return (
		<>
			<div className="flex gap-4 mt-10 font-arya">
				<div className="w-[65%]  mx-12">
					<div className="flex justify-between">
						<div className="flex items-center gap-10">
							<span className="text-3xl font-bold">{scenario?.name}</span>
						</div>
						<div className={`rounded-lg bg-[var(--primary-color)] py-1 px-4 font-bold text-white flex gap-2 items-center ${submitting ? "opacity-50" : "cursor-pointer"}`} onClick={handleSubmit}>{submitting ? "Submitting..." : "Submit"}</div>
					</div>
					{/* <div className="mt-4 text-xl">
                        {field}
                    </div> */}
					<hr className=" border-gray-400 mb-4 mt-2" />
					<div className="max-h-96 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "var(--primary-color)", }}>
						<span className="text-2xl font-bold text-[var(--primary-color)] flex gap-2 items-center">
							Question {selectedQuestion ? questions.findIndex(q => q === selectedQuestion) + 1 : ""} <FaVolumeUp />
						</span>
						<p>{selectedQuestion ? selectedQuestion.content : "Select a question to view its content."}</p>
					</div>
					<hr className=" border-gray-400 my-4" />
					<span className="cursor-pointer text-[var(--primary-color)] flex items-center gap-1" onClick={() => setShowHint(!showHint)}>
						Hint
						<ExpandMoreIcon style={{ transform: showHint ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }} />
					</span>
					{showHint && <p className="mt-2">{selectedQuestion ? selectedQuestion.hint : "There is no hint."}</p>}
					<hr className=" border-gray-400 my-4" />
					{isSpeechSupported ? (
						<div className={`w-52 rounded-lg mb-4 py-2 px-4 font-bold text-white text-center flex gap-2 justify-center items-center cursor-pointer transition-all duration-300 ${isListening ? "bg-red-600" : "bg-[var(--primary-color)]"}`} onClick={isListening ? stopListening : startListening}>
							{isListening ? "Recording..." : "Record your answer"}{isListening ? <FaStopCircle /> : <FaMicrophone />}
						</div>
					) : (
						<div className="w-52 rounded-lg mb-4 py-2 px-4 font-bold text-white text-center flex gap-2 justify-center items-center cursor-pointer transition-all duration-300 bg-red-600">Recording not supported</div>
					)}

					<span className="text-xl font-bold">Transcribe</span>
					<div>
						<textarea
							className="w-full h-40 p-2 border-2 border-gray-400 rounded-lg mt-4" placeholder="Your answer for the selected question..."
							value={selectedQuestion ? (answers[selectedQuestion.id] || "") : ""} onChange={(e) =>
								selectedQuestion && handleAnswerChange(selectedQuestion.id, e.target.value)}
							disabled={isListening}>
						</textarea>
					</div>

					<div className="flex justify-between mt-12">
						<div className={`rounded-lg bg-[var(--primary-color)] py-1 px-4 font-bold text-white flex gap-2 items-center ${questions.findIndex(q => q === selectedQuestion) === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} onClick={handlePreviousQuestion}>Previous question</div>
						<div className={`rounded-lg bg-[var(--primary-color)] py-1 px-4 font-bold text-white flex gap-2 items-center ${questions.findIndex(q => q === selectedQuestion) === questions.length - 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} onClick={handleNextQuestion}>Next question</div>
					</div>
				</div>

				<div className="w-[35%]">
					<span className="text-2xl font-bold text-[var(--primary-color)]">Question</span>
					<div className="mt-8">
						<hr className="border-gray-400" />
					</div>
					<ul className="w-full text-[var(--primary-color)]">
						{questions.length > 0 ? (
							questions.map((item, index) => (
								<div key={index}>
									<li onClick={() => handleQuestionClick(item)} key={index} className="flex justify-between font-bold items-center py-3 text-[var(--primary-color)] cursor-pointer hover:text-red-600 ">
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
							<button className="px-6 py-2 bg-gray-300 rounded-md" onClick={() => setShowConfirmDialog(false)}>
								No
							</button>
							<button className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-md" onClick={confirmSubmit}>
								Yes
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CandidateScenarioAnswerPage;

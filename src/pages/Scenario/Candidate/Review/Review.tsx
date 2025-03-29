import * as React from "react";
import { FaArrowRight, FaChevronRight, FaPaperPlane, FaRegUser } from "react-icons/fa";
import { Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Attempt, Question, Scenario, ScenarioQuestion } from "../../APIs/types";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

const Review = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const scenario: Scenario = location.state?.scenario;
    const attempt: Attempt = location.state?.attempt;

    if (!scenario || !attempt) {
        navigate("/ipractice/choose");
    }

    console.log("Review:", attempt);

    let submittedDate;

    if (attempt.base_data.created_at instanceof Timestamp) {
        submittedDate = attempt.base_data.created_at.toDate();
    } else {
        submittedDate = new Date(attempt.base_data.created_at ?? Date.now());
    }

    const [selectedTab, setSelectedTab] = React.useState<"questions" | "history">("questions");
    const [selectedQuestion, setSelectedQuestion] = React.useState<ScenarioQuestion>();
    const [showHint, setShowHint] = React.useState(false);

    const handleBack = () => {
        navigate("/ipractice/detail", { state: { scenarioId: scenario.id } });
    };

    const handleQuestionClick = (question: ScenarioQuestion) => {
        setSelectedQuestion(question);
        setShowHint(false);
    };

    return (
        <>
            <div className="flex gap-4 mt-10 font-arya">
                <div className="w-[65%]  mx-12">
                    <div className="flex justify-between mb-8">
                        <div className="flex items-center gap-10">
                            <span className="text-3xl font-bold text-red-600">Attempt #{attempt.id}</span>
                            <div className={`px-3 py-1 rounded-lg text-sm font-medium font-bold text-[var(--primary-color)] border border-gray-500`}>
                                Submitted on: {submittedDate.toLocaleDateString()}
                            </div>
                        </div>
                        <div className="rounded-lg font-bold text-[var(--primary-color)] border border-gray-500 py-1 px-4 flex gap-2 items-center" onClick={handleBack}><FaArrowRight /> Back</div>
                    </div>
                    <span className="text-3xl font-bold">{scenario.name}</span>
                    {/* <div className="mt-2 text-xl">
                        {field}
                    </div> */}
                    <hr className=" border-gray-400 mb-4 mt-2" />
                    <div className="max-h-96 overflow-y-auto">
                        <span className="text-2xl font-bold text-[var(--primary-color)] flex gap-2 items-center">
                            Question {selectedQuestion ? scenario.questions.findIndex((q: Question) => q === selectedQuestion) + 1 : ""}
                        </span>
                        <div>{selectedQuestion ? selectedQuestion.content : scenario.description}</div>
                    </div>
                    <hr className=" border-gray-400 my-4" />
                    <span className="cursor-pointer text-[var(--primary-color)]" onClick={() => setShowHint(!showHint)}>Hint</span>
                    {showHint && <p className="mt-2">{selectedQuestion ? selectedQuestion.hint : "There is no hint."}</p>}
                    <hr className=" border-gray-400 my-4" />
                    <div className="max-h-96 overflow-y-auto">
                        <span className="text-2xl font-bold text-[var(--primary-color)] flex gap-2 items-center">
                            Your answer
                        </span>
                        <div>
                            {selectedQuestion
                                ? attempt.answers[scenario.questions.findIndex((q) => q === selectedQuestion)]?.answer || "No answer provided"
                                : ""}
                        </div>
                    </div>

                    <hr className=" border-gray-400 my-4" />
                    <span className="text-2xl font-bold text-[var(--primary-color)] flex gap-3">
                        <Sparkles />  Overall assessment
                    </span>
                    <div className="flex items-center gap-3 mt-3">
                        <span className="text-xl text-[var(--primary-color)] font-bold">Relevance: </span>
                        <div className={`px-3 py-1 rounded-lg text-sm font-bold text-[var(--primary-color)] border-2 border-gray-500`}>
                            {attempt.answers.reduce((sum, answer) => sum + (answer.relevance || 0), 0) / attempt.answers.length}/10
                        </div>
                    </div>
                    {/* <span className="text-[var(--primary-color)]">{history.rel}</span> */}
                    <div className="flex items-center gap-3 mt-3">
                        <span className="text-xl text-[var(--primary-color)] font-bold">Clarity and Completeness: </span>
                        <div className={`px-3 py-1 rounded-lg text-sm font-bold text-[var(--primary-color)] border-2 border-gray-500`}>
                            {attempt.answers.reduce((sum, answer) => sum + (answer.clarity_completeness || 0), 0) / attempt.answers.length}/10
                        </div>
                    </div>
                    {/* <span className="text-[var(--primary-color)]">{history.cla}</span> */}
                    <div className="flex items-center gap-3 mt-3">
                        <span className="text-xl text-[var(--primary-color)] font-bold">Accuracy: </span>
                        <div className={`px-3 py-1 rounded-lg text-sm font-bold text-[var(--primary-color)] border-2 border-gray-500`}>
                            {attempt.answers.reduce((sum, answer) => sum + (answer.accuracy || 0), 0) / attempt.answers.length}/10
                        </div>
                    </div>
                    {/* <span className="text-[var(--primary-color)]">{history.acc}</span> */}
                    <div className="flex items-center gap-3 mt-4 ">
                        <span className="text-xl text-[var(--primary-color)] font-bold">Overall: </span>
                        <div className={`px-3 py-1 rounded-lg text-sm font-bold text-[var(--primary-color)] border-2 border-gray-500`}>
                            {attempt.answers.reduce((sum, answer) => sum + (answer.overall || 0), 0) / attempt.answers.length}/10
                        </div>
                    </div>

                    <hr className=" border-gray-400 my-4" />
                    <span className="text-2xl font-bold text-[var(--primary-color)] flex gap-3 ">
                        <Sparkles /> Remark
                    </span>
                    {/* <div>
                        <span className="text-[var(--primary-color)]">hehe</span>
                    </div> */}
                </div>

                <div className="w-[35%]">
                    <div className="flex  pb-2 mb-4">
                        <span
                            className={`mr-4 font-semibold text-lg cursor-pointer ${selectedTab === "questions" ? "text-teal-600 border-b-2 border-teal-500" : "text-gray-600"}`}
                            onClick={() => setSelectedTab("questions")} >
                            Questions
                        </span>
                        <span
                            className={` flex gap-1 font-semibold text-lg cursor-pointer ${selectedTab === "history" ? "text-teal-600 border-b-2 border-teal-500" : "text-gray-600"}`}
                            onClick={() => setSelectedTab("history")} >
                            <Sparkles />  Conversation
                        </span>

                    </div>
                    <div className="w-full">
                        {selectedTab === "questions" && (
                            <ul className="w-full">
                                {scenario.questions.map((item: Question, index: number) => (
                                    <div key={index}>
                                        <li key={index} onClick={() => handleQuestionClick(item)} className="flex justify-between items-center py-3  text-[var(--primary-color)] hover:text-red-600  cursor-pointer">
                                            <span className="font-semibold truncate">{index + 1}. <span className="font-bold">{item.content}</span></span>
                                            <FaChevronRight />
                                        </li>
                                        {index !== scenario.questions.length - 1 && <hr className="border-gray-400" />}
                                    </div>
                                ))}

                            </ul>
                        )}
                        {selectedTab === "history" && (
                            <div>
                                <div className="w-full p-4 border rounded-lg shadow-lg bg-gray-100">
                                    <div className="flex justify-end">
                                        <button className="px-4 py-2 text-sm font-semibold border rounded-lg shadow-sm bg-white hover:bg-gray-300">
                                            further examine my answer
                                        </button>
                                        <FaRegUser className="ml-2 text-xl text-gray-500" />
                                    </div>
                                    <div className="mt-3 flex items-start gap-2">
                                        <img src="/svg/logo.svg" alt="logo" className="w-[28px]" />
                                        <div className="p-3 bg-white border rounded-lg shadow-sm max-w-sm">
                                            <p className="text-sm text-gray-800">
                                                An SQL query is a specific instruction written in Structured Query Language (SQL) to interact with a relational database. It's like a precise request to the database, asking it to perform actions such as:
                                            </p>
                                            <ul className="list-disc list-inside text-sm mt-2 text-gray-800">
                                                <li>Retrieving data: Selecting specific information from one or more tables.</li>
                                                <li>Manipulating data: Inserting new data, updating existing records, or deleting unwanted data.</li>
                                                <li>Defining data: Creating new tables or modifying the structure of existing ones.</li>
                                                <li>Analyzing data: Aggregating and summarizing data to gain insights.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center mt-4 border rounded-full px-3 py-2 shadow-sm">
                                    <input
                                        type="text"
                                        className="flex-1 outline-none text-sm p-1"
                                        placeholder="Hãy thêm"
                                    // value={message}
                                    // onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <FaPaperPlane className="text-xl text-gray-500 cursor-pointer" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Review
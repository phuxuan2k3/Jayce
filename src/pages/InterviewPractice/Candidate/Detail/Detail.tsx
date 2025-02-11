import { useState } from "react";
import { FaArrowRight, FaCalendarAlt, FaChevronRight, FaHeart, FaStar, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
const ScenarioDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const scenario = location.state?.scenario;
    const field = location.state?.field;
    const [selectedTab, setSelectedTab] = useState<"questions" | "history">("questions");
    const content = "SQL query interview scenarios can vary widely in complexity, but here are some common types you might encounter Basic SQL Queries   Simple Data RetrievalWrite a query to retrieve specific columns from a table. Find the number of rows in a table. Retrieve unique values from a column. Data Filtering: Select rows based on specific conditions(e.g., age > 30, salary < 50000). Sort data in ascending or descending order. Limit the number of rows returned. Data Aggregation: Calculate the sum, average, minimum, or maximum of a column. Count the number of rows that meet a certain criteria. Group data by a specific column and perform calculations on each group.";
    const questions = [
        {
            question: "What is SQL and what is it used for?",
            content: "SQL (Structured Query Language) is used for managing databases.",
            hint: "Think about relational databases."
        },
        {
            question: "What are the basic SQL commands?",
            content: "What are the basic SQL commands?",
            hint: "CRUD operations are involved."
        },
        {
            question: "What is SQL and what is it used for?",
            content: "SQL (Structured Query Language) is used for managing databases.",
            hint: "Think about relational databases."
        },{
            question: "What is SQL and what is it used for?",
            content: "SQL (Structured Query Language) is used for managing databases.",
            hint: "Think about relational databases."
        },{
            question: "What is SQL and what is it used for?",
            content: "SQL (Structured Query Language) is used for managing databases.",
            hint: "Think about relational databases."
        },{
            question: "What is SQL and what is it used for?",
            content: "SQL (Structured Query Language) is used for managing databases.",
            hint: "Think about relational databases."
        },
        {
            question: "What is the difference between a primary key and a foreign key?",
            content: "Primary key uniquely identifies a record, foreign key references a primary key.",
            hint: "Consider relationships between tables."
        }
    ];

    const history = [
        {
            attempt: 1,
            relevance: "5/10",
            clarity: "9/10",
            accuracy: "3/10",
            overall: "6.4/10",
            date: "01/01/2024 13:53 PM"
        },
        {
            attempt: 2,
            relevance: "5/10",
            clarity: "9/10",
            accuracy: "3/10",
            overall: "6.4/10",
            date: "02/01/2024 09:53 PM"
        }
    ];
    const handleAnswer = () => {
        navigate("/ipractice/answer", { state: { scenario, field, questions } });
    };
    return (
        <>

            <div className="flex gap-4 mt-10">
                <div className="w-[65%]  mx-12">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-10">
                            <span className="text-3xl font-bold">{scenario.name}</span>
                            <div className={`px-3 py-1 rounded-lg text-sm font-medium ${scenario.finished ? 'bg-[var(--primary-color)] text-white' : 'text-gray-500 border border-gray-500'}`}>
                                Finished
                            </div>
                        </div>
                        <div className="rounded-lg bg-[var(--primary-color)] py-1 px-4 font-bold text-white flex gap-2 items-center" onClick={handleAnswer}><FaArrowRight /> Start</div>
                    </div>
                    <div className="mt-4 text-xl">
                        {field}
                    </div>
                    <hr className=" border-gray-400 mb-4 mt-2" />
                    <div className="max-h-96 overflow-y-auto">
                        {content}
                    </div>
                    <hr className=" border-gray-400 my-4" />
                    <span className="flex items-center gap-2"> Overall rating: {scenario.rate} / 5.0 <FaStar /></span>
                    <span className="flex items-center gap-2"> Participated: {scenario.count}  <FaUser /></span>
                    <span className="flex items-center gap-2"> Date created: {new Date(scenario.date).toLocaleDateString()}{" "}  <FaCalendarAlt /></span>
                    <hr className=" border-gray-400 my-4" />
                    <div className="flex justify-between">
                        <div>
                            Your rating:
                        </div>
                        <div className={`px-3 py-1 rounded-lg font-bold text-[var(--primary-color)] border border-gray-500 flex gap-4 items-center`}>
                            Add to Favourite <FaHeart />
                        </div>
                    </div>
                </div>



                <div className="w-[35%]">
                    <div className="flex  pb-2 mb-4">
                        <span
                            className={`mr-4 font-semibold text-lg cursor-pointer ${selectedTab === "questions" ? "text-teal-600 border-b-2 border-teal-500" : "text-gray-600"}`}
                            onClick={() => setSelectedTab("questions")} >
                            Questions
                        </span>
                        <span
                            className={`font-semibold text-lg cursor-pointer ${selectedTab === "history" ? "text-teal-600 border-b-2 border-teal-500" : "text-gray-600"}`}
                            onClick={() => setSelectedTab("history")} >
                            History
                        </span>

                    </div>
                    <div className="w-full">
                        {selectedTab === "questions" && (
                            <ul className="w-full">
                                {questions.map((item, index) => (
                                    <div key="index">
                                        <li key={index} className="flex justify-between items-center py-3 text-gray-700 hover:text-teal-600 cursor-pointer">
                                            <span className="font-semibold truncate">{index + 1}. <span className="font-normal">{item.content}</span></span>
                                            <FaChevronRight />
                                        </li>
                                        {index !== questions.length - 1 && <hr className="border-gray-400" />}
                                    </div>
                                ))}

                            </ul>
                        )}
                        {selectedTab === "history" && (
                            <div className="w-full">
                                {history.map((attempt, index) => (
                                    <div key={index} className="p-4 bg-white shadow-md rounded-lg border m-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-red-600">Attemp {attempt.attempt}</span>
                                            <span className="text-gray-500 text-sm">Submitted on: {attempt.date}</span>
                                        </div>
                                        <div className="mt-2 text-gray-700">
                                            <p>Relevance: {attempt.relevance}</p>
                                            <p>Clarity and Completeness: {attempt.clarity}</p>
                                            <p>Accuracy: {attempt.accuracy}</p>
                                            <p className="font-bold">Overall: {attempt.overall}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>


        </>
    );
}

export default ScenarioDetail
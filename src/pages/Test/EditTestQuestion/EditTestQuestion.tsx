import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import GradientBorderNotGood from "../../../components/GradientBorder.notgood";
import { useEditQuestionMutation } from "./editquestion.test-api";

const EditTestQuestion = () => {
    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [submitError, setSubmmitError] = React.useState<string | null>(null);

    // Uncomment these lines to get the test details from the previous page
    // const location = useLocation();
    // const testDetails = location.state?.testDetails || {};

    const handleBack = () => {
        navigate("/test/edit/detail");
    };

    const [editQuestion] = useEditQuestionMutation();
    const testID = "your-test-id"; // TODO: Replace with the actual test ID (from testDetails page)
    const handleSave = async () => {
        setIsUpdating(true);
        setSubmmitError(null);
        try {
            // TODO: Call the api to update the details here

            await editQuestion({
                testID,
                questionList,
            }).unwrap();

            console.log("Questions updated successfully");
            navigate("/test/list");
        } catch (error) {
            setSubmmitError("Error updating questions. Please try again later.");
            console.error("Error updating questions:", error);
        } finally { 
            setIsUpdating(false);
        }
    };

    // TODO: Replace with actual question list from the previous page
    const [questionList, setQuestionList] = React.useState([
        {
            ID: 9,
            text: "What is the first step in the design process?",
            options: ["Research", "Design", "Develop", "Test"],
            correctAnswer: 0,
            points: 10,
        },
        {
            ID: 10,
            text: "What is the main purpose of user research?",
            options: ["Identify needs", "Develop code", "Write tests", "Launch product"],
            correctAnswer: 0,
            points: 10,
        },
    ]);

    const handlePointChange = (index: number, value: number) => {
        const updatedQuestions = [...questionList];
        updatedQuestions[index].points = value;
        setQuestionList(updatedQuestions);
    };

    const handleQuestionChange = (index: number, newValue: string) => {
        const updatedQuestions = [...questionList];
        updatedQuestions[index].text = newValue;
        setQuestionList(updatedQuestions);
    };

    const handleOptionChange = (questionIndex: number, optionIndex: number, newValue: string) => {
        const updatedQuestions = [...questionList];
        updatedQuestions[questionIndex].options[optionIndex] = newValue;
        setQuestionList(updatedQuestions);
    };

    const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
        const updatedQuestions = [...questionList];
        updatedQuestions[questionIndex].correctAnswer = optionIndex;
        setQuestionList(updatedQuestions);
    };

    const handleAddOption = (index: number) => {
        const updatedQuestions = [...questionList];
        updatedQuestions[index].options.push(`Option ${updatedQuestions[index].options.length + 1}`);
        setQuestionList(updatedQuestions);
    };

    const handleDeleteOption = (questionIndex: number, optionIndex: number) => {
        const updatedQuestions = [...questionList];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);

        if (updatedQuestions[questionIndex].correctAnswer === optionIndex) {
            updatedQuestions[questionIndex].correctAnswer = 0;
        } else if (updatedQuestions[questionIndex].correctAnswer > optionIndex) {
            updatedQuestions[questionIndex].correctAnswer--;
        }

        setQuestionList(updatedQuestions);
    };

    // Temporary disable adding new question
    const handleAddQuestion = () => {
        // setQuestionList([
        //     ...questionList,
        //     {
        //         question: "New question",
        //         options: ["Option 1"],
        //         correctAnswer: 0,
        //         point: 0,
        //     },
        // ]);
    };

    const handleDeleteQuestion = (index: number) => {
        const updatedQuestions = questionList.filter((_, i) => i !== index);
        setQuestionList(updatedQuestions);
    };

    return (
        <>
            <div className="w-full flex-grow flex flex-col items-center px-4">
                <div className="w-full flex-1 flex-col mt-6 text-center">
                    <div className="w-full text-4xl font-bold">Edit your test</div>
                    <div className="w-full text-xl font-semibold">Edit some information for your test</div>
                </div>

                <div className="w-full max-w-7xl py-6">
                    <div className="flex flex-col items-center">
                        <div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
                            <span>Question List ({questionList.length})</span>
                        </div>

                        {/* Question List */}
                        {questionList.map((question, index) => (
                            <div key={index} className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-between mb-4">
                                <span className="w-1/5 font-bold mb-2 opacity-50">
                                    Question {index + 1}
                                </span>

                                {/* Question and Options */}
                                <div className="w-4/5 flex flex-col">
                                    {/* Question */}
                                    <div className="w-11/12 mb-4">
                                        <GradientBorderNotGood className="w-full h-fit font-semibold">
                                            <input
                                                type="text"
                                                value={question.text}
                                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                                                className="w-full bg-transparent border-none outline-none"
                                            />
                                        </GradientBorderNotGood>
                                    </div>

                                    {/* Options */}
                                    {question.options.map((option, optIndex) => (
                                        <div key={optIndex} className="w-full flex flex-row mt-2" >
                                                                                        <GradientBorderNotGood className="w-11/12 h-fit">
                                                <div className="flex items-center justify-between">
                                                    <span className="mr-2">{String.fromCharCode(97 + optIndex)}.</span>
                                                    <input
                                                        type="text"
                                                        value={option}
                                                        onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                                                        className="flex-grow bg-transparent border-none outline-none"
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faXmark}
                                                        className="w-fit text-gray-500 cursor-pointer ml-2"
                                                        onClick={() => handleDeleteOption(index, optIndex)}
                                                    />
                                                </div>
                                            </GradientBorderNotGood>
                                            <div className="w-1/12 flex items-center justify-center">
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    checked={question.correctAnswer === optIndex}
                                                    onChange={() => handleAnswerSelect(index, optIndex)}
                                                    className="h-4 w-4 border-primary focus:ring-primary accent-primary cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="text-sm text-gray-500 mt-4 cursor-pointer" onClick={() => handleAddOption(index)}>
                                        <span className="font-semibold text-[var(--primary-color)] underline">+ Add option</span>
                                    </div>
                                </div>


                                {/* Points */}
                                <div className="w-2/5 h-fit flex justify-end items-center">
                                    <GradientBorderNotGood className="font-bold w-1/4 mr-2">
                                        <input
                                            className="w-full"
                                            type="number"
                                            value={question.points}
                                            onChange={(e) => handlePointChange(index, parseInt(e.target.value) || 0)}
                                            min="0"
                                            step="1"
                                        />
                                    </GradientBorderNotGood>
                                    <FontAwesomeIcon className="w-5 h-5 cursor-pointer" icon={faTrashCan} onClick={() => handleDeleteQuestion(index)} />
                                </div>
                            </div>
                        ))}

                        <div className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-center mb-4 cursor-pointer" onClick={handleAddQuestion}>
                            <FontAwesomeIcon className="w-16 h-16" icon={faPlus} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    {submitError && <div className="text-center text-red-500 mb-8">{submitError}</div>}
                    <div className="flex flex-row justify-center space-x-10">
                        <button className="w-fit px-3 font-semibold rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBack} disabled={isUpdating}>
                            Back
                        </button>
                        <button className="w-fit px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleSave} disabled={isUpdating}>
                            {isUpdating ? "Creating..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditTestQuestion
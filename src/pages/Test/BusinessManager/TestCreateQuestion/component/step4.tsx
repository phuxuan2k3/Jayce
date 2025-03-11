import { faCheck, faEdit, faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GradientBorderNotGood from "../../../../../components/GradientBorder.notgood";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCriteriaMutation } from "../questionai.test-api";
import { Question } from "../types";
import { inputAdornmentClasses } from "@mui/material";
interface Step1Props {
    onNext: () => void;
}

export const Step4: React.FC<Step1Props> = ({ onNext }) => {
    const location = useLocation();
    // const { testID, testTitle, testDescription, testDifficulty, testDuration } = location.state || { testID: null, testTitle: "", testDescription: "", testDifficulty: "", testDuration: 0 };
    const [criteriaList, setCriteriaList] = React.useState<{ criteria: string, optionList: string[], customOption: string }[]>([]);
    const [maxNumberOfQuestions, setMaxNumberOfQuestions] = React.useState<number>(5);
    const [error, setError] = React.useState<string | null>(null);
    const [cooldowns, setCooldowns] = React.useState<number[]>([]);
    const [addAllCooldown, setAddAllCooldown] = React.useState<number>(0);
    const [criteria] = useCriteriaMutation();
    const [testName, setTestName] = useState('');
    const [testDescription, setTestDescription] = useState('');
    const [testField, setTestField] = useState('');
    const [testDuration, setTestDuration] = useState('');
    const [testDifficulty, setTestDifficulty] = useState('');

    const [tempTestName, setTempTestName] = useState('');
    const [tempTestDescription, setTempTestDescription] = useState('');
    const [tempTestField, setTempTestField] = useState('');
    const [tempTestDuration, setTempTestDuration] = useState('');
    const [tempTestDifficulty, setTempTestDifficulty] = useState('');
    const [edit,setEdit]=useState(false);
    const [isEditing,setIsEditing]=useState<number>(-1);
    useEffect(() => {
        const savedData = localStorage.getItem('testInfo');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setTestName(parsedData.testName || '');
            setTestDescription(parsedData.testDescription || '');
            setTestField(parsedData.testField || '');
            setTestDuration(parsedData.testDuration || '');
            setTestDifficulty(parsedData.testDifficulty || '');

            setTempTestName(parsedData.testName || '');
            setTempTestDescription(parsedData.testDescription || '');
            setTempTestField(parsedData.testField || '');
            setTempTestDuration(parsedData.testDuration || '');
            setTempTestDifficulty(parsedData.testDifficulty || '');
        }
    }, []);
    React.useEffect(() => {
        // const fetchCriteria = async () => {
        // 	try {
        // 		const generalInfo = {
        // 			title: testTitle,
        // 			description: testDescription,
        // 			duration: testDuration + " minutes",
        // 			difficulty: testDifficulty,
        // 			maxNumberOfQuestions,
        // 		}

        // 		const input = {
        // 			generalInfo,
        // 			criteriaList: [],
        // 		}

        // 		const { data, error } = await criteria(input);

        // 		if (error) {
        // 			console.log("Error getting criteria:", error);
        // 			setError("An error occurred while getting the criteria. Please try again later.");
        // 		}

        // 		if (data) {
        // 			const newCriteria = data.criteriaList.map((c) => ({ ...c, customOption: "" }));
        // 			setCriteriaList(newCriteria);
        // 		}
        // 	} catch (error) {
        // 		console.log("Error getting criteria:", error);
        // 		setError("An error occurred while getting the criteria. Please try again later.");
        // 	}
        // };

        // fetchCriteria();
    }, []);
    const [questionList, setQuestionList] = React.useState<Question[]>([
        {
            text: "What is the first step in the design process?",
            options: ["Research", "Design", "Develop", "Test"],
            correctAnswer: 0,
            points: 10,
        },
        {
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



    // const handleDeleteQuestion = (index: number) => {
    //     const updatedQuestions = questionList.filter((_, i) => i !== index);
    //     setQuestionList(updatedQuestions);
    // };
    // const [edit, setEdit] = useState(false);




    React.useEffect(() => {
        const interval = setInterval(() => {
            setCooldowns((prevCooldowns) =>
                prevCooldowns.map((time) => (time > 0 ? time - 1 : 0))
            );

            setAddAllCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="relative">
            <div className="font-arya  pt-12 flex gap-2 items-center  justify-center">
                <div className="flex items-center gap-2 text-[24px]">
                    <div className="bg-[var(--primary-color)] rounded-3xl h-10 w-10  text-white font-bold text-center">
                        1
                    </div>
                    <span>
                        Overview
                    </span>
                </div>
                <div className="w-24">
                    <hr className="border-2 border-gray-800" />
                </div>
                <div className="flex items-center gap-2 text-[24px]">
                    <div className="bg-[var(--primary-color)] rounded-3xl h-10 w-10  text-white font-bold text-center">
                        2
                    </div>
                    <span>
                        Question
                    </span>
                </div>
                <div className="w-24">
                    <hr className="border-2 border-gray-800" />
                </div>
                <div className="flex items-center gap-2 text-[24px]">
                    <div className="bg-[var(--primary-color)]  rounded-3xl h-10 w-10  text-white font-bold text-center">
                        3
                    </div>
                    <span>
                        Review
                    </span>
                </div>
            </div>
            <div className="w-full flex-grow flex flex-col items-center px-4">
                <div className="w-full flex-1 flex-col mt-6 text-center">
                    <div className="w-full text-xl font-semibold font-arya text-[24px]">Review and refine the generated questions before finalizing your test.</div>
                </div>

                <div className="w-full max-w-7xl py-6">
                    <div className="flex flex-col items-center">
                        <div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
                            <span>Overview ({questionList.length})</span>

                        </div>
                        <div className="flex w-4/6  flex-wrap gap-1">
                            <div className="flex">
                                <span className="w-80 font-bold">
                                    Tilte
                                </span>
                                {!edit ? (<span className="w-96 ">{testName}</span>)
                                    : (<input className="border w-96 p-1 rounded-md px-2" type="text " value={tempTestName} onChange={(e) => setTempTestName(e.target.value)} />)}
                                {!edit ? (<FontAwesomeIcon className="ms-3 w-5 h-5 cursor-pointer" icon={faEdit} onClick={() => setEdit(true)} />)
                                    : (<div>
                                        <FontAwesomeIcon className="ms-3 w-5 h-5 cursor-pointer" icon={faCheck}
                                            onClick={() => {
                                                setEdit(false), setTestName(tempTestName), setTestDescription(tempTestDescription), setTestDifficulty(tempTestDifficulty)
                                                    , setTestDuration(tempTestDuration), setTestField(tempTestField)
                                            }} />
                                        <FontAwesomeIcon className="ms-3 w-5 h-5 cursor-pointer" icon={faXmark} onClick={() => setEdit(false)} />
                                    </div>)}

                            </div>
                            <div className="flex">
                                <span className="w-80 font-bold">
                                    Description
                                </span>
                                {!edit ? (<span className="w-96 ">{testDescription}</span>)
                                    : (<input className="border w-96  p-1 rounded-md px-2" type="text " value={tempTestDescription} onChange={(e) => setTempTestDescription(e.target.value)} />)}

                            </div>
                            <div className="flex">
                                <span className="w-80 font-bold">
                                    Fields
                                </span>
                                {!edit ? (<span className="w-96 ">{testField}</span>)
                                    : (<input className="border w-96  p-1 rounded-md px-2" type="text " value={tempTestField} onChange={(e) => setTempTestField(e.target.value)} />)}


                            </div>
                            <div className="flex">
                                <span className="w-80 font-bold">
                                    Duration
                                </span>
                                {!edit ? (<span className="w-96 ">{testDuration}</span>)
                                    : (<input className="border w-96  p-1 rounded-md px-2" type="text " value={tempTestDuration} onChange={(e) => setTempTestDuration(e.target.value)} />)}


                            </div>
                            <div className="flex">
                                <span className="w-80 font-bold">
                                    Difficulty
                                </span>
                                {!edit ? (<span className="w-96 ">{testDifficulty}</span>)
                                    : (<input className="border w-96  p-1 rounded-md px-2" type="text " value={tempTestDifficulty} onChange={(e) => setTempTestDifficulty(e.target.value)} />)}


                            </div>
                        </div>
                        <div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4 mt-4">
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
                                                type="text" disabled={index!==isEditing}
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
                                                        type="text" disabled={index!==isEditing}
                                                        value={option}
                                                        onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                                                        className="flex-grow bg-transparent border-none outline-none"
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faXmark}
                                                        className={`w-fit text-gray-500 cursor-pointer ml-2 ${
                                                            index !== isEditing ? "pointer-events-none opacity-50" : ""
                                                        }`}
                                                        onClick={() => handleDeleteOption(index, optIndex)}
                                                    />
                                                </div>
                                            </GradientBorderNotGood>
                                            <div className="w-1/12 flex items-center justify-center">
                                                <input
                                                    type="radio" disabled={index!==isEditing}
                                                    name={`question-${index}`}
                                                    checked={question.correctAnswer === optIndex}
                                                    onChange={() => handleAnswerSelect(index, optIndex)}
                                                    className="h-4 w-4 border-primary focus:ring-primary accent-primary cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {/* <div className="text-sm text-gray-500 mt-4 cursor-pointer" onClick={() => handleAddOption(index)}>
                                        <span className="font-semibold text-[var(--primary-color)] underline">+ Add option</span>
                                    </div> */}
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
                                            disabled={index!==isEditing}
                                        />
                                    </GradientBorderNotGood>
                                    <FontAwesomeIcon className={`"w-5 h-5 cursor-pointer" ${isEditing===index?"bg-[var(--primary-color)] p-1 rounded-lg":""}`} icon={faEdit} onClick={() =>setIsEditing(index) } />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pb-12 flex justify-center ">
                <button className="bg-[var(--primary-color)] text-white rounded-md py-1 px-10 " onClick={onNext}>
                    Publish test
                </button>
            </div>
            <div className="absolute top-10 right-10"><img className="w-4" src="https://cdn-icons-png.flaticon.com/512/566/566013.png" alt="" /></div>

        </div>
    )
};

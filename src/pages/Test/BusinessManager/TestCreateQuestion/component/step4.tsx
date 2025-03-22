import { faCheck, faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GradientBorderNotGood from "../../../../../components/GradientBorder.notgood";
import React, { useEffect, useState } from "react";
interface Step1Props {
    onNext: () => void;
    generatedData: any;
}

export const Step4: React.FC<Step1Props> = ({ onNext, generatedData }) => {
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
    const [edit, setEdit] = useState(false);
    const [editQuestion,setEditQuestion]=useState<any>(null);
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

    const [questionList, setQuestionList] = React.useState<any[]>(
        generatedData
    );

    const handleQuestionChange = (index: number, newContent: string) => {
        setQuestionList((prevQuestions) =>
            prevQuestions.map((question, i) =>
                i === index ? { ...question, questionContent: newContent } : question
            )
        );
    };

    const handleOptionChange = (qIndex: number, optIndex: number, newContent: string) => {
        setQuestionList((prevQuestions) =>
            prevQuestions.map((question, i) =>
                i === qIndex
                    ? {
                        ...question,
                        optionList: question.optionList.map((option: any, j: any) =>
                            j === optIndex ? { ...option, optionContent: newContent } : option
                        ),
                    }
                    : question
            )
        );
    };
  
    const handleAnswerSelect = (qIndex: number, optIndex: number) => {
        setQuestionList((prevQuestions) =>
            prevQuestions.map((question, i) =>
                i === qIndex
                    ? {
                        ...question,
                        optionList: question.optionList.map((option: any, j: any) => ({
                            ...option,
                            isCorrect: j === optIndex, // Chỉ một option là đúng
                        })),
                    }
                    : question
            )
        );
    };





    // const handleDeleteQuestion = (index: number) => {
    //     const updatedQuestions = questionList.filter((_, i) => i !== index);
    //     setQuestionList(updatedQuestions);
    // };
   

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
                                                type="text"
                                                value={question.questionContent}
                                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                                                className="w-full bg-transparent border-none outline-none"
                                                disabled={(index!==editQuestion)}
                                            />
                                        </GradientBorderNotGood>
                                    </div>

                                    {/* Options */}
                                    {question.optionList.map((option: { optionContent: string, isCorrect: boolean }, optIndex: number) => (
                                        <div key={optIndex} className="w-full flex flex-row mt-2" >
                                            <GradientBorderNotGood className="w-11/12 h-fit">
                                                <div className="flex items-center justify-between">
                                                    <span className="mr-2">{String.fromCharCode(97 + optIndex)}.</span>
                                                    <input
                                                        type="text"
                                                        value={option.optionContent}
                                                        onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                                                        className="flex-grow bg-transparent border-none outline-none"
                                                        disabled={(index!==editQuestion)}
                                                    />
                                                    
                                                </div>
                                            </GradientBorderNotGood>
                                            <div className="w-1/12 flex items-center justify-center">
                                                <input
                                                    type="radio"  disabled={(index!==editQuestion)}
                                                    name={`question-${index}`}
                                                    checked={option.isCorrect}
                                                    onChange={() => handleAnswerSelect(index, optIndex)}
                                                    className="h-4 w-4 border-primary focus:ring-primary accent-primary cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    
                                </div>

                                {/* Points */}
                                <div className="w-2/5 h-fit flex justify-end items-center">
                                    <GradientBorderNotGood className="font-bold w-1/4 mr-2">
                                        <input
                                            className="w-full"
                                            type="number"
                                            value={10}
                                            // onChange={(e) => handlePointChange(index, parseInt(e.target.value) || 0)}
                                            min="0"
                                            step="1"
                                        />
                                    </GradientBorderNotGood>
                                    <FontAwesomeIcon className={`w-5 h-5 cursor-pointer ${editQuestion === index ? "text-green-700" : ""}`} icon={faEdit}  onClick={()=>setEditQuestion(index)}/>
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

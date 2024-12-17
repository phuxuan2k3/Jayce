import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import GradientBorderNotGood from "../../../components/GradientBorder.notgood";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from '@mui/material/CircularProgress';

const generatedQuestions = [
    {
        content: "This is the first question",
        description: "This is a description",
        level: "Level 1",
        reason: "This is the reason",
    },
    {
        content: "This is the second question",
        description: "This is also a description",
        level: "Level 2",
        reason: "This is the reason",
    },
];

const CreateNewTest = () => {
    const [open, setOpen] = React.useState(false);
    // const [generatedQuestions, setGeneratedQuestions] = React.useState<{ content: string; description: string; level: string; reason: string }[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [cooldowns, setCooldowns] = React.useState<number[]>([]);
    const [isLoading, setLoading] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/createtest");
    };

    const handleSave = () => {
        navigate("/testlistview");
    };

    const [questionList, setQuestionList] = React.useState([
        {
            question: "What is the first step in the design process?",
            options: ["Research", "Design", "Develop", "Test"],
            correctAnswer: 0,
            point: 10,
        },
        {
            question: "What is the main purpose of user research?",
            options: ["Identify needs", "Develop code", "Write tests", "Launch product"],
            correctAnswer: 0,
            point: 10,
        },
    ]);

    const handlePointChange = (index: number, value: number) => {
        const updatedQuestions = [...questionList];
        updatedQuestions[index].point = value;
        setQuestionList(updatedQuestions);
    };

    const handleQuestionChange = (index: number, newValue: string) => {
        const updatedQuestions = [...questionList];
        updatedQuestions[index].question = newValue;
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

    const handleAddQuestion = () => {
        setQuestionList([
            ...questionList,
            {
                question: "New question",
                options: ["Option 1"],
                correctAnswer: 0,
                point: 0,
            },
        ]);
    };

    const handleAddGeneratedQuestion = (index: number) => {
        const questionToAdd = generatedQuestions[index];

        setQuestionList([
            ...questionList,
            {
                question: questionToAdd.content,
                options: ["Option 1"],
                correctAnswer: 0,
                point: 10,
            },
        ]);

        setCooldowns((prev) => {
            const updatedCooldowns = [...prev];
            updatedCooldowns[index] = 2;
            return updatedCooldowns;
        });
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCooldowns((prevCooldowns) =>
                prevCooldowns.map((time) => (time > 0 ? time - 1 : 0))
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleDeleteQuestion = (index: number) => {
        const updatedQuestions = questionList.filter((_, i) => i !== index);
        setQuestionList(updatedQuestions);
    };

    const handleGenerateClick = async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const prompt = (document.querySelector("#prompt") as HTMLTextAreaElement).value;
            const response = await fetch("https://3421d26422c70e.lhr.life/question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: prompt,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch questions");
            }

            const responseData = await response.json();
            const answer = responseData.answer;

            console.log(answer);

            const questions = [];
            const lines = answer.split("\n");
    
            let currentQuestion = null;
    
            for (const line of lines) {
                const trimmedLine = line.trim();
    
                if (trimmedLine.startsWith("- Question:")) {
                    if (currentQuestion) {
                        questions.push(currentQuestion);
                    }
                    currentQuestion = {
                        content: trimmedLine.replace("- Question:", "").trim(),
                        description: "",
                        level: "",
                        reason: "",
                    };
                } else if (trimmedLine.startsWith("+ Description:") && currentQuestion) {
                    currentQuestion.description = trimmedLine.replace("+ Description:", "").trim();
                } else if (trimmedLine.startsWith("+ Level:") && currentQuestion) {
                    currentQuestion.level = trimmedLine.replace("+ Level:", "").trim();
                } else if (trimmedLine.startsWith("+ Reason:") && currentQuestion) {
                    currentQuestion.reason = trimmedLine.replace("+ Reason:", "").trim();
                } else if (trimmedLine === "" && currentQuestion) {
                    questions.push(currentQuestion);
                    currentQuestion = null;
                }
            }
    
            if (currentQuestion) {
                questions.push(currentQuestion);
            }

            // setGeneratedQuestions(questions);
            setCooldowns(new Array(questions.length).fill(0));
        } catch (error) {
            console.error("Error generating questions:", error);
            setError("An error occurred while generating questions. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleGenerateClick();
        }
    };

    return (
        <>
            <div className="w-full flex-grow flex flex-col items-center px-4">
                <div className="w-full flex-1 flex-col mt-6 text-center">
                    <div className="w-full text-4xl font-bold">Create your test</div>
                    <div className="w-full text-xl font-semibold">Fill some information for your test</div>
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
                                                value={question.question}
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
                                            value={question.point}
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

                <div className="flex flex-row justify-center space-x-10">
                    <button className="w-fit px-3 font-semibold rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBack}>
                        Back
                    </button>
                    <button className="w-fit px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
            <Button onClick={toggleDrawer(true)} className="fixed bottom-4 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                <TipsAndUpdatesIcon />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 750, position: "relative" }} role="presentation">
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "16px",
                            borderBottom: "1px solid #ddd",
                        }}
                    >
                        <Typography variant="h6" component="div" fontWeight="bold">
                            Question Generator
                        </Typography>
                        <IconButton onClick={toggleDrawer(false)} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Content */}
                    <Box sx={{ padding: "16px" }}>
                        <GradientBorderNotGood className="w-full h-fit">
                            <textarea
                                id="prompt"
                                className="w-full flex-grow bg-transparent border-none outline-none"
                                placeholder="Type your prompt here..."
                                onKeyDown={() => handleGenerateKeyDown}
                            />
                        </GradientBorderNotGood>

                        <div className="flex justify-end mt-4">
                            <button className="w-2/5 bg-gradient-text from-blue-500 to-green-500 text-md font-bold text-white px-6 py-3 rounded-lg" onClick={handleGenerateClick}>
                                Generate
                            </button>
                        </div>

                        <div className="mt-4 flex flex-col items-center justify-center">
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <>
                                    {error ? (
                                        <div className="text-center text-red-500">{error}</div>
                                    ) : (
                                        generatedQuestions.map((question, index) => (
                                            <div
                                                key={index}
                                                className="w-full max-w-4xl mb-4 flex flex-col bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary space-y-4"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <Typography variant="h6" fontWeight="bold">
                                                        Question {index + 1}
                                                    </Typography>
                                                    <button
                                                        className={`flex items-center rounded-lg px-4 py-2 text-white cursor-pointer ${cooldowns[index] > 0 ? "bg-gray-500" : "bg-[var(--primary-color)]"}`}
                                                        onClick={() => handleAddGeneratedQuestion(index)}
                                                        disabled={cooldowns[index] > 0}
                                                    >
                                                        <AddIcon className="mr-2" /> Add
                                                    </button>
                                                </div>

                                                <div className="italic text-black">{question.content}</div>

                                                <Typography variant="body2" className="text-gray-500">
                                                    <span className="text-black">Description:</span> {question.description}
                                                </Typography>

                                                <Typography variant="body2" className="text-gray-500">
                                                    <span className="text-black">Level:</span> {question.level}
                                                </Typography>

                                                <Typography variant="body2" className="text-gray-500">
                                                    <span className="text-black">Reason:</span> {question.reason}
                                                </Typography>
                                            </div>
                                        ))
                                    )}
                                </>
                            )}
                        </div>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

export default CreateNewTest
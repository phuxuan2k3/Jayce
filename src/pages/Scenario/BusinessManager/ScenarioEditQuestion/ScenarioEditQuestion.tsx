import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import GradientBorderNotGood from "../../../../components/GradientBorder.notgood";
// import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
// import AddIcon from '@mui/icons-material/Add';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import CloseIcon from "@mui/icons-material/Close";
// import CircularProgress from '@mui/material/CircularProgress';

const questionData = [
    {
        question: "What is the first step in the design process?",
        hints: "Think about the problem you are trying to solve",
        criteria: "Identify the problem",
    },
    {
        question: "What is the first step in the design process?",
        hints: "Think about the problem you are trying to solve",
        criteria: "Identify the problem",
    },
];

const ScenarioEditQuestion = () => {
    // const location = useLocation();
    const [questionList, setQuestionList] = React.useState(questionData);
    // const [open, setOpen] = React.useState(false);
    // const [question, setQuestion] = React.useState("");
    // const [generatedQuestions, setGeneratedQuestions] = React.useState<{ content: string; description: string; level: string; reason: string }[]>([]);
    // const [error, setError] = React.useState<string | null>(null);
    // const [cooldowns, setCooldowns] = React.useState<number[]>([]);
    // const [isLoading, setLoading] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [submitError, setSubmmitError] = React.useState<string | null>(null);

    // const toggleDrawer = (newOpen: boolean) => () => {
    //     setOpen(newOpen);
    // };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/scenario/edit/detail");
    };

    // const [createnewtest] = useCreatenewtestMutation();
    const handleSave = async () => {
        setSubmmitError(null);
        setIsEditing(true);
        try {
            // await createnewtest({
            //     testId: testID,
            //     questionList: questionList,
            // }).unwrap();
            navigate("/scenario/list");
        } catch (error) {
            setSubmmitError("An error occurred while editing the scenario. Please try again later.");
            console.error("Lỗi khi chỉnh sửa bộ câu hỏi tình huống:", error);
        } finally {
            setIsEditing(false);
        }
    };

    const handleQuestionChange = (index: number, newValue: string) => {
        const updatedQuestions = [...questionList];
        updatedQuestions[index].question = newValue;
        setQuestionList(updatedQuestions);
    };

    const handleHintsChange = (questionIndex: number, newValue: string) => {
        const updatedQuestions = [...questionList];
        updatedQuestions[questionIndex].hints = newValue;
        setQuestionList(updatedQuestions);
    };

    const handleCriteriaChange = (questionIndex: number, newValue: string) => {
        const updatedQuestions = [...questionList];
        updatedQuestions[questionIndex].criteria = newValue;
        setQuestionList(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setQuestionList([
            ...questionList,
            {
                question: "",
                hints: "",
                criteria: "",
            },
        ]);
    };

    const handleDeleteQuestion = (index: number) => {
        const updatedQuestions = questionList.filter((_, i) => i !== index);
        setQuestionList(updatedQuestions);
    };

    // const handleAddGeneratedQuestion = (index: number) => {
    //     const questionToAdd = generatedQuestions[index];

    //     setQuestionList([
    //         ...questionList,
    //         {
    //             question: questionToAdd.content,
    //             options: ["Option 1"],
    //             correctAnswer: 0,
    //             point: 10,
    //         },
    //     ]);

    //     setCooldowns((prev) => {
    //         const updatedCooldowns = [...prev];
    //         updatedCooldowns[index] = 2;
    //         return updatedCooldowns;
    //     });
    // };

    // React.useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCooldowns((prevCooldowns) =>
    //             prevCooldowns.map((time) => (time > 0 ? time - 1 : 0))
    //         );
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, []);

    // const handleGenerateClick = async (): Promise<void> => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const prompt = (document.querySelector("#prompt") as HTMLTextAreaElement).value;
    //         // const response = await fetch(`/api/questionai/question`, {
    //         //     method: "POST",
    //         //     headers: {
    //         //         "Content-Type": "application/json",
    //         //     },
    //         //     body: JSON.stringify({
    //         //         question: prompt,
    //         //     }),
    //         // });

    //         const [fetchquestion] = useFetchquestionMutation();
    //         const response = await fetchquestion({ question: prompt }).unwrap();

    //         console.log(response)

    //         const { answer, conversation_id, question } = response;

    //         console.log(answer);

    //         const questions = [];
    //         const lines = answer.split("\n");

    //         let currentQuestion = null;

    //         for (const line of lines) {
    //             const trimmedLine = line.trim();

    //             if (trimmedLine.startsWith("- Question:")) {
    //                 if (currentQuestion) {
    //                     questions.push(currentQuestion);
    //                 }
    //                 currentQuestion = {
    //                     content: trimmedLine.replace("- Question:", "").trim(),
    //                     description: "",
    //                     level: "",
    //                     reason: "",
    //                 };
    //             } else if (trimmedLine.startsWith("+ Description:") && currentQuestion) {
    //                 currentQuestion.description = trimmedLine.replace("+ Description:", "").trim();
    //             } else if (trimmedLine.startsWith("+ Level:") && currentQuestion) {
    //                 currentQuestion.level = trimmedLine.replace("+ Level:", "").trim();
    //             } else if (trimmedLine.startsWith("+ Reason:") && currentQuestion) {
    //                 currentQuestion.reason = trimmedLine.replace("+ Reason:", "").trim();
    //             } else if (trimmedLine === "" && currentQuestion) {
    //                 questions.push(currentQuestion);
    //                 currentQuestion = null;
    //             }
    //         }

    //         if (currentQuestion) {
    //             questions.push(currentQuestion);
    //         }

    //         setGeneratedQuestions(questions);
    //         setCooldowns(new Array(questions.length).fill(0));
    //     } catch (error) {
    //         console.error("Error generating questions:", error);
    //         setError("An error occurred while generating questions. Please try again later.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleGenerateKeyDown = (event: any) => {
    //     if (event.key === 'Enter') {
    //         handleGenerateClick();
    //     }
    // };

    return (
        <>
            <div className="w-full flex-grow flex flex-col items-center px-4">
                <div className="w-full flex-1 flex-col mt-6 text-center">
                    <div className="w-full text-4xl font-bold">Edit Scenario</div>
                    <div className="w-full text-xl font-semibold">Edit information for your scenario</div>
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
                                            <textarea
                                                value={question.question}
                                                placeholder="Enter your question here..."
                                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                                                className="w-full bg-transparent border-none outline-none"
                                                title="This is where you enter the question."
                                            />
                                        </GradientBorderNotGood>
                                    </div>

                                    {/* Hint */}
                                    <div className="w-11/12 mb-4">
                                        <GradientBorderNotGood className="w-full h-fit font-normal">
                                            <textarea
                                                value={question.hints}
                                                placeholder="Enter hints here..."
                                                onChange={(e) => handleHintsChange(index, e.target.value)}
                                                className="w-full bg-transparent border-none outline-none italic"
                                                title="This is where you enter hints for the question."
                                            />
                                        </GradientBorderNotGood>
                                    </div>

                                    {/* Criteria */}
                                    <div className="w-11/12 mb-4">
                                        <GradientBorderNotGood className="w-full h-fit font-normal">
                                            <textarea
                                                value={question.criteria}
                                                placeholder="Enter criteria here..."
                                                onChange={(e) => handleCriteriaChange(index, e.target.value)}
                                                className="w-full bg-transparent border-none outline-none"
                                                title="This is where you enter the criteria for the question."
                                            />
                                        </GradientBorderNotGood>
                                    </div>
                                </div>

                                {/* Delete Question */}
                                <div className="w-2/5 h-fit flex justify-end items-center">
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
                        <button className="w-fit px-3 font-semibold rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBack} disabled={isEditing}>
                            Back
                        </button>
                        <button className="w-fit px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleSave} disabled={isEditing}>
                            {isEditing ? "Creating..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>
            {/* <Button onClick={toggleDrawer(true)} className="fixed bottom-4 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                <TipsAndUpdatesIcon />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 750, position: "relative" }} role="presentation">
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

                    <Box sx={{ padding: "16px" }}>
                        <GradientBorderNotGood className="w-full h-fit">
                            <textarea
                                id="prompt"
                                className="w-full flex-grow bg-transparent border-none outline-none"
                                placeholder="Type your prompt here..."
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
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
            </Drawer> */}
        </>
    );
}

export default ScenarioEditQuestion
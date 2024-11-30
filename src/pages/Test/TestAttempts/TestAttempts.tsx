import { format, formatDistanceToNow } from "date-fns";
import GradientBorderGood from "../../../components/GradientBorder.good";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { toCompanyImagesDir } from "../../../helpers/images";
import { useGetAttemptsQuery } from "./attempt.test-api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { paths } from "../../../router/path";

const TestDetail = () => {
    const navigate = useNavigate();
    const { testId } = useParams<{ testId: string }>();
    if (!testId) throw new Error("Test ID is undefined");
    const { data: testAttemps, isLoading, error } = useGetAttemptsQuery(testId);
    if (error) throw error;
    if (isLoading) {
        return <Loading />;
    }
    if (!testAttemps) {
        return null;
    }

    const companyAvatar = toCompanyImagesDir(testAttemps.company);
    const highestScore = testAttemps.attempts.reduce(
        (max, attempt) => (attempt.grade !== null && attempt.grade > max ? attempt.grade : max),
        0
    );

    const handleStartNewQuiz = () => {
        navigate(paths.TEST.do(testId));
    };

    const handleBackToQuestions = () => {
        navigate(paths.TEST.LIST);
    };

    return (
        <div className="w-full flex-grow flex flex-col items-center px-4">
            <div className="w-full max-w-7xl py-6">
                <h1 className="text-2xl font-bold mb-6">
                    {testAttemps.title}
                </h1>
                <div className="flex">
                    {/* AttempHistory */}
                    <div className="flex-1 flex-column bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
                        {testAttemps.attempts.map((attempt, index) => (
                            <div key={index} className="bg-[#EAF6F8] p-4 mb-4 rounded-lg shadow-md">
                                <div className="flex flex-row border-b border-primary pb-4 items-center gap-3 mb-3 h-fit">
                                    <img className="w-12 h-12 rounded-full" src={companyAvatar} alt={testAttemps.company} />
                                    <div className="flex flex-col h-fit">
                                        <div className="flex items-center text-sm text-blue-chill-500 mb-0">
                                            <span className="font-semibold">Asked at {testAttemps.company}</span>
                                            <span className="mx-2">&#8226;</span>
                                            <span className="">{formatDistanceToNow(new Date(testAttemps.createdAt))} ago</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 my-0">{testAttemps.title}</h3>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {testAttemps.tags.map((tag, index: number) => (
                                        <GradientBorderGood key={index}>
                                            {tag}
                                        </GradientBorderGood>
                                    ))}
                                </div>
                                <div className="flex flex-row text-xl font-bold mb-2">
                                    <span className="text-[#39A0AD] whitespace-pre">
                                        {attempt.grade === null ? null : "Your grade for this quiz is: "}
                                    </span>
                                    <span className="text-[#2E808A]">
                                        {attempt.grade === null ? null : `${attempt.grade}`}
                                    </span>
                                </div>
                                <div className="flex flex-row font-semibold mb-2 text-[#39A0AD] items-center">
                                    <div className="text-lg">
                                        {attempt.status === null ? null : `${attempt.status}`}
                                    </div>
                                    <div className="ml-20">
                                        {attempt.status === "Finished" ? `Submitted at ${format(new Date(testAttemps.createdAt), "PPPP")}` : null}
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-row items-start bg-gray-50 rounded-xl px-6 py-4 justify-between font-sans">
                                    <span className=" text-blue-chill-600 italic font-medium">
                                        Answer: {attempt.grade === null ? null : "Hehehehehe"}
                                    </span>
                                    <div className="font-semibold flex items-center min-w-fit cursor-pointer">
                                        <span className="whitespace-pre">{attempt.status === "Finished" ? "Review" : "Continue"} </span>
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="w-full text-2xl text-center font-bold text-primary mt-10 mb-6">
                            <span>Highest score: {highestScore}</span>
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div className="w-64 ml-4">
                        <button className="w-full px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleStartNewQuiz}>
                            Start a new quiz
                        </button>
                        <button className="mt-4 w-full px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBackToQuestions}>
                            Back to Questions
                        </button>
                        <div className="mt-4 bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
                            <h3 className="text-lg font-bold">Notes</h3>
                            <p className="text-sm text-[#39A0AD] mt-2">
                                Please read each question carefully and double-check your
                                answers. Manage your time wisely, stay calm, and focus on
                                accuracy rather than speed. Good luck!
                            </p>
                        </div>
                        <button className="mt-4 w-full border bg-gradient-text text-md font-bold text-white px-6 py-3 rounded-lg cursor-pointer">
                            View Evaluated
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestDetail
import { format, formatDistanceToNow } from "date-fns";
import GradientBorderGood from "../../../components/GradientBorder.good";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const TestDetail = () => {
    const testInfo = {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p_svIjwA810BURgFBTU0V6fNjiU9MRbUXQ&s",
        createdAt: "2024-11-20T18:23:00Z",
        title: "Design a product that helps people find contract",
        askedAt: "Meta (Facebook)",
        tags: ["Product Manager", "Designer", "Developer"],
    }
    const attempHistory = [
        {
            status: "Finished",
            grade: 10,
            submittedAt: "2024-11-21T18:23:00Z",
        },
        {
            status: "In Progress",
            grade: null,
            submittedAt: null,
        }
    ];

    const highestScore = attempHistory.reduce(
        (max, attempt) => (attempt.grade !== null && attempt.grade > max ? attempt.grade : max),
        0
    );

    return (
        <div className="w-full flex-grow flex flex-col items-center px-4">
            <div className="w-full max-w-7xl py-6">
                <h1 className="text-2xl font-bold mb-6">
                    {testInfo.title}
                </h1>
                <div className="flex">
                    {/* AttempHistory */}
                    <div className="flex-1 flex-column bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
                        {attempHistory.map((attempt, index) => (
                            <div key={index} className="bg-[#EAF6F8] p-4 mb-4 rounded-lg shadow-md">
                                <div className="flex flex-row border-b border-primary pb-4 items-center gap-3 mb-3 h-fit">
                                    <img className="w-12 h-12 rounded-full" src={testInfo.avatar} alt={testInfo.title} />
                                    <div className="flex flex-col h-fit">
                                        <div className="flex items-center text-sm text-blue-chill-500 mb-0">
                                            <span className="font-semibold">Asked at {testInfo.askedAt}</span>
                                            <span className="mx-2">&#8226;</span>
                                            <span className="">{formatDistanceToNow(new Date(testInfo.createdAt))} ago</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 my-0">{testInfo.title}</h3>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {testInfo.tags.map((tag, index: number) => (
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
                                        {attempt.grade === null ? null : `${attempt.grade.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex flex-row font-semibold mb-2 text-[#39A0AD] items-center">
                                    <div className="text-lg">
                                        {attempt.status === null ? null : `${attempt.status}`}
                                    </div>
                                    <div className="ml-20">
                                        {attempt.status === "Finished" ? `Submitted at ${format(new Date(testInfo.createdAt), "PPPP")}` : null}
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
                            <span>Highest score: {highestScore.toFixed(2)}</span>
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div className="w-64 ml-4">
                        <button className="w-full px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer">
                            Start a new quiz
                        </button>
                        <button className="mt-4 w-full px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer">
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
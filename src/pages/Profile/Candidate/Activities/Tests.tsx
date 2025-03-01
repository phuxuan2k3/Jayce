import * as React from 'react';
import { formatDistanceToNow } from "date-fns";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const attemptsData = {
    labels: ["All", "Data Engineering", "Programming", "Common Skills"], // Get these from the API
    datasets: [
        {
            label: "Attempts",
            data: [9, 4, 2, 2], // Get these from the API
            backgroundColor: ["#000", "#2ca5c9", "#6ab5d8", "#88c5e3"], // Generate more colors
            borderRadius: 4,
        },
    ],
};

const responseTimeData = {
    labels: ["Your time", "Average time"],
    datasets: [
        {
            label: "Response Time (s)",
            data: [702, 921], // Get these from the API
            backgroundColor: ["#2ca5c9", "#f08b74"],
            borderRadius: 4,
        },
    ],
};

const acceptanceRateData = {
    labels: ["Not correct", "Correct"],
    datasets: [
        {
            data: [9, 40], // Get these from the API
            backgroundColor: ["#d9534f", "#5bc0de"],
        },
    ],
};

const initTestsAttempts = [
    {
        topic: "Algorithm Test",
        time: "02/22/2025",
        Position: "Data Analyst",
        Experience: "Intern",
        Duration: "30 minutes",
        NumberOfQuestions: 12,
        Result: {
            score: 110,
            total: 120
        }
    },
    {
        topic: "Operating System",
        time: "02/12/2025",
        Position: "Software Engineer",
        Experience: "Intermediate",
        Duration: "60 minutes",
        NumberOfQuestions: 5,
        Result: {
            score: 50,
            total: 50
        }
    },
];

const Tests = () => {
    const [testTopics, _setTestTopics] = React.useState(initTestsAttempts);
    const [showMore, setShowMore] = React.useState<boolean[]>([]);
    const [selectedOption, setSelectedOption] = React.useState<string>("");

    React.useEffect(() => {
        // Fetch data (history and attempts data) from API
        // setTestTopics(data);
    }, []);

    const toggleShowMore = (index: number) => {
        setShowMore((prev) => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return (
        <div>
            <div className="bg-[#eaf6f8] h-[280px] p-6 rounded-lg mb-6 flex justify-between">
                {/* Attempts Chart */}
                <div className="w-1/3 flex flex-col items-center h-full border-r-gradient">
                    <h4 className="font-semibold mb-2 text-center">Attempts</h4>
                    <div className="w-full h-full">
                        <Bar
                            data={attemptsData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                indexAxis: "y",
                                plugins: { legend: { display: false } },
                                scales: {
                                    x: { display: false },
                                    y: {
                                        ticks: { font: { size: 14, weight: "bold" } },
                                        grid: { display: false },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Response Time Chart */}
                <div className="w-1/3 flex flex-col items-center h-full">
                    <h4 className="font-semibold mb-2 text-center">Response time (for the tests)</h4>
                    <div className="w-3/4 h-full">
                        <Bar
                            data={responseTimeData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                            }}
                        />
                    </div>
                </div>

                {/* Acceptance Rate Pie Chart */}
                <div className="w-1/3 flex flex-col items-center h-full border-l-gradient">
                    <h4 className="font-semibold mb-2 text-center">Acceptance rate of tests responses</h4>
                    <div className="relative w-[180px] h-[180px] flex justify-center items-center">
                        <Pie
                            data={acceptanceRateData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold mb-4">Test Topics</h2>

                <div className="flex items-center gap-2">
                    <label className="text-gray-800 text-sm">Filter by</label>
                    <select
                        className="border rounded-md p-2"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="Recently">Recently</option>
                        <option value="Recently">Completed</option>
                        <option value="All">All</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {testTopics.map((item, index) => (
                    <div key={index} className="bg-[#eaf6f8] p-4 rounded-lg flex flex-col">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="flex items-center gap-4">
                                    <h6 className="text-lg font-medium text-primary">{item.topic}</h6>
                                    <span className="text-sm text-gray-800">{formatDistanceToNow(new Date(item.time))} ago</span>
                                </div>
                            </div>
                            <button className="w-1/5 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={() => toggleShowMore(index)}>
                                {showMore[index] ? "Show less" : "Show more"}
                            </button>
                        </div>
                        {showMore[index] && (
                            <div className="flex justify-between items-center mt-4">
                                <div className="w-4/5 flex justify-between items-center">
                                    <div className="w-1/2 flex flex-col justify-center">
                                        <p className="text-sm text-gray-800">Posotion: {item.Position}</p>
                                        <p className="text-sm text-gray-800">Experience: {item.Experience}</p>
                                    </div>
                                    <div className="w-1/2 flex flex-col justify-center">
                                        <p className="text-sm text-gray-800">Duration: {item.Duration}</p>
                                        <p className="text-sm text-gray-800">Number of questions: {item.NumberOfQuestions} questions</p>
                                    </div>
                                </div>

                                <div className="w-1/5 flex flex-col items-center justify-center">
                                    <h6 className="text-primary text-lg underline flex items-center gap-1 relative">
                                        Score
                                        <div className="relative group">
                                            <InfoOutlinedIcon className="w-4 h-4 cursor-pointer" />
                                            <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                                Click to link to your completed attempts
                                            </div>
                                        </div>
                                    </h6>
                                    <h6 className="text-xl">
                                        <span className="text-primary drop-shadow-[0_1.1px_1.2px_rgba(0,0,0,0.8)]">{item.Result.score}</span>/{item.Result.total}
                                    </h6>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tests
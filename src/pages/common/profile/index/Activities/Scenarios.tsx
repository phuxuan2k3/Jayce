import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from "date-fns";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { useListScenarioMutation, useListAttemptMutation, useGetAttemptMutation } from '../../../../../features/scenarios/apis/concrete/ekko.scenario-api';
import { useGetScenarioMutation } from '../../../../../features/scenarios/apis/concrete/chronobreak.scenario-api';
import paths from '../../../../../router/paths';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

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
            data: [117, 129], // Get these from the API
            backgroundColor: ["#2ca5c9", "#f08b74"],
            borderRadius: 4,
        },
    ],
};

const acceptanceRateData = {
    labels: ["Not accepted", "Partially accepted", "Fully accepted"],
    datasets: [
        {
            data: [9, 11, 40], // Get these from the API
            backgroundColor: ["#d9534f", "#f0ad4e", "#5bc0de"],
        },
    ],
};

// const initScenarioAttempts = [
//     {
//         topic: "SQL Query",
//         time: "02/22/2025",
//         companies: "Meta, Google and 2 more",
//         Position: "Data Analyst",
//         Experience: "Intern",
//         Duration: "30 minutes",
//         NumberOfQuestions: 12,
//         Result: {
//             score: 11,
//             total: 12
//         }
//     },
//     {
//         topic: "Operating System",
//         time: "02/12/2025",
//         companies: "Meta, Sky Mavis and 3 more",
//         Position: "Software Engineer",
//         Experience: "Intermediate",
//         Duration: "60 minutes",
//         NumberOfQuestions: 5,
//         Result: {
//             score: 5,
//             total: 5
//         }
//     },
// ];

const parseProtoDate = (input: any): Date => {
    if (input instanceof Timestamp) return input.toDate();
    return new Date(input);
};

const Scenarios = () => {
    const navigate = useNavigate();
    const [showMore, setShowMore] = React.useState<boolean[]>([]);
    const [selectedOption, setSelectedOption] = React.useState<string>("");
    const [topicLoading, setTopicLoading] = React.useState<boolean>(false);

    const [scenarioTopics, setScenarioTopics] = React.useState<any[]>([]);

    const [listScenario] = useListScenarioMutation();
    const [listAttempt] = useListAttemptMutation();
    const [getAttempt] = useGetAttemptMutation();
    React.useEffect(() => {
        const fetchData = async () => {
            setTopicLoading(true);
            try {
                const scenarioResponse = await listScenario({
                    bm_ids: [],
                    sort_methods: [],
                    page_index: 0,
                    page_size: 1000,
                    is_finished: true,
                    is_favorite: false,
                    field_ids: [],
                    min_rating: 0,
                    min_participant: 0,
                }).unwrap();

                if (!scenarioResponse?.scenario) throw new Error("Failed to fetch scenario data");

                const enrichedScenarios = await Promise.all(
                    scenarioResponse.scenario.map(async (scenario) => {
                        try {
                            const attemptResponse = await listAttempt({
                                scenario_id: scenario.id,
                                page_index: 0,
                                page_size: 1000,
                                sort_method: [],
                            }).unwrap();

                            const attempts = attemptResponse.attempts || [];

                            let highestAvgScore = 0;
                            let bestAttempt: any = null;

                            for (const attempt of attempts) {
                                try {
                                    const attemptDetail = await getAttempt({ id: attempt.id }).unwrap();
                                    const answers = attemptDetail.attempt.answers;

                                    if (answers.length === 0) continue;

                                    const avgOverall =
                                        answers.reduce((sum, ans) => sum + ans.overall, 0) / answers.length;

                                    if (avgOverall > highestAvgScore) {
                                        highestAvgScore = avgOverall;
                                        bestAttempt = {
                                            ...attemptDetail.attempt,
                                            base_data: {
                                                created_at: parseProtoDate(attempt.base_data.created_at),
                                                updated_at: parseProtoDate(attempt.base_data.updated_at),
                                            },
                                            answers: attemptDetail.attempt.answers.map(ans => ({
                                                ...ans,
                                                base_data: {
                                                    created_at: parseProtoDate(ans.base_data.created_at),
                                                    updated_at: parseProtoDate(ans.base_data.updated_at),
                                                }
                                            }))
                                        };
                                    }
                                } catch (err) {
                                    console.warn(`Failed to get details for attempt ${attempt.id}`);
                                }
                            }

                            return {
                                ...scenario,
                                base_data: {
                                    created_at: parseProtoDate(scenario.base_data.created_at),
                                    updated_at: parseProtoDate(scenario.base_data.updated_at),
                                },
                                bestAttempt,
                                highestAvgScore,
                            };
                        } catch (err) {
                            console.error(`Failed to process scenario ${scenario.id}`, err);
                            return {
                                ...scenario,
                                bestAttempt: null,
                                highestAvgScore: 0,
                            };
                        }
                    })
                );

                console.log("Enriched scenarios:", enrichedScenarios);
                setScenarioTopics(enrichedScenarios);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setTopicLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleShowMore = (index: number) => {
        setShowMore((prev) => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const handleGoToScenario = (id: number) => {
        navigate(paths.candidate.scenarios.in(id)._layout);
    }

    const [getScenario] = useGetScenarioMutation();
    const handleGoToReview = async (scenarioId: number, attemptId: number) => {
        if (!attemptId) return;

        const scenario = await getScenario({ id: scenarioId }).unwrap();
        const attempt = await getAttempt({ id: attemptId }).unwrap();
        console.log("Scenario", scenario.scenario);
        console.log("Attempt", attempt.attempt);
        navigate(paths.candidate.scenarios.in(scenarioId).REVIEW, { state: { scenario: scenario.scenario, attempt: attempt.attempt } });
    }

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
                    <h4 className="font-semibold mb-2 text-center">Response time (for the scenarios)</h4>
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
                    <h4 className="font-semibold mb-2 text-center">Acceptance rate of scenarios responses</h4>
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
                <h2 className="text-xl font-bold mb-4">Scenario Topics</h2>

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
                {topicLoading ? (
                    <div className="text-center text-primary font-semibold">Loading topics...</div>
                ) : (
                    scenarioTopics.map((item, index) => (
                        <div key={index} className="bg-[#eaf6f8] p-4 rounded-lg flex flex-col cursor-pointer" onClick={() => handleGoToScenario(item.id)}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-4">
                                        <h6 className="text-lg font-medium text-primary">{item.name}</h6>
                                        <span className="text-sm text-gray-800">{item.bestAttempt ? `${formatDistanceToNow(new Date(item.bestAttempt.base_data.created_at))} ago` : "Unknown"}</span>
                                    </div>
                                    {/* <p className="text-sm text-gray-800">Asked at {item.companies}</p> */}
                                    {item.bestAttempt === null && (<p className="text-sm text-secondary-toned-500">This attempt is not rated yet</p>)}
                                </div>
                                <button className="w-1/5 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={(e) => {e.stopPropagation(); toggleShowMore(index)}}>
                                    {showMore[index] ? "Show less" : "Show more"}
                                </button>
                            </div>
                            {showMore[index] && (
                                <div className="flex justify-between items-center mt-4">
                                    <div className="w-4/5 flex justify-between items-center">
                                        <div className="w-1/2 flex flex-col justify-center">
                                            <p className="text-sm text-gray-800">Posotion: ommm</p>
                                            <p className="text-sm text-gray-800">Experience: ommm</p>
                                        </div>
                                        <div className="w-1/2 flex flex-col justify-center">
                                            <p className="text-sm text-gray-800">Duration: ommm</p>
                                            <p className="text-sm text-gray-800">Number of questions: ommm</p>
                                        </div>
                                    </div>

                                    <div className="w-1/5 flex flex-col items-center justify-center">
                                        <h6 className="text-primary text-lg underline flex items-center gap-1 relative">
                                            Highest Score
                                            <div className="relative group">
                                                <InfoOutlinedIcon className="w-4 h-4 cursor-pointer" onClick={(e) => {e.stopPropagation(); handleGoToReview(item.id, item.bestAttempt ? item.bestAttempt.id : null)}}/>
                                                <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                                    Click to link to your completed attempts
                                                </div>
                                            </div>
                                        </h6>
                                        <h6 className="text-xl">
                                            <span className="text-primary drop-shadow-[0_1.1px_1.2px_rgba(0,0,0,0.8)]">{item.bestAttempt ? item.highestAvgScore : "NaN"}</span>/10
                                        </h6>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Scenarios
import { useLocation, useNavigate } from "react-router-dom";
import { FaFilter, FaStar, FaUser, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { grpcChronoListScenario } from "../../../../features/grpcScenario/grpcScenario";

const ChooseScenario = () => {
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [participants, setParticipants] = useState({ from: "0", to: "1000" });
    const [ratings, setRatings] = useState({ from: "0", to: "5" });
    const [dates, setDates] = useState({ from: "", to: new Date().toISOString().split("T")[0] })
    const location = useLocation();
    // const field = location.state?.field ;
    const field="Test"
    const scenarioData = [
        {
            name: "SQL Query",
            content: "A SQL Query interview is a technical assessment designed to evaluate a candidate's knowledge and skills in Structured Query Language (SQL). This language is used to interact with relational databases, allowing users to retrieve, manipulate, and manage data efficiently.",
            rate: 4.5,
            count: 150,
            date: new Date('2025-02-01'),
            finished: true
        },
        {
            name: "Data Cleaning and Preparation",
            content: "A SQL Query interview is a technical assessment designed to evaluate a candidate's knowledge and skills in Structured Query Language (SQL). This language is used to interact with relational databases, allowing users to retrieve, manipulate, and manage data efficiently.",
            rate: 3.7,
            count: 80,
            date: new Date('2025-01-20'),
            finished: false
        },
        {
            name: "SQL QUery",
            content: "A SQL Query interview is a technical assessment designed to evaluate a candidate's knowledge and skills in Structured Query Language (SQL). This language is used to interact with relational databases, allowing users to retrieve, manipulate, and manage data efficiently.",
            rate: 4.9,
            count: 200,
            date: new Date('2025-01-15'),
            finished: true
        }
    ];
    const [scenarios,setScenarios]= useState<any[]>(scenarioData);
    const handlePractice = (scenario: any) => {
        navigate("/ipractice/detail", { state: { scenario, field} });
    };
    useEffect(() => {
        async function fetchScenarios() {
          try {
            const response = await grpcChronoListScenario([123], 0, 10, undefined, undefined, undefined, undefined);
            const data = response.toObject();
            setScenarios(data.scenario || []);
          } catch (err) {
            console.error("Error fetching scenarios:", err);
          } 
        }
        fetchScenarios();
      },[]);
    
    return (
        <>
            <div className="mx-12 font-arya">
                <div className="text-3xl font-extrabold"> {field} Scenario</div>
                <div className="mt-2 text-[var(--primary-color)]">You can practice interview skills with multiple situations</div>
                <div className=" flex justify-between">
                    <div className="flex gap-3 mt-8">
                        <div className="rounded-lg bg-[var(--primary-color)] px-4 py-2 font-bold text-white "> Most Popular</div>
                        <div className="rounded-lg bg-[var(--primary-color)] px-4 py-2 font-bold text-white "> Top Rated</div>
                        <div className="rounded-lg bg-[var(--primary-color)] px-4 py-2 font-bold text-white "> Newest</div>
                        <div className="rounded-lg bg-[var(--primary-color)] px-4 py-2 font-bold text-white flex items-center" onClick={() => setIsFilterOpen(true)}> <FaFilter /></div>
                    </div>
                    <div className="flex gap-6">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="h-6 w-6 border-2 border-gray-400 checked:bg-green-500 checked:border-green-500" />
                            <span className="ml-2">Finished</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox h-6 w-6 border-2 border-gray-400 checked:bg-green-500 focus:ring-2 focus:ring-green-300 peer" />
                            <span className="ml-2">Favourite</span>
                        </label>
                    </div>
                </div>
                <div className="grid grid-colums-1 mt-12 max-h-80 overflow-y-auto">
                    {scenarios.map((scenario, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4 ">
                            <div className="text-xl font-bold mb-3">{scenario.name}</div>
                            <div className="text-sm text-gray-600">{scenario.content}</div>
                            <div className="mt-4 flex justify-between items-center text-gray-500">
                                <div className="flex gap-10 items-center">
                                    <div className="text-sm flex gap-2">{scenario.rate}  <FaStar className="text-gray-500" /></div>
                                    <div className="text-sm flex gap-2">{scenario.count} <FaUser /></div>
                                    <div className="text-sm flex gap-2">{scenario.date.toLocaleDateString()}<FaCalendarAlt /></div>
                                    <div className={`px-3 py-1 rounded-lg text-sm font-medium ${scenario.finished ? 'bg-[var(--primary-color)] text-white' : 'text-gray-500 border border-gray-500'}`}>
                                        Finished
                                    </div>
                                </div>
                                <div className="rounded-lg bg-[var(--primary-color)] py-1 px-4 font-bold text-white flex gap-2 items-center" onClick={() => handlePractice(scenario)} ><FaArrowRight /> Practice</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            {isFilterOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-arya">
                    <div className="bg-gray-100 p-6 rounded-lg w-100 shadow">
                        <h2 className="text-2xl text-center font-bold mb-4">Filter</h2>
                        <div className="flex flex-col gap-4 w-full">
                            <label className="grid grid-cols-3 items-center justify-between gap-2">
                                <span>Participants</span>
                                <input
                                    type="text"
                                    className="h-6 w-32 border-gray-400 border rounded px-2"
                                    value={participants.from}
                                    onChange={(e) => setParticipants({ ...participants, from: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="h-6 w-32 border-gray-400 border  rounded px-2"
                                    value={participants.to}
                                    onChange={(e) => setParticipants({ ...participants, to: e.target.value })}
                                />
                            </label>
                            <label className="grid grid-cols-3 items-center justify-between gap-2">
                                <span>Ratings</span>
                                <input
                                    type="text"
                                    className="h-6 w-32 border-gray-400 border rounded px-2"
                                    value={ratings.from}
                                    onChange={(e) => setRatings({ ...ratings, from: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="h-6 w-32 border-gray-400 border  rounded px-2"
                                    value={ratings.to}
                                    onChange={(e) => setRatings({ ...ratings, to: e.target.value })}
                                />

                            </label>
                            <label className="grid grid-cols-3 items-center justify-between gap-2">
                                <span>Date</span>
                                <input
                                    type="date"
                                    className="h-6 w-32 border-gray-400 border rounded px-2"
                                    value={dates.from}
                                    onChange={(e) => setDates({ ...dates, from: e.target.value })}
                                />
                                <input
                                    type="date"
                                    className="h-6 w-32 border-gray-400 border  rounded px-2"
                                    value={dates.to}
                                    onChange={(e) => setDates({ ...dates, to: e.target.value })}
                                />

                            </label>
                        </div>
                        <div className="flex justify-between gap-3 mt-4 mx-12">
                            <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={() => setIsFilterOpen(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">Apply</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChooseScenario
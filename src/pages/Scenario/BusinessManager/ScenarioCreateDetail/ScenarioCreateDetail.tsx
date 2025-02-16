import * as React from 'react';
import { useNavigate } from "react-router-dom";

const ScenarioCreateDetail = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    const [scenarioDetails, setScenarioDetails] = React.useState({
        title: "",
        description: "",
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setScenarioDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = async () => {
        try {
            navigate("/scenario/create/question", { state: { testDetails: scenarioDetails } });
        } catch (err) {
            console.error("Failed to create test detail:", err);
        }
    };

    const handleCancel = () => {
        navigate("/scenario/list");
    };

    return (
        <>
            <div className="flex-grow flex flex-col items-center justify-center px-4 font-arya border-2 rounded-xl shadow-lg pb-8 mx-48">
                <div className="flex flex-col items-center justify-center mt-6 ml-16 text-center">
                    <div className=" text-4xl font-bold">Create a new Scenario</div>
                    <div className=" text-xl font-semibold pb-10">Fill some information for your scenario</div>
                </div>

                <div className="w-full max-w-7xl py-6 pt-10 space-y-6 items-center justify-center">
                    <div className="flex justify-center space-x-4">
                        <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
                            Scenario Name
                        </label>
                        <input
                            id="scenarioName"
                            name="title"
                            type="text"
                            placeholder="Enter scenario's name"
                            value={scenarioDetails.title}
                            onChange={handleInputChange}
                            className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                        />
                    </div>
                    <div className="flex justify-center space-x-4">
                        <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
                            Scenario Description
                        </label>
                        <textarea
                            id="scenarioDescription"
                            name="description"
                            placeholder="Enter scenario's description"
                            value={scenarioDetails.description}
                            onChange={handleInputChange}
                            className="h-36 w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                        />
                    </div>
                </div>
                <div className="flex w-full justify-end gap-4 pe-24">
                    <button
                        onClick={handleCancel}
                        className="mt-4 w-fit px-3 font-semibold mr-3 rounded-lg py-2 px-8 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleNext}
                        className="mt-4 w-fit px-5 font-semibold mr-3 rounded-lg py-2 px-9 bg-[var(--primary-color)] border-[var(--primary-color)] text-white border-2 cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default ScenarioCreateDetail
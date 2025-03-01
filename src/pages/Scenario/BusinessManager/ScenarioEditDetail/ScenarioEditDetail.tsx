import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { grpcUpdateScenario } from '../../../../features/grpcScenario/grpcScenario';

const scenarioData = {
    id: 1,
    title: "SQL Query For Beginners",
    description: "This a super good question set for the people who start to learn programming and database.",
};

const ScenarioEditDetail = () => {
    const [scenarioDetails, setScenarioDetails] = React.useState(scenarioData);
    const navigate = useNavigate();
    // const location = useLocation();
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setScenarioDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = async () => {
        try {
            await grpcUpdateScenario(
              scenarioDetails.id,
              scenarioDetails.title,
              scenarioDetails.description,
              [],
              []
            );
            navigate("/scenario/edit/question", { state: { testDetails: scenarioDetails } });
          } catch (err) {
            console.error("Failed to edit test detail:", err);
        }
    };

    const handleCancel = () => {
        navigate("/scenario/list");
    };

    return (
        <>
            <div className="w-full flex-grow flex flex-col items-center justify-center px-4 font-arya">
                <div className="w-full flex-1 flex-col items-center justify-center mt-6 ml-16 text-center">
                    <div className="w-full text-4xl font-bold">Edit Scenario</div>
                    <div className="w-full text-xl font-semibold pb-10">Edit information for your scenario</div>
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
                            className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-center">
                    <button
                        onClick={handleCancel}
                        className="mt-4 w-fit px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleNext}
                        className="mt-4 w-fit px-5 font-semibold mr-3 rounded-lg py-2 bg-[var(--primary-color)] border-[var(--primary-color)] text-white border-2 cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default ScenarioEditDetail
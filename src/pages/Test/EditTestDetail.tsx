import Navbar from "../../components/Navbar";
import * as React from 'react';
import { useNavigate } from "react-router-dom";

const EditTestDetail = () => {
    const navigate = useNavigate();

    const [testDetails, setTestDetails] = React.useState({
        name: "",
        description: "",
        duration: "",
        type: {
            multipleChoice: false,
            essay: false,
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTestDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (type: "multipleChoice" | "essay") => {
        setTestDetails((prev) => ({
            ...prev,
            type: { ...prev.type, [type]: !prev.type[type] },
        }));
    };

    const handleNext = () => {
        navigate("/test/edit/question", { state: { testDetails } });
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <>
            <Navbar />
            <div className="w-full flex-grow flex flex-col items-center px-4 ">
                <div className="w-full flex-1 flex-col mt-6 ml-16 text-center">
                    <div className="w-full text-4xl font-bold">Edit your test</div>
                    <div className="w-full text-xl font-semibold pb-10">Edit some information for your test</div>
                </div>

                <div className="w-full max-w-7xl py-6 pt-10 space-y-6">
                    <div className="flex items-center space-x-4">
                        <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
                            Test Name
                        </label>
                        <input
                            id="testName"
                            name="name"
                            type="text"
                            placeholder="Enter test name"
                            value={testDetails.name}
                            onChange={handleInputChange}
                            className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                        />
                    </div>
                    <div className="flex  space-x-4">
                        <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
                            Test Description
                        </label>
                        <textarea
                            id="testDescription"
                            name="description"
                            placeholder="Enter test description"
                            value={testDetails.description}
                            onChange={handleInputChange}
                            className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
                            Test Duration
                        </label>
                        <input
                            id="testDuration"
                            name="duration"
                            type="number"
                            placeholder="Enter test duration"
                            value={testDetails.duration}
                            onChange={handleInputChange}
                            className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">Test Type</label>
                        <div className="flex items-center space-x-4 w-3/4">
                            <label className="flex items-center ">
                                <input
                                    type="checkbox"
                                    checked={testDetails.type.multipleChoice}
                                    onChange={() => handleCheckboxChange("multipleChoice")}
                                    className="form-checkbox h-5 w-5 text-[var(--primary-color)]"
                                />
                                <span className="ml-2 text-[var(--primary-color)]">Multiple choice</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={testDetails.type.essay}
                                    onChange={() => handleCheckboxChange("essay")}
                                    className="form-checkbox h-5 w-5 text-[var(--primary-color)]"
                                />
                                <span className="ml-2 text-[var(--primary-color)]">Essay question</span>
                            </label>
                        </div>
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

export default EditTestDetail
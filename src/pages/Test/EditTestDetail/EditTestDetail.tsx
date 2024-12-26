import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useEditdetailMutation } from './editdetail.test-api';

const EditTestDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, title, duration, description } = location.state || {};
    const [testDetails, setTestDetails] = React.useState({
        title: title,
        description:description,
        duration: duration,
        testId:id,
    });
    const [editDetail] = useEditdetailMutation();

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTestDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = async () => {
        try {
            await editDetail({
                testId: id,
                name: testDetails.title,
                description: testDetails.description,
                duration: testDetails.duration,
            }).unwrap();
            // Navigate sau khi thành công
            navigate("/test/edit/question", { state: { testDetails } });
        } catch (err) {
            console.error("Failed to edit test detail:", err);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <>
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
                            value={testDetails.title}
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
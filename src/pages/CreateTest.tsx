import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass, faPen,faTrash, faClock, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import Navbar from "../components/Navbar";
import * as React from 'react';
import { useNavigate } from "react-router-dom";



const TestListView = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleGoToSubmissionDetail = () => {
        navigate("/test/submission/detail");
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const submissionOverview = {
        testName: "Test",
        totalPoints: 30
    }
    const YourTest = [
        {
            count:1,
            nameTest: "Design pattern",
            time:60,
            type: "Multiple choice",
            view: 30,
        },
        {
            count:10,
            nameTest: "Big Data",
            time: 45,
            type: "Multiple choice & Essay question",
            view: 20,
        },
    ];

    return (
        <>
            <Navbar />
            <div className="w-full flex-grow flex flex-col items-center px-4 ">
                <div className="w-full flex-1 flex-col mt-6 ml-16 text-center">
                    <div className="w-full text-4xl font-bold">Create new test</div>
                    <div className="w-full text-xl font-semibold pb-10">Fill some information for your test</div>
                </div>

                <div className="w-full max-w-7xl py-6 pt-10 space-y-6">
                    <div className="flex items-center space-x-4">
                        <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
                        Test Name
                        </label>
                        <input
                        type="text"
                        placeholder="Enter test name"
                        className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                        />
                    </div>
                    <div className="flex  space-x-4">
                        <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
                        Test Description
                        </label>
                        <div className="relative w-2/4">
                            <input
                                type="text"
                                className="w-full h-[250px] px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                            />
                            <span className="absolute top-2 left-4 text-gray-400 pointer-events-none">
                                Enter test description
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
                        Test Duration
                        </label>
                        <input
                        type="text"
                        placeholder="Enter test duration"
                        className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">Test Type</label>
                        <div className="flex items-center space-x-4 w-3/4">
                            <label className="flex items-center ">
                                <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-[var(--primary-color)]"
                                />
                                <span className="ml-2 text-[var(--primary-color)]">Multiple choice</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-[var(--primary-color)]"
                                />
                                <span className="ml-2 text-[var(--primary-color)]">Essay question</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center">
                    <button className="mt-4 w-fit px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer">
                        Cancel
                    </button>
                    <button className="mt-4 w-fit px-5 font-semibold mr-3 rounded-lg py-2 bg-[var(--primary-color)] border-[var(--primary-color)] text-white border-2 cursor-pointer">
                        Next
                    </button>
                </div>
            </div>
            
        </>
    );
}

export default TestListView
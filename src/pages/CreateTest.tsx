import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass, faPen,faTrash, faClock, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import Navbar from "../components/Navbar";
import * as React from 'react';
import { useNavigate } from "react-router-dom";



const TestSubmissionListView = () => {
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
            <div className="w-full flex-grow flex flex-col items-center px-4">
                <div className="w-full flex-1 flex-col mt-6 ml-16">
                    <div className="w-full text-4xl font-bold">Welcome to your Test Manager</div>
                    <div className="w-full text-xl font-semibold">You can manage all your test here!</div>
                </div>

                <div className="w-full max-w-7xl py-6">
                    <div className="flex flex-col items-center">
                        <div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
                            <span>Your test ({YourTest.length})</span>
                            <div className="h-full w-fit flex items-center">
                                <div className="h-7 w-7 bg-[#EAF6F8] flex items-center justify-center rounded-lg cursor-pointer" onClick={handleClickOpen}>
                                    <FontAwesomeIcon icon={faPlus} rotation={90} />
                                </div>

                                Add new test
                            </div>
                        </div>

                        {/* Test List */}
                        {YourTest.map((test, index) => (
                            <div key={index} className="w-4/6 flex-1 flex flex-col bg-white rounded-lg shadow-primary p-6 border-r border-b border-solid border-primary items-between mb-4">
                                <div className="flex-1 flex justify-between mb-4">
                                    <span className="font-bold mb-2 opacity-50">
                                        {test.count} Questions
                                    </span>
                                    <div className="flex items-center space-x-4">
                                    
                                        <div  onClick={handleGoToSubmissionDetail}>
                                            <FontAwesomeIcon className="h-5 w-5" icon={faPen} />
                                        </div>
                                        <div onClick={handleGoToSubmissionDetail}>
                                            <FontAwesomeIcon className="h-5 w-5" icon={faTrash} />
                                        </div>
                                    </div>
                                </div>

                                <div className="font-medium mb-8 text-xl">
                                    Test <span>{test.nameTest}</span>
                                </div>
                                <div className="mb-8">
                                    Description of <span>{test.nameTest}</span>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            <FontAwesomeIcon className="h-4 w-4 ml-4" icon={faClock} />
                                            <span className="ml-2 text-gray-600 text-sm font-medium">{test.time} minutes</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FontAwesomeIcon className="h-4 w-4 ml-4" icon={faQuestion} />
                                            <span className="ml-2 text-gray-600 text-sm font-medium">{test.type}</span>
                                        </div>
                                    </div>
                                    <div>
                                        {test.view === null ? (
                                            <span className="text-red-600 font-semibold">Not graded</span>
                                        ) : (
                                            <span className="text-primary font-semibold">
                                               View submission ({test.view})
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row justify-center items-center space-x-2 mt-4">
                        <button className="w-10 h-10 bg-[#EAF6F8] rounded-full text-md font-bold text-primary border border-primary cursor-pointer rotate-270">
                            ^
                        </button>

                        <button className="w-10 h-10 bg-primary rounded-full text-md font-bold text-white border border-primary cursor-pointer">
                            1
                        </button>

                        <button className="w-10 h-10 bg-[#EAF6F8] rounded-full text-md font-bold text-primary border border-primary cursor-pointer rotate-90">
                            ^
                        </button>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default TestSubmissionListView
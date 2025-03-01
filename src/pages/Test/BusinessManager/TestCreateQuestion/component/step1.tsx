import { useEffect, useState } from "react";
interface Step1Props {
    onNext: () => void;
}

export const Step1: React.FC<Step1Props> = ({ onNext}) => {
    const [testDifficulty, setTestDifficulty] = useState('');
    const [testName, setTestName] = useState('');
    const [testDescription, setTestDescription] = useState('');
    const [testField, setTestField] = useState('');
    const [testDuration, setTestDuration] = useState('');
    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setter(event.target.value);
    };
    useEffect(() => {
        localStorage.setItem('testInfo', JSON.stringify({ testName, testDescription, testField, testDuration, testDifficulty }));
    }, [testName, testDescription, testField, testDuration, testDifficulty]);
    return (
        <div className="bg-gray-100 ">
            <div className="font-arya  pt-12 flex gap-2 items-center  justify-center">
                <div className="flex items-center gap-2 text-[24px]">
                    <div className="bg-[var(--primary-color)] rounded-3xl h-10 w-10  text-white font-bold text-center">
                        1
                    </div>
                    <span>
                        Overview
                    </span>
                </div>
                <div className="w-24">
                    <hr className="border-2 border-gray-800" />
                </div>
                <div className="flex items-center gap-2 text-[24px]">
                    <div className="bg-gray-300 rounded-3xl h-10 w-10  text-white font-bold text-center">
                        2
                    </div>
                    <span>
                        Question
                    </span>
                </div>
                <div className="w-24">
                    <hr className="border-2 border-gray-800" />
                </div>
                <div className="flex items-center gap-2 text-[24px]">
                    <div className="bg-gray-300  rounded-3xl h-10 w-10  text-white font-bold text-center">
                        3
                    </div>
                    <span>
                        Review
                    </span>
                </div>
            </div>
            <div className="font-arya text-[28px] font-bold text-center mt-10">
                First, let’s add some general fields about your new test...
            </div>
            <div className="font-arya mt-10 mb-20">
                <div className="flex justify-center items-center space-x-4 my-4">
                    <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
                        Name:
                    </label>
                    <input
                        type="text"
                        placeholder="Programming tests"
                        className=" w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                    />
                </div>
                <div className="flex justify-center items-center space-x-4 my-4">
                    <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
                        Description:
                    </label>
                    <textarea
                        placeholder="Descript your test"
                        className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                        value={testDescription}
                        onChange={(e) => setTestDescription(e.target.value)}
                    />
                </div>
                <div className="flex justify-center items-center space-x-4 my-4">
                    <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
                        Fields:
                    </label>
                    <div className="w-2/4 flex">
                        <input
                            type="text"
                            placeholder="Type or select"
                            className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-tl-md rounded-bl-md focus:outline-none focus:ring focus:ring-teal-300"
                            value={testField}
                            onChange={(e) => setTestField(e.target.value)}
                        />
                        <div className="text-[36px] text-white bg-gradient-text  rounded-tr-md flex justify-center items-center pb-1  rounded-br-md w-12 text-center">
                            <span>+</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center space-x-4 my-4">
                    <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
                        Duration:
                    </label>
                    <div className=" w-2/4">
                        <input
                            type="text"
                            placeholder="Enter duration"
                            className=" px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                            value={testDuration}
                            onChange={(e) => setTestDuration(e.target.value)}
                        />
                        <span> minutes</span>
                    </div>

                </div>
                <div className="flex justify-center items-center space-x-4 mb-10">
                    <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
                        Difficulty
                    </label>
                    <select
                        className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                        value={testDifficulty}
                        onChange={handleInputChange(setTestDifficulty)}
                    >
                        <option value="">Select difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div className="pb-12 flex justify-center">
                    <button className="bg-[var(--primary-color)] text-white rounded-md py-1 px-10 " onClick={onNext}>
                        Continue
                    </button>
                </div>

            </div>
        </div>)
};

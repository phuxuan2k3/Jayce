import { useEffect, useState } from "react";
import { FaChevronDown, FaFilePdf, FaLink, FaRegFileAlt, FaRegImage } from "react-icons/fa";
import { Loading } from "./loading"
import { useGenerateMutation } from "../questionai.test-api";
import { CriteriaRequest } from "../types";
interface Step1Props {
    onNext: () => void;
    setGeneratedData: (data: any) => void;
}

export const Step2: React.FC<Step1Props> = ({ onNext, setGeneratedData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const storedTestInfo = localStorage.getItem('testInfo');
    const parsedTestInfo = storedTestInfo ? JSON.parse(storedTestInfo) : {};
    const options = [
        { id: "text", label: "Text", icon: <FaRegFileAlt />, active: true },
        { id: "link", label: "Link", icon: <FaLink /> },
        { id: "image", label: "Image", icon: <FaRegImage /> },
        { id: "pdf", label: "PDF", icon: <FaFilePdf /> },
    ];
    const [text, setText] = useState("");
    const [active, setActive] = useState("text");
    const [numQuestions, setNumQuestions] = useState(3);
    const [answers, setAnswers] = useState(4);
    const [language, setLanguage] = useState("Auto");
    const [seniority, setSeniority] = useState("Intern");
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [generate] = useGenerateMutation();
    const [criteria, setCriteria] = useState<CriteriaRequest>({
        name: parsedTestInfo.testName || "Default Name",
        description: parsedTestInfo.testDesciption || "Default Description",
        fields: parsedTestInfo.testField ? [parsedTestInfo.testField] : ["Default Field"],
        duration: parsedTestInfo.testDuration || "30",
        question_type: "multiple_choice",
        language: "en",
        options: 4,
        number_of_question: 3,
        candidate_seniority: "itern",
        difficulty: parsedTestInfo.testDifficulty || "Easy",
        context: "this is a beautiful",
    });

    // const handleGenerate = async () => {
    //     try {
    //         const response = await generate(criteria).unwrap();
    //         console.log(response)
    //     } catch (err) {
    //         console.error("Error generating questions:", err);
    //     }
    // };
    // useEffect(() => {
    //     handleGenerate();
    // }, [])
    const handleSave = async () => {
        setIsLoadingPage(true);

        const updatedCriteria: CriteriaRequest = {
            ...criteria,
            language,
            options: answers,
            number_of_question: numQuestions,
            candidate_seniority: seniority.toLowerCase(),
            context: text,
        };
        // const updatedCriteria: CriteriaRequest = {
        //     name: "Default Name",
        //     description:  "Default Description",
        //     fields:  ["Default Field"],
        //     duration: "30",
        //     question_type: "multiple_choice",
        //     language: "en",
        //     options: 4,
        //     number_of_question: 3,
        //     candidate_seniority: "itern",   
        //     difficulty:  "Easy",
        //     context: "this is a beautiful",
        // };
        setCriteria(updatedCriteria);

        try {
            const response = await generate(updatedCriteria).unwrap();
            console.log('req', criteria);
            console.log('res', response.questionList);
            setGeneratedData(response);
            onNext();
            setIsLoadingPage(false);
        } catch (err) {
            console.error("Error generating questions:", err);
            setIsLoadingPage(false);
        }

      
    };


    if (isLoadingPage) {
        return (
            <Loading />
        );
    }
    return (
        <div className="relative">
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
                    <div className="bg-[var(--primary-color)] rounded-3xl h-10 w-10  text-white font-bold text-center">
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
            <div className="font-arya text-[24px] font-bold text-center mt-10">
                Now, complete some specific contexts to generate questions...
            </div>
            <div className="flex justify-center">
                <div className="font-arya mt-10 mb-20 h-80 w-[680px] border border-blue-300 border-2  rounded-lg bg-white">
                    <div className="w-full">
                        <div className=" h-[50px] mt-2 flex justify-center items-center">
                            <div className="flex items-center border border-gray-300 rounded-md h-[40px] ">
                                {options.map((opt) => (
                                    <button
                                        key={opt.id}
                                        className={`flex items-center mx-2 px-3 py-1 rounded-md transition ${active === opt.id
                                            ? "bg-teal-600 text-white"
                                            : "text-gray-500 hover:bg-gray-100"
                                            }`}
                                        onClick={() => setActive(opt.id)}
                                    >
                                        {opt.icon}
                                        <span>{opt.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className=" bg-gray-200 h-[240px] mt-2 mb-4 mx-4 rounded-lg">
                            <textarea className="p-2 px-4 bg-gray-200 h-[240px]  rounded-lg w-full"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                maxLength={2000}>
                            </textarea>
                            <div className="relative bottom-8 left-4 text-gray-600 text-sm">
                                {text.length}/{2000}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-12 flex justify-center">
                <button onClick={() => setIsModalOpen(true)} className="bg-[var(--primary-color)] text-white rounded-md py-1 px-10 " >
                    Generate
                </button>
            </div>
            {/* <QuestionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onNextStep={onNext} /> */}
            {
                isModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Question type <span className="text-blue-500 text-sm border border-blue-300 rounded-lg px-2">Pro</span></h2>
                        <div className="my-3 flex justify-between">
                            <label className="block text-lg font-semibold w-1/2">Language</label>
                            <div className="relative w-fit pe-8">
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full border p-2 rounded-md appearance-none"
                                >
                                    <option value="en">Auto</option>
                                    <option value="vie">VietNamese</option>
                                    <option value="en">English</option>
                                </select>
                                <FaChevronDown className="absolute top-3 right-3 text-gray-400" />
                            </div>
                        </div>
                        <div className="my-3 h-10 flex justify-between">
                            <label className="block text-lg font-semibold w-1/2">Options</label>
                            <div className="relative w-fit">
                                <input type="number" className="w-12" value={answers} onChange={(e) => setAnswers(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className="my-3  h-10  flex justify-between">
                            <label className="block text-lg font-semibold w-1/2">Number of question</label>
                            <div className="relative w-fit ">
                                <input type="number" className="w-12" value={numQuestions} onChange={(e) => setNumQuestions(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className="my-3 flex justify-between">
                            <label className="block text-lg font-semibold w-1/2">Candidate seniority</label>
                            <div className="relative w-fit pe-8 ">
                                <select
                                    value={seniority}
                                    onChange={(e) => setSeniority(e.target.value)}
                                    className="w-full border p-2 rounded-md appearance-none"
                                >
                                    <option>Intern</option>
                                    <option>Junior</option>
                                    <option>Mid</option>
                                    <option>Senior</option>
                                </select>
                                <FaChevronDown className="absolute top-3 right-3 text-gray-400" />
                            </div>
                        </div>

                        <div className="flex  gap-1 mt-4">
                            <button onClick={() => setIsModalOpen(false)} className="w-1/2 px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
                            <button
                                onClick={() => handleSave()}
                                className=" text-center w-1/2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-md "> Save </button>
                        </div>
                    </div>
                </div>)
            }
            <div className="absolute top-10 right-10"><img className="w-4" src="https://cdn-icons-png.flaticon.com/512/566/566013.png" alt="" /></div>

        </div>)
};

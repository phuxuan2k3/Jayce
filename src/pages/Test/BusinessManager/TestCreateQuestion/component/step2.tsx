import { useState } from "react";
import { FaFilePdf, FaLink, FaRegFileAlt, FaRegImage } from "react-icons/fa";
import { QuestionModal } from "./Modal";
interface Step1Props {
    onNext: () => void;
}

export const Step2: React.FC<Step1Props> = ({ onNext }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const options = [
        { id: "text", label: "Text", icon: <FaRegFileAlt />, active: true },
        { id: "link", label: "Link", icon: <FaLink /> },
        { id: "image", label: "Image", icon: <FaRegImage /> },
        { id: "pdf", label: "PDF", icon: <FaFilePdf /> },
    ];
    const [text, setText] = useState("");
    const [active, setActive] = useState("text");
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
            <QuestionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onNextStep={onNext} />
        </div>)
};

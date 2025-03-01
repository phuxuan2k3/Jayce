import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNextStep: () => void;
}

export const QuestionModal: React.FC<ModalProps> = ({ isOpen, onClose, onNextStep }) => {
    const [numQuestions, setNumQuestions] = useState(3);
    const [options, setOptions] = useState(4);
    const [seniority, setSeniority] = useState("Intern");
    const [isLoading, setIsLoading] = useState(false);
    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onNextStep();
        }, 2000);
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Question type <span className="text-blue-500 text-sm border border-blue-300 rounded-lg px-2">Pro</span></h2>


                <div className="mb-3">
                    <label className="block text-sm font-medium">Candidate seniority</label>
                    <div className="relative">
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
                <div className="flex justify-between items-center mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-md flex items-center"
                        disabled={isLoading}
                    >
                        {isLoading ? <span className="animate-spin mr-2">🔄</span> : null}
                        {isLoading ? "Saving..." : "Save and generate"}
                    </button>
                </div>
            </div>
        </div>
    );
};

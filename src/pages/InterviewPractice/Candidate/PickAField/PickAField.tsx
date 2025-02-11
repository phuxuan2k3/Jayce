// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
const PickAField = () => {
    const navigate = useNavigate();
   
    const handlePractice = (field:any) => {
        // alert(field)
        navigate("/ipractice/choose", { state: { field } });
    };
    const fields = [
        "Software Development",
        "Web Development",
        "Mobile Development",
        "Cybersecurity",
        "Artificial Intelligence",
        "Data Science",
        "Cloud Computing",]

    return (
        <>
            <div className="flex justify-center text-5xl font-extrabold"> Pick A Field</div>
            <div className="flex justify-center mt-12"> What field do you want to pratice for?</div>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 gap-6 mt-8 px-4 max-h-80 overflow-y-auto w-1/2">
                    {fields.map((field, index) => (
                        <div key={index} className="text-white shadow-lg rounded-lg p-3  cursor-pointer  flex justify-between
                                   hover:bg-green-400 hover:text-white transition duration-300 bg-[var(--primary-color)]" onClick={() => handlePractice(field)}>
                            {field} 
                            <IoChevronForwardCircleOutline className="text-2xl" />
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}

export default PickAField
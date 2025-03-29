import * as React from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { Field } from "../../APIs/types";
import { useListFieldMutation } from "../../APIs/chronobreak.scenario-api";
const PickAField = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 100;

    const handlePractice = (field: Field) => {
        navigate("/ipractice/choose", { state: { field } });
    };

    const [fields, setFields] = React.useState<Field[]>([]);
    
    const [listFieldMutation] = useListFieldMutation();
    React.useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await listFieldMutation({ ids: [], sort_methods: [], page_index: currentPage -1, page_size: pageSize });
                setFields(response.data?.fields || []);
                console.log(response.data?.fields[0]);
            } catch (error) {
                console.log("Error fetching fields", error);
            }
        };

        fetchFields();
    }, []);

    return (
        <>
            <div className="font-arya">
                <div className="flex justify-center text-5xl font-extrabold "> Pick A Field</div>
                <div className="flex justify-center mt-12"> What field do you want to pratice for?</div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 gap-6 mt-8 px-4 max-h-80 overflow-y-auto w-1/2" style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "var(--primary-color)",
                    }}>
                        {fields.map((field, index) => (
                            <div key={index} className=" text-xl text-white shadow-lg rounded-lg p-3  cursor-pointer  flex justify-between
                                   hover:bg-green-400 hover:text-white transition duration-300 bg-[var(--primary-color)]" onClick={() => handlePractice(field)}>
                                {field.name}
                                <IoChevronForwardCircleOutline className="text-2xl" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PickAField
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import QuestionEditCard from "./QuestionEditCard";
import { useTestPersistContext } from "../../../../../../features/tests/stores/test-persist.context";

const EditTestQuestions = () => {
	const { questions, dispatch } = useTestPersistContext();

	return (
		<>
			<div className="w-full max-w-7xl py-6">
				<div className="flex flex-col items-center">
					<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
						<span>Question List ({questions.length})</span>
					</div>

					{/* Question List */}
					{questions.map((_, index) => (
						<QuestionEditCard
							key={index}
							index={index}
						/>
					))}

					<div
						className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-center mb-4 cursor-pointer"
						onClick={() => dispatch({
							type: "ADD_QUESTION",
							payload: {
								text: "",
								options: [""],
								correctOption: 0,
								points: 0,
							},
						})}
					>
						<FontAwesomeIcon className="w-16 h-16" icon={faPlus} />
					</div>
				</div>
			</div>
		</>
	);
}

export default EditTestQuestions;
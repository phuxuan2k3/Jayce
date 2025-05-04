import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import QuestionEditCard from "./QuestionEditCard";
import { useTestPersistContext } from "../../../../../../features/tests/stores/test-persist.context";

const EditTestQuestions = () => {
	const { questions, dispatch } = useTestPersistContext();

	return (
		<div className="w-full h-full py-4 flex flex-col items-center justify-center">
			<div className="flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
				<span>Total questions: {questions.length}	</span>
			</div>

			<div className="w-full flex-1 flex flex-col items-center justify-center space-y-4 mb-4 overflow-y-auto">
				{/* Question List */}
				{questions.map((_, index) => (
					<QuestionEditCard
						key={index}
						index={index}
					/>
				))}
			</div>

			<div
				className="flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-center mb-4 cursor-pointer"
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
				<FontAwesomeIcon className="w-8 h-8" icon={faPlus} />
			</div>
		</div>
	);
}

export default EditTestQuestions;
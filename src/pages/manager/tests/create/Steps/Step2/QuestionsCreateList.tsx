import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTestPersistContext } from "../../../[id]/edit/reducers/test-persist.context";
import { useTestCreateTab } from "../../contexts/test-create-tab.context";
import QuestionCreateCard from "./QuestionCreateCard";

export default function QuestionsCreateList() {
	const { questions, dispatch } = useTestPersistContext();
	const { setActiveTab } = useTestCreateTab();

	return (
		<div className="w-full py-6">
			<div className="flex flex-col items-center h-full">
				<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
					<span>Question List of ({questions.length}) questions</span>
				</div>

				{/* Question List */}
				{questions.map((_, index) => (
					<QuestionCreateCard
						key={index}
						index={index}
					/>
				))}

				<div
					className="w-4/6 flex-grow flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-center mb-4 cursor-pointer"
					onClick={() => dispatch({
						type: "ADD_QUESTION",
						payload: {
							text: "",
							options: ["", "", "", ""],
							correctOption: 0,
							points: 0,
						},
					})}
				>
					<FontAwesomeIcon className="w-16 h-16" icon={faPlus} />
				</div>

				<div className="mt-auto flex justify-center ">
					<button className="bg-white border border-primary text-primary rounded-md py-1 px-10 mr-4" onClick={() => setActiveTab(0)}>
						Back
					</button>
					<button className="bg-[var(--primary-color)] text-white rounded-md py-1 px-10 " onClick={() => setActiveTab(2)}>
						Next
					</button>
				</div>
			</div>
		</div>
	)
}
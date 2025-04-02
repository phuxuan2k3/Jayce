import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import QuestionEditCard from "../../common/QuestionEditCard";
import { testPersistActions, testPersistSelectors } from "../../../../../features/tests/stores/testPersistSlice";

const EditTestQuestions = () => {
	const dispatch = useAppDispatch();
	const questions = useAppSelector(testPersistSelectors.selectQuestionsStrict);
	const {
		addQuestion
	} = testPersistActions;

	return (
		<>
			<div className="w-full max-w-7xl py-6">
				<div className="flex flex-col items-center">
					<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
						<span>Question List ({questions.length})</span>
					</div>

					{/* Question List */}
					{questions.map((question, index) => (
						<QuestionEditCard
							index={index}
							question={question}
						/>
					))}

					<div className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-center mb-4 cursor-pointer" onClick={() => dispatch(addQuestion({
						text: "",
						options: ["", "", "", ""],
						correctOption: 0,
						points: 1,
					}))}>
						<FontAwesomeIcon className="w-16 h-16" icon={faPlus} />
					</div>
				</div>
			</div>
		</>
	);
}

export default EditTestQuestions;
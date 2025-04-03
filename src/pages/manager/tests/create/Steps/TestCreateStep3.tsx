import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { testPersistActions, testPersistSelectors } from "../../../../../features/tests/stores/testPersistSlice";
import QuestionEditCard from "../../common/QuestionEditCard";

export default function TestCreateStep3({
	onNext
}: {
	onNext: () => void
}) {
	const dispatch = useAppDispatch();
	const questions = useAppSelector(testPersistSelectors.selectQuestionsStrict);
	const {
		addQuestion,
	} = testPersistActions;

	return (
		<>
			<div className="w-full flex-grow flex flex-col items-center px-4">
				<div className="w-full flex-1 flex-col mt-6 text-center">
					<div className="w-full text-xl font-semibold font-arya text-[24px]">Now, complete some specific contexts to generate questions... </div>
				</div>

				<div className="w-full max-w-7xl py-6">
					<div className="flex flex-col items-center">
						<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
							<span>Question List of ({questions.length}) questions</span>
						</div>

						{/* Question List */}
						{questions.map((question, index) => (
							<QuestionEditCard
								key={index}
								index={index}
								question={question}
							/>
						))}

						<div onClick={() => dispatch(addQuestion())} className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-center mb-4 cursor-pointer">
							<FontAwesomeIcon className="w-16 h-16" icon={faPlus} />
						</div>
					</div>
				</div>
			</div>
			<div className="pb-12 flex justify-center ">
				<button className="bg-[var(--primary-color)] text-white rounded-md py-1 px-10 " onClick={onNext}>
					Save
				</button>
			</div>
		</>
	)
};

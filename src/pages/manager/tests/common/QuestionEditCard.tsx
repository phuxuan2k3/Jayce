import { QuestionDTO } from '../../../../features/tests/types/crud'
import GradientBorderNotGood from '../../../../components/ui/border/GradientBorder.notgood';
import { useAppDispatch } from '../../../../app/hooks';
import { testPersistActions } from '../../../../features/tests/stores/testPersistSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function QuestionEditCard({
	index,
	question
}: {
	index: number;
	question: Omit<QuestionDTO, "id">;
}) {
	const dispatch = useAppDispatch();
	const {
		addOption,
		setOptionField,
		deleteOption,
		setQuestionField,
		deleteQuestion,
	} = testPersistActions;

	return (
		<div key={index} className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-between mb-4">
			<span className="w-1/5 font-bold mb-2 opacity-50">
				Question {index + 1}
			</span>

			{/* Question and Options */}
			<div className="w-4/5 flex flex-col">

				{/* Question */}
				<div className="w-11/12 mb-4">
					<GradientBorderNotGood className="w-full h-fit font-semibold">
						<input
							type="text"
							value={question.text}
							onChange={(e) => dispatch(setQuestionField({
								index,
								key: "text",
								value: e.target.value,
							}))}
							className="w-full bg-transparent border-none outline-none"
						/>
					</GradientBorderNotGood>
				</div>

				{/* Options */}
				{question.options.map((option, optionIndex) => (
					<div key={optionIndex} className="w-full flex flex-row mt-2" >
						<GradientBorderNotGood className="w-11/12 h-fit">
							<div className="flex items-center justify-between">
								<span className="mr-2">{String.fromCharCode(97 + optionIndex)}.</span>

								{/* Option text */}
								<input
									type="text"
									value={option}
									onChange={(e) => dispatch(setOptionField({
										index,
										optionIndex,
										text: e.target.value,
									}))}
									className="flex-grow bg-transparent border-none outline-none"
								/>

								{/* Delete option button */}
								<FontAwesomeIcon
									icon={faXmark}
									className="w-fit text-gray-500 cursor-pointer ml-2"
									onClick={() => dispatch(deleteOption({
										index,
										optionIndex,
									}))}
								/>
							</div>
						</GradientBorderNotGood>

						{/* Radio button for correct answer */}
						<div className="w-1/12 flex items-center justify-center">
							<input
								type="radio"
								name={`question-${index}`}
								checked={optionIndex === question.correctOption}
								onChange={() => dispatch(setQuestionField({
									index,
									key: "correctOption",
									value: optionIndex,
								}))}
								className="h-4 w-4 border-primary focus:ring-primary accent-primary cursor-pointer"
							/>
						</div>
					</div>
				))}

				{/* Add option button */}
				<div className="text-sm text-gray-500 mt-4 cursor-pointer" onClick={() => dispatch(addOption({
					index,
					text: "",
				}))}>
					<span className="font-semibold text-[var(--primary-color)] underline">+ Add option</span>
				</div>
			</div>

			<div className="w-2/5 h-fit flex justify-end items-center">
				{/* Points */}
				<GradientBorderNotGood className="font-bold w-1/4 mr-2">
					<input
						className="w-full"
						type="number"
						value={question.points}
						min="0"
						step="1"
						onChange={(e) => dispatch(setQuestionField({
							index,
							key: "points",
							value: Number(e.target.value) || 0,
						}))}
					/>
				</GradientBorderNotGood>

				{/* Delete question button */}
				<FontAwesomeIcon className="w-5 h-5 cursor-pointer" icon={faTrashCan} onClick={() => dispatch(deleteQuestion({ index }))} />
			</div>
		</div>
	)
}

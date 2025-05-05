
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { BrainCircuitIcon } from "lucide-react"
import TextareaAutosize from 'react-textarea-autosize';
import { TestQuestion } from '../../../../../../features/tests/stores/test-persist.reducer';
import { QuestionDTO } from '../../../../../../features/tests/types/crud';

export default function QuestionEditFormCard({
	index,
	isAiGenerated = false,
	question,
	onQuestionContentChange,
	onDeleteQuestion,
	onAddOption,
	onOptionContentChange,
	onDeleteOption,
}: {
	index: number;
	isAiGenerated?: boolean;
	question: Omit<QuestionDTO, "id">;
	onDeleteQuestion: (index: number) => void;
	onQuestionContentChange: (index: number, key: keyof TestQuestion, value: string | number) => void;
	onAddOption: (questionIndex: number, option: string) => void;
	onOptionContentChange: (questionIndex: number, optionIndex: number, value: string) => void;
	onDeleteOption: (questionIndex: number, optionIndex: number) => void;
}) {
	return (
		<div className="w-full flex items-start gap-4 rounded-lg border border-primary justify-between px-8 py-6 text-primary bg-white shadow-md">
			<div className="w-fit flex flex-col gap-4 items-start justify-center">
				<span className='font-bold text-gray-500 mt-1'>
					{isAiGenerated && <BrainCircuitIcon size={16} />}
					Question {index + 1}
				</span>

				<div className='flex flex-wrap items-center gap-2 w-full'>
					{/* Points label */}
					<span className="text-sm text-primary-toned-500">Points:</span>
					<input
						className="border border-primary rounded-lg font-semibold px-2 py-1 text-primary focus:outline-none w-[50px]"
						type="number"
						value={question.points}
						min="0"
						step="1"
						onChange={(e) => onQuestionContentChange(index, "points", Number(e.target.value) || 0)}
					/>
				</div>
			</div>

			{/* Question and Options */}
			<div className="flex-1 flex flex-col gap-2">

				{/* Question */}
				<div className="w-11/12 mb-4 flex items-center border border-primary rounded-lg font-bold text-gray-600 bg-gray-50">
					<TextareaAutosize
						value={question.text}
						onChange={(e) => onQuestionContentChange(index, "text", e.target.value)}
						className="w-full bg-transparent border-none outline-none resize-none overflow-hidden px-4 py-1"
						placeholder="Question text"
						minRows={1}
					/>
				</div>

				<div className='flex flex-col gap-2 w-full text-gray-600'>
					{/* Options */}
					{question.options.map((option, optionIndex) => (
						<div key={optionIndex} className="w-full flex flex-row" >
							<div className="w-11/12 h-fit flex items-center justify-between gap-2 border border-primary bg-gray-50 rounded-lg px-4 py-1">
								<span className="mr-2">{String.fromCharCode(97 + optionIndex)}.</span>

								{/* Option text */}
								<TextareaAutosize
									value={option}
									onChange={(e) => onOptionContentChange(index, optionIndex, e.target.value)}
									className="flex-grow bg-transparent border-none outline-none resize-none overflow-hidden"
									placeholder="Option text"
									minRows={1}
								/>

								{/* Delete option button */}
								<FontAwesomeIcon
									icon={faXmark}
									className="w-fit text-gray-500 cursor-pointer ml-2"
									onClick={() => onDeleteOption(index, optionIndex)}
								/>
							</div>

							{/* Radio button for correct answer */}
							<div className="w-1/12 flex items-center justify-center">
								<input
									type="radio"
									name={`question-${index}`}
									checked={optionIndex === question.correctOption}
									onChange={() => onQuestionContentChange(index, "correctOption", optionIndex)}
									className="h-4 w-4 border-primary focus:ring-primary accent-primary cursor-pointer"
								/>
							</div>
						</div>
					))}
				</div>

				{/* Add option button */}
				<div
					className="text-sm cursor-pointer font-semibold text-primary underline mt-4"
					onClick={() => onAddOption(index, "")}
				>
					<span>+ Add option</span>
				</div>
			</div>


			{/* Delete question */}
			<div className="w-fit h-fit flex justify-center items-center">
				<FontAwesomeIcon
					className="w-5 h-5 cursor-pointer text-red-500 mt-2"
					icon={faTrashCan}
					onClick={() => onDeleteQuestion(index)}
				/>
			</div>
		</div>
	)
}

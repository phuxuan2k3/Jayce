
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { QuestionDTO } from '../types/crud';
import GradientBorderNotGood from '../../../components/ui/border/GradientBorder.notgood';
import { TestQuestion } from '../stores/test-persist.reducer';
import { BrainCircuitIcon } from "lucide-react"

export default function QuestionFormCard({
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
		<div className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-between mb-4">
			<span className="min-w-fit w-1/5 font-bold mb-2 opacity-50">
				{isAiGenerated && <BrainCircuitIcon size={16} />} Question {index + 1}
			</span>

			{/* Question and Options */}
			<div className="w-4/5 flex flex-col">

				{/* Question */}
				<div className="w-11/12 mb-4">
					<GradientBorderNotGood className="w-full h-fit font-semibold">
						<input
							type="text"
							value={question.text}
							onChange={(e) => onQuestionContentChange(index, "text", e.target.value)}
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
									onChange={(e) => onOptionContentChange(index, optionIndex, e.target.value)}
									className="flex-grow bg-transparent border-none outline-none"
								/>

								{/* Delete option button */}
								<FontAwesomeIcon
									icon={faXmark}
									className="w-fit text-gray-500 cursor-pointer ml-2"
									onClick={() => onDeleteOption(index, optionIndex)}
								/>
							</div>
						</GradientBorderNotGood>

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

				{/* Add option button */}
				<div className="text-sm text-gray-500 mt-4 cursor-pointer" onClick={() => onAddOption(index, "")}>
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
						onChange={(e) => onQuestionContentChange(index, "points", Number(e.target.value) || 0)}
					/>
				</GradientBorderNotGood>

				{/* Delete question button */}
				<FontAwesomeIcon className="w-5 h-5 cursor-pointer" icon={faTrashCan} onClick={() => onDeleteQuestion(index)} />
			</div>
		</div>
	)
}

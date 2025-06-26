import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';
import { createContext, useContext } from 'react';
import { QuestionPersistOfTest } from "../../commands/question.persist";

type QuestionEditContextType = {
	index: number;
	question: QuestionPersistOfTest;
	onQuestionChange: (edit: Partial<QuestionPersistOfTest>) => void;
	onDeleteQuestion: () => void;
}

const QuestionEditContext = createContext<QuestionEditContextType | undefined>(undefined);
const QuestionEditProvider = QuestionEditContext.Provider;
const useQuestionEditContext = () => {
	const context = useContext(QuestionEditContext);
	if (!context) {
		throw new Error("useQuestionEditContext must be used within a QuestionEditProvider");
	}
	return context;
}

export default function QuestionPersistCard({
	index,
	question,
	onQuestionChange,
	onDeleteQuestion,
}: {
	index: number;
	question: QuestionPersistOfTest;
	onQuestionChange: (edit: Partial<QuestionPersistOfTest>) => void;
	onDeleteQuestion: () => void;
}) {


	return (
		<QuestionEditProvider
			value={{
				index,
				question,
				onQuestionChange,
				onDeleteQuestion,
			}}
		>
			<HorizontalLayout>
				<LeftInfoSection />
				<CenterContentSection />
				<RightDeleteSection />
			</HorizontalLayout>
		</QuestionEditProvider>
	);
}

const HorizontalLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className="w-full flex items-start gap-4 rounded-lg border border-primary justify-between px-8 py-6 text-primary bg-white shadow-md">
			{children}
		</div>
	);
}

const RightDeleteSection = () => {
	const { onDeleteQuestion } = useQuestionEditContext();
	return (
		<div className="w-fit h-fit flex justify-center items-center">
			<FontAwesomeIcon
				className="w-5 h-5 cursor-pointer text-red-500 mt-2"
				icon={faTrashCan}
				onClick={() => onDeleteQuestion()}
			/>
		</div>
	);
}

const LeftInfoSection = () => {
	const { question, onQuestionChange } = useQuestionEditContext();
	return (
		<div className="w-fit flex flex-col gap-4 items-start justify-center">
			<div className='flex flex-wrap items-center gap-2 w-full'>
				{/* Points label */}
				<span className="text-sm text-primary-toned-500">Points:</span>
				<input
					className="border border-primary rounded-lg font-semibold px-2 py-1 text-primary focus:outline-none w-[50px]"
					type="number"
					value={question.points}
					min="0"
					step="1"
					onChange={(e) => onQuestionChange({ points: Number(e.target.value) || 0 })}
				/>
			</div>
		</div>
	);
}

const CenterContentSection = () => {
	const { index, question, onQuestionChange } = useQuestionEditContext();

	const handleOptionChange = (optionIndex: number, value: string) => {
		onQuestionChange({
			options: question.options.map((option, i) => (i === optionIndex ? value : option)),
		});
	}
	const handleDeleteOption = (optionIndex: number) => {
		onQuestionChange({
			options: question.options.filter((_, i) => i !== optionIndex),
		});
	}
	const handleAddOption = (value: string) => {
		onQuestionChange({
			options: [...question.options, value],
		});
	}
	return (
		<div className="flex-1 flex flex-col gap-2">

			{/* Question */}
			<div className="w-11/12 mb-4 flex items-center border border-primary rounded-lg font-bold text-gray-600 bg-gray-50">
				<TextareaAutosize
					value={question.text}
					onChange={(e) => onQuestionChange({ text: e.target.value })}
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
								onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
								className="flex-grow bg-transparent border-none outline-none resize-none overflow-hidden"
								placeholder="Option text"
								minRows={1}
							/>

							{/* Delete option button */}
							<FontAwesomeIcon
								icon={faXmark}
								className="w-fit text-gray-500 cursor-pointer ml-2"
								onClick={() => handleDeleteOption(optionIndex)}
							/>
						</div>

						{/* Radio button for correct answer */}
						<div className="w-1/12 flex items-center justify-center">
							<input
								type="radio"
								name={`question-${index}`}
								checked={optionIndex === question.correctOption}
								onChange={() => onQuestionChange({ correctOption: optionIndex })}
								className="h-4 w-4 border-primary focus:ring-primary accent-primary cursor-pointer"
							/>
						</div>
					</div>
				))}
			</div>

			{/* Add option button */}
			<div
				className="text-sm cursor-pointer font-semibold text-primary underline mt-4"
				onClick={() => handleAddOption("")}
			>
				<span>+ Add option</span>
			</div>
		</div>
	);
}
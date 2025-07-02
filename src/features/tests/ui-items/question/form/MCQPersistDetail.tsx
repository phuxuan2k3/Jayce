import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';
import { MCQDetail } from '../types';

export default function MCQPersistDetail({
	detail,
	questionId,
	onQuestionChange,
}: {
	detail: MCQDetail;
	questionId: number;
	onQuestionChange: (edit: Partial<MCQDetail>) => void;
}) {
	const options = detail.options;
	const correctOption = detail.correctOption;

	const handleOptionChange = (optionIndex: number, value: string) => {
		const newOptions = options.map((option: string, i: number) => (i === optionIndex ? value : option));
		onQuestionChange({ ...detail, options: newOptions, type: 'MCQ', correctOption });
	};
	const handleDeleteOption = (optionIndex: number) => {
		const newOptions = options.filter((_: string, i: number) => i !== optionIndex);
		let newCorrectOption = correctOption;
		if (typeof correctOption === 'number') {
			if (optionIndex === correctOption) newCorrectOption = 0;
			else if (optionIndex < correctOption) newCorrectOption = correctOption - 1;
		}
		onQuestionChange({ ...detail, options: newOptions, type: 'MCQ', correctOption: newCorrectOption });
	};
	const handleAddOption = (value: string) => {
		onQuestionChange({ ...detail, options: [...options, value], type: 'MCQ', correctOption });
	};
	const handleCorrectOptionChange = (optionIndex: number) => {
		onQuestionChange({ ...detail, correctOption: optionIndex, type: 'MCQ', options });
	};

	return (
		<div className='flex flex-col gap-2 w-full text-gray-600'>
			<div className='flex items-center justify-between font-semibold text-sm mb-1'>
				<span>Options:</span>
				<span className='mr-2'>Correct</span>
			</div>

			{/* Options */}
			{options.map((option: string, optionIndex: number) => (
				<div key={optionIndex} className="w-full flex flex-row" >
					<div className="w-11/12 h-fit flex items-center justify-between gap-2 border border-primary bg-gray-50 rounded-lg px-4 py-1">
						<span className="mr-2 font-semibold">{String.fromCharCode(65 + optionIndex)}.</span>
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
							name={`question-${questionId}`}
							checked={optionIndex === correctOption}
							onChange={() => handleCorrectOptionChange(optionIndex)}
							className="h-4 w-4 border-primary focus:ring-primary accent-primary cursor-pointer"
						/>
					</div>
				</div>
			))}
			{/* Add option button */}
			<div
				className="text-sm cursor-pointer font-semibold text-primary underline mt-4 w-fit"
				onClick={() => handleAddOption("")}
			>
				<span>+ Add option</span>
			</div>
		</div>
	);
}

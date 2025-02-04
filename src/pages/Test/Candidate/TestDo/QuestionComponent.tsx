interface QuestionComponentProps {
	questionNumber: number;
	question: string;
	options: string[];
	selectedOption: string | null;
	onOptionChange: (questionNumber: number, selectedOption: string | null) => void;
	goToNextQuestion: () => void;
	isLastQuestion: boolean;
	toggleFlag: (questionNumber: number) => void;
	isFlagged: boolean;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ questionNumber, question, options, selectedOption, onOptionChange, goToNextQuestion, isLastQuestion, toggleFlag, isFlagged }) => {
	const handleOptionChange = (choiceId: string) => {
		onOptionChange(questionNumber, choiceId);
	};

	const clearSelection = () => {
		onOptionChange(questionNumber, null);
	};

	console.log(selectedOption);
	console.log(Number(selectedOption));

	return (
		<div className="flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-primary">
			<div className="w-1/5 mb-4 bg-white rounded-lg shadow-primary p-6 h-fit border-r border-b border-primary">
				<div className="text-lg font-semibold mb-2">Question {questionNumber}</div>
				<p className="text-[#39A0AD]">{selectedOption === null ? "Not yet answered" : "Already answered"}</p>
				<p className="text-[#39A0AD]">Marked out of 1.00</p>
				<div className="flex justify-end">
					<p className="text-[#A04D38] mt-4 hover:underline cursor-pointer" onClick={() => toggleFlag(questionNumber)}>
						{isFlagged ? "🏴 Flagged" : "Flag question"}
					</p>
				</div>
			</div>
			<div className="w-4/5">
				<div className="mb-4 bg-[#EAF6F8] rounded-lg shadow-md p-6 pl-4">
					<p className="text-lg font-medium border-b border-black pb-4">{question}</p>
					<div className="space-y-3 mt-4">
						{options.map((option, index) => {
							const label = String.fromCharCode(97 + index);
							return (
								<label
									key={index}
									className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
								>
									<input
										type="radio"
										name="question"
										value={option}
										checked={selectedOption != null && Number(selectedOption) === index}
										onChange={() => handleOptionChange(index.toString())}
										className="h-4 w-4 border-primary focus:ring-primary accent-primary cursor-pointer"
									/>
									<span>{label}. {option}</span>
								</label>
							);
						})}
					</div>
					<div className="flex justify-end">
						<p className="w-fit mt-4 text-[#A04D38] px-6 py-2 hover:underline cursor-pointer" onClick={clearSelection}>Clear my choice</p>
					</div>
				</div>
				<div className="flex justify-end">
					{!isLastQuestion && (
						<button className="text-md font-bold bg-gradient-text text-white px-6 py-2 rounded-lg" onClick={goToNextQuestion}>
							Next
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default QuestionComponent;
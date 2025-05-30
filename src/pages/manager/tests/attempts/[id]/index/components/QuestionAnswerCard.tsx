import { QuestionAnswer } from '../types/type'

export default function QuestionAnswerCard({
	questionAnswer,
	questionIndex,
}: {
	questionAnswer: QuestionAnswer;
	questionIndex?: number;
}) {
	const { question, answer } = questionAnswer;
	const isAnswered = answer !== null;
	const chosenOptionIndex = answer?.chosenOption;

	// Calculate if the answer is correct
	const isCorrect = isAnswered && chosenOptionIndex === question.correctOption;

	return (
		<div className="bg-white border border-primary-toned-300 rounded-lg shadow-md p-6 mb-4">
			{/* Header */}
			<div className="flex justify-between items-start mb-4">
				<div className="flex items-center gap-3">
					{questionIndex !== undefined && (
						<div className="bg-primary-toned-100 text-primary-toned-700 font-semibold px-3 py-1 rounded-full text-sm">
							Question {questionIndex + 1}
						</div>
					)}
					<div className="bg-primary-toned-50 text-primary-toned-600 px-3 py-1 rounded-lg text-sm font-medium">
						{question.points} {question.points === 1 ? 'point' : 'points'}
					</div>
				</div>

				{/* Answer Status */}
				<div className={`px-3 py-1 rounded-full text-sm font-semibold ${!isAnswered
					? 'bg-gray-100 text-gray-600'
					: isCorrect
						? 'bg-green-100 text-green-700'
						: 'bg-red-100 text-red-700'
					}`}>
					{!isAnswered ? 'Not Answered' : isCorrect ? 'Correct' : 'Incorrect'}
				</div>
			</div>

			{/* Question Text */}
			<div className="mb-6">
				<h3 className="text-lg font-semibold text-primary-toned-800 mb-2">
					{question.text}
				</h3>
			</div>

			{/* Options */}
			<div className="space-y-3">
				{question.options.map((option, optionIndex) => {
					const isCorrectOption = optionIndex === question.correctOption;
					const isChosenOption = isAnswered && optionIndex === chosenOptionIndex;

					let optionClasses = "flex items-start space-x-3 p-3 rounded-lg border-2 transition-all duration-200 ";

					if (isCorrectOption) {
						// Correct answer - always show as correct
						optionClasses += "bg-green-50 border-green-300 text-green-800";
					} else if (isChosenOption) {
						// Chosen wrong answer
						optionClasses += "bg-red-50 border-red-300 text-red-800";
					} else {
						// Default option
						optionClasses += "bg-gray-50 border-gray-200 text-gray-700";
					}

					return (
						<div key={optionIndex} className={optionClasses}>
							{/* Option Letter */}
							<div className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold text-sm ${isCorrectOption
								? 'bg-green-500 text-white'
								: isChosenOption
									? 'bg-red-500 text-white'
									: 'bg-gray-300 text-gray-600'
								}`}>
								{String.fromCharCode(65 + optionIndex)}
							</div>

							{/* Option Text */}
							<div className="flex-1">
								<span className="text-sm font-medium">{option}</span>
							</div>

							{/* Status Icons */}
							<div className="flex items-center space-x-2">
								{isCorrectOption && (
									<div className="flex items-center space-x-1">
										<div className="w-2 h-2 bg-green-500 rounded-full"></div>
										<span className="text-xs font-medium text-green-700">Correct</span>
									</div>
								)}
								{isChosenOption && !isCorrectOption && (
									<div className="flex items-center space-x-1">
										<div className="w-2 h-2 bg-red-500 rounded-full"></div>
										<span className="text-xs font-medium text-red-700">Selected</span>
									</div>
								)}
								{isChosenOption && isCorrectOption && (
									<div className="flex items-center space-x-1">
										<div className="w-2 h-2 bg-green-500 rounded-full"></div>
										<span className="text-xs font-medium text-green-700">Selected & Correct</span>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{/* Footer - Score Information */}
			<div className="mt-6 pt-4 border-t border-primary-toned-200">
				<div className="flex justify-between items-center">
					<div className="text-sm text-primary-toned-600">
						{isAnswered ? 'Answer submitted' : 'No answer provided'}
					</div>
					<div className="flex items-center space-x-4">
						<div className="text-sm">
							<span className="text-primary-toned-600">Score: </span>
							<span className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
								{isCorrect ? question.points : 0} / {question.points}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

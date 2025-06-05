import { QuestionItemProps } from '../types';

export const QuestionItem = ({ question, index }: QuestionItemProps) => {
	return (
		<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
			{/* Question Header */}
			<div className="flex justify-between items-start mb-3">
				<div className="flex items-center gap-3">
					<span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
						Q{index + 1}
					</span>
					<h3 className="text-lg font-medium text-gray-800">
						{question.text || "No question text provided"}
					</h3>
				</div>
				<span className="bg-primary-toned-100 text-primary-toned-800 px-3 py-1 rounded-full text-sm font-bold">
					{question.points} {question.points === 1 ? "point" : "points"}
				</span>
			</div>

			{/* Question Options */}
			<div className="space-y-2 ml-12">
				{question.options.map((option: string, optionIndex: number) => (
					<div
						key={optionIndex}
						className={`p-3 rounded-md border flex items-start gap-3 ${optionIndex === question.correctOption
								? "border-green-500 bg-green-50"
								: "border-gray-200 bg-white"
							}`}
					>
						<div className={`w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 ${optionIndex === question.correctOption
								? "bg-green-500 text-white"
								: "bg-gray-200 text-gray-700"
							}`}>
							{String.fromCharCode(65 + optionIndex)}
						</div>
						<span className="text-gray-700">{option || "No option text"}</span>
						{optionIndex === question.correctOption && (
							<span className="ml-auto text-green-600 font-medium text-sm">
								✓ Correct Answer
							</span>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

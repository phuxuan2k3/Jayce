import React from 'react';
import { QuestionHideAnswer, QuestionCore } from '../../../../../../../features/tests/model/question.model';
import { Eye } from 'lucide-react';

interface QuestionProps {
	question: QuestionHideAnswer | QuestionCore;
	showAnswer: boolean;
	onViewAnswer?: () => void;
	isLoadingAnswer?: boolean;
}

const Question: React.FC<QuestionProps> = ({ question, showAnswer, onViewAnswer, isLoadingAnswer = false }) => {
	const isQuestionCore = 'correctOption' in question;

	return (
		<div className="bg-white rounded-lg shadow-md p-6 mb-4">
			<div className="flex justify-between items-center mb-2">
				<h3 className="text-lg font-semibold">{question.text}</h3>
				<span className="text-sm bg-primary-toned-100 text-primary-toned-700 px-2 py-1 rounded-full">
					{question.points} points
				</span>
			</div>

			<div className="space-y-2 mt-4">
				{question.options.map((option, index) => (
					<div
						key={index}
						className={`p-3 rounded-md border ${showAnswer && isQuestionCore && index === question.correctOption
							? 'bg-green-50 border-green-500 text-green-700'
							: 'bg-gray-50 border-gray-200'
							}`}
					>
						{option}
						{showAnswer && isQuestionCore && index === question.correctOption && (
							<span className="ml-2 text-green-600 font-medium">(Correct Answer)</span>
						)}
					</div>
				))}
			</div>

			{!showAnswer && onViewAnswer && (
				<button
					onClick={onViewAnswer}
					disabled={isLoadingAnswer}
					className={`mt-4 flex items-center ${isLoadingAnswer ? 'text-gray-400 cursor-not-allowed' : 'text-primary'} font-medium`}
				>
					{isLoadingAnswer ? (
						<>
							<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-400 mr-2"></div>
							Loading Answer...
						</>
					) : (
						<>
							<Eye size={18} className="mr-1" />
							View Answer
						</>
					)}
				</button>
			)}
		</div>
	);
};

export default Question;
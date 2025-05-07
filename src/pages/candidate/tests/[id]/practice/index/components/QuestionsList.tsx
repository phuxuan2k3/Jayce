import React from 'react';
import { QuestionHideAnswer, QuestionCore } from '../../../../../../../features/tests/model/question.model';
import Question from './Question';
import { Eye, EyeOff } from 'lucide-react';

interface QuestionsListProps {
	questions: QuestionHideAnswer[];
	questionsWithAnswers: Record<number, QuestionCore>;
	handleViewAnswer: (questionId: number) => void;
	handleViewAllAnswers: () => void;
	setShowQuestions: (show: boolean) => void;
	loadingAllAnswers: boolean;
	loadingAnswerIds: number[];
}

const QuestionsList: React.FC<QuestionsListProps> = ({
	questions,
	questionsWithAnswers,
	handleViewAnswer,
	handleViewAllAnswers,
	setShowQuestions,
	loadingAllAnswers,
	loadingAnswerIds
}) => {
	if (questions.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-64">
				<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
				<p className="mt-4 text-lg text-gray-600">Generating your test...</p>
			</div>
		);
	}

	return (
		<div className="mt-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-semibold text-gray-800">Questions</h2>
				<div className="flex items-center space-x-4">
					{questions.length > 0 && (
						<button
							onClick={handleViewAllAnswers}
							disabled={loadingAllAnswers || Object.keys(questionsWithAnswers).length === questions.length}
							className={`text-primary flex items-center hover:text-primary-toned-700 transition-colors 
                                ${loadingAllAnswers ? 'opacity-50 cursor-not-allowed' : ''}
                                ${Object.keys(questionsWithAnswers).length === questions.length ? 'opacity-50 cursor-not-allowed' : ''}`}
						>
							{loadingAllAnswers ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary mr-2"></div>
									Loading Answers...
								</>
							) : (
								<>
									<Eye size={16} className="mr-1" />
									{Object.keys(questionsWithAnswers).length === questions.length
										? 'All Answers Visible'
										: 'View All Answers'}
								</>
							)}
						</button>
					)}
					<button
						onClick={() => setShowQuestions(false)}
						className="text-gray-600 flex items-center hover:text-primary transition-colors"
					>
						<EyeOff size={16} className="mr-1" />
						Hide Questions
					</button>
				</div>
			</div>

			<div className="space-y-4">
				{questions.map(question => (
					<Question
						key={question.id}
						question={questionsWithAnswers[question.id] || question}
						showAnswer={!!questionsWithAnswers[question.id]}
						onViewAnswer={() => handleViewAnswer(question.id)}
						isLoadingAnswer={loadingAnswerIds.includes(question.id)}
					/>
				))}
			</div>
		</div>
	);
};

export default QuestionsList;
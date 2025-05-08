import React, { useState } from "react";
import { QuestionCore } from "../../../../../../features/tests/model/question.model";
import MyPagination from "../../../../../../components/ui/common/MyPagination";
import { QuestionCardDefault } from "../../../../../../features/tests/ui2/QuestionCard";

interface QuestionsTabContentProps {
	isLoading: boolean;
	questions: QuestionCore[] | null;
	testTitle: string;
	hasAttempts: boolean; // New prop to indicate if user has attempts
}

const QuestionsTabContent: React.FC<QuestionsTabContentProps> = ({
	isLoading,
	questions,
	testTitle,
	hasAttempts,
}) => {
	const [showQuestions, setShowQuestions] = useState(hasAttempts); // Auto-show questions if user has attempts
	const [showAllAnswers, setShowAllAnswers] = useState(false);
	const [visibleAnswers, setVisibleAnswers] = useState<Record<number, boolean>>({});
	const [currentPage, setCurrentPage] = useState(1);
	const questionsPerPage = 5;

	// Calculate total points
	const totalPoints = questions?.reduce((sum, q) => sum + q.points, 0) || 0;

	// Pagination logic
	const indexOfLastQuestion = currentPage * questionsPerPage;
	const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
	const currentQuestions = questions?.slice(indexOfFirstQuestion, indexOfLastQuestion) || [];
	const totalPages = Math.ceil((questions?.length || 0) / questionsPerPage);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleToggleAnswer = (questionId: number) => {
		setVisibleAnswers(prev => ({
			...prev,
			[questionId]: !prev[questionId]
		}));
	};

	const handleToggleAllAnswers = () => {
		const newShowAllAnswers = !showAllAnswers;
		setShowAllAnswers(newShowAllAnswers);

		if (newShowAllAnswers) {
			// Create an object with all question IDs set to true
			const allVisible = (questions || []).reduce((acc, question) => {
				acc[question.id] = true;
				return acc;
			}, {} as Record<number, boolean>);
			setVisibleAnswers(allVisible);
		} else {
			// Hide all answers
			setVisibleAnswers({});
		}
	};

	return (
		<div className="flex flex-col gap-4">
			{isLoading ? (
				<div className="flex justify-center items-center h-40">
					<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
				</div>
			) : !questions || questions.length === 0 ? (
				<div className="bg-white rounded-lg shadow-md p-6 text-center">
					<p className="text-gray-600">No questions available for this test.</p>
				</div>
			) : (
				<>
					{/* Questions Summary Section */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h3 className="text-lg font-semibold mb-3">Questions Summary</h3>
						<div className="flex flex-col gap-2 mb-4">
							<p><span className="font-medium">Test Name:</span> {testTitle}</p>
							<p><span className="font-medium">Total Questions:</span> {questions.length}</p>
							<p><span className="font-medium">Total Points:</span> {totalPoints}</p>
						</div>

						{/* Show warning only if user has no attempts */}
						{!showQuestions && !hasAttempts && (
							<div className="mt-4 text-center">
								<p className="text-amber-600 mb-2">
									Viewing questions may reveal test content. Are you sure you want to continue?
								</p>
								<button
									className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
									onClick={() => setShowQuestions(true)}
								>
									View Questions
								</button>
							</div>
						)}
					</div>

					{/* Questions List Section */}
					{showQuestions && (
						<div className="bg-white rounded-lg shadow-md p-6">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-lg font-semibold">Test Questions</h3>
								<button
									className="px-3 py-1.5 text-sm border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
									onClick={handleToggleAllAnswers}
								>
									{showAllAnswers ? "Hide All Answers" : "Show All Answers"}
								</button>
							</div>

							<div className="space-y-4">
								{currentQuestions.map((question) => (
									<QuestionCardDefault
										key={question.id}
										question={question}
										showAnswer={visibleAnswers[question.id] || false}
										onToggleAnswer={() => handleToggleAnswer(question.id)}
									/>
								))}
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="mt-6 flex justify-center">
									<MyPagination
										totalPage={totalPages}
										initialPage={currentPage}
										onPageChange={handlePageChange}
									/>
								</div>
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default QuestionsTabContent;
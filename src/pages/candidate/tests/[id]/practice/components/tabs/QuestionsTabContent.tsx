import React, { useState } from "react";
import MyPagination from "../../../../../../../components/ui/common/MyPagination";
import useQuestionsTab from "../../hooks/questions/useQuestionsTab";
import useShowQuestions from "../../hooks/questions/useShowQuestions";
import useArrayPagination from "../../../../../../../components/hooks/useArrayPagination";

interface QuestionsTabContentProps {
	testTitle: string;
}

const QuestionsTabContent: React.FC<QuestionsTabContentProps> = ({
	testTitle,
}) => {
	const {
		data: {
			questionsWithAnswers,
			practiceAggregate: { totalPoints, numberOfQuestions },
		},
		isLoading,
		hasAttempts,
	} = useQuestionsTab();

	const {
		page,
		pageItems,
		perPage,
		setPage,
		totalPages,
	} = useArrayPagination(questionsWithAnswers || [], 10);

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
			) : !questionsWithAnswers || questionsWithAnswers.length === 0 ? (
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
							<p><span className="font-medium">Number of Questions:</span> {numberOfQuestions}</p>
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
									<QuestionCardNoAnswer
										key={question.id}
										question={question}
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
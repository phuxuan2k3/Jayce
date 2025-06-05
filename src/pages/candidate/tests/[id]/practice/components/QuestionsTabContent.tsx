import React from "react";
import MyPagination from "../../../../../../components/ui/common/MyPagination";
import useQuestionsTab from "../hooks/useQuestionsTab";
import { QuestionCoreCardDefault } from "../../../../../../features/tests/ui/question/QuestionCoreCard";

const QuestionsTabContent: React.FC = () => {
	const {
		isLoading,
		practice,
		showQuestions,
		showWarning,
		handleShowQuestions,
		showAllAnswers,
		isQuesionAnswerVisible,
		handleToggleAllAnswers,
		handleToggleAnswer,
		page,
		setPage,
		totalPages,
		practiceAggregate: {
			numberOfQuestions,
			totalPoints,
		},
		pageItems: currentQuestions,
	} = useQuestionsTab();

	return (
		<div className="flex flex-col gap-4">
			{isLoading ? (
				<div className="flex justify-center items-center h-40">
					<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
				</div>
			) : (
				<>
					{/* Questions Summary Section */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h3 className="text-lg font-semibold mb-3">Questions Summary</h3>
						<div className="flex flex-col gap-2 mb-4">
							<p><span className="font-medium">Test Name:</span> {practice?.title}</p>
							<p><span className="font-medium">Number of Questions:</span> {numberOfQuestions}</p>
							<p><span className="font-medium">Total Points:</span> {totalPoints}</p>
						</div>

						{/* Show warning only if user has no attempts */}
						{showWarning && (
							<div className="mt-4 text-center">
								<p className="text-amber-600 mb-2">
									Viewing questions may reveal test content. Are you sure you want to continue?
								</p>
								<button
									className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
									onClick={() => handleShowQuestions()}
								>
									View Questions
								</button>
							</div>
						)}
					</div>

					{/* Questions List Section */}
					{showQuestions && (
						currentQuestions.length === 0 ? (
							<div className="flex justify-center items-center h-40">
								<p className="text-gray-500">No questions available.</p>
							</div>
						) : (
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
										<QuestionCoreCardDefault
											key={question.id}
											question={question}
											onToggleAnswer={() => handleToggleAnswer(question.id)}
											showAnswer={isQuesionAnswerVisible(question.id)}
										/>
									))}
								</div>

								{/* Pagination */}
								{totalPages > 1 && (
									<div className="mt-6 flex justify-center">
										<MyPagination
											totalPage={totalPages}
											initialPage={page}
											onPageChange={setPage}
										/>
									</div>
								)}
							</div>
						)
					)}
				</>
			)}
		</div>
	);
};

export default QuestionsTabContent;
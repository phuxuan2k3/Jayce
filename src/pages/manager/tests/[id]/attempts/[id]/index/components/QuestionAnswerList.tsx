import { QuestionAnswer } from '../type'
import QuestionAnswerCard from './QuestionAnswerCard'
import useArrayPagination from '../../../../../../../../components/hooks/useArrayPagination';
import MyPagination from '../../../../../../../../components/ui/common/MyPagination';

interface QuestionAnswerListProps {
	questionsAnswers: QuestionAnswer[];
	isLoading?: boolean;
	perPage?: number;
}

export default function QuestionAnswerList({
	questionsAnswers,
	isLoading = false,
	perPage = 5,
}: QuestionAnswerListProps) {
	const {
		totalPages,
		page,
		setPage,
		pageItems,
	} = useArrayPagination(questionsAnswers, perPage);

	// Calculate statistics
	const totalQuestions = questionsAnswers.length;
	const answeredQuestions = questionsAnswers.filter(qa => qa.answer !== null).length;
	const correctAnswers = questionsAnswers.filter(qa =>
		qa.answer !== null && qa.answer.chosenOption === qa.question.correctOption
	).length;

	// Loading state
	if (isLoading) {
		return (
			<div className="space-y-6">
				<div className="bg-primary-toned-50 border border-primary-toned-200 rounded-lg p-6">
					<div className="animate-pulse">
						<div className="h-6 bg-primary-toned-200 rounded w-1/3 mb-4"></div>
						<div className="space-y-2">
							<div className="h-4 bg-primary-toned-200 rounded w-full"></div>
							<div className="h-4 bg-primary-toned-200 rounded w-3/4"></div>
						</div>
					</div>
				</div>
				{[...Array(3)].map((_, i) => (
					<div key={i} className="bg-white border border-primary-toned-300 rounded-lg shadow-md p-6">
						<div className="animate-pulse">
							<div className="flex justify-between items-start mb-4">
								<div className="flex items-center gap-3">
									<div className="h-8 bg-primary-toned-200 rounded-full w-20"></div>
									<div className="h-8 bg-primary-toned-200 rounded-lg w-16"></div>
								</div>
								<div className="h-8 bg-primary-toned-200 rounded-full w-24"></div>
							</div>
							<div className="h-6 bg-primary-toned-200 rounded w-3/4 mb-6"></div>
							<div className="space-y-3">
								{[...Array(4)].map((_, j) => (
									<div key={j} className="h-12 bg-primary-toned-100 rounded-lg"></div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}

	// Empty state
	if (totalQuestions === 0) {
		return (
			<div className="text-center py-12">
				<div className="bg-primary-toned-50 border-2 border-dashed border-primary-toned-300 rounded-lg p-8">
					<div className="w-16 h-16 mx-auto mb-4 bg-primary-toned-200 rounded-full flex items-center justify-center">
						<svg className="w-8 h-8 text-primary-toned-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-primary-toned-800 mb-2">
						No Questions Available
					</h3>
					<p className="text-primary-toned-600">
						There are no questions to display at this time.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Summary Header */}
			<div className="bg-primary-toned-50 border border-primary-toned-200 rounded-lg p-6">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h2 className="text-xl font-bold text-primary-toned-800 mb-2">
							Question Analysis
						</h2>
						<p className="text-primary-toned-600">
							Detailed breakdown of {totalQuestions} question{totalQuestions !== 1 ? 's' : ''}
						</p>
					</div>
					<div className="flex flex-wrap gap-4">
						<div className="bg-white border border-primary-toned-300 rounded-lg px-4 py-2 text-center">
							<div className="text-2xl font-bold text-primary-toned-800">{totalQuestions}</div>
							<div className="text-sm text-primary-toned-600">Total Questions</div>
						</div>
						<div className="bg-white border border-primary-toned-300 rounded-lg px-4 py-2 text-center">
							<div className="text-2xl font-bold text-blue-600">{answeredQuestions}</div>
							<div className="text-sm text-primary-toned-600">Answered</div>
						</div>
						<div className="bg-white border border-primary-toned-300 rounded-lg px-4 py-2 text-center">
							<div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
							<div className="text-sm text-primary-toned-600">Correct</div>
						</div>
						<div className="bg-white border border-primary-toned-300 rounded-lg px-4 py-2 text-center">
							<div className="text-2xl font-bold text-red-600">{answeredQuestions - correctAnswers}</div>
							<div className="text-sm text-primary-toned-600">Incorrect</div>
						</div>
					</div>
				</div>
			</div>

			{/* Pagination Info */}
			{totalPages > 1 && (
				<div className="flex justify-between items-center">
					<div className="text-sm text-primary-toned-600">
						Showing {((page - 1) * perPage) + 1} to {Math.min(page * perPage, totalQuestions)} of {totalQuestions} questions
					</div>
					<div className="text-sm text-primary-toned-600">
						Page {page} of {totalPages}
					</div>
				</div>
			)}

			{/* Questions List */}
			<div className="space-y-4">
				{pageItems.map((questionAnswer, index) => {
					const globalIndex = (page - 1) * perPage + index;
					return (
						<QuestionAnswerCard
							key={globalIndex}
							questionAnswer={questionAnswer}
							questionIndex={globalIndex}
						/>
					);
				})}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex justify-center mt-8">
					<MyPagination
						totalPage={totalPages}
						initialPage={page}
						onPageChange={setPage}
					/>
				</div>
			)}

			{/* Footer Summary */}
			{totalQuestions > 0 && (
				<div className="bg-primary-toned-50 border border-primary-toned-200 rounded-lg p-4">
					<div className="text-center text-sm text-primary-toned-600">
						{answeredQuestions === totalQuestions ? (
							<span>All questions have been answered</span>
						) : (
							<span>{totalQuestions - answeredQuestions} question{totalQuestions - answeredQuestions !== 1 ? 's' : ''} remain unanswered</span>
						)}
						{answeredQuestions > 0 && (
							<span className="ml-2">
								• Accuracy: {Math.round((correctAnswers / answeredQuestions) * 100)}%
							</span>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

import { useMemo, useState } from 'react';
import ActionsDialog from './components/ActionsDialog';
import useArrayPagination from '../../../../../../components/hooks/useArrayPagination';
import MyPagination from '../../../../../../components/ui/common/MyPagination';
import QuestionPersistCard from '../../../../../../features/tests/ui-items/question/form/QuestionPersist';
import { QuestionPersistCoreSchema } from '../../../../../../features/tests/ui-items/question/types';

export default function StepDone({
	questions,
	onReplaceQuestions,
	onAppendQuestions,
	onGenerationDisposal,
	onRegenerateQuestions,
}: {
	questions: QuestionPersistCoreSchema[];
	onReplaceQuestions: (questions: QuestionPersistCoreSchema[]) => void;
	onAppendQuestions: (questions: QuestionPersistCoreSchema[]) => void;
	onGenerationDisposal: () => void;
	onRegenerateQuestions: () => void;
}) {
	const [isActionsDialogOpen, setIsActionsDialogOpen] = useState(false);
	const [draftQuestions, setDraftQuestions] = useState<QuestionPersistCoreSchema[]>(questions);

	const totalQuestions = draftQuestions.length;
	const totalPoints = useMemo(() => draftQuestions.reduce((sum, question) => sum + (question.points || 0), 0), [draftQuestions]);

	const {
		page,
		setPage,
		pageItems,
		totalPages,
	} = useArrayPagination(draftQuestions, 5);

	return (
		<>
			<div className="w-full max-w-4xl mx-auto p-6 space-y-6">
				{/* Header */}
				<div className="text-center border-b pb-4">
					<h1 className="text-3xl font-bold text-primary-dark mb-2">Exam Questions Generated Successfully! 🎉</h1>
					<p className="text-gray-600">You have successfully generated {totalQuestions} questions for your exam.</p>
					<p className="text-gray-600">Total Points: <span className="font-semibold">{totalPoints}</span></p>
				</div>

				{/* Questions List */}
				<div className="space-y-6">
					{pageItems.map((question, index) => (
						<QuestionPersistCard
							key={index}
							index={index}
							onDeleteQuestion={() => {
								const updatedQuestions = draftQuestions.filter((_, i) => i !== index);
								setDraftQuestions(updatedQuestions);
							}}
							onQuestionChange={(partialQuestion) => {
								const updatedQuestions = draftQuestions.map((q, i) =>
									i === index ? { ...q, ...partialQuestion } : q
								);
								setDraftQuestions(updatedQuestions);
							}}
							question={question}
						/>
					))}
				</div>

				<div className='flex justify-center'>
					{/* Pagination Controls */}
					<MyPagination
						totalPage={totalPages}
						initialPage={page}
						onPageChange={setPage}
					/>
				</div>

				{/* Footer */}
				<div>
					<div className="text-center mt-8">
						<p className="text-gray-600">You can now review and finalize your exam questions.</p>
						<p className="text-gray-600">Once you're satisfied, you can proceed to the next steps.</p>
					</div>					<div className="flex justify-center mt-6 space-x-4">
						<button
							onClick={() => setIsActionsDialogOpen(true)}
							className="bg-primary-toned-600 text-white px-6 py-2 rounded hover:bg-primary-toned-700 transition-colors"
						>
							Review Actions
						</button>
						<button
							onClick={onRegenerateQuestions}
							className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
						>
							Re-Generate Questions
						</button>
						<button
							onClick={() => window.location.reload()}
							className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition-colors"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
			{isActionsDialogOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<ActionsDialog
						onCancel={() => setIsActionsDialogOpen(false)}
						onReplaceQuestions={() => {
							onReplaceQuestions(draftQuestions);
							setIsActionsDialogOpen(false);
						}}
						onAppendQuestions={() => {
							onAppendQuestions(draftQuestions);
							setIsActionsDialogOpen(false);
						}}
						onDisposeQuestions={() => {
							onGenerationDisposal();
							setIsActionsDialogOpen(false);
						}}
					/>
				</div>
			)}
		</>
	);
}

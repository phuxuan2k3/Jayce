import { useMemo, useState } from 'react';
import ActionsDialog from './components/ActionsDialog';
import useArrayPagination from '../../../../../../components/hooks/useArrayPagination';
import MyPagination from '../../../../../../components/ui/common/MyPagination';
import QuestionPersistCard from '../../../../../../features/tests/ui-items/question/form/QuestionPersist';
import { QuestionPersistCoreSchema } from '../../../../../../features/tests/ui-items/question/types';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import { PencilLine, Sparkles, Trash2 } from 'lucide-react';
import DisposeDialog from './components/DisposeDialog';
import { useLanguage } from '../../../../../../LanguageProvider';

const perPage = 5;

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
	const { t } = useLanguage();

	const [isActionsDialogOpen, setIsActionsDialogOpen] = useState(false);
	const [isDisposeDialogOpen, setIsDisposeDialogOpen] = useState(false);

	const [draftQuestions, setDraftQuestions] = useState<QuestionPersistCoreSchema[]>(questions);

	const totalQuestions = draftQuestions.length;
	const totalPoints = useMemo(() => draftQuestions.reduce((sum, question) => sum + (question.points || 0), 0), [draftQuestions]);

	const {
		page,
		setPage,
		pageItems,
		totalPages,
	} = useArrayPagination(draftQuestions, perPage);

	return (
		<>
			<div className="w-full p-6 flex flex-col gap-6">
				{/* Header */}
				<div className="text-center mb-4">
					<h1 className="text-3xl font-bold text-primary mb-2">{t("step_done_generated_questions").replace("{{count}}", totalQuestions.toString())}</h1>
					<p className="text-gray-600">{t("step_done_total_points")}: <span className="font-semibold">{totalPoints}</span></p>
					<p className="text-gray-600">{t("step_done_edit_message")}</p>
				</div>

				<hr className="border-primary-toned-300 w-full my-4" />

				{/* Questions List */}
				<div className="space-y-6">
					{pageItems.map((question, index) => (
						<QuestionPersistCard
							key={index}
							index={index + (page - 1) * perPage}
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

				<hr className="border-gray-200 w-full my-4" />

				<div className='grid grid-cols-[auto_1fr] gap-8 p-6 rounded-lg shadow-md border border-primary-toned-300'>
					<div className='flex flex-col items-stretch justify-center'>
						<MyButton
							onClick={() => setIsActionsDialogOpen(true)}
						>
							<PencilLine className="w-4 h-4 mr-2" />
							{t("step_done_review_actions")}
						</MyButton>
					</div>
					<div className='flex flex-col gap-2'>
						<p className='text-sm text-gray-700'>{t("step_done_review_description")}</p>
					</div>

					<div className='flex flex-col items-stretch justify-center'>
						<MyButton
							onClick={onRegenerateQuestions}
							variant={"gradient"}
						>
							<Sparkles className="w-4 h-4 mr-2" />
							{t("step_done_regenerate")}
						</MyButton>
					</div>

					<div className='flex flex-col gap-2'>
						<p className='text-sm text-gray-700'>{t("step_done_regenerate_description")}</p>
					</div>

					<div className='flex flex-col items-stretch justify-center'>
						<MyButton
							onClick={() => setIsDisposeDialogOpen(true)}
							variant={"secondary"}
						>
							<Trash2 className="w-4 h-4 mr-2" />
							{t("step_done_dispose")}
						</MyButton>
					</div>

					<div className='flex flex-col gap-2'>
						<p className='text-sm text-gray-700'>{t("step_done_dispose_description")}</p>
					</div>
				</div>
			</div>
			{isActionsDialogOpen && (
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
				/>
			)}

			{isDisposeDialogOpen && (
				<DisposeDialog
					onCancel={() => setIsDisposeDialogOpen(false)}
					onConfirm={() => {
						setIsDisposeDialogOpen(false);
						onGenerationDisposal();
					}}
				/>
			)}
		</>
	);
}

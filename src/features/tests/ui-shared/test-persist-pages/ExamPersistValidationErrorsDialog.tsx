import { AlertTriangle, Settings, Edit3 } from 'lucide-react';
import { z } from 'zod';
import { useMemo } from 'react';
import { ExamPersistZodSchemaType } from '../../schemas/exam-persist-zod';
import MyDialog from '../../ui/MyDialog';
import MyButton from '../../ui/buttons/MyButton';
import { useLanguage } from '../../../../LanguageProvider';

interface ValidationErrorDialogProps {
	errors: z.ZodError<ExamPersistZodSchemaType> | undefined;
	onClose: () => void;
	onConfigEdit: () => void;
	onQuestionsEdit: () => void;
}

export default function ExamPersistValidationErrorsDialog({
	errors,
	onClose,
	onConfigEdit,
	onQuestionsEdit,
}: ValidationErrorDialogProps) {
	const { t } = useLanguage();

	const configErrors = useMemo(
		() => errors?.issues.filter(i => i.path.includes("questions") === false).map(i => i.message) ?? []
		, [errors]);

	const questionsErrors = useMemo(
		() => errors?.issues.filter(i => i.path.includes("questions")).map(i => ({
			index: i.path.at(1),
			message: i.message,
		})) ?? []
		, [errors]);


	const hasConfigErrors = configErrors.length > 0;
	const hasQuestionsErrors = questionsErrors.length > 0;
	const hasAnyErrors = hasConfigErrors || hasQuestionsErrors;

	if (!hasAnyErrors) return null;

	return (
		<MyDialog>
			<MyDialog.Content className='w-[50vw]'>
				{/* Header with icon */}
				<div className="flex items-center justify-center pt-8 pb-4">
					<div className="w-16 h-16 bg-secondary-toned-100 rounded-full flex items-center justify-center">
						<AlertTriangle size={32} className="text-secondary-toned-500" />
					</div>
				</div>

				<h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
					{t("exam_validation_title")}
				</h2>
				<p className="text-gray-600 text-center mb-6 leading-relaxed">
					{t("exam_validation_description")}
				</p>

				{/* Content */}
				<div className="px-6 pb-6 max-h-[50vh] overflow-y-auto">

					{/* Error Sections */}
					<div className="space-y-6">
						{/* Config Errors Section */}
						{hasConfigErrors && (
							<div className="border border-secondary-toned-200 rounded-lg p-4 bg-secondary-toned-50">
								<div className="flex items-center gap-2 mb-3">
									<Settings size={20} className="text-secondary-toned-600" />
									<h3 className="font-semibold text-secondary-toned-800">{t("exam_validation_config_header")}</h3>
								</div>
								<ul className="list-disc list-inside space-y-1 mb-4 text-secondary-toned-700">
									{configErrors.map((error, index) => (
										<li key={index} className="text-sm">{error}</li>
									))}
								</ul>
								{onConfigEdit && (
									<button
										onClick={onConfigEdit}
										className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-toned-600 text-white rounded-md hover:bg-secondary-toned-700 transition-colors text-sm font-medium"
									>
										<Settings size={16} />
										{t("exam_validation_edit_config")}
									</button>
								)}
							</div>
						)}

						{/* Questions Errors Section */}
						{hasQuestionsErrors && (
							<div className="border border-secondary-toned-200 rounded-lg p-4 bg-secondary-toned-50">
								<div className="flex items-center gap-2 mb-3">
									<Edit3 size={20} className="text-secondary-toned-600" />
									<h3 className="font-semibold text-secondary-toned-800">{t("exam_validation_questions_header")}</h3>
								</div>
								<ul className="list-disc list-inside space-y-1 mb-4 text-secondary-toned-700">
									{questionsErrors.map((error, index) => (
										<li key={index} className="text-sm">
											{(error.index != null) && <span>Question {(Number(error.index) || 0) + 1}: </span>}
											{error.message}
										</li>
									))}
								</ul>
								{onQuestionsEdit && (
									<button
										onClick={onQuestionsEdit}
										className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-toned-600 text-white rounded-md hover:bg-secondary-toned-700 transition-colors text-sm font-medium"
									>
										<Edit3 size={16} />
										{t("exam_validation_edit_questions")}
									</button>
								)}
							</div>
						)}
					</div>
				</div>

				{/* Action buttons */}
				<div className="flex gap-3 px-6 pb-6 mt-4">
					{onClose && (
						<MyButton
							onClick={onClose}
							variant="gray"
							className="flex-1"
						>
							{t("close")}
						</MyButton>
					)}
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}

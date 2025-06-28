import { AlertTriangle, Settings, Edit3, X } from 'lucide-react';
import { z } from 'zod';
import { ExamPersistValidationSchema } from '../../ui-items/test/persist-schema';
import { useMemo } from 'react';

interface ValidationErrorDialogProps {
	errors: z.ZodError<z.infer<typeof ExamPersistValidationSchema>> | undefined;
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
	const configErrors = useMemo(
		() => errors?.issues.filter(i => i.path.length === 0).map(i => i.message) ?? [],
		[errors]
	);
	const questionsErrors = useMemo(
		() => errors?.issues.filter(i => i.path.length > 0).map(i => ({
			index: i.path[0], message: i.message,
		})) ?? [],
		[errors]
	);


	const hasConfigErrors = configErrors.length > 0;
	const hasQuestionsErrors = questionsErrors.length > 0;
	const hasAnyErrors = hasConfigErrors || hasQuestionsErrors;

	if (!hasAnyErrors) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
				{/* Close button */}
				{onClose && (
					<button
						onClick={onClose}
						className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
						aria-label="Close"
					>
						<X size={20} />
					</button>
				)}

				{/* Header with icon */}
				<div className="flex items-center justify-center pt-8 pb-4">
					<div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
						<AlertTriangle size={32} className="text-amber-500" />
					</div>
				</div>

				{/* Content */}
				<div className="px-6 pb-6">
					<h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
						Validation Issues Found
					</h2>
					<p className="text-gray-600 text-center mb-6 leading-relaxed">
						Please review and fix the following issues before proceeding.
					</p>

					{/* Error Sections */}
					<div className="space-y-6">
						{/* Config Errors Section */}
						{hasConfigErrors && (
							<div className="border border-red-200 rounded-lg p-4 bg-red-50">
								<div className="flex items-center gap-2 mb-3">
									<Settings size={20} className="text-red-600" />
									<h3 className="font-semibold text-red-800">Configuration Issues</h3>
								</div>
								<ul className="list-disc list-inside space-y-1 mb-4 text-red-700">
									{configErrors.map((error, index) => (
										<li key={index} className="text-sm">{error}</li>
									))}
								</ul>
								{onConfigEdit && (
									<button
										onClick={onConfigEdit}
										className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
									>
										<Settings size={16} />
										Edit Configuration
									</button>
								)}
							</div>
						)}

						{/* Questions Errors Section */}
						{hasQuestionsErrors && (
							<div className="border border-amber-200 rounded-lg p-4 bg-amber-50">
								<div className="flex items-center gap-2 mb-3">
									<Edit3 size={20} className="text-amber-600" />
									<h3 className="font-semibold text-amber-800">Questions Issues</h3>
								</div>
								<ul className="list-disc list-inside space-y-1 mb-4 text-amber-700">
									{questionsErrors.map((error, index) => (
										<li key={index} className="text-sm">
											Question {(Number(error.index) || 0) + 1}: {error.message}
										</li>
									))}
								</ul>
								{onQuestionsEdit && (
									<button
										onClick={onQuestionsEdit}
										className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors text-sm font-medium"
									>
										<Edit3 size={16} />
										Edit Questions
									</button>
								)}
							</div>
						)}
					</div>

					{/* Action buttons */}
					<div className="flex gap-3 mt-6">
						{onClose && (
							<button
								onClick={onClose}
								className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
							>
								Close
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

import { ExamConfigPersist } from "../../../../../../../infra-test/core/test.model";
import { useStep1Validation } from "./hooks/useStep1Validation";
import { TextareaAutosize } from "@mui/material";

export default function Step1({
	examConfigPersist,
	onExamConfigChange,
	onValidationChange,
}: {
	examConfigPersist: ExamConfigPersist;
	onExamConfigChange: (config: Partial<ExamConfigPersist>) => void;
	onValidationChange?: (isValid: boolean) => void;
}) {
	const { errors, clearFieldError } = useStep1Validation(examConfigPersist, onValidationChange);

	const handleFieldChange = (field: keyof ExamConfigPersist, value: any) => {
		onExamConfigChange({ [field]: value });
		clearFieldError(field as keyof typeof errors);
	};

	return (
		<div>
			<label htmlFor="test-title">
				Title: <span className="text-red-500">*</span>
			</label>
			<div className="w-full">
				<input
					id="test-title"
					type="text"
					placeholder="Title"
					className={`w-full h-fit border rounded-md focus:outline-none focus:ring px-4 py-2 ${errors.title
						? 'border-red-500 focus:ring-red-300'
						: 'border-primary focus:ring-teal-300'
						}`}
					value={examConfigPersist.title}
					onChange={(e) => handleFieldChange('title', e.target.value)}
				/>
				{errors.title && (
					<p className="text-red-500 text-sm mt-1">{errors.title}</p>
				)}
			</div>

			<label htmlFor="test-description" className="self-start mt-2">
				Description: <span className="text-red-500">*</span>
			</label>
			<div className="w-full">
				<TextareaAutosize
					id="test-description"
					minRows={1}
					placeholder="Describe your test"
					className={`w-full h-fit border rounded-md focus:outline-none focus:ring px-4 py-2 ${errors.description
						? 'border-red-500 focus:ring-red-300'
						: 'border-primary focus:ring-teal-300'
						}`}
					value={examConfigPersist.description}
					onChange={(e) => handleFieldChange('description', e.target.value)}
				/>
				{errors.description && (
					<p className="text-red-500 text-sm mt-1">{errors.description}</p>
				)}
			</div>

			<label htmlFor="test-language">
				Language: <span className="text-red-500">*</span>
			</label>
			<div className="w-full">
				<select
					id="test-language"
					className={`w-full h-fit border rounded-md focus:outline-none focus:ring px-4 py-2 ${errors.language
						? 'border-red-500 focus:ring-red-300'
						: 'border-primary focus:ring-teal-300'
						}`}
					value={examConfigPersist.language}
					onChange={(e) => handleFieldChange('language', e.target.value)}
				>
					<option value="">Select language</option>
					<option value="en">English</option>
					<option value="es">Spanish</option>
					<option value="fr">French</option>
					<option value="de">German</option>
					<option value="it">Italian</option>
					<option value="pt">Portuguese</option>
				</select>

				{errors.language && (
					<p className="text-red-500 text-sm mt-1">
						{errors.language}
					</p>
				)}
			</div>
		</div>
	)
}

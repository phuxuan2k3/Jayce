import React, { useState } from 'react';
import { TemplatePersistCoreSchema, TemplatePersistZodSchema } from './types';
import TagInput from '../../ui-shared/practice-gen/TagInput';
import OutlinesInput from '../../ui-shared/practice-gen/OutlinesInput';
import { TemplateCoreSchema } from '../../api/test.api-gen-v2';
import MyButton from '../../ui/buttons/MyButton';
import MyLabel from '../../ui/forms/MyLabel';
import MyInput from '../../ui/forms/MyInput';
import MyFieldLayout from '../../ui/forms/MyFieldLayout';
import MyTextArea from '../../ui/forms/MyTextArea';
import { DifficultiesAsConst, LanguagesAsConst } from '../../../../pages/manager/tests/new/common/base-schema';
import MySelect from '../../ui/forms/MySelect';
import MyNumberInput from '../../ui/forms/MyNumberInput';
import { cn } from '../../../../app/cn';
import { ZodError } from 'zod';
import MyErrorMessages from '../../ui/MyErrorMessage';
import { useLanguage } from '../../../../LanguageProvider';

interface TemplateFormProps {
	selectedTemplate: TemplateCoreSchema | null;
	formData: TemplatePersistCoreSchema;
	onFormDataChange: (data: TemplatePersistCoreSchema) => void;
	onSave: (data: TemplatePersistCoreSchema) => void;
	onCancel: () => void;
	omitHeader?: boolean;
	omitAISection?: boolean;
	className?: string;
	isSaving?: boolean;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
	selectedTemplate,
	formData,
	onFormDataChange,
	onSave,
	onCancel,
	omitHeader = false,
	omitAISection = false,
	className = '',
	isSaving = false,
}) => {
	const { t } = useLanguage();
	const [error, setError] = useState<ZodError<TemplatePersistCoreSchema> | null>(null);
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		onFormDataChange({
			...formData,
			[name]: name === 'numberOfQuestions' || name === 'numberOfOptions' || name === 'minutesToAnswer'
				? parseInt(value, 10)
				: value
		});
	};

	const handleSave = () => {
		const validationResult = TemplatePersistZodSchema.safeParse(formData);
		console.log('Validation Result:', validationResult);
		if (!validationResult.success) {
			setError(validationResult.error);
			return;
		}
		setError(null);
		onSave(validationResult.data);
	}

	return (
		<div className={cn('flex flex-col gap-2 mt-4', className)}>
			{omitHeader === false && (
				<div className='flex justify-center mb-8 bg-primary-toned-100 p-4 rounded-lg shadow-md'>
					<h2 className="text-2xl text-center font-bold text-primary-toned-700">
						{selectedTemplate ? `${t("template_form_title_edit")}: ${selectedTemplate.name}` : t("template_form_title_create")}
					</h2>
				</div>
			)}

			<div className="flex flex-col gap-4">
				<div className='flex items-center gap-4'>
					<MyLabel htmlFor='template-name'>{t("template_form_name")}: </MyLabel>
					<MyInput
						id='template-name'
						aria-label={t("template_form_name")}
						value={formData.name}
						onChange={handleInputChange}
						name="name"
						placeholder={t("template_form_name_placeholder")}
						error={error?.formErrors.fieldErrors.name?.at(0)}
					/>
				</div>

				<hr className='border-primary-toned-300' />

				<div className='flex flex-col gap-4 my-4'>
					<MyFieldLayout>
						<MyLabel htmlFor='test-title'>{t("template_form_title")}:</MyLabel>
						<MyInput
							id='test-title'
							aria-label={t("template_form_title")}
							value={formData.title}
							onChange={handleInputChange}
							name="title"
							placeholder={t("template_form_title_placeholder")}
							error={error?.formErrors.fieldErrors.title?.at(0)}
						/>
					</MyFieldLayout>
					<MyFieldLayout>
						<MyLabel htmlFor='template-description'>{t("template_form_description")}:</MyLabel>
						<MyTextArea
							id='template-description'
							aria-label={t("template_form_description")}
							value={formData.description}
							onChange={handleInputChange}
							name="description"
							placeholder={t("template_form_description_placeholder")}
							rows={3}
							error={error?.formErrors.fieldErrors.description?.at(0)}
						/>
					</MyFieldLayout>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8 mt-4'>
						<MyFieldLayout>
							<MyLabel htmlFor='minutes-to-answer'>{t("template_form_minutes_to_answer")}:</MyLabel>
							<MyNumberInput
								id='minutes-to-answer'
								aria-label={t("template_form_minutes_to_answer")}
								name="minutesToAnswer"
								value={formData.minutesToAnswer}
								onChange={handleInputChange}
								min={1}
								max={720}
								error={error?.formErrors.fieldErrors.minutesToAnswer?.at(0)}
							/>
						</MyFieldLayout>

						<MyFieldLayout>
							<MyLabel htmlFor='number-of-questions'>{t("template_form_number_of_questions")}:</MyLabel>
							<MyNumberInput
								id='number-of-questions'
								aria-label={t("template_form_number_of_questions")}
								name="numberOfQuestions"
								value={formData.numberOfQuestions}
								onChange={handleInputChange}
								min={1}
								max={20}
								error={error?.formErrors.fieldErrors.numberOfQuestions?.at(0)}
							/>
						</MyFieldLayout>

						<MyFieldLayout>
							<MyLabel htmlFor='languages'>{t("template_form_languages")}</MyLabel>
							<MySelect
								id='languages'
								name="languages"
								value={formData.language}
								aria-label={t("template_form_languages")}
								options={LanguagesAsConst.map(lang => ({ value: lang, label: lang }))}
								placeholder={t("template_form_language_placeholder")}
								onChange={(value) => onFormDataChange({
									...formData,
									language: value as string
								})}
								error={error?.formErrors.fieldErrors.language?.at(0)}
							/>
						</MyFieldLayout>

						<MyFieldLayout>
							<MyLabel htmlFor='difficulty'>{t("template_form_difficulty")}</MyLabel>
							<MySelect
								id='difficulty'
								name="difficulty"
								value={formData.difficulty}
								onChange={(value) => onFormDataChange({
									...formData,
									difficulty: value as string
								})}
								options={DifficultiesAsConst.map(diff => ({ value: diff, label: diff }))}
								error={error?.formErrors.fieldErrors.difficulty?.at(0)}
							/>
						</MyFieldLayout>
					</div>

				</div>

				<hr className='border-primary-toned-300' />

				<TagInput
					className='mt-4'
					tags={formData.tags}
					onTagsChange={(newTags) => onFormDataChange({ ...formData, tags: newTags })}
				/>

				<OutlinesInput
					omitAISection={omitAISection}
					className='mt-4'
					template={formData}
					outlines={formData.outlines}
					onOutlinesChange={(newOutlines) => onFormDataChange({ ...formData, outlines: newOutlines })}
				/>

				{error != null && (
					<MyErrorMessages errorMessages={error.issues.map(i => i.message)} />
				)}

				<div className="flex justify-between space-x-3 pt-8 border-t border-primary-toned-300">
					<MyButton
						variant={"outline"}
						onClick={onCancel}
					>
						{t("template_form_cancel")}
					</MyButton>

					<MyButton
						variant={"primary"}
						onClick={handleSave}
						loading={isSaving}
					>
						{isSaving ? t("template_form_saving") : t("template_form_save")}
					</MyButton>
				</div>
			</div>
		</div>
	);
};

export default TemplateForm;
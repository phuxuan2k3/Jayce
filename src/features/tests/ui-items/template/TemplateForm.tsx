import React from 'react';
import { TemplatePersistCoreSchema } from './types';
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

interface TemplateFormProps {
	selectedTemplate: TemplateCoreSchema | null;
	formData: TemplatePersistCoreSchema;
	onFormDataChange: (data: TemplatePersistCoreSchema) => void;
	onSave: () => void;
	onCancel: () => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
	selectedTemplate,
	formData,
	onFormDataChange,
	onSave,
	onCancel,
}) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		onFormDataChange({
			...formData,
			[name]: name === 'numberOfQuestions' || name === 'numberOfOptions' || name === 'minutesToAnswer'
				? parseInt(value, 10)
				: value
		});
	};

	return (
		<div className='flex flex-col gap-2 mt-4'>
			<div className='flex justify-center mb-8 bg-primary-toned-100 p-4 rounded-lg shadow-md'>
				<h2 className="text-2xl text-center font-bold text-primary-toned-700">
					{selectedTemplate ? `Edit Template: ${selectedTemplate.name}` : 'Create New Template'}
				</h2>
			</div>

			<div className="flex flex-col gap-4">
				<div className='flex items-center gap-4'>
					<MyLabel htmlFor='template-name'>Template Name: </MyLabel>
					<MyInput
						id='template-name'
						aria-label='Template Name'
						value={formData.name}
						onChange={handleInputChange}
						name="name"
						placeholder="Enter template name"
					/>
				</div>

				<hr className='border-primary-toned-300' />

				<div className='flex flex-col gap-4 my-4'>
					<MyFieldLayout>
						<MyLabel htmlFor='test-title'>Test Title:</MyLabel>
						<MyInput
							id='test-title'
							aria-label='Test Title'
							value={formData.title}
							onChange={handleInputChange}
							name="title"
							placeholder="Enter test title"
						/>
					</MyFieldLayout>
					<MyFieldLayout>
						<MyLabel htmlFor='template-description'>Test Description:</MyLabel>
						<MyTextArea
							id='template-description'
							aria-label='Template Description'
							value={formData.description}
							onChange={handleInputChange}
							name="description"
							placeholder="Enter template description"
							rows={3}
						/>
					</MyFieldLayout>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8 mt-4'>
						<MyFieldLayout>
							<MyLabel htmlFor='minutes-to-answer'>Minutes to answer:</MyLabel>
							<MyNumberInput
								id='minutes-to-answer'
								aria-label='Minutes to Answer'
								name="minutesToAnswer"
								value={formData.minutesToAnswer}
								onChange={handleInputChange}
								min={1}
								max={720}
							/>
						</MyFieldLayout>

						<MyFieldLayout>
							<MyLabel htmlFor='number-of-questions'>Number of Questions:</MyLabel>
							<MyNumberInput
								id='number-of-questions'
								aria-label='Number of Questions'
								name="numberOfQuestions"
								value={formData.numberOfQuestions}
								onChange={handleInputChange}
								min={1}
								max={20}
							/>
						</MyFieldLayout>

						<MyFieldLayout>
							<MyLabel htmlFor='languages'>Languages</MyLabel>
							<MySelect
								id='languages'
								name="languages"
								value={formData.language}
								aria-label="Languages"
								options={LanguagesAsConst.map(lang => ({ value: lang, label: lang }))}
								placeholder="Select language"
								onChange={(value) => onFormDataChange({ ...formData, language: value as string })}
							/>
						</MyFieldLayout>

						<MyFieldLayout>
							<MyLabel htmlFor='difficulty'>Difficulty</MyLabel>
							<MySelect
								id='difficulty'
								name="difficulty"
								value={formData.difficulty}
								onChange={(value) => onFormDataChange({ ...formData, difficulty: value as string })}
								options={DifficultiesAsConst.map(diff => ({ value: diff, label: diff }))}
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
					className='mt-4'
					template={formData}
					outlines={formData.outlines}
					onOutlinesChange={(newOutlines) => onFormDataChange({ ...formData, outlines: newOutlines })}
				/>

				<div className="flex justify-between space-x-3 pt-8 border-t border-primary-toned-300">
					<MyButton
						variant={"outline"}
						onClick={onCancel}
					>
						Cancel
					</MyButton>

					<MyButton
						variant={"primary"}
						onClick={onSave}
					>
						Save
					</MyButton>
				</div>
			</div>
		</div>
	);
};

export default TemplateForm;
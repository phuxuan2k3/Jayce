import React from 'react';
import { TemplateFormData } from './types';
import TagInput from './TagInput';
import OutlinesInput from './OutlinesInput';
import FieldInput from '../../../../../infra-test/ui/FieldInput';
import { TemplateCoreSchema } from '../../../../../infra-test/api/test.api-gen-v2';
import MyButton from '../../../../../infra-test/ui/buttons/MyButton';

interface TemplateFormProps {
	selectedTemplate: TemplateCoreSchema | null;
	formData: TemplateFormData;
	onFormDataChange: (data: TemplateFormData) => void;
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
		<div>
			<h2 className="text-xl font-semibold text-gray-700 mb-4">
				{selectedTemplate ? `Edit Template: ${selectedTemplate.name}` : 'Create New Template'}
			</h2>
			<div className="flex flex-col gap-4">
				<FieldInput
					label="Template Name"
					name="name"
					value={formData.name}
					onChange={handleInputChange}
					placeholder="Enter internal template name"
				/>

				<Divider text='Information' />

				<FieldInput
					label="Test Title"
					name="title"
					value={formData.title}
					onChange={handleInputChange}
					placeholder="Enter template title"
				/>

				<FieldInput
					label="Description"
					name="description"
					value={formData.description}
					onChange={handleInputChange}
					placeholder="Enter template description"
				/>

				<Divider text='Settings' />

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<FieldInput
						label="Minutes to answer"
						name="minutesToAnswer"
						type="number"
						value={formData.minutesToAnswer}
						onChange={handleInputChange}
						min="1"
					/>
					<FieldInput
						label="Number of Questions"
						name="numberOfQuestions"
						type="number"
						value={formData.numberOfQuestions}
						onChange={handleInputChange}
						min="1"
					/>

					<FieldInput
						label="Number of Options per Question"
						name="numberOfOptions"
						type="number"
						value={formData.numberOfOptions}
						onChange={handleInputChange}
						min="2"
					/>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FieldInput
						label="Language"
						name="language"
						type="select"
						value={formData.language}
						onChange={handleInputChange}
						options={[
							{ value: "Vietnamese", label: "Vietnamese" },
							{ value: "English", label: "English" },
							{ value: "German", label: "German" }
						]}
					/>

					<FieldInput
						label="Difficulty"
						name="difficulty"
						type="select"
						value={formData.difficulty}
						onChange={handleInputChange}
						options={[
							{ value: "easy", label: "Easy" },
							{ value: "medium", label: "Medium" },
							{ value: "hard", label: "Hard" }
						]}
					/>
				</div>

				<Divider text='Context' />

				<TagInput
					tags={formData.tags}
					onTagsChange={(newTags) => onFormDataChange({ ...formData, tags: newTags })}
				/>

				<OutlinesInput
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

const Divider = ({ text }: { text: string }) => (
	<div className='my-2'>
		<hr className="border-primary-toned-300 mb-2" />
		<h3 className='text-primary text-lg'>{text}</h3>
	</div>
);
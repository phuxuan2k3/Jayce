import React from 'react';
import { TemplateCore } from "../../../../../infra-test/core/test.model";
import { TemplateFormData } from './types';
import TagInput from './TagInput';
import OutlinesInput from './OutlinesInput';

interface TemplateFormProps {
	isEditing: boolean;
	selectedTemplate: TemplateCore | null;
	formData: TemplateFormData;
	onFormDataChange: (data: TemplateFormData) => void;
	onSave: () => void;
	onCancel: () => void;
	onCreateNew: () => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
	isEditing,
	selectedTemplate,
	formData,
	onFormDataChange,
	onSave,
	onCancel,
	onCreateNew
}) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		onFormDataChange({
			...formData,
			[name]: name === 'numberOfQuestions' || name === 'numberOfOptions' || name === 'minutesToAnswer'
				? parseInt(value, 10)
				: value
		});
	};

	if (!isEditing) {
		return (
			<div className="h-full flex flex-col items-center justify-center text-gray-500 p-6">
				<p className="text-xl mb-2">Select a template to edit or create a new one</p>
				<button
					onClick={onCreateNew}
					className="px-4 py-2 mt-4 bg-primary text-white rounded-md hover:bg-primary-dark transition"
				>
					Create New Template
				</button>
			</div>
		);
	}

	return (
		<div>
			<h2 className="text-xl font-semibold text-gray-700 mb-4">
				{selectedTemplate ? `Edit Template: ${selectedTemplate.name}` : 'Create New Template'}
			</h2>

			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Template Name
					</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						className="w-full p-2 border border-primary-toned-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
						placeholder="Enter internal template name"
					/>
				</div>

				<hr className="border-primary-toned-300 my-4" />

				<h3 className='text-primary'>Template Information</h3>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Test Title
					</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
						className="w-full p-2 border border-primary-toned-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
						placeholder="Enter template title"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Description
					</label>
					<input
						type="text"
						name="description"
						value={formData.description}
						onChange={handleInputChange}
						className="w-full p-2 border border-primary-toned-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
						placeholder="Enter template description"
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Minutes to answer
						</label>
						<input
							type="number"
							name="minutesToAnswer"
							value={formData.minutesToAnswer}
							onChange={handleInputChange}
							min="1"
							className="w-full p-2 border border-primary-toned-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Language
						</label>
						<select
							name="language"
							value={formData.language}
							onChange={handleInputChange}
							className="w-full p-2 border border-primary-toned-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
						>
							<option value="Vietnamese">Vietnamese</option>
							<option value="English">English</option>
							<option value="German">German</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Number of Questions
						</label>
						<input
							type="number"
							name="numberOfQuestions"
							value={formData.numberOfQuestions}
							onChange={handleInputChange}
							min="1"
							className="w-full p-2 border border-primary-toned-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Difficulty
						</label>
						<select
							name="difficulty"
							value={formData.difficulty}
							onChange={handleInputChange}
							className="w-full p-2 border border-primary-toned-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
						>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Number of Options per Question
					</label>
					<input
						type="number"
						name="numberOfOptions"
						value={formData.numberOfOptions}
						onChange={handleInputChange}
						min="2"
						className="w-full p-2 border border-primary-toned-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
					/>
				</div>

				<TagInput
					tags={formData.tags}
					onTagsChange={(newTags) => onFormDataChange({ ...formData, tags: newTags })}
				/>

				<OutlinesInput
					template={formData}
					outlines={formData.outlines}
					onOutlinesChange={(newOutlines) => onFormDataChange({ ...formData, outlines: newOutlines })}
				/>

				<div className="flex justify-end space-x-3 pt-4">
					<button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 border border-primary-toned-300 text-gray-700 rounded-md hover:bg-primary-toned-50"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={onSave}
						className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
					>
						Save Template
					</button>
				</div>
			</div>
		</div>
	);
};

export default TemplateForm;
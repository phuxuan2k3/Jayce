import React from 'react';
import { PromptTemplate } from '../../../../../features/tests/model/test/test-practice';
import { TemplateFormData } from './types';
import TagInput from './TagInput';
import ContextInput from './ContextInput';

interface TemplateFormProps {
	isEditing: boolean;
	selectedTemplate: PromptTemplate | null;
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
			[name]: name === 'numberOfQuestions' || name === 'difficulty' || name === 'numberOfOptions'
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
					className="px-4 py-2 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
				>
					Create New Template
				</button>
			</div>
		);
	}

	return (
		<div>
			<h2 className="text-xl font-semibold text-gray-700 mb-4">
				{selectedTemplate ? `Edit Template #${selectedTemplate.id}` : 'Create New Template'}
			</h2>

			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Title
					</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="Enter template description"
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Difficulty (1-5)
						</label>
						<input
							type="number"
							name="difficulty"
							value={formData.difficulty}
							onChange={handleInputChange}
							min="1"
							max="5"
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
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
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
				</div>

				<TagInput
					tags={formData.tags}
					onTagsChange={(newTags) => onFormDataChange({ ...formData, tags: newTags })}
				/>

				<ContextInput
					outlines={formData.outlines}
					onOutlinesChange={(newOutlines) => onFormDataChange({ ...formData, outlines: newOutlines })}
				/>

				<div className="flex justify-end space-x-3 pt-4">
					<button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={onSave}
						className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
					>
						Save Template
					</button>
				</div>
			</div>
		</div>
	);
};

export default TemplateForm;
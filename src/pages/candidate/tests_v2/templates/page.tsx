import React, { useState } from 'react';
import { PromptTemplate } from '../../../../features/tests/model/test/test-practice';
import { TemplateFormData } from './components/types';
import TemplatesList from './components/TemplatesList';
import TemplateForm from './components/TemplateForm';
import { sampleTemplates } from './components/sampleData';

const CandidateTestsTemplatesPage: React.FC = () => {
	const [templates, setTemplates] = useState<PromptTemplate[]>(sampleTemplates);
	const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	// Template form state
	const [formData, setFormData] = useState<TemplateFormData>({
		name: '',
		title: '',
		description: '',
		numberOfQuestions: 5,
		difficulty: 3,
		tags: [],
		numberOfOptions: 4,
		outlines: []
	});

	// Handle template selection
	const handleSelectTemplate = (template: PromptTemplate) => {
		setSelectedTemplate(template);
		setFormData({
			name: template.name,
			title: template.title,
			description: template.description,
			numberOfQuestions: template.numberOfQuestions,
			difficulty: template.difficulty,
			tags: [...template.tags],
			numberOfOptions: template.numberOfOptions,
			outlines: [...template.outlines]
		});
		setIsEditing(true);
	};

	// Handle create new template
	const handleCreateNew = () => {
		setSelectedTemplate(null);
		setFormData({
			name: '',
			title: '',
			description: '',
			numberOfQuestions: 5,
			difficulty: 3,
			tags: [],
			numberOfOptions: 4,
			outlines: []
		});
		setIsEditing(true);
	};

	// Handle save template
	const handleSaveTemplate = () => {
		if (selectedTemplate) {
			// Update existing template
			setTemplates(templates.map(template =>
				template.id === selectedTemplate.id
					? { ...formData, id: template.id }
					: template
			));
		} else {
			// Create new template
			const newId = Math.max(0, ...templates.map(t => t.id)) + 1;
			setTemplates([...templates, { ...formData, id: newId }]);
		}
		setIsEditing(false);
	};

	// Handle delete template
	const handleDeleteTemplate = (id: number) => {
		setTemplates(templates.filter(template => template.id !== id));
		if (selectedTemplate?.id === id) {
			setSelectedTemplate(null);
			setIsEditing(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Prompt Templates Management</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left Panel: Templates List */}
				<TemplatesList
					templates={templates}
					selectedTemplate={selectedTemplate}
					searchTerm={searchTerm}
					onSearchChange={setSearchTerm}
					onSelectTemplate={handleSelectTemplate}
					onCreateNew={handleCreateNew}
					onDeleteTemplate={handleDeleteTemplate}
				/>

				{/* Right Panel: Template Editor */}
				<div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
					<TemplateForm
						isEditing={isEditing}
						selectedTemplate={selectedTemplate}
						formData={formData}
						onFormDataChange={setFormData}
						onSave={handleSaveTemplate}
						onCancel={() => setIsEditing(false)}
						onCreateNew={handleCreateNew}
					/>
				</div>
			</div>
		</div>
	);
};

export default CandidateTestsTemplatesPage;
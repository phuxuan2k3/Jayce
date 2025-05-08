import React, { useState } from 'react';
import { PromptTemplate } from "../../../../features/tests/model/test.model";
import { TemplateFormData } from './components/types';
import TemplateForm from './components/TemplateForm';
import TemplatesSidebar from './components/TemplatesSidebar';
import { sampleTemplates } from './components/sampleData';
import NewLeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";

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

	// Filter templates based on search term
	const filteredTemplates = templates.filter(template =>
		template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
		template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	return (
		<NewLeftLayoutTemplate
			header={
				<NewLeftLayoutTemplate.Header
					title="Prompt Templates Management"
					description="Create and manage test prompt templates for generating practice tests"
				/>
			}
			left={
				<TemplatesSidebar
					searchTerm={searchTerm}
					onSearchChange={setSearchTerm}
					onCreateNew={handleCreateNew}
				/>
			}
		>
			<div className="mb-6">
				{isEditing ? (
					<TemplateForm
						isEditing={isEditing}
						selectedTemplate={selectedTemplate}
						formData={formData}
						onFormDataChange={setFormData}
						onSave={handleSaveTemplate}
						onCancel={() => setIsEditing(false)}
						onCreateNew={handleCreateNew}
					/>
				) : (
					<div className="space-y-6">
						<div className="flex justify-between items-center">
							<h3 className="text-lg font-semibold">Available Templates</h3>
							<button
								onClick={handleCreateNew}
								className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
							>
								Create New
							</button>
						</div>

						{filteredTemplates.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{filteredTemplates.map(template => (
									<div
										key={template.id}
										className="border border-primary-toned-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
										onClick={() => handleSelectTemplate(template)}
									>
										<div className="flex justify-between items-start mb-2">
											<h4 className="font-semibold text-primary-dark">{template.title}</h4>
											<button
												onClick={(e) => {
													e.stopPropagation();
													handleDeleteTemplate(template.id);
												}}
												className="p-1 text-red-500 hover:text-red-700"
											>
												<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
													<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
												</svg>
											</button>
										</div>
										<p className="text-sm text-gray-600 mb-2">{template.description}</p>
										<div className="flex items-center text-sm text-gray-500 mb-2">
											<span className="mr-4">Questions: {template.numberOfQuestions}</span>
											<span>Difficulty: {template.difficulty}/5</span>
										</div>
										<div className="flex flex-wrap gap-1">
											{template.tags.map((tag, index) => (
												<span
													key={index}
													className="px-2 py-0.5 bg-primary-toned-100 text-primary-toned-800 rounded-full text-xs"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-8 text-gray-500">
								{searchTerm ? "No templates match your search" : "No templates available"}
							</div>
						)}
					</div>
				)}
			</div>
		</NewLeftLayoutTemplate>
	);
};

export default CandidateTestsTemplatesPage;
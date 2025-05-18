import React, { useState } from 'react';
import { TemplateCore } from "../../../../features/tests/model/test.model";
import TemplateForm from './components/TemplateForm';
import TemplatesSidebar from './components/TemplatesSidebar';
import NewLeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";
import TemplateCard from './components/TemplateCard';
import useTemplateServerMutate from './hooks/useTemplateServerMutate';
import DeleteTemplateModal from './components/DeleteTemplateModal';
import useTemplateServerQuery from '../../../../features/tests/hooks/templates/useTemplateServerQuery';

const CandidateTestsTemplatesPage: React.FC = () => {
	const query = useTemplateServerQuery();
	const mutate = useTemplateServerMutate();

	const [selectedTemplate, setSelectedTemplate] = useState<TemplateCore | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [templateToDelete, setTemplateToDelete] = useState<TemplateCore | null>(null);


	// Template form state
	const [formData, setFormData] = useState<Omit<TemplateCore, "id">>({
		name: '',
		title: '',
		description: '',
		numberOfQuestions: 5,
		difficulty: "easy",
		tags: [],
		numberOfOptions: 4,
		outlines: [],
		minutesToAnswer: 10,
		language: "English",
	});

	// Handle template selection
	const handleSelectTemplate = (template: TemplateCore) => {
		setSelectedTemplate(template);
		setFormData({
			...template,
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
			difficulty: "easy",
			tags: [],
			numberOfOptions: 4,
			outlines: [],
			minutesToAnswer: 10,
			language: "English",
		});
		setIsEditing(true);
	};

	// Handle save template
	const handleSaveTemplate = () => {
		if (selectedTemplate) {
			mutate.editTemplate({
				...formData,
				id: selectedTemplate.id,
			});
		} else {
			mutate.createTemplate({
				...formData,
			});
		}
		setIsEditing(false);
	};

	// Handle delete template
	const handleDeleteTemplate = (template: TemplateCore) => {
		setTemplateToDelete(template);
		setShowDeleteModal(true);
	};

	const confirmDelete = () => {
		if (templateToDelete) {
			mutate.deleteTemplate({ templateId: templateToDelete.id });
			setShowDeleteModal(false);
			setTemplateToDelete(null);
		}
	};

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
					searchTerm={query.filters.searchName}
					onSearchChange={(value) => query.setFilters(prev => ({
						...prev,
						searchName: value,
					}))}
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

						{query.data.data.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{query.data.data.map(template => (
									<TemplateCard
										key={template.id}
										data={template}
										onSelectTemplate={handleSelectTemplate}
										onDeleteTemplate={handleDeleteTemplate}
									/>
								))}
							</div>
						) : (
							<div className="text-center py-8 text-gray-500">
								{query.filters.searchName ? "No templates match your search" : "No templates available"}
							</div>
						)}
					</div>
				)}
			</div>

			<DeleteTemplateModal
				isOpen={showDeleteModal}
				template={templateToDelete}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={confirmDelete}
			/>

		</NewLeftLayoutTemplate>
	);
};

export default CandidateTestsTemplatesPage;
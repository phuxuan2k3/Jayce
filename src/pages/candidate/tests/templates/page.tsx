import React, { useState } from 'react';
import { TemplateCore } from "../../../../infra-test/core/test.model";
import TemplateForm from './components/TemplateForm';
import TemplatesSidebar from './components/TemplatesSidebar';
import NewLeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";
import useTemplateServerMutate from './hooks/useTemplateServerMutate';
import DeleteTemplateModal from './components/DeleteTemplateModal';
import useTemplateServerQuery from '../../../../infra-test/hooks/templates/useTemplateServerQuery';
import TemplateList from './components/TemplateList';

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
				<TemplateList
					searchName={query.filters.searchName}
					onSelect={handleSelectTemplate}
					onDelete={handleDeleteTemplate}
					onCreateNew={handleCreateNew}
				/>
			)}

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
import React, { useState } from 'react';
import TemplateForm from './components/TemplateForm';
import TemplatesSidebar from './components/TemplatesSidebar';
import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import DeleteTemplateModal from './components/DeleteTemplateModal';
import TemplateList from './components/TemplateList';
import { TemplateCoreSchema, useDeleteTemplatesByTemplateIdMutation, usePostTemplatesMutation, usePutTemplatesByTemplateIdMutation } from '../../../../infra-test/api/test.api-gen-v2';
import { EmptyTemplateForm, TemplateFormData } from './components/types';
import LoadingDialog from '../../../../infra-test/ui/fetch-states/LoadingDialog';
import ErrorDialog from '../../../../infra-test/ui/fetch-states/ErrorDialog';

const CandidateTestsTemplatesPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedTemplate, setSelectedTemplate] = useState<TemplateCoreSchema | null>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [templateToDelete, setTemplateToDelete] = useState<TemplateCoreSchema | null>(null);

	// Template form state
	const [formData, setFormData] = useState<TemplateFormData | null>(null);

	// API
	const [deleteTemplate, deleteState] = useDeleteTemplatesByTemplateIdMutation();
	const [createTemplate, createState] = usePostTemplatesMutation();
	const [editTemplate, editState] = usePutTemplatesByTemplateIdMutation();

	// Handle template selection
	const handleSelectTemplate = (template: TemplateCoreSchema) => {
		setSelectedTemplate(template);
		setFormData({
			...template,
		});
	};

	// Handle create new template
	const handleCreateNew = () => {
		setSelectedTemplate(null);
		setFormData(EmptyTemplateForm);
	};

	// Handle save template
	const handleSaveTemplate = () => {
		if (!formData) return;
		if (selectedTemplate) {
			editTemplate({
				templateId: selectedTemplate.id,
				body: formData,
			})
				.unwrap()
				.then(() => {
					setSelectedTemplate(null);
					setFormData(null);
				})
				.catch((error) => {
					console.error('Failed to edit template:', error);
				});
		} else {
			createTemplate({
				body: formData,
			})
				.unwrap()
				.then(() => {
					setSelectedTemplate(null);
					setFormData(null);
				})
				.catch((error) => {
					console.error('Failed to create template:', error);
				});
		}
		setFormData(null);
	};

	// Handle delete template
	const handleDeleteTemplate = (template: TemplateCoreSchema) => {
		setTemplateToDelete(template);
		setShowDeleteModal(true);
	};

	const confirmDelete = () => {
		if (templateToDelete) {
			deleteTemplate({
				templateId: templateToDelete.id,
			})
				.unwrap()
				.then(() => {
					setShowDeleteModal(false);
					setTemplateToDelete(null);
				})
				.catch((error) => {
					console.error('Failed to delete template:', error);
				});
		}
	};

	const isLoading = createState.isLoading || editState.isLoading || deleteState.isLoading;
	const error = createState.error || editState.error || deleteState.error;

	return (
		<LeftLayoutTemplate
			header={
				<LeftLayoutTemplate.Header
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
			{formData != null ? (
				<TemplateForm
					selectedTemplate={selectedTemplate}
					formData={formData}
					onFormDataChange={setFormData}
					onSave={handleSaveTemplate}
					onCancel={() => setFormData(null)}
				/>
			) : (
				<TemplateList
					searchName={searchTerm}
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

			{isLoading && <LoadingDialog />}
			{error && <ErrorDialog error={error} />}

		</LeftLayoutTemplate>
	);
};

export default CandidateTestsTemplatesPage;
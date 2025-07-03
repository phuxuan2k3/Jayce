import React, { useState } from 'react';
import TemplateForm from '../../../../features/tests/ui-items/template/TemplateForm';
import TemplatesSidebar from './components/TemplatesSidebar';
import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import DeleteTemplateModal from './components/DeleteTemplateModal';
import TemplateList from './components/TemplateList';
import { EMPTY_TEMPLATE_PERSIST, TemplatePersistCoreSchema } from '../../../../features/tests/ui-items/template/types';
import { TemplateCoreSchema } from '../../../../features/tests/api/test.api-gen-v2';
import { useDeleteTemplatesByTemplateIdMutation, usePostTemplatesMutation, usePutTemplatesByTemplateIdMutation } from './apis/template.api-enhance';
import ErrorDialog from '../../../../features/tests/ui/fetch-states/ErrorDialog';
import LoadingDialog from '../../../../features/tests/ui/fetch-states/LoadingDialog';
import MyHeaderTitleSection from '../../../../features/tests/ui-sections/MyHeaderSection';
import MyButton from '../../../../features/tests/ui/buttons/MyButton';


const CandidateTestsTemplatesPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedTemplate, setSelectedTemplate] = useState<TemplateCoreSchema | null>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [templateToDelete, setTemplateToDelete] = useState<TemplateCoreSchema | null>(null);

	// Template form state
	const [formData, setFormData] = useState<TemplatePersistCoreSchema | null>(null);

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
		setFormData(EMPTY_TEMPLATE_PERSIST);
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
			<div className='flex items-end justify-between'>
				<MyHeaderTitleSection
					title="Test Templates"
					description="Create, edit, and manage your test templates for generating practice tests."
				/>
				<MyButton
					variant={formData == null ? "primary" : "outline"}
					onClick={() => {
						if (formData != null) {
							setFormData(null);
							setSelectedTemplate(null);
						} else {
							handleCreateNew();
						}
					}}
				>
					{formData == null ? "Create New" : "Back to List"}
				</MyButton>
			</div>


			<hr className="border-primary-toned-300 my-4" />

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
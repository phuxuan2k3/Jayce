import { useEffect, useState } from 'react';
import { usePostTemplatesMutation } from '../../../templates/apis/template.api-enhance';
import { parseQueryError } from '../../../../../../helpers/fetchBaseQuery.error';
import { TemplatePersistCoreSchema } from '../../../../../../features/tests/ui-items/template/types';
import TemplateForm from '../../../../../../features/tests/ui-items/template/TemplateForm';
import MyDialog from '../../../../../../features/tests/ui/MyDialog';
import useActionStateWatch from '../../../../../../features/tests/hooks/useActionStateWatch';
import { toast } from 'react-toastify';

export default function SaveTemplateDialog({
	isOpen,
	onClose,
	initializeTemplateCreateData,
}: {
	isOpen: boolean;
	onClose: () => void;
	initializeTemplateCreateData: Omit<TemplatePersistCoreSchema, "name">;
}) {
	const [templateForm, setTemplateForm] = useState<TemplatePersistCoreSchema>({ ...initializeTemplateCreateData, name: '' });

	useEffect(() => {
		if (isOpen) {
			setTemplateForm({ ...initializeTemplateCreateData, name: '' });
		}
	}, [isOpen, initializeTemplateCreateData]);

	const [createTemplate, createState] = usePostTemplatesMutation();

	useActionStateWatch(createState, {
		onSuccess: () => {
			toast.success('Template created successfully');
			onClose();
		},
		onError: (error) => {
			const errorMessage = parseQueryError(error);
			console.error('Failed to create template:', errorMessage);
			toast.error(`Failed to create template: ${errorMessage}`);
		},
	})

	if (!isOpen) return null;
	return (
		<MyDialog>
			<div className='p-6 bg-white rounded-lg shadow-lg w-[60vw] h-[90vh] overflow-hidden flex flex-col gap-4'>
				<MyDialog.Header
					title='Save Template'
					description='Save your current test configuration as a template for future use.'
					onClose={onClose}
				/>

				<div className='overflow-y-auto border border-gray-200 rounded-lg h-full'>
					<TemplateForm
						className='p-4'
						omitHeader={true}
						omitAISection={true}
						formData={templateForm}
						selectedTemplate={null}
						onFormDataChange={setTemplateForm}
						onCancel={onClose}
						onSave={(data) => createTemplate({ body: data })}
						isSaving={createState.isLoading}
					/>
				</div>
			</div>
		</MyDialog>
	);
};

import React from 'react';
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
	const [templateForm, setTemplateForm] = React.useState<TemplatePersistCoreSchema>({ ...initializeTemplateCreateData, name: '' });
	const [createTemplate, createState] = usePostTemplatesMutation();
	useActionStateWatch(createState, {
		onSuccess: () => {
			console.log('Template created successfully');
			setTemplateForm({ ...initializeTemplateCreateData, name: '' });
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
			<div className='relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg'>
				<TemplateForm
					formData={templateForm}
					selectedTemplate={null}
					onFormDataChange={setTemplateForm}
					onCancel={onClose}
					onSave={() => createTemplate({ body: templateForm })}
				/>
			</div>
		</MyDialog>
	);
};

import React from 'react';
import { TemplateCoreSchema } from '../../../../../features/tests/api/test.api-gen-v2';
import MyButton from '../../../../../features/tests/ui/buttons/MyButton';

interface DeleteTemplateModalProps {
	isOpen: boolean;
	template: TemplateCoreSchema | null;
	onClose: () => void;
	onConfirm: () => void;
}

const DeleteTemplateModal: React.FC<DeleteTemplateModalProps> = ({
	isOpen,
	template,
	onClose,
	onConfirm
}) => {
	if (!isOpen || !template) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
			<div className="bg-white rounded-lg p-6 w-96 shadow-lg">
				<h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
				<p className="font-semibold text-primary mb-2">{template.title}</p>
				<p className="text-gray-600 mb-4">Are you sure you want to delete this template? This action cannot be undone.</p>

				<div className="flex justify-between w-full">
					<MyButton
						onClick={onClose}
						variant={"outline"}
					>
						Cancel
					</MyButton>
					<MyButton
						onClick={onConfirm}
						variant={"destructive"}
					>
						Delete
					</MyButton>
				</div>
			</div>
		</div>
	);
};

export default DeleteTemplateModal;

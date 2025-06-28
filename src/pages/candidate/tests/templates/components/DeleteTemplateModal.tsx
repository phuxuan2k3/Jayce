import React from 'react';
import { TemplateCoreSchema } from '../../../../../features/tests/api/test.api-gen-v2';

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

				<div className="flex justify-end space-x-3">
					<button
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteTemplateModal;

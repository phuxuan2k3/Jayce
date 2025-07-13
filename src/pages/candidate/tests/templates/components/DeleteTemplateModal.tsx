import React from 'react';
import { TemplateCoreSchema } from '../../../../../features/tests/api/test.api-gen-v2';
import MyButton from '../../../../../features/tests/ui/buttons/MyButton';
import { useLanguage } from '../../../../../LanguageProvider';

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
	const { t } = useLanguage();
	
	if (!isOpen || !template) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
			<div className="bg-white rounded-lg p-6 w-96 shadow-lg">
				<h3 className="text-lg font-semibold mb-4">{t("delete_template_title")}</h3>
				<p className="font-semibold text-primary mb-2">{template.title}</p>
				<p className="text-gray-600 mb-4">{t("delete_template_description")}</p>

				<div className="flex justify-between w-full">
					<MyButton
						onClick={onClose}
						variant={"outline"}
					>
						{t("delete_template_cancel")}
					</MyButton>
					<MyButton
						onClick={onConfirm}
						variant={"destructive"}
					>
						{t("delete_template_confirm")}
					</MyButton>
				</div>
			</div>
		</div>
	);
};

export default DeleteTemplateModal;

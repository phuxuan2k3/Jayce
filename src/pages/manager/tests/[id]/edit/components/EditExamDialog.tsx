import { AlertTriangle } from 'lucide-react';
import MyDialog from '../../../../../../features/tests/ui/MyDialog';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import { useLanguage } from '../../../../../../LanguageProvider';

export default function EditExamDialog({
	isLoading,
	onCancel,
	onConfirm,
}: {
	isLoading: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}) {
	const { t } = useLanguage();

	return (
		<MyDialog>
			<MyDialog.Content className='flex flex-col items-center'>
				<div className="flex items-center justify-center w-16 h-16 bg-secondary-toned-100 rounded-full mb-6">
					<AlertTriangle className="w-8 h-8 text-secondary" />
				</div>

				{/* Title */}
				<h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
					{t("edit_exam_dialog_title")}
				</h2>

				<p className='text-gray-600 text-center mb-6 leading-relaxed'>
					{t("edit_exam_dialog_description")}
				</p>

				<div className='flex justify-between w-full mt-4'>
					<MyButton
						onClick={onCancel}
						variant={"gray"}
					>
						{t("cancel")}
					</MyButton>
					<MyButton
						onClick={onConfirm}
						variant={"primary"}
						loading={isLoading}
					>
						{isLoading ? t("saving") : t("dialog_save_changes")}
					</MyButton>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}


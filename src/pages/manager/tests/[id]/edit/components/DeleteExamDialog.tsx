import { AlertTriangle } from 'lucide-react';
import MyDialog from '../../../../../../features/tests/ui/MyDialog';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import { useLanguage } from '../../../../../../LanguageProvider';

export default function DeleteExamDialog({
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
				<div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
					<AlertTriangle className="w-8 h-8 text-red-500" />
				</div>

				{/* Title */}
				<h2 className="text-2xl font-bold text-red-700 mb-4 text-center">
					{t("delete_exam_dialog_title")}
				</h2>
				<p className='text-gray-600 text-center mb-6 leading-relaxed'>
					{t("delete_exam_dialog_description")}
				</p>
				<p className='font-semibold text-red-600 text-center mb-6 leading-relaxed'>
					{t("delete_exam_dialog_warning")}
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
						variant={"destructive"}
						loading={isLoading}
					>
						{isLoading ? t("deleting") : t("dialog_delete_exam")}
					</MyButton>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}


import MyButton from '../../../../../../../features/tests/ui/buttons/MyButton';
import MyDialog from '../../../../../../../features/tests/ui/MyDialog';
import { useLanguage } from '../../../../../../../LanguageProvider';


export default function DisposeDialog({
	onCancel,
	onConfirm,
}: {
	onConfirm: () => void;
	onCancel: () => void;
}) {
	const { t } = useLanguage();

	return (
		<MyDialog>
			<MyDialog.Content>
				<h2 className="text-xl font-bold text-primary-toned-800 mb-2">{t("dispose_dialog_title")}</h2>
				<p className="text-gray-600 text-sm">
					{t("dispose_dialog_description")}
				</p>

				<div className="flex space-x-3 pt-4 border-t border-gray-200 justify-between">
					<MyButton
						onClick={onCancel}
						variant={"gray"}
					>
						{t("dispose_dialog_cancel")}
					</MyButton>
					<MyButton
						onClick={onConfirm}
						variant={"destructive"}
					>
						{t("dispose_dialog_confirm")}
					</MyButton>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}

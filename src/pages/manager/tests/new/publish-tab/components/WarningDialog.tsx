import { AlertTriangle, Settings, FileX } from 'lucide-react';
import MyDialog from '../../../../../../features/tests/ui/MyDialog';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import { useLanguage } from '../../../../../../LanguageProvider';

export default function WarningDialog({
	onCancel,
	onConfirm,
}: {
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
					{t("publish_warning_title")}
				</h2>

				{/* Warning Message */}
				<p className="text-gray-600 text-center mb-6 leading-relaxed">
					{t("publish_warning_description")}
				</p>

				{/* Restrictions List */}
				<div className="w-full bg-secondary-toned-50 rounded-lg p-4 mb-6">
					<h3 className="font-semibold text-secondary-toned-700 mb-3 flex items-center">
						{t("publish_warning_restriction_title")}:
					</h3>
					<ul className="space-y-2 text-secondary-toned-700">
						<li className="flex items-start">
							<FileX className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
							<span>{t("publish_warning_restriction_question_change")}</span>
						</li>
						<li className="flex items-start">
							<FileX className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
							<span>{t("publish_warning_restriction_room_id_change")}</span>
						</li>
						<li className="flex items-start">
							<Settings className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
							<span>{t("publish_warning_restriction_config_limited")}</span>
						</li>
					</ul>
				</div>

				<div className='flex justify-between w-full mt-4'>
					<MyButton
						onClick={onCancel}
						variant={"gray"}
					>
						{t("publish_warning_button_cancel")}
					</MyButton>
					<MyButton
						onClick={onConfirm}
						variant={"primary"}
					>
						{t("publish_warning_button_confirm")}
					</MyButton>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}


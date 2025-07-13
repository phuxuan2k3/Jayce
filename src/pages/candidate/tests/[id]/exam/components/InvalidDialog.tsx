import { TriangleAlert } from 'lucide-react';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import MyDialog from '../../../../../../features/tests/ui/MyDialog'
import { useLanguage } from '../../../../../../LanguageProvider';

export default function InvalidDialog({ message, onClose }: {
	message: string;
	onClose: () => void;
}) {
	const { t } = useLanguage();

	return (
		<MyDialog>
			<MyDialog.Content>
				<div className="flex flex-col gap-4">
					<div className='flex items-cente gap-2 text-red-500'>
						<TriangleAlert size={24} />
						<h2 className="text-lg font-semibold">{t("invalid_action_title")}</h2>
					</div>
					<p className='text-gray-600'>{message}</p>
					<div className="flex justify-end">
						<MyButton
							onClick={onClose}
						>
							{t("close")}
						</MyButton>
					</div>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}


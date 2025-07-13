import MyButton from '../../../../../../../../features/tests/ui/buttons/MyButton';
import MyDialog from '../../../../../../../../features/tests/ui/MyDialog';
import { useLanguage } from '../../../../../../../../LanguageProvider';

export default function TimesUpDialog({
	isOpen,
	onBackToTest,
}: {
	isOpen: boolean;
	onBackToTest: () => void;
}) {
	const { t } = useLanguage();
	
	if (!isOpen) return null;
	return (
		<MyDialog>
			<div className='w-[50vw] max-w-md bg-white rounded-lg shadow-lg'>
				<div className="p-4">
					<h2 className="text-lg font-semibold">{t("times_up_title")}</h2>
					<p className="mt-2">{t("times_up_message")}</p>
				</div>
				<div className="flex justify-end p-4">
					<MyButton onClick={onBackToTest}>
						{t("back_to_test")}
					</MyButton>
				</div>
			</div>
		</MyDialog>
	);
}

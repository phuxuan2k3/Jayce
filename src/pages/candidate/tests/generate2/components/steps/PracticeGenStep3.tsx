import { PracticeStepAllData } from '../../types';
import MyIconHeader from '../../../../../../features/tests/ui/MyIconHeader';
import { Download, Save } from 'lucide-react';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import { useLanguage } from '../../../../../../LanguageProvider';

export default function PracticeGenStep3({
	mainValue,
	onSaveTemplateClick,
}: {
	mainValue: PracticeStepAllData;
	onSaveTemplateClick: () => void;
}) {
	const { t } = useLanguage();

	return (
		<div className="flex flex-col gap-4">

			<h3>Review Your Generation Configurations</h3>
			<div className="bg-gray-50 rounded-md border border-gray-300 shadow-sm p-4">
				<MyIconHeader
					icon={<Save size={20} className="text-white" />}
					title={t("gen_step3_review_title")}
					description={t("gen_step3_review_description")}
				/>
				<div className="mt-2">
					<p><strong>{t("gen_step1_title")}: </strong>{mainValue.step1.title}</p>
				</div>
			</div>

			<div className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-md mt-4'>
				<MyIconHeader
					icon={<Save size={20} className="text-white" />}
					title={t("gen_step3_save_template_title")}
					description={t("gen_step3_save_template_description")}
				/>

				<MyButton
					className='ml-auto flex items-center gap-2'
					onClick={onSaveTemplateClick}>
					<Download size={18} />
					<span>{t("gen_step3_save_template_button")}</span>
				</MyButton>
			</div>
		</div>
	);
};

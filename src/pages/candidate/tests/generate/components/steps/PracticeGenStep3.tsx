import { PracticeStep3Type, PracticeStepAllData } from '../../types';
import OutlinesInput from '../../../../../../features/tests/ui-shared/practice-gen/OutlinesInput';
import MyIconHeader from '../../../../../../features/tests/ui/MyIconHeader';
import { Download, Save } from 'lucide-react';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import { useLanguage } from '../../../../../../LanguageProvider';

export default function PracticeGenStep3({
	data,
	mainValue,
	suggestionData,
	onDataChange,
	onSaveTemplateClick,
}: {
	data: PracticeStep3Type;
	mainValue: PracticeStepAllData;
	onDataChange: (data: PracticeStep3Type) => void;
	suggestionData: {
		title: string;
		description: string;
		tags: string[];
		difficulty: string;
	};
	onSaveTemplateClick: () => void;
}) {
	const { t } = useLanguage();

	return (
		<div className="flex flex-col gap-4">
			<OutlinesInput
				outlines={data.outlines}
				onOutlinesChange={(outlines) => onDataChange({ ...data, outlines })}
				template={{
					title: suggestionData.title,
					description: suggestionData.description,
					tags: suggestionData.tags,
					difficulty: suggestionData.difficulty,
					language: mainValue.step1.language,
					minutesToAnswer: mainValue.step1.minutesToAnswer,
					name: mainValue.step1.title,
					numberOfOptions: mainValue.step2.numberOfOptions,
					numberOfQuestions: mainValue.step2.numberOfQuestions,
					outlines: data.outlines,
				}}
			/>

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

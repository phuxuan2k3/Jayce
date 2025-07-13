import React from 'react';
import { CircleX, ListFilter } from 'lucide-react';
import { TemplateCoreSchema } from '../../../../../../features/tests/api/test.api-gen-v2';
import { PracticeStep1Type } from '../../types';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import MyFieldLayout from '../../../../../../features/tests/ui/forms/MyFieldLayout';
import MyLabel from '../../../../../../features/tests/ui/forms/MyLabel';
import MyInput from '../../../../../../features/tests/ui/forms/MyInput';
import MyTextArea from '../../../../../../features/tests/ui/forms/MyTextArea';
import MySelect from '../../../../../../features/tests/ui/forms/MySelect';
import { LanguagesAsConst, LanguageType } from '../../../../../manager/tests/new/common/base-schema';
import MyNumberInput from '../../../../../../features/tests/ui/forms/MyNumberInput';
import MyIconHeader from '../../../../../../features/tests/ui/MyIconHeader';
import { useLanguage } from '../../../../../../LanguageProvider';

export default function PracticeGenStep1({
	data: data,
	onDataChange,
	selectedTemplate,
	onSelectTemplateClick,
	onSelectTemplateClear,
}: {
	data: PracticeStep1Type;
	onDataChange: (info: PracticeStep1Type) => void;
	selectedTemplate: TemplateCoreSchema | null;
	onSelectTemplateClick: () => void;
	onSelectTemplateClear: () => void;
}) {
	const { t } = useLanguage();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		onDataChange({
			...data,
			[name]: name === 'minutesToAnswer' ? parseInt(value, 10) : value,
		});
	};

	return (
		<div className="flex flex-col gap-2">

			<div className='flex flex-col gap-2 mb-4 rounded-md p-4 bg-gray-50 border border-gray-300 shadow-md'>
				<div className='flex items-center justify-between'>
					<MyIconHeader
						icon={<ListFilter size={20} className="text-white" />}
						title={t("gen_step1_choose_template_title")}
						description={t("gen_step1_choose_template_description")}
					/>

					<MyButton className='ml-auto flex items-center gap-2'
						onClick={onSelectTemplateClick}>
						<ListFilter size={18} />
						<span className="ml-2">{t("gen_step1_browse_templates_button")}</span>
					</MyButton>
				</div>
				{selectedTemplate && (
					<div className="mt-4 border-t border-gray-200 pt-4">
						<p className="text-sm text-gray-600 mb-1">
							{t("gen_step1_selected_template")}: <span className="font-semibold">{selectedTemplate.name}</span>
						</p>
						<div className="mt-2 px-6 py-2 bg-primary-toned-50 rounded-md border-l-4 border-primary-toned-200 flex items-center gap-4">
							<div className='flex-1'>
								<p className="font-semibold text-primary-toned-700">{selectedTemplate.title}</p>
								<p className="text-sm text-primary">{selectedTemplate.description}</p>
							</div>
							<button className='mr-auto text-primary hover:text-red-500 cursor-pointer transition-colors duration-300' onClick={() => onSelectTemplateClear()}>
								<CircleX />
							</button>
						</div>

					</div>
				)}
			</div>

			{/* Form Fields */}
			<div className="flex flex-col gap-4">

				<MyFieldLayout>
					<MyLabel htmlFor='title'>{t("gen_step1_field_title")}</MyLabel>
					<MyInput
						id='title'
						type="text"
						name="title"
						aria-label={t("gen_step1_field_title")}
						value={data.title}
						onChange={handleInputChange}
						placeholder={t("gen_step1_field_title_placeholder")}
						required
					/>
				</MyFieldLayout>

				<MyFieldLayout>
					<MyLabel htmlFor='description'>{t("gen_step1_field_description")}</MyLabel>
					<MyTextArea
						id='description'
						name="description"
						aria-label={t("gen_step1_field_description")}
						value={data.description}
						onChange={handleInputChange}
						placeholder={t("gen_step1_field_description_placeholder")}
						rows={3}
						required
					/>
				</MyFieldLayout>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
					<MyFieldLayout>
						<MyLabel htmlFor="language">{t("gen_step1_field_language")}</MyLabel>
						<MySelect
							options={LanguagesAsConst.map(lang => ({ value: lang, label: lang }))}
							value={data.language}
							onChange={(value) => onDataChange({ ...data, language: value as LanguageType || "English" })}
							id='language'
							aria-label={t("gen_step1_field_language")}
							name='language'
							placeholder={t("gen_step1_field_language_placeholder")}
							required
						/>
					</MyFieldLayout>

					<MyFieldLayout>
						<MyLabel htmlFor="minutesToAnswer">{t("gen_step1_field_minutes")}</MyLabel>
						<MyNumberInput
							id='minutesToAnswer'
							name="minutesToAnswer"
							aria-label={t("gen_step1_field_minutes")}
							value={data.minutesToAnswer}
							onChange={handleInputChange}
							min={1}
							max={720}
							placeholder={t("gen_step1_field_minutes_placeholder")}
							required
						/>
					</MyFieldLayout>
				</div>
			</div>
		</div>
	);
};

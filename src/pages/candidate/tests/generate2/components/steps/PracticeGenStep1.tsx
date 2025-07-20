import React, { useState } from 'react';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import MyFieldLayout from '../../../../../../features/tests/ui/forms/MyFieldLayout';
import MyLabel from '../../../../../../features/tests/ui/forms/MyLabel';
import MyInput from '../../../../../../features/tests/ui/forms/MyInput';
import MySelect from '../../../../../../features/tests/ui/forms/MySelect';
import { LanguagesAsConst, LanguageType, QuestionTypesAsConst, QuestionTypesAsConstValues, QuestionTypesType } from '../../../../../manager/tests/new/common/base-schema';
import MyNumberInput from '../../../../../../features/tests/ui/forms/MyNumberInput';
import { useLanguage } from '../../../../../../LanguageProvider';
import { PracticeStep1Type } from '../../types';
import useTitleExamples from '../../hooks/useTitleExamples';



export default function PracticeGenStep1({
	data,
	onDataChange,
	validationErrors,
}: {
	data: PracticeStep1Type;
	onDataChange: (info: PracticeStep1Type) => void;
	validationErrors: {
		title?: string;
		language?: string;
		minutesToAnswer?: string;
		numberOfQuestions?: string;
		questionType?: string;
	};
}) {
	const { t } = useLanguage();
	const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionTypesType>("MIXED");

	const { getRandomExample } = useTitleExamples();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		onDataChange({
			...data,
			[name]: name === 'minutesToAnswer' ? parseInt(value, 10) : value,
		});
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col gap-4">
				<MyFieldLayout className='gap-2'>
					<div className='flex items-center justify-between w-full'>
						<MyLabel htmlFor='title'>{"What Subject you want to Practice?"}</MyLabel>
						<MyButton
							size={"small"}
							variant={"outline"}
							onClick={() => onDataChange({ ...data, title: getRandomExample() })}
						>
							{"Try examples"}
						</MyButton>
					</div>
					<MyInput
						id='title'
						type="text"
						name="title"
						aria-label={t("gen_step1_field_title")}
						value={data.title}
						onChange={handleInputChange}
						placeholder={t("gen_step1_field_title_placeholder")}
						required
						error={validationErrors.title}
					/>
				</MyFieldLayout>

				<hr className="my-2 border-primary-toned-300" />

				<div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
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
						<MyLabel htmlFor="minutesToAnswer">{"Time (minutes)"}</MyLabel>
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
							error={validationErrors.minutesToAnswer}
						/>
					</MyFieldLayout>

					<MyFieldLayout>
						<MyLabel htmlFor='numberOfQuestions'>
							{"Questions"}
						</MyLabel>
						<MyInput
							id='numberOfQuestions'
							type="number"
							aria-label={t("gen_step2_field_number_of_questions")}
							name="numberOfQuestions"
							value={data.numberOfQuestions}
							onChange={handleInputChange}
							min={1}
							max={20}
							error={validationErrors.numberOfQuestions}
						/>
					</MyFieldLayout>
				</div>

				<div className='flex flex-col items-start gap-2'>
					<MyLabel className='w-full' htmlFor='difficulty'>
						{"Question Type:"}
					</MyLabel>
					<div className='flex items-center gap-2 w-full'>
						{QuestionTypesAsConst.map((type) => (
							<MyButton size={"medium"}
								variant={type === selectedQuestionType ?
									"primary" : "outline"}
								onClick={() => setSelectedQuestionType(type)}
							>
								{QuestionTypesAsConstValues[type]}
							</MyButton>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};



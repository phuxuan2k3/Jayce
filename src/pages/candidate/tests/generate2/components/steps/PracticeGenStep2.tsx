import MyFieldLayout from '../../../../../../features/tests/ui/forms/MyFieldLayout';
import MyLabel from '../../../../../../features/tests/ui/forms/MyLabel';
import { useLanguage } from '../../../../../../LanguageProvider';
import { PracticeStep1Type, PracticeStep2Type } from '../../types';
import { DifficultiesAsConst } from '../../../../../manager/tests/new/common/base-schema';
import TagInput from '../ui/TagInput';
import { cn } from '../../../../../../app/cn';

export default function PracticeGenStep2({
	data,
	onDataChange,
	step1Data: __,
}: {
	data: PracticeStep2Type;
	step1Data: PracticeStep1Type;
	onDataChange: (data: PracticeStep2Type) => void;
}) {
	const { t: _ } = useLanguage();
	return (
		<div className="flex flex-col gap-2">

			<MyFieldLayout>
				<MyLabel className='mb-2'>
					{"Experience Level:"}
				</MyLabel>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 w-full'>
					{DifficultiesAsConst.map((difficulty) => (
						<div
							className={cn('flex items-center justify-center border border-primary py-2 rounded-md shadow-md font-semibold cursor-pointer hover:bg-primary hover:scale-105 transition-all duration-300 hover:text-white', {
								'bg-primary text-white': data.difficulty === difficulty,
								'bg-white text-primary': data.difficulty !== difficulty,
							})}
							key={difficulty}
							onClick={() => onDataChange({ ...data, difficulty })}
						>
							{difficulty}
						</div>
					))}
				</div>
			</MyFieldLayout>

			{/* <MyFieldLayout>
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
					isAutoSized={false}
				/>
			</MyFieldLayout> */}

			<TagInput
				className="mt-4"
				tags={data.tags || []}
				onTagsChange={(newTags) => onDataChange({ ...data, tags: newTags })}
			/>

			{/* <OutlinesInput
				outlines={data.outlines}
				onOutlinesChange={(outlines) => onDataChange({ ...data, outlines })}
				template={{
					name: mainValue.step1.title,
					title: mainValue.step1.title,
					language: mainValue.step1.language,
					minutesToAnswer: mainValue.step1.minutesToAnswer,
					numberOfQuestions: mainValue.step1.numberOfQuestions,
					outlines: data.outlines,

					// Temporary values
					difficulty: "Intern",
					numberOfOptions: 4,
					description: "",
					tags: [],
				}}
			/> */}

		</div>
	);
};

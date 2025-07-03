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
					<div className="flex items-center gap-3">
						<div className="p-2 bg-primary rounded-lg">
							<ListFilter size={20} className="text-white" />
						</div>
						<div>
							<h3 className="font-semibold text-gray-800">Choose a Template (Optional)</h3>
							<p className="text-sm text-gray-600">
								Automatically fill in test information and prompt settings.
							</p>
						</div>
					</div>

					<MyButton className='ml-auto flex items-center gap-2'
						onClick={onSelectTemplateClick}>
						<ListFilter size={18} />
						<span className="ml-2">Browse Templates</span>
					</MyButton>
				</div>
				{selectedTemplate && (
					<div className="mt-4 border-t border-gray-200 pt-4">
						<p className="text-sm text-gray-600 mb-1">
							Selected Template: <span className="font-semibold">{selectedTemplate.name}</span>
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
					<MyLabel htmlFor='title'>Test Title</MyLabel>
					<MyInput
						id='title'
						type="text"
						name="title"
						aria-label='Test Title'
						value={data.title}
						onChange={handleInputChange}
						placeholder="E.g., React Fundamentals Practice Test"
						required
					/>
				</MyFieldLayout>

				<MyFieldLayout>
					<MyLabel htmlFor='description'>Description</MyLabel>
					<MyTextArea
						id='description'
						name="description"
						aria-label='Test Description'
						value={data.description}
						onChange={handleInputChange}
						placeholder="Describe what this test covers and its purpose"
						rows={3}
						required
					/>
				</MyFieldLayout>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
					<MyFieldLayout>
						<MyLabel htmlFor="language">Language</MyLabel>
						<MySelect
							options={LanguagesAsConst.map(lang => ({ value: lang, label: lang }))}
							value={data.language}
							onChange={(value) => onDataChange({ ...data, language: value as LanguageType || "English" })}
							id='language'
							aria-label='Test Language'
							name='language'
							placeholder="Select a language"
							required
						/>
					</MyFieldLayout>

					<MyFieldLayout>
						<MyLabel htmlFor="minutesToAnswer">Minutes to Answer</MyLabel>
						<MyNumberInput
							id='minutesToAnswer'
							name="minutesToAnswer"
							aria-label='Minutes to Answer'
							value={data.minutesToAnswer}
							onChange={handleInputChange}
							min={1}
							max={720}
							placeholder="E.g., 30"
							required
						/>
					</MyFieldLayout>
				</div>
			</div>
		</div>
	);
};

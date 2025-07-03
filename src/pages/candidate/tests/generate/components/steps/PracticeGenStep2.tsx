import React from 'react';
import TagInput from '../../../../../../features/tests/ui-shared/practice-gen/TagInput';
import { PracticeStep2Type } from '../../types';
import { DifficultiesAsConst } from '../../../../../manager/tests/new/common/base-schema';
import MyFieldLayout from '../../../../../../features/tests/ui/forms/MyFieldLayout';
import MyLabel from '../../../../../../features/tests/ui/forms/MyLabel';
import MyInput from '../../../../../../features/tests/ui/forms/MyInput';
import MySelect from '../../../../../../features/tests/ui/forms/MySelect';

export default function PracticeGenStep2({
	data: data,
	onDataChange: onDataChange,
	testTitle,
	testDescription,
	testLanguage,
	testMinutesToAnswer,
}: {
	data: PracticeStep2Type;
	onDataChange: (data: PracticeStep2Type) => void;
	testTitle: string;
	testDescription: string;
	testLanguage: string;
	testMinutesToAnswer: number;
}) {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		onDataChange({
			...data,
			[name]: ['numberOfQuestions', 'numberOfOptions'].includes(name)
				? parseInt(value, 10)
				: value,
		});
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="bg-gray-50 rounded-md border border-gray-300 shadow-sm mb-4 flex flex-col gap-2 px-6 py-4">
				<div className='flex flex-col gap-1'>
					<span className="font-semibold text-gray-700">{testTitle}</span>
					<span className="text-sm text-gray-500">{testDescription}</span>
				</div>

				<div className='flex flex-col gap-1'>
					<span className="text-sm font-medium text-gray-500">
						Language: <span className="font-semibold text-gray-700">{testLanguage}</span>
					</span>
					<span className="text-sm font-medium text-gray-500">
						Minutes to answer: <span className="font-semibold text-gray-700">{testMinutesToAnswer}</span>
					</span>
				</div>
			</div>

			{/* Form Fields */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
				<MyFieldLayout>
					<MyLabel htmlFor='numberOfQuestions'>
						Number of Questions
					</MyLabel>
					<MyInput
						id='numberOfQuestions'
						type="number"
						aria-label='Number of Questions'
						name="numberOfQuestions"
						value={data.numberOfQuestions}
						onChange={handleInputChange}
						min={1}
						max={20}
					/>
				</MyFieldLayout>
				<MyFieldLayout>
					<MyLabel htmlFor='difficulty'>
						Difficulty Level
					</MyLabel>
					<MySelect
						options={DifficultiesAsConst.map((difficulty) => ({
							value: difficulty,
							label: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
						}))}
						id='difficulty'
						name="difficulty"
						aria-label='Difficulty Level'
						value={data.difficulty}
						onChange={(value) => onDataChange({ ...data, difficulty: value as typeof DifficultiesAsConst[number] })}
					/>
				</MyFieldLayout>
			</div>

			<TagInput
				className="mt-4"
				tags={data.tags || []}
				onTagsChange={(newTags) => onDataChange({ ...data, tags: newTags })}
			/>

			<div className="bg-primary-toned-50 p-4 rounded-md border border-primary-toned-200 mt-4">
				<p className="text-sm text-primary-toned-800">
					<span className="font-medium">Tip:</span> Add specific tags related to the technologies or
					concepts you want to be tested on. Tags help the AI generate more relevant questions.
				</p>
			</div>
		</div>
	);
};

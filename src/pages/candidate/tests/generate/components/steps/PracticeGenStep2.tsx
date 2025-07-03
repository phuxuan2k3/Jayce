import React from 'react';
import TagInput from '../../../../../../features/tests/ui-shared/practice-gen/TagInput';
import { PracticeStep2Type } from '../../types';
import { DifficultiesAsConst } from '../../../../../manager/tests/new/common/base-schema';

export default function PracticeGenStep2({
	data: data,
	onDataChange: onDataChange,
	testTitle,
	testDescription
}: {
	data: PracticeStep2Type;
	onDataChange: (data: PracticeStep2Type) => void;
	testTitle: string;
	testDescription?: string;
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
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-gray-800">Prompt Configuration</h2>
			<p className="text-gray-600">
				Configure how the AI will generate questions for your test.
			</p>

			<div className="bg-primary-toned-50 p-4 rounded-md border border-primary-toned-200 mb-4">
				<h3 className="font-medium text-primary-toned-800 mb-1">Test Information</h3>
				<div className="space-y-2">
					<div>
						<span className="text-sm font-medium text-gray-500">Title:</span>
						<p className="text-gray-800">{testTitle}</p>
					</div>
					<div>
						<span className="text-sm font-medium text-gray-500">Description:</span>
						<p className="text-gray-800">{testDescription}</p>
					</div>
				</div>
				<p className="mt-3 text-xs text-primary-toned-600">
					These details will be used to guide the AI in generating relevant questions.
				</p>
			</div>

			{/* Form Fields */}
			<div className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label htmlFor="numberOfQuestions" className="block text-sm font-medium text-gray-700 mb-1">
							Number of Questions
						</label>
						<input
							type="number"
							id="numberOfQuestions"
							name="numberOfQuestions"
							value={data.numberOfQuestions}
							onChange={handleInputChange}
							min={1}
							max={50}
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>					<div>
						<label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
							Difficulty Level
						</label>
						<select
							id="difficulty"
							name="difficulty"
							value={data.difficulty}
							onChange={handleInputChange}
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
						>
							{DifficultiesAsConst.map((difficulty) => (
								<option key={difficulty} value={difficulty}>
									{difficulty}
								</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="numberOfOptions" className="block text-sm font-medium text-gray-700 mb-1">
							Options per Question
						</label>
						<input
							type="number"
							id="numberOfOptions"
							name="numberOfOptions"
							value={data.numberOfOptions}
							onChange={handleInputChange}
							min={2}
							max={6}
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>
				</div>

				<TagInput
					tags={data.tags || []}
					onTagsChange={(newTags) => onDataChange({ ...data, tags: newTags })}
				/>

				<div className="bg-primary-toned-50 p-4 rounded-md border border-primary-toned-200">
					<p className="text-sm text-primary-toned-800">
						<span className="font-medium">Tip:</span> Add specific tags related to the technologies or
						concepts you want to be tested on. Tags help the AI generate more relevant questions.
					</p>
				</div>
			</div>
		</div>
	);
};

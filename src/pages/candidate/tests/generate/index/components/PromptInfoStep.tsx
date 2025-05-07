import React from 'react';
import { PromptTemplate } from '../../../../../../features/tests/model/test/test-practice';
import TagInput from '../../../templates/components/TagInput';

interface PromptInfoStepProps {
	promptData: Omit<PromptTemplate, 'id' | 'name'>;
	onPromptDataChange: (data: Omit<PromptTemplate, 'id' | 'name'>) => void;
}

const PromptInfoStep: React.FC<PromptInfoStepProps> = ({
	promptData,
	onPromptDataChange
}) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		onPromptDataChange({
			...promptData,
			[name]: ['numberOfQuestions', 'difficulty', 'numberOfOptions'].includes(name)
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

			{/* Form Fields */}
			<div className="space-y-4">
				<div>
					<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
						Prompt Title*
					</label>
					<input
						type="text"
						id="title"
						name="title"
						value={promptData.title}
						onChange={handleInputChange}
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="E.g., React Fundamentals Questions"
						required
					/>
					<p className="mt-1 text-xs text-gray-500">
						This title helps the AI understand what kind of questions to generate.
					</p>
				</div>

				<div>
					<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
						Prompt Description*
					</label>
					<textarea
						id="description"
						name="description"
						value={promptData.description}
						onChange={handleInputChange}
						rows={2}
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="Describe what topics this prompt should cover"
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label htmlFor="numberOfQuestions" className="block text-sm font-medium text-gray-700 mb-1">
							Number of Questions
						</label>
						<input
							type="number"
							id="numberOfQuestions"
							name="numberOfQuestions"
							value={promptData.numberOfQuestions}
							onChange={handleInputChange}
							min={1}
							max={50}
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>

					<div>
						<label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
							Difficulty (1-5)
						</label>
						<input
							type="number"
							id="difficulty"
							name="difficulty"
							value={promptData.difficulty}
							onChange={handleInputChange}
							min={1}
							max={5}
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>

					<div>
						<label htmlFor="numberOfOptions" className="block text-sm font-medium text-gray-700 mb-1">
							Options per Question
						</label>
						<input
							type="number"
							id="numberOfOptions"
							name="numberOfOptions"
							value={promptData.numberOfOptions}
							onChange={handleInputChange}
							min={2}
							max={6}
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>
				</div>

				<TagInput
					tags={promptData.tags}
					onTagsChange={(newTags) => onPromptDataChange({ ...promptData, tags: newTags })}
				/>

				<div className="bg-blue-50 p-4 rounded-md border border-blue-200">
					<p className="text-sm text-blue-800">
						<span className="font-medium">Tip:</span> Add specific tags related to the technologies or
						concepts you want to be tested on. Tags help the AI generate more relevant questions.
					</p>
				</div>
			</div>
		</div>
	);
};

export default PromptInfoStep;
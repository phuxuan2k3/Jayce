import React, { useState } from 'react';
import { TestCore } from '../../../../../../features/tests/model/test/test-core';
import { PromptTemplate } from '../../../../../../features/tests/model/test/test-practice';

interface TestInfoStepProps {
	testData: TestCore;
	onTestDataChange: (data: TestCore) => void;
	templates: PromptTemplate[];
	selectedTemplate: PromptTemplate | null;
	onSelectTemplate: (template: PromptTemplate) => void;
}

const TestInfoStep: React.FC<TestInfoStepProps> = ({
	testData,
	onTestDataChange,
	templates,
	selectedTemplate,
	onSelectTemplate
}) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		onTestDataChange({
			...testData,
			[name]: name === 'minutesToAnswer' ? parseInt(value, 10) : value,
		});
	};

	// Filter templates based on search term
	const filteredTemplates = templates.filter(template =>
		template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
		template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		template.id.toString().includes(searchTerm)
	);

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-gray-800">Test Information</h2>
			<p className="text-gray-600">Start by selecting a template or filling in your test information.</p>

			{/* Template Selection Section */}
			<div className="bg-indigo-50 p-5 rounded-md border border-indigo-200 mb-6">
				<h3 className="text-lg font-medium text-indigo-800 mb-3">Choose a Template (Optional)</h3>
				<p className="text-sm text-indigo-600 mb-4">
					Select a template to automatically fill in test information and prompt settings.
				</p>

				<div className="mb-4">
					<input
						type="text"
						placeholder="Search templates by title, tag, or ID..."
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
					{filteredTemplates.map(template => (
						<div
							key={template.id}
							className={`p-3 border rounded-md cursor-pointer hover:bg-indigo-100 transition ${selectedTemplate?.id === template.id ? 'border-indigo-500 bg-indigo-100' : 'border-gray-200'
								}`}
							onClick={() => onSelectTemplate(template)}
						>
							<h4 className="font-medium text-gray-800">{template.title}</h4>
							<p className="text-xs text-gray-500 mt-1">Template #{template.id}</p>
							<div className="mt-2 flex flex-wrap gap-1">
								{template.tags.slice(0, 2).map((tag, idx) => (
									<span
										key={idx}
										className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full"
									>
										{tag}
									</span>
								))}
								{template.tags.length > 2 && (
									<span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
										+{template.tags.length - 2}
									</span>
								)}
							</div>
						</div>
					))}

					{filteredTemplates.length === 0 && (
						<div className="col-span-full text-center py-6 text-gray-500">
							No templates found with that search term.
						</div>
					)}
				</div>
			</div>

			{/* Form Fields */}
			<div className="space-y-4">
				<div>
					<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
						Test Title*
					</label>
					<input
						type="text"
						id="title"
						name="title"
						value={testData.title}
						onChange={handleInputChange}
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="E.g., React Fundamentals Practice Test"
						required
					/>
				</div>

				<div>
					<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
						Description*
					</label>
					<textarea
						id="description"
						name="description"
						value={testData.description}
						onChange={handleInputChange}
						rows={3}
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="Describe what this test covers and its purpose"
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
							Language
						</label>
						<select
							id="language"
							name="language"
							value={testData.language}
							onChange={handleInputChange}
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>
							<option value="English">English</option>
							<option value="Spanish">Spanish</option>
							<option value="French">French</option>
							<option value="German">German</option>
							<option value="Chinese">Chinese</option>
							<option value="Japanese">Japanese</option>
						</select>
					</div>

					<div>
						<label htmlFor="minutesToAnswer" className="block text-sm font-medium text-gray-700 mb-1">
							Time Limit (minutes)
						</label>
						<input
							type="number"
							id="minutesToAnswer"
							name="minutesToAnswer"
							value={testData.minutesToAnswer}
							onChange={handleInputChange}
							min={5}
							max={180}
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>
				</div>

				{selectedTemplate && (
					<div className="bg-green-50 p-4 rounded-md border border-green-200">
						<p className="text-sm text-green-800 flex items-center">
							<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
							</svg>
							<span>Using template: <strong>{selectedTemplate.name}</strong>. Prompt settings will be pre-filled in the next steps.</span>
						</p>
					</div>
				)}

				<div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
					<p className="text-sm text-yellow-800">
						<span className="font-medium">Note:</span> You are creating this test in practice mode, which allows you to
						see immediate feedback after answering each question.
					</p>
				</div>
			</div>
		</div>
	);
};

export default TestInfoStep;
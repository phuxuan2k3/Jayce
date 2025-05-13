import React from 'react';
import { TemplateCore } from "../../../../../../features/tests/model/test.model";
import { ListFilter } from 'lucide-react';
import { TestCoreCreate } from '../../../../../../features/tests/types/create';

interface TestInfoStepProps {
	testCoreData: TestCoreCreate;
	onTestCoreDataChange: (data: TestCoreCreate) => void;
	selectedTemplate: TemplateCore | null;
	onSelectTemplateClick: () => void;
}

const TestInfoStep: React.FC<TestInfoStepProps> = ({
	testCoreData,
	onTestCoreDataChange,
	selectedTemplate,
	onSelectTemplateClick
}) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		onTestCoreDataChange({
			...testCoreData,
			[name]: name === 'minutesToAnswer' ? parseInt(value, 10) : value,
		});
	};

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-gray-800">Test Information</h2>
			<p className="text-gray-600">Start by selecting a template or filling in your test information.</p>

			{/* Template Selection Section */}
			<div className="bg-primary-toned-50 p-5 rounded-md border border-primary-toned-200 mb-6">
				<h3 className="text-lg font-medium text-primary-toned-800 mb-3">Choose a Template (Optional)</h3>
				<p className="text-sm text-primary-toned-600 mb-4">
					Select a template to automatically fill in test information and prompt settings.
				</p>

				<button
					onClick={onSelectTemplateClick}
					className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-white border border-primary-toned-300 text-primary rounded-md hover:bg-primary-toned-50 transition-colors"
				>
					<ListFilter size={18} />
					<span>Browse Available Templates</span>
				</button>

				{selectedTemplate && (
					<div className="mt-4 bg-green-50 p-4 rounded-md border border-green-200">
						<p className="text-sm text-green-800 flex items-center">
							<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
							</svg>
							<span>Using template: <strong>{selectedTemplate.name || selectedTemplate.title}</strong>. Prompt settings will be pre-filled in the next steps.</span>
						</p>
					</div>
				)}
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
						value={testCoreData.title}
						onChange={handleInputChange}
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
						value={testCoreData.description}
						onChange={handleInputChange}
						rows={3}
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
							value={testCoreData.language}
							onChange={handleInputChange}
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
							value={testCoreData.minutesToAnswer}
							onChange={handleInputChange}
							min={5}
							max={180}
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>
				</div>

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
import React from 'react';
import { Upload, FileText, Sparkles } from 'lucide-react';
import { ExamplesAndRAG, ValidationErrors } from '../types';

interface ExamplesAndRAGSectionProps {
	data: ExamplesAndRAG;
	onChange: (data: ExamplesAndRAG) => void;
	errors?: ValidationErrors['examplesAndRAG'];
}

const galleryPresets = [
	{
		id: 'technical-interview',
		title: 'Technical Interview Q&A',
		description: 'Common software engineering interview questions and answers',
		preview: 'Q: Explain the difference between abstract classes and interfaces...',
	},
	{
		id: 'system-design',
		title: 'System Design Examples',
		description: 'System architecture and design pattern questions',
		preview: 'Q: Design a scalable chat application like WhatsApp...',
	},
	{
		id: 'algorithm-coding',
		title: 'Algorithm & Coding',
		description: 'Data structures and algorithm problem examples',
		preview: 'Q: Implement a function to reverse a linked list...',
	},
	{
		id: 'behavioral',
		title: 'Behavioral Questions',
		description: 'Leadership and teamwork scenario examples',
		preview: 'Q: Tell me about a time when you had to deal with a difficult team member...',
	},
];

export default function ExamplesAndRAGSection({
	data,
	onChange,
	errors
}: ExamplesAndRAGSectionProps) {
	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);
		onChange({
			...data,
			uploadedFiles: [...data.uploadedFiles, ...files],
		});
	};

	const removeFile = (index: number) => {
		const updatedFiles = data.uploadedFiles.filter((_, i) => i !== index);
		onChange({
			...data,
			uploadedFiles: updatedFiles,
		});
	};

	const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange({
			...data,
			customExamples: event.target.value,
		});
	};

	const toggleGalleryPreset = (presetId: string) => {
		const isSelected = data.selectedGalleryPresets.includes(presetId);
		const updatedPresets = isSelected
			? data.selectedGalleryPresets.filter(id => id !== presetId)
			: [...data.selectedGalleryPresets, presetId];

		onChange({
			...data,
			selectedGalleryPresets: updatedPresets,
		});
	};

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold text-gray-900 mb-2">
					Examples & Reference Content
				</h3>
				<p className="text-sm text-gray-600 mb-4">
					Provide examples and reference materials to guide AI question generation
				</p>
			</div>

			{/* File Upload Section */}
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Upload Past Q&A or Reference Documents
					</label>
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
						<Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
						<div className="space-y-2">
							<p className="text-sm text-gray-600">
								Drag and drop files here, or{' '}
								<label className="text-blue-600 hover:text-blue-500 cursor-pointer">
									browse
									<input
										type="file"
										multiple
										accept=".txt,.pdf,.doc,.docx,.md"
										onChange={handleFileUpload}
										className="hidden"
									/>
								</label>
							</p>
							<p className="text-xs text-gray-500">
								Supports: TXT, PDF, DOC, DOCX, MD files
							</p>
						</div>
					</div>
				</div>

				{/* Uploaded Files Display */}
				{data.uploadedFiles.length > 0 && (
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Uploaded Files ({data.uploadedFiles.length})
						</label>
						<div className="space-y-2">
							{data.uploadedFiles.map((file, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
								>
									<div className="flex items-center space-x-3">
										<FileText className="h-5 w-5 text-gray-400" />
										<div>
											<p className="text-sm font-medium text-gray-900">{file.name}</p>
											<p className="text-xs text-gray-500">
												{(file.size / 1024).toFixed(1)} KB
											</p>
										</div>
									</div>
									<button
										onClick={() => removeFile(index)}
										className="text-red-600 hover:text-red-700 text-sm font-medium"
									>
										Remove
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				{errors?.uploadedFiles && (
					<p className="text-sm text-red-600">{errors.uploadedFiles}</p>
				)}
			</div>

			{/* Custom Examples TextArea */}
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Custom Examples (Optional)
					</label>
					<textarea
						value={data.customExamples}
						onChange={handleTextAreaChange}
						placeholder="Enter custom Q&A examples, guidelines, or specific instructions for question generation...

Example format:
Q: What is the difference between React hooks and class components?
A: React hooks allow you to use state and lifecycle methods in functional components...

Q: Explain REST API best practices
A: REST APIs should follow proper HTTP methods, use meaningful URLs..."
						rows={8}
						className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors?.customExamples ? 'border-red-300' : 'border-gray-300'
							}`}
					/>
					<p className="text-xs text-gray-500 mt-1">
						Provide examples in Q&A format or specific guidelines for question generation
					</p>
				</div>

				{errors?.customExamples && (
					<p className="text-sm text-red-600">{errors.customExamples}</p>
				)}
			</div>

			{/* Gallery Presets */}
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						<Sparkles className="inline h-4 w-4 mr-1" />
						Select from Gallery Presets
					</label>
					<p className="text-sm text-gray-600 mb-4">
						Choose from curated example sets to enhance question generation
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{galleryPresets.map((preset) => {
						const isSelected = data.selectedGalleryPresets.includes(preset.id);
						return (
							<div
								key={preset.id}
								onClick={() => toggleGalleryPreset(preset.id)}
								className={`p-4 border rounded-lg cursor-pointer transition-all ${isSelected
										? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-20'
										: 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
									}`}
							>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<h4 className="font-medium text-gray-900 mb-1">
											{preset.title}
										</h4>
										<p className="text-sm text-gray-600 mb-2">
											{preset.description}
										</p>
										<p className="text-xs text-gray-500 italic">
											{preset.preview}
										</p>
									</div>
									<div className="ml-3">
										<div
											className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected
													? 'border-blue-500 bg-blue-500'
													: 'border-gray-300'
												}`}
										>
											{isSelected && (
												<div className="w-2 h-2 bg-white rounded-full" />
											)}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{errors?.selectedGalleryPresets && (
					<p className="text-sm text-red-600">{errors.selectedGalleryPresets}</p>
				)}
			</div>
		</div>
	);
}

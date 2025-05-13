import React, { useState } from 'react';

// Similar to the existing ContextInput component but modified for our needs
const OutlinesStep: React.FC<{
	outlines: string[];
	onOutlinesChange: (newOutlines: string[]) => void;
}> = ({
	outlines,
	onOutlinesChange
}) => {
		const [newOutline, setNewOutline] = useState<string>('');
		const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState<boolean>(false);
		const [suggestions, setSuggestions] = useState<string[]>([]);

		// Mock data for AI suggestions - similar to what's in ContextInput
		const mockSuggestions = [
			'Cover fundamental concepts and principles',
			'Include questions about best practices',
			'Focus on performance optimization techniques',
			'Add questions about error handling strategies',
			'Include real-world scenarios and problem-solving',
			'Test knowledge of related tools and frameworks',
			'Cover security considerations and practices',
			'Include questions about scalability approaches',
			'Test understanding of design patterns',
			'Add questions about testing methodologies',
			'Include questions on data structures',
			'Focus on algorithm complexity and efficiency',
			'Test knowledge of proper syntax and language features',
			'Cover state management approaches',
			'Include questions about API design'
		];

		const handleAddOutline = () => {
			if (newOutline.trim()) {
				onOutlinesChange([...outlines, newOutline]);
				setNewOutline('');
			}
		};

		const handleRemoveOutline = (index: number) => {
			onOutlinesChange(outlines.filter((_, i) => i !== index));
		};

		const handleGenerateSuggestions = () => {
			setIsGeneratingSuggestions(true);

			// Simulate API call with timeout
			setTimeout(() => {
				// Get random suggestions (3-5) from the mock data
				const count = Math.floor(Math.random() * 3) + 3; // 3 to 5 suggestions
				const randomSuggestions = [...mockSuggestions]
					.sort(() => 0.5 - Math.random())
					.slice(0, count);

				setSuggestions(randomSuggestions);
				setIsGeneratingSuggestions(false);
			}, 1000);
		};

		const handleAddSuggestion = (suggestion: string) => {
			onOutlinesChange([...outlines, suggestion]);
			// Remove the suggestion from the list
			setSuggestions(suggestions.filter((s) => s !== suggestion));
		};

		const handleAddAllSuggestions = () => {
			onOutlinesChange([...outlines, ...suggestions]);
			setSuggestions([]);
		};

		const handleClearSuggestions = () => {
			setSuggestions([]);
		};

		return (
			<div className="space-y-6">
				<h2 className="text-xl font-semibold text-gray-800">Add Outlines & Generate</h2>
				<p className="text-gray-600">
					Add specific outlines to guide the AI in generating your questions. More detailed outlines will result in better questions.
				</p>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Outlines
						</label>

						{/* Existing outlines */}
						<div className="space-y-2 mb-3">
							{outlines.length === 0 ? (
								<div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-center">
									No outlines added yet. Add some below or use AI suggestions.
								</div>
							) : (
								outlines.map((outline, idx) => (
									<div
										key={idx}
										className="p-3 border border-gray-200 rounded-md bg-gray-50 relative"
									>
										<button
											type="button"
											className="absolute top-2 right-2 text-red-500 hover:text-red-700"
											onClick={() => handleRemoveOutline(idx)}
										>
											×
										</button>
										<p className="text-sm pr-6">{outline}</p>
									</div>
								))
							)}
						</div>

						{/* Add new outline */}
						<div className="space-y-2">
							<div className="flex">
								<input
									type="text"
									placeholder="Enter outline text..."
									value={newOutline}
									onChange={(e) => setNewOutline(e.target.value)}
									className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault();
											handleAddOutline();
										}
									}}
								/>
								<button
									type="button"
									onClick={handleAddOutline}
									className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary-toned-700"
								>
									Add
								</button>
							</div>

							<button
								type="button"
								onClick={handleGenerateSuggestions}
								disabled={isGeneratingSuggestions}
								className={`w-full px-4 py-2 rounded-md flex items-center justify-center ${isGeneratingSuggestions
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-green-600 hover:bg-green-700 text-white'
									}`}
							>
								{isGeneratingSuggestions ? (
									<>
										<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Generating AI Suggestions...
									</>
								) : (
									<>
										<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
										</svg>
										Get AI Suggestions
									</>
								)}
							</button>
						</div>
					</div>

					{/* AI Suggestions */}
					{suggestions.length > 0 && (
						<div className="mt-4">
							<div className="flex justify-between items-center mb-2">
								<h3 className="text-sm font-medium text-gray-700">
									AI Suggestions
								</h3>
								<div className="flex gap-2">
									<button
										type="button"
										onClick={handleAddAllSuggestions}
										className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-primary-toned-700"
									>
										Add All
									</button>
									<button
										type="button"
										onClick={handleClearSuggestions}
										className="text-xs px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
									>
										Clear
									</button>
								</div>
							</div>
							<div className="space-y-2">
								{suggestions.map((suggestion, idx) => (
									<div
										key={idx}
										className="p-2 border border-green-200 rounded-md bg-green-50 flex justify-between items-center"
									>
										<p className="text-sm text-gray-800">{suggestion}</p>
										<button
											type="button"
											onClick={() => handleAddSuggestion(suggestion)}
											className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
										>
											Add
										</button>
									</div>
								))}
							</div>
						</div>
					)}

					<div className="mt-2">
						<div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
							<p className="text-sm text-yellow-800">
								<span className="font-medium">Ready to generate?</span> Click the "Generate Test" button below to create your practice test based on these settings.
							</p>
						</div>
					</div>

					<div className="bg-primary-toned-50 p-4 rounded-md border border-primary-toned-200">
						<p className="text-sm text-primary-toned-800">
							<span className="font-medium">Tip:</span> Want to save this template for future use? Click the "Save as Template" button in the sidebar.
						</p>
					</div>
				</div>
			</div>
		);
	};

export default OutlinesStep;
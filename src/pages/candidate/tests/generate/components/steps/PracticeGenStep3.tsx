import { useEffect, useState } from 'react';
import { useLazyGetSuggestOutlinesQuery } from '../../api/practice-generate.api';
import { PracticeStep3Type } from '../../types';

export default function PracticeGenStep3({
	data,
	onDataChange,
	suggestionData,
}: {
	data: PracticeStep3Type;
	onDataChange: (data: PracticeStep3Type) => void;
	suggestionData: {
		title: string;
		description: string;
		tags: string[];
		difficulty: string;
	}
}) {
	const [newOutline, setNewOutline] = useState<string>('');
	const [getSuggestions, { data: suggestedData, isLoading: isGeneratingSuggestions, isSuccess }] = useLazyGetSuggestOutlinesQuery();
	const [outlineSuggestions, setOutlineSuggestions] = useState<string[]>([]);
	const [errorMessages, setErrorMessages] = useState<string[]>([]);

	useEffect(() => {
		if (isSuccess && suggestedData) {
			setOutlineSuggestions(suggestedData.outlines);
		}
	}, [isSuccess, data]);

	const handleAddOutlines = (outlines: string[]) => {
		for (const outline of outlines) {
			if (data.outlines.includes(outline)) {
				setErrorMessages((prev) => [...prev, `Outline "${outline}" already exists.`]);
				return;
			}
			if (!outline.trim()) {
				setErrorMessages((prev) => [...prev, 'Outline cannot be empty.']);
				return;
			}
		}
		onDataChange({
			...data,
			outlines: [...data.outlines, ...outlines],
		});
		setNewOutline('');
	};

	const handleRemoveOutline = (index?: number) => {
		if (index !== undefined && index >= 0 && index < data.outlines.length) {
			const updatedOutlines = [...data.outlines];
			updatedOutlines.splice(index, 1);
			onDataChange({
				...data,
				outlines: updatedOutlines,
			});
		} else {
			setErrorMessages((prev) => [...prev, 'Invalid outline index.']);
		}
	};

	const handleAddSuggestion = (suggestion: string) => {
		handleAddOutlines([suggestion]);
		setOutlineSuggestions(outlineSuggestions.filter((s) => s !== suggestion));
	};

	const handleAddAllSuggestions = () => {
		handleAddOutlines(outlineSuggestions);
		setOutlineSuggestions([]);
	};

	const handleClearSuggestions = () => {
		setOutlineSuggestions([]);
	};

	const handleGenerateSuggestions = () => {
		if (data.outlines.length === 0) {
			setErrorMessages((prev) => [...prev, 'Please add at least one outline before generating suggestions.']);
			return;
		}
		getSuggestions({
			...suggestionData,

			outlines: data.outlines
		});
	};

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-gray-800">Add Outlines & Generate</h2>
			<p className="text-gray-600">
				Add specific outlines to guide the AI in generating your questions. More detailed outlines will result in better questions.
			</p>

			{errorMessages.length > 0 && (
				<div className="bg-red-50 p-4 rounded-md border border-red-200 mb-4">
					<p className="text-sm text-red-800">
						{errorMessages.map((msg, idx) => (
							<span key={idx} className="block">{msg}</span>
						))}
					</p>
				</div>
			)}

			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Outlines
					</label>

					{/* Existing outlines */}
					<div className="space-y-2 mb-3">
						{data.outlines.length === 0 ? (
							<div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-center">
								No outlines added yet. Add some below or use AI suggestions.
							</div>
						) : (
							data.outlines.map((outline, idx) => (
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
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										handleAddOutlines([newOutline]);
									}
								}}
							/>
							<button
								type="button"
								onClick={() => handleAddOutlines([newOutline])}
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
								: 'bg-primary-toned-600 hover:bg-primary-toned-700 text-white'
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
				{outlineSuggestions.length > 0 && (
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
							{outlineSuggestions.map((suggestion, idx) => (
								<div
									key={idx}
									className="p-2 border border-primary-toned-200 rounded-md bg-primary-toned-50 flex justify-between items-center"
								>
									<p className="text-sm text-gray-800">{suggestion}</p>
									<button
										type="button"
										onClick={() => handleAddSuggestion(suggestion)}
										className="text-xs px-2 py-1 bg-primary-toned-600 text-white rounded hover:bg-primary-toned-700"
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

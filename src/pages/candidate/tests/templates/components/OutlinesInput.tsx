import React, { useState } from 'react';

// Mock data for AI suggestions
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
];

interface Props {
	outlines: string[];
	onOutlinesChange: (newOutlines: string[]) => void;
}

const OutlinesInput: React.FC<Props> = ({
	outlines,
	onOutlinesChange,
}) => {
	const [newOutline, setNewOutline] = useState<string>('');
	const [isGeneratingSuggestions, setIsGeneratingSuggestions] =
		useState<boolean>(false);
	const [suggestions, setSuggestions] = useState<string[]>([]);

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
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-1">
				Outlines
			</label>
			<div className="space-y-3 mb-3">
				{outlines.map((outline, idx) => (
					<div
						key={idx}
						className="p-3 border border-primary-toned-300 rounded-md bg-primary-toned-50 relative text-primary-toned-700"
					>
						<button
							type="button"
							className="absolute top-2 right-2 text-red-500 hover:text-red-700"
							onClick={() => handleRemoveOutline(idx)}
						>
							×
						</button>
						<p className="text-sm">{outline}</p>
					</div>
				))}
			</div>
			<div className="space-y-2">
				<input
					type="text"
					placeholder="Enter outline text..."
					value={newOutline}
					onChange={(e) => setNewOutline(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-toned-500"
				/>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={handleAddOutline}
						className="flex-1 px-4 py-2 bg-primary-toned-600 text-white rounded-md hover:bg-primary-toned-700"
					>
						Add Outline
					</button>
					<button
						type="button"
						onClick={handleGenerateSuggestions}
						disabled={isGeneratingSuggestions}
						className={`flex-1 px-4 py-2 rounded-md ${isGeneratingSuggestions
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-green-600 hover:bg-green-700 text-white'
							}`}
					>
						{isGeneratingSuggestions
							? 'Generating...'
							: 'Get Suggestions'}
					</button>
				</div>
			</div>

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
								className="text-xs px-2 py-1 bg-primary-toned-600 text-white rounded hover:bg-primary-toned-700"
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
		</div>
	);
};

export default OutlinesInput;
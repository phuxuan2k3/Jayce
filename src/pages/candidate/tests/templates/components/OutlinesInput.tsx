import React, { useState } from 'react';
import { useLazyGetSuggestOutlinesQuery } from '../../../../../infra-test/api/prompt.api-custom';
import { TemplateFormData } from './types';
import MyButton from '../../../../../infra-test/ui/MyButton';
import { cn } from '../../../../../app/cn';
import { Trash2 } from 'lucide-react';

interface Props {
	template: TemplateFormData;
	outlines: string[];
	onOutlinesChange: (newOutlines: string[]) => void;
}

const OutlinesInput: React.FC<Props> = ({
	template,
	outlines,
	onOutlinesChange,
}) => {
	const [newOutline, setNewOutline] = useState<string>('');
	const [isGeneratingSuggestions, setIsGeneratingSuggestions] =
		useState<boolean>(false);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [getOutlineSuggestions] = useLazyGetSuggestOutlinesQuery();

	const MAX_OUTLINES = 5;

	const handleAddOutline = () => {
		if (newOutline.trim() && outlines.length < MAX_OUTLINES) {
			onOutlinesChange([...outlines, newOutline]);
			setNewOutline('');
		}
	};

	const handleRemoveOutline = (index: number) => {
		onOutlinesChange(outlines.filter((_, i) => i !== index));
	};

	const handleGenerateSuggestions = async () => {
		if (isGeneratingSuggestions) return;

		setIsGeneratingSuggestions(true);
		try {
			const response = await getOutlineSuggestions({
				...template,
			}).unwrap();

			setSuggestions(response.outlines);
		} catch (error) {
			console.error('Error generating suggestions:', error);
		} finally {
			setIsGeneratingSuggestions(false);
		}
	};

	const handleAddSuggestion = (suggestion: string) => {
		if (outlines.length < MAX_OUTLINES) {
			onOutlinesChange([...outlines, suggestion]);
			setSuggestions(suggestions.filter((s) => s !== suggestion));
		}
	};

	const handleAddAllSuggestions = () => {
		const availableSlots = MAX_OUTLINES - outlines.length;
		if (availableSlots > 0) {
			const toAdd = suggestions.slice(0, availableSlots);
			onOutlinesChange([...outlines, ...toAdd]);
			setSuggestions(suggestions.slice(toAdd.length));
		}
	};

	const handleClearSuggestions = () => {
		setSuggestions([]);
	};

	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-1">
				Outlines
			</label>

			{outlines.length > 0 && <div className="space-y-3 mb-3">
				{outlines.map((outline, idx) => (
					<div
						key={idx}
						className="py-1 px-3 border border-primary-toned-300 rounded-md bg-primary-toned-50 text-primary-toned-700 flex flex-row justify-between items-center"
					>
						<p className="text-sm">{outline}</p>
						<button
							className='bg-transparent text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition-colors'
							onClick={() => handleRemoveOutline(idx)}
						>
							<Trash2 size={18} />
						</button>
					</div>
				))}
			</div>}

			<div className="flex flex-col">
				<input
					type="text"
					placeholder="Enter outline text..."
					value={newOutline}
					onChange={(e) => setNewOutline(e.target.value)}
					className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-toned-500"
				/>
				<div className="flex gap-2">
					<MyButton
						onClick={handleGenerateSuggestions}
						disabled={isGeneratingSuggestions}
						className={cn('flex-1', isGeneratingSuggestions && 'bg-gray-400 cursor-not-allowed')}
						variant={"secondary"}
					>
						{isGeneratingSuggestions
							? <span>Generating...</span>
							: <span>Get Suggestions</span>
						}
					</MyButton>

					<MyButton
						onClick={handleAddOutline}
						className={cn('flex-1', outlines.length >= MAX_OUTLINES && 'bg-gray-400 cursor-not-allowed')}
						disabled={outlines.length >= MAX_OUTLINES}
					>
						Add Outline
					</MyButton>
				</div>
				{outlines.length >= MAX_OUTLINES && (
					<p className="text-xs text-red-500 mt-2">You can only add up to 5 outlines.</p>
				)}
			</div>

			{suggestions.length > 0 && (
				<div className="mt-4">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-sm font-medium text-gray-700">
							AI Suggestions
						</h3>
						<div className="flex gap-2">
							<MyButton
								onClick={handleAddAllSuggestions}
								size={"small"}
							>
								Add All
							</MyButton>
							<MyButton
								onClick={handleClearSuggestions}
								size={"small"}
								variant={"gray"}
							>
								Clear
							</MyButton>
						</div>
					</div>
					<div className="space-y-2">
						{suggestions.map((suggestion, idx) => (
							<div
								key={idx}
								className="p-2 border border-green-200 rounded-md bg-green-50 flex justify-between items-center"
							>
								<p className="text-sm text-gray-800">{suggestion}</p>
								<MyButton
									onClick={() => handleAddSuggestion(suggestion)}
									size={"small"}
								>
									Add
								</MyButton>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default OutlinesInput;
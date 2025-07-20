import React, { useState } from 'react';
import { ChevronDown, Plus, Sparkles, X } from 'lucide-react';
import { cn } from '../../../../../../app/cn';
import { useLazyGetSuggestOutlinesQuery } from '../../../../../../features/tests/api/practice-generate.api';
import { TemplatePersistCoreSchema } from '../../../../../../features/tests/ui-items/template/types';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import MyDescription from '../../../../../../features/tests/ui/forms/MyDescription';
import MyInput from '../../../../../../features/tests/ui/forms/MyInput';
import MyLabel from '../../../../../../features/tests/ui/forms/MyLabel';
import { useLanguage } from '../../../../../../LanguageProvider';

interface Props {
	template: TemplatePersistCoreSchema;
	outlines: string[];
	onOutlinesChange: (newOutlines: string[]) => void;
	className?: string;
	maxOutlines?: number;
	omitAISection?: boolean;
}

const OutlinesInput: React.FC<Props> = ({
	template,
	outlines,
	onOutlinesChange,
	className = '',
	maxOutlines = 5,
	omitAISection = false,
}) => {
	const { t } = useLanguage();

	const [newOutline, setNewOutline] = useState<string>('');
	const [isGeneratingSuggestions, setIsGeneratingSuggestions] =
		useState<boolean>(false);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [getOutlineSuggestions] = useLazyGetSuggestOutlinesQuery();
	const [maxOutlinesError, setMaxOutlinesError] = useState<string | null>(null);
	const [isSuggestionsVisible, setIsSuggestionsVisible] = useState<boolean>(false);

	const handleAddOutline = () => {
		if (newOutline.trim()) {
			if (outlines.length >= maxOutlines) {
				setMaxOutlinesError(t("outlines_error_max").replace('{{max}}', maxOutlines.toString()));
				return;
			}
			setMaxOutlinesError(null);
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
		if (outlines.length < maxOutlines) {
			onOutlinesChange([...outlines, suggestion]);
			setSuggestions(suggestions.filter((s) => s !== suggestion));
		}
	};

	const handleAddAllSuggestions = () => {
		const availableSlots = maxOutlines - outlines.length;
		if (availableSlots > 0) {
			const toAdd = suggestions.slice(0, availableSlots);
			onOutlinesChange([...outlines, ...toAdd]);
			setSuggestions(suggestions.slice(toAdd.length));
		}
	};

	const handleClearSuggestions = () => {
		setSuggestions([]);
	};

	const toggleSuggestionsVisibility = () => {
		setIsSuggestionsVisible(!isSuggestionsVisible);
	};

	return (
		<div className={cn('flex flex-col gap-1', className)}>
			<div className='flex items-baseline gap-2'>
				<MyLabel>
					{t("outlines_label")}
				</MyLabel>
				<MyDescription className='text-gray-500' text={t("outlines_hint")} />
			</div>

			<div className="flex flex-col gap-2">
				<div className='flex items-center gap-2'>
					<MyInput
						type="text"
						placeholder={t("outlines_input_placeholder")}
						value={newOutline}
						onChange={(e) => setNewOutline(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								handleAddOutline();
							}
						}}
						error={maxOutlinesError}
					/>
					<MyButton
						onClick={handleAddOutline}
						disabled={!newOutline.trim() || outlines.length >= maxOutlines}
						className={cn('flex-shrink-0 flex items-center gap-2', outlines.length >= maxOutlines && 'bg-gray-400 cursor-not-allowed')}
					>
						<span>{t("outlines_add")}</span>
						<Plus size={18} strokeWidth={3} />
					</MyButton>
				</div>
				{maxOutlinesError && (
					<p className="text-xs text-red-500 mb-2">{maxOutlinesError}</p>
				)}
			</div>

			<div className='flex flex-col items-stretch justify-center gap-4 px-6 py-4 border border-gray-300 bg-gray-50 rounded-md shadow-sm my-2'>
				{outlines.length > 0 ? (
					<div className='flex flex-col gap-2'>
						<h3 className='font-semibold text-primary-toned-700 mb-1'>{t("outlines_added")} ({outlines.length}):</h3>
						{outlines.map((outline, idx) => (
							<li
								key={idx}
								className="py-3 px-3 border border-gray-300 rounded-lg flex flex-row justify-between items-center gap-4 bg-white hover:shadow-md transition-shadow"
							>
								<div className='flex items-center gap-4'>
									<span className="flex items-center rounded-full bg-primary text-white font-bold px-2 py-1 text-xs">
										{idx + 1}
									</span>
									<p className="text-sm text-gray-700">{outline}</p>
								</div>
								<button
									className='text-primary hover:text-red-500'
									onClick={() => handleRemoveOutline(idx)}
								>
									<X size={16} strokeWidth={2.5} />
								</button>
							</li>
						))}
					</div>
				) : (
					<p className="text-sm text-gray-500 text-center">{t("outlines_empty")}</p>
				)}
			</div>
			{/* 
			<div className='w-full flex items-start gap-2 text-primary-toned-700 p-4 bg-primary-toned-50 rounded-md shadow-md'>
				<Info size={20} className="text-primary-toned-600" />
				<span className='text-sm text-primary-toned-600'>
					Use our AI to suggest outlines that will help you create a more structured and comprehensive test.
				</span>
			</div> */}

			{/* AI Suggestions Section */}

			{omitAISection === false && (
				<div className="w-full mt-2">
					{/* Toggle Header */}
					<div
						className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden cursor-pointer"
						onClick={toggleSuggestionsVisibility}
					>
						<div className="bg-gradient-to-r from-primary-50 to-secondary-50 px-6 py-4 border-b border-gray-100">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
										<Sparkles size={20} className="text-white" />
									</div>
									<div>
										<h3 className="font-semibold text-gray-800">{t("outlines_ai_title")}</h3>
										<p className="text-sm text-gray-600">
											{isSuggestionsVisible
												? t("outlines_ai_toggle_hide")
												: t("outlines_ai_toggle_show")
											}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									{suggestions.length > 0 && (
										<span className="bg-primary text-white font-bold text-xs px-2 py-1 rounded-full">
											{suggestions.length}
										</span>
									)}
									<div className="p-2 bg-white rounded-lg shadow-sm">
										<ChevronDown size={20} className={cn("text-gray-600 transition-all", isSuggestionsVisible && "rotate-180")} />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Collapsible Content Section */}
					<div
						className={cn(
							"w-full overflow-hidden transition-all duration-300 ease-in-out",
							isSuggestionsVisible ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
						)}
					>
						<div className="border-x border-b border-gray-200 rounded-b-lg bg-gray-50">
							<div className="p-6 flex flex-col gap-2">
								{/* Generate Button Section */}
								<MyButton
									onClick={handleGenerateSuggestions}
									disabled={isGeneratingSuggestions}
									size={"large"}
									className={cn(
										'w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-200 mb-4',
										isGeneratingSuggestions && 'opacity-70 cursor-not-allowed'
									)}
									variant={"secondary"}
								>
									<Sparkles size={20} strokeWidth={2.5} className={isGeneratingSuggestions ? 'animate-spin' : ''} />
									{isGeneratingSuggestions ? t("outlines_ai_generating") : t("outlines_ai_generate")}
								</MyButton>

								{suggestions.length === 0 ? (
									<div className="text-center py-8">
										<div className="mb-4">
											<Sparkles size={48} className="text-gray-300 mx-auto" />
										</div>
										<h4 className="text-lg font-medium text-gray-700 mb-2">{t("outlines_ai_no_suggestions_title")}</h4>
										<p className="text-gray-500 max-w-md mx-auto">
											{t("outlines_ai_no_suggestions_desc")}
										</p>
									</div>
								) : (
									<div className="space-y-4">
										<h4 className="font-semibold text-gray-600">
											{t("outlines_at_suggested")} ({suggestions.length})
										</h4>

										<div className="flex flex-col gap-3">
											{suggestions.map((suggestion, idx) => (
												<div
													key={idx}
													className="group px-3 py-2 border border-gray-300 rounded-lg bg-white hover:border-primary-toned-300 hover:shadow-md transition-all duration-200 flex justify-between items-center gap-4"
												>
													<div className="flex-1">
														<div className="flex items-center gap-3">
															<span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
																{idx + 1}
															</span>
															<p className="text-sm text-gray-700 leading-relaxed">{suggestion}</p>
														</div>
													</div>
													<MyButton
														onClick={() => handleAddSuggestion(suggestion)}
														size={"small"}
														className="flex items-center gap-1"
													>
														{t("outlines_ai_add")}
														<Plus size={12} strokeWidth={2.5} />
													</MyButton>
												</div>
											))}
										</div>

										<div className='flex justify-between items-center mt-4'>
											<MyButton
												onClick={handleClearSuggestions}
												size={"small"}
												variant={"gray"}
												className='px-4 py-2 font-semibold'
											>
												{t("outlines_ai_clear")}
											</MyButton>

											<MyButton
												onClick={handleAddAllSuggestions}
												className={"px-4 py-2 font-semibold"}
												size={"small"}
												disabled={suggestions.length === 0 || outlines.length >= maxOutlines}
											>
												{t("outlines_ai_add_all")} ({suggestions.length})
											</MyButton>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default OutlinesInput;
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '../../../../../../app/cn';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import MyInput from '../../../../../../features/tests/ui/forms/MyInput';
import MyLabel from '../../../../../../features/tests/ui/forms/MyLabel';
import { useLanguage } from '../../../../../../LanguageProvider';
import useTagsExamples from '../../hooks/useTagsExamples';


interface TagInputProps {
	tags: string[];
	onTagsChange: (newTags: string[]) => void;
	className?: string;
	maxTags?: number;
}

const TagInput: React.FC<TagInputProps> = ({ className = '', tags, onTagsChange, maxTags = 10 }) => {
	const { t } = useLanguage();

	const [newTag, setNewTag] = useState('');
	const [tagsError, setTagsError] = useState<string | null>(null);
	const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

	const { getRandomExamples: _, isLoading } = useTagsExamples({ testTitle: '' });

	const handleAddTag = () => {
		if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < maxTags) {
			onTagsChange([...tags, newTag.trim()]);
			setNewTag('');
			setTagsError(null);
		} else if (tags.length >= maxTags) {
			setTagsError(t("tag_input_error_max").replace('{{max}}', maxTags.toString()));
		} else if (tags.includes(newTag.trim())) {
			setTagsError(t("tag_input_error_duplicate"));
		}
	};

	const handleRemoveTag = (tagToRemove: string) => {
		onTagsChange(tags.filter(tag => tag !== tagToRemove));
	};

	return (
		<div className={cn('flex flex-col gap-1', className)}>
			<div className='flex items-baseline gap-2 mb-1'>
				<MyLabel htmlFor='tag-input'>
					{t("tag_input_label")}:
				</MyLabel>
			</div>

			<div className="flex items-center gap-2">
				<MyInput
					id='tag-input'
					type="text"
					placeholder={t("tag_input_placeholder")}
					value={newTag}
					onChange={(e) => setNewTag(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							handleAddTag();
						}
					}}
					error={tagsError}
				/>
				<MyButton
					type="button"
					onClick={handleAddTag}
					className={cn('flex-shrink-0 flex items-center gap-2', tags.length >= maxTags && 'bg-gray-400 cursor-not-allowed')}
				>
					<span>{t("tag_input_add")}</span>
					<Plus size={18} strokeWidth={3} />
				</MyButton>
			</div>

			{tagsError && (
				<p className="text-xs text-red-500 mt-1">
					{tagsError}
				</p>
			)}

			{tags.length > 0 && <div className="flex flex-wrap gap-2 mt-2">
				{tags.map((tag, idx) => (
					<TagItem
						key={idx}
						tag={tag}
						onRemove={() => handleRemoveTag(tag)}
					/>
				))}
			</div>}


			<div className='flex items-baseline gap-2 w-full mt-4 border-t pt-2 border-gray-200'>
				<div className='flex flex-col text-sm text-gray-500 mb-2 flex-shrink-0'>
					<span>
						Suggested Tags:
					</span>
					<button className='w-fit self-start mt-2 text-primary hover:underline' onClick={() => {
						setSuggestedTags([]);
					}}>
						Clear
					</button>
				</div>
				<div className='flex flex-wrap gap-x-2 gap-y-1'>
					{suggestedTags.map((tag, idx) => (
						<TagItem
							key={idx}
							tag={tag}
							className="cursor-pointer hover:bg-primary hover:text-white"
						/>
					))}
					<TagItem
						tag="More +"
						disabled={isLoading || suggestedTags.length >= 6}
						className="cursor-pointer bg-white border border-primary hover:bg-primary hover:text-white"
						onClick={() => {
							if (isLoading || suggestedTags.length >= 6) return;
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default TagInput;

const TagItem: React.FC<{
	tag: string;
	onRemove?: () => void;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
}> = ({
	tag,
	onRemove,
	className = '',
	onClick,
	disabled = false,
}) => {
		return (
			<button
				type='button'
				disabled={disabled}
				className={cn(
					"flex items-center bg-primary-toned-100 text-primary-toned-800 px-4 py-0.5 rounded-full text-sm shadow-sm",
					"disabled:bg-gray-200 disabled:text-gray-500",
					onClick && 'cursor-pointer hover:bg-primary-toned-200',
					className
				)}
				onClick={onClick}
			>
				{tag}
				{onRemove && (
					<button
						type="button"
						className="ml-3 text-primary-toned-500 hover:text-primary-toned-700"
						onClick={(e) => {
							e.stopPropagation();
							onRemove();
						}}
					>
						<X size={12} />
					</button>
				)}
			</button>
		);
	};



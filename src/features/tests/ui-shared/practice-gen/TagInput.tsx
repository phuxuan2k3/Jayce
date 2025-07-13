import React, { useState } from 'react';
import MyLabel from '../../ui/forms/MyLabel';
import MyInput from '../../ui/forms/MyInput';
import MyButton from '../../ui/buttons/MyButton';
import { Plus, X } from 'lucide-react';
import { cn } from '../../../../app/cn';
import MyDescription from '../../ui/forms/MyDescription';
import { useLanguage } from '../../../../LanguageProvider';

interface TagInputProps {
	tags: string[];
	onTagsChange: (newTags: string[]) => void;
	className?: string;
	maxTags?: number;
}

const TagInput: React.FC<TagInputProps> = ({ className = '', tags, onTagsChange, maxTags = 5 }) => {
	const { t } = useLanguage();

	const [newTag, setNewTag] = useState('');
	const [tagsError, setTagsError] = useState<string | null>(null);

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
			<div className='flex items-baseline gap-2'>
				<MyLabel htmlFor='tag-input'>
					{t("tag_input_label")}
				</MyLabel>
				<MyDescription className='text-gray-500'>
					{t("tag_input_hint").replace('{{max}}', maxTags.toString())}
				</MyDescription>
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
					<div key={idx} className="flex items-center bg-primary-toned-100 text-primary-toned-800 px-4 py-1 rounded-full text-sm shadow-sm">
						{tag}
						<button
							type="button"
							className="ml-3 text-primary-toned-500 hover:text-primary-toned-700"
							onClick={() => handleRemoveTag(tag)}
						>
							<X size={12} />
						</button>
					</div>
				))}
			</div>}
		</div>
	);
};

export default TagInput;
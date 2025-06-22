import React, { useState } from 'react';

interface TagInputProps {
	tags: string[];
	onTagsChange: (newTags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onTagsChange }) => {
	const [newTag, setNewTag] = useState('');

	const handleAddTag = () => {
		if (newTag.trim() && !tags.includes(newTag.trim())) {
			onTagsChange([...tags, newTag.trim()]);
			setNewTag('');
		}
	};

	const handleRemoveTag = (tagToRemove: string) => {
		onTagsChange(tags.filter(tag => tag !== tagToRemove));
	};

	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-1">
				Tags
			</label>
			<div className="flex flex-wrap gap-2 mb-2">
				{tags.map((tag, idx) => (
					<div key={idx} className="flex items-center bg-primary-toned-100 text-primary-toned-800 px-3 py-1 rounded-full">
						{tag}
						<button
							type="button"
							className="ml-2 text-primary-toned-500 hover:text-primary-toned-700"
							onClick={() => handleRemoveTag(tag)}
						>
							×
						</button>
					</div>
				))}
			</div>
			<div className="flex">
				<input
					type="text"
					placeholder="Add a tag..."
					value={newTag}
					onChange={(e) => setNewTag(e.target.value)}
					className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-toned-500"
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							handleAddTag();
						}
					}}
				/>
				<button
					type="button"
					onClick={handleAddTag}
					className="px-4 py-2 bg-primary-toned-600 text-white rounded-r-md hover:bg-primary-toned-700"
				>
					Add
				</button>
			</div>
		</div>
	);
};

export default TagInput;
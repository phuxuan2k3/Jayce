import { useState, ChangeEvent } from 'react';

interface MyImageUploadProps {
	onUpload: (file: File) => void;
}

export default function MyImageUpload({ onUpload }: MyImageUploadProps) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [warning, setWarning] = useState<string | null>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) { // 5MB
				setWarning('Image size should not exceed 5MB.');
				setSelectedFile(null);
				setPreview(null);
			} else {
				setWarning(null);
				setSelectedFile(file);
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result as string);
				};
				reader.readAsDataURL(file);
			}
		}
	};

	const handleUploadClick = () => {
		if (selectedFile) {
			onUpload(selectedFile);
		}
	};

	return (
		<div className="flex flex-col items-center space-y-4">
			<div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
				{preview ? (
					<img src={preview} alt="Preview" className="object-cover w-full h-full" />
				) : (
					<span className="text-gray-500">Image Preview</span>
				)}
			</div>
			<div className="flex flex-col items-center">
				<label htmlFor="file-upload" className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Select Image
				</label>
				<input
					id="file-upload"
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="hidden"
				/>
				{selectedFile && <span className="mt-2 text-gray-600">{selectedFile.name}</span>}
				{warning && <p className="text-red-500 mt-2">{warning}</p>}
			</div>
			<button
				onClick={handleUploadClick}
				disabled={!selectedFile}
				className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:bg-gray-400 hover:enabled:bg-green-600"
			>
				Upload Image
			</button>
		</div>
	);
}

import React from 'react';
import { useQuestion } from './context';

const Images: React.FC = () => {
	const { question } = useQuestion();

	if (question.type !== 'LONG_ANSWER' || question.detail.type !== "LONG_ANSWER") return null;

	const imageLinks = question.detail.imageLinks;

	if (!imageLinks || imageLinks.length === 0) {
		return (
			<div className="px-4 pb-4">
				<p className="text-sm text-gray-500">No images available for this question.</p>
			</div>
		);
	}

	return (
		<div className="px-4 pb-4">
			<div className="grid grid-cols-2 gap-3">
				{imageLinks.map((imageUrl: string, index: number) => (
					<div key={index} className="relative">
						<img
							src={imageUrl}
							alt={`Question image ${index + 1}`}
							className="w-full h-32 object-cover rounded-lg border border-gray-200"
							loading="lazy"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Images;

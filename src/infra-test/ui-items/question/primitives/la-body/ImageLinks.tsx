import { useState } from 'react';
import { cn } from '../../../../../app/cn';
import MyDialog from '../../../../ui/MyDialog';
import { TriggerSlider } from '../../../../ui/TriggerSlider';
import { QuestionContext } from '../contexts';
import { BaseComponentProps } from '../types';
import { commonSliderButtonClassNames, commonBoxClassNames } from './type';

export function ImageLinks({
	className = "",
}: BaseComponentProps) {
	const imageLinks = QuestionContext.useLongAnswerDetail().imageLinks;
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	return (
		<>
			<TriggerSlider
				trigger={({ onClick, isShow }) => (
					<button
						className={cn(commonSliderButtonClassNames(isShow), className)}
						onClick={onClick}
					>
						{isShow ? "Hide Images" : "Show Images"}
					</button>
				)}
			>
				<div className={cn(
					commonBoxClassNames,
					'w-full border-t-0 rounded-t-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-clip'
				)}>
					{imageLinks == null || imageLinks.length === 0 ? (
						<span>No images provided.</span>
					) : (
						imageLinks.map((link, index) => (
							<div
								key={index}
								className="p-2 border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-lg"
								onClick={() => setSelectedImage(link)}
							>
								<img
									src={link}
									alt={`Detail image ${index + 1}`}
									className="max-h-[24rem] w-full object-cover rounded-lg shadow-md" />
							</div>
						))
					)}
				</div>
			</TriggerSlider>

			{selectedImage && (
				<MyDialog>
					<div className="relative w-full h-full flex items-center justify-center bg-black bg-opacity-75 p-4">
						<button
							className="absolute top-2 right-2 text-white text-2xl"
							onClick={() => setSelectedImage(null)}
						>&times;</button>
						<img
							src={selectedImage}
							alt="Zoomed image"
							className="max-w-screen max-h-[90vh] rounded-lg shadow-lg object-cover" />
					</div>
				</MyDialog>
			)}
		</>
	);
}

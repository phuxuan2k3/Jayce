import { useState } from 'react';
import MyDialog from '../../../../ui/MyDialog';
import { MySlider } from '../../../../ui/MySlider';
import { QuestionContext } from '../contexts';
import { BaseComponentProps } from '../types';
import { commonSliderButtonClassNames, commonBoxClassNames } from './type';
import { cn } from '../../../../../../app/cn';
import { useLanguage } from '../../../../../../LanguageProvider';

export function ImageLinks({
	className = "",
}: BaseComponentProps) {
	const { t } = useLanguage();
	
	const imageLinks = QuestionContext.useLongAnswerDetail().imageLinks;
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	return (
		<>
			<MySlider
				trigger={({ onClick, isShow }) => (
					<button
						className={cn(commonSliderButtonClassNames(isShow), className)}
						onClick={onClick}
					>
						{isShow ? t("image_links_hide") : t("image_links_show")}
					</button>
				)}
			>
				<div className={cn(
					commonBoxClassNames,
					'w-full border-t-0 rounded-t-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-clip'
				)}>
					{imageLinks == null || imageLinks.length === 0 ? (
						<span>{t("image_links_empty")}</span>
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
			</MySlider>

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

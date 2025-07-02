import React, { useState } from 'react'
import { cn } from '../../../app/cn'

interface MyZoomableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	thumbnailClassName?: string
}

export default function MyZoomableImage({
	src,
	alt,
	className = '',
	thumbnailClassName = ''
}: MyZoomableImageProps) {
	const [isZoomed, setIsZoomed] = useState(false)

	const handleImageClick = () => {
		setIsZoomed(true)
	}

	const handleClose = () => {
		setIsZoomed(false)
	}

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			setIsZoomed(false)
		}
	}

	return (
		<>
			{/* Thumbnail Image */}
			<img
				src={src}
				alt={alt}
				className={cn("cursor-pointer hover:opacity-80 transition-opacity", thumbnailClassName)}
				onClick={handleImageClick}
			/>

			{/* Zoomed Modal */}
			{isZoomed && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
					onClick={handleOverlayClick}
				>
					{/* Close Button */}
					<button
						onClick={handleClose}
						className="absolute top-4 right-4 z-60 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
						aria-label="Close zoomed image"
					>
						<svg
							className="w-6 h-6 text-gray-800"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					{/* Zoomed Image */}
					<img
						src={src}
						alt={alt}
						className={cn("max-w-[90vw] max-h-[90vh] object-contain shadow-2xl", className)}
						onClick={(e) => e.stopPropagation()}
					/>
				</div>
			)}
		</>
	)
}

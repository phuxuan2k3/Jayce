import React from 'react'

export default function Card({
	handleOnCardClick,
	className,
	children,
}: {
	handleOnCardClick: () => void;
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<div className={`bg-blue-chill-100 border border-solid border-blue-chill-400 p-4 rounded-2xl shadow-sm mb-4 cursor-pointer ${className}`} onClick={handleOnCardClick}>
			{children}
		</div>
	)
}

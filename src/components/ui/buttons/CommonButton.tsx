import React from 'react'

export default function CommonButton({
	children,
	backgroundColor = "bg-primary-toned-600",
	onClick = () => { },
}: {
	backgroundColor?: string;
	children?: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className={`${backgroundColor} text-white font-semibold px-4 py-2 rounded-md flex items-center justify-center gap-x-2 w-full h-full`}>
			{children}
		</button>
	)
}
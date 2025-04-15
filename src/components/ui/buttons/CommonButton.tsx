import React from 'react'

export default function CommonButton({
	children,
	backgroundColor = "bg-primary-toned-600",
}: {
	backgroundColor?: string;
	children?: React.ReactNode;
}) {
	return (
		<button className={`${backgroundColor} text-white font-semibold px-4 py-2 rounded-md flex items-center justify-center gap-x-2 w-full h-full`}>
			{children}
		</button>
	)
}
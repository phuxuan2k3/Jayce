import React from 'react'

export default function LeftLayoutTemplate({
	header: {
		title,
		description,
	},
	children,
	right,
	aboveMain,
}: {
	header: {
		title: string;
		description?: string;
	};
	children: React.ReactNode;
	right: React.ReactNode;
	aboveMain?: React.ReactNode;
}) {
	return (
		<div className="container grid grid-cols-1 lg:grid-cols-[2fr_5fr] grid-rows-[auto_1fr] gap-4 lg:gap-8 mx-auto mt-8 mb-16 h-full">
			<header className="flex gap-x-4 lg:col-span-2">
				<div className='flex-1 flex flex-col'>
					<div className="flex justify-between items-center">
						<h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
					</div>
					{description && (
						<span className="text-sm text-primary-toned-500 line-clamp-2 overflow-hidden text-ellipsis">
							{description}
						</span>
					)}
				</div>
			</header>

			<aside className="lg:row-start-2 lg:col-start-1 w-full h-fit lg:sticky lg:top-[2vh]">
				{right}
			</aside>

			<main className='lg:row-start-2 lg:col-start-2 w-full h-full flex flex-col items-stretch gap-2'>
				{aboveMain && <div className='w-full flex-shrink'>
					{aboveMain}
				</div>}
				<main className='flex-1 max-h-full w-full px-6 py-8 bg-white rounded-xl shadow-primary border-r border-b border-primary'>
					{children}
				</main>
			</main>
		</div>
	)
}

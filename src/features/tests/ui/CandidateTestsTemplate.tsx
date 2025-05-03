import React from 'react'

export default function CandidateTestsTemplate({
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
		<div className="container grid grid-cols-1 lg:grid-cols-[2fr_1fr] grid-rows-[auto_1fr] gap-4 lg:gap-8 h-full mx-auto px-4 py-4 lg:px-12 lg:py-12">
			<header className="flex gap-x-4">
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

			<aside className="lg:row-span-2 p-2">
				{right}
			</aside>

			<main className='w-full h-full flex flex-col items-stretch gap-2'>
				<div className='w-full flex-shrink'>
					{aboveMain}
				</div>
				<main className='flex-1 w-full px-6 py-8 overflow-y-auto bg-white rounded-xl shadow-primary border-r border-b border-primary'>
					{children}
				</main>
			</main>
		</div >
	)
}

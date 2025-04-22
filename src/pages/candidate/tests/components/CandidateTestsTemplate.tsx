import React from 'react'

export default function CandidateTestsTemplate({
	header: {
		title,
		description,
	},
	children,
	rightColumn,
}: {
	header: {
		title: string;
		description?: string;
	};
	children: React.ReactNode;
	rightColumn: React.ReactNode;
}) {
	return (
		<div className="container grid grid-cols-1 lg:grid-cols-[2fr_1fr] grid-rows-[auto_1fr] gap-4 h-full mx-auto px-4 py-4 lg:px-12 lg:py-12">
			<header className="flex gap-x-4">
				<div className='flex-1 flex flex-col'>
					<div className="flex justify-between items-center">
						<h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
					</div>
					<span className="text-sm text-primary-toned-500">
						{description}
					</span>
				</div>
			</header>

			<aside className="lg:row-span-2">
				{rightColumn}
			</aside>

			<main className='h-full w-full p-4'>
				{children}
			</main>
		</div >
	)
}

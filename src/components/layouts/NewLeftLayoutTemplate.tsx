import React from 'react'

function NewLeftLayoutTemplate({
	header,
	children,
	left,
	aboveMain,
}: {
	header?: React.ReactNode;
	children: React.ReactNode;
	left: React.ReactNode;
	aboveMain?: React.ReactNode;
}) {
	return (
		<div className="container grid grid-cols-1 lg:grid-cols-[2fr_5fr] grid-rows-[auto_1fr] gap-4 lg:gap-8 mx-auto mt-4 mb-8 h-full">
			{header && <header className="flex gap-x-4 lg:col-span-2">
				{header}
			</header>}

			<aside className="lg:row-start-2 lg:col-start-1 w-full h-full">
				{left}
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

const Header = ({
	title,
	description,
}: {
	title: string;
	description?: string;
}) => {
	return (
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
	)
}

NewLeftLayoutTemplate.Header = Header;

export default NewLeftLayoutTemplate;
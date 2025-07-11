import React from 'react'
import { cn } from '../../app/cn';
import { commonGridLayoutClassname, commonHeaderClassname } from './commonClassname';

function LeftLayoutTemplate({
	header,
	children,
	left,
	aboveMain,
	className = '',
}: {
	header?: React.ReactNode;
	children: React.ReactNode;
	left: React.ReactNode;
	aboveMain?: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn(
			commonGridLayoutClassname,
			"lg:grid-cols-[2fr_5fr]",
			className
		)}>
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
				<main className='flex-1 max-h-full w-full px-6 py-8 bg-white rounded-xl shadow-primary border-r border-b border-primary flex flex-col'>
					{children}
				</main>
			</main>
		</div>
	)
}

const Header = ({
	title,
	description,
	className = '',
}: {
	title: string;
	description?: string;
	className?: string;
}) => {
	return (
		<div className={cn(commonHeaderClassname, className)}>
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
		</div>
	)
}

LeftLayoutTemplate.Header = Header;

export default LeftLayoutTemplate;
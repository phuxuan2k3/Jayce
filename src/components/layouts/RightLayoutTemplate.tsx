import React from 'react'
import { cn } from '../../app/cn';
import { commonGridLayoutClassname, commonHeaderClassname } from './commonClassname';

export default function RightLayoutTemplate({
	header,
	children,
	right,
	aboveMain,
	className = '',
}: {
	header?: React.ReactNode;
	children: React.ReactNode;
	right: React.ReactNode;
	aboveMain?: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn(
			commonGridLayoutClassname,
			"lg:grid-cols-[5fr_2fr]",
			className
		)}>
			<header className="flex gap-x-4 lg:col-span-2">
				{header}
			</header>

			<aside className="lg:row-start-2 lg:col-start-2">
				{right}
			</aside>

			<div className='lg:col-start-1 w-full h-full flex flex-col items-stretch gap-2'>
				{aboveMain && <div className='w-full flex-shrink'>{aboveMain}</div>}
				<div className='flex-1 flex flex-col w-full px-6 py-8 bg-white rounded-xl shadow-primary border-r border-b border-primary'>
					{children}
				</div>
			</div>
		</div >
	)
}

const Header = ({
	title,
	description,
	backButton = <RightLayoutTemplate.BackButton />,
	className = '',
}: {
	title: string;
	description?: string;
	backButton?: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn(commonHeaderClassname, className)}>
			{backButton}
			<div className={cn(`flex flex-col`, className)}>
				<div className="flex justify-between items-center">
					<h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
				</div>
				{description && (
					<span className="text-sm text-primary-toned-700 line-clamp-2 overflow-hidden text-ellipsis">
						{description}
					</span>
				)}
			</div>
		</div>
	);
}

const BackButton = ({
	onClick,
	className = '',
}: {
	onClick?: () => void;
	className?: string;
}) => {
	return (
		<button
			onClick={onClick ? onClick : () => window.history.back()}
			className={cn(`text-primary hover:text-primary-toned-500 hover:bg-primary-toned-200 rounded-lg transition-colors`, className)}
		>
			<span className="sr-only">Go back</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
			</svg>
		</button>
	);
}


RightLayoutTemplate.Header = Header;
RightLayoutTemplate.BackButton = BackButton;

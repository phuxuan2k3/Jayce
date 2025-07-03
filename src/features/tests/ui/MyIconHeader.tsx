import React from 'react'
import { cn } from '../../../app/cn';

export default function MyIconHeader({
	icon,
	title,
	description,
	classNameTitle = '',
	classNameDescription = '',
	classNameIcon = '',
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	classNameTitle?: string;
	classNameDescription?: string;
	classNameIcon?: string;
}) {
	return (
		<div className="flex items-center gap-3">
			<div className={cn("p-2 bg-primary rounded-lg", classNameIcon)}>
				{icon}
			</div>
			<div>
				<h3 className={cn("font-semibold text-gray-800", classNameTitle)}>{title}</h3>
				<p className={cn("text-sm text-gray-600", classNameDescription)}>
					{description}
				</p>
			</div>
		</div>
	)
}

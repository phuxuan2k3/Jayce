import React from 'react'
import { cn } from '../../../app/cn';

interface MyLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	children: React.ReactNode;
	className?: string;
}

export default function MyLabel({ children, className = '', ...props }: MyLabelProps) {
	return (
		<label className={cn(
			'block text-sm font-medium text-gray-700 mb-1',
			className
		)}
			{...props}
		>
			{children}
		</label>
	)
}

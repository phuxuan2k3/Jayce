import React from 'react'
import { cn } from '../../../../app/cn';

interface MyLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	children: React.ReactNode;
	className?: string;
}

export default function MyLabel({ children, className = '', ...props }: MyLabelProps) {
	return (
		<label className={cn(
			'text-primary font-semibold flex-shrink-0',
			className
		)}
			{...props}
		>
			{children}
		</label>
	)
}

import React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../../app/cn';

export default function MyDialog({
	className = '',
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) {
	return createPortal(
		<div className={cn("fixed inset-0 flex items-center justify-center bg-black/50 z-10", className)}>
			{children}
		</div>
		,
		document.body
	)
}

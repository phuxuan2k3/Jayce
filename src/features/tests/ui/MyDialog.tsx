import React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../../app/cn';
import { XCircle } from 'lucide-react';

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

const Header: React.FC<{
	title: string;
	description?: string;
	onClose: () => void;
}> = ({ title, description, onClose }) => {
	return (
		<div className="flex justify-between items-center">
			<div>
				<h2 className="text-xl font-semibold text-primary">{title}</h2>
				{description && <p className="text-gray-500 text-sm">{description}</p>}
			</div>
			<button
				onClick={onClose}
				className="text-gray-500 hover:text-gray-700"
			>
				<XCircle size={24} />
			</button>
		</div>
	);
}

MyDialog.Header = Header;



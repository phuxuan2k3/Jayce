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
	// Fade-in animation using Tailwind and custom keyframes
	return createPortal(
		<div
			className={cn(
				"fixed inset-0 flex items-center justify-center bg-black/50 z-10",
				className
			)}
		>
			<div style={{
				animation: "transitionFadeIn 0.3s ease-in-out",
			}}>{children}</div>
		</div>,
		document.body
	);
}

// Add fade-in keyframes to the document head if not already present
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	const styleId = 'mydialog-fadein-keyframes';
	if (!document.getElementById(styleId)) {
		const style = document.createElement('style');
		style.id = styleId;
		style.innerHTML = `@keyframes transitionFadeIn { 
		0% {
			opacity: 0;
			transform: translateY(10px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}`;
		document.head.appendChild(style);
	}
}

const Header: React.FC<{
	title: string | React.ReactNode;
	description?: string | React.ReactNode;
	onClose?: () => void;
}> = ({ title, description, onClose }) => {
	return (
		<div className="flex justify-between items-center">
			<div>
				{typeof title === "string" ? <h2 className="text-xl font-semibold text-primary">{title}</h2> : title}
				{description && <p className="text-gray-500 text-sm">{description}</p>}
			</div>
			{onClose && <button
				onClick={onClose}
				className="text-gray-500 hover:text-gray-700"
			>
				<XCircle size={24} />
			</button>}
		</div>
	);
}

const Content: React.FC<{
	children: React.ReactNode;
	className?: string;
}> = ({ children, className }) => {
	return (
		<div className={cn("flex flex-col bg-white rounded-lg shadow-lg w-[30vw] max-h-[90vh] p-6 overflow-hidden", className)}>
			{children}
		</div>
	);
}

MyDialog.Header = Header;
MyDialog.Content = Content;



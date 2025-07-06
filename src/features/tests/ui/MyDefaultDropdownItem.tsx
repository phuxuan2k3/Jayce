import React from 'react';
import { cn } from '../../../app/cn';

export const MyDefaultDropdownItem: React.FC<{
	onClick: () => void;
	className?: string;
	children?: React.ReactNode;
}> = ({ children, onClick, className }) => {

	return (
		<button
			onClick={onClick}
			className={cn(

				className
			)}
		>
			{children}
		</button>
	);
};

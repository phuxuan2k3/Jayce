import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	position?: 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
	zIndex?: number;
	className?: string;
}

const FixedContent: React.FC<Props> = ({
	children,
	position = 'top',
	zIndex = 1000,
	className = '',
}) => {
	// Define positioning styles based on the position prop
	const getPositionStyles = () => {
		switch (position) {
			case 'top':
				return { top: 0, left: 0, right: 0 };
			case 'bottom':
				return { bottom: 0, left: 0, right: 0 };
			case 'top-right':
				return { top: 0, right: 0 };
			case 'top-left':
				return { top: 0, left: 0 };
			case 'bottom-right':
				return { bottom: 0, right: 0 };
			case 'bottom-left':
				return { bottom: 0, left: 0 };
			default:
				return { top: 0, left: 0, right: 0 };
		}
	};

	const positionStyles = getPositionStyles();

	return (
		<div
			className={`fixed ${className}`}
			style={{
				position: 'fixed',
				zIndex,
				...positionStyles,
			}}
		>
			{children}
		</div>
	);
};

export default FixedContent;
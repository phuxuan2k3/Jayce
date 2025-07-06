import React, { useState, useRef, useEffect, ReactNode, ReactElement } from 'react';
import { cn } from '../../../app/cn';

export interface DropdownItem {
	id: string | number;
	label: string;
	value?: any;
	icon?: ReactNode;
	disabled?: boolean;
	divider?: boolean;
	className?: string;
	onClick?: (item: DropdownItem) => void;
}

export interface DropdownProps {
	// Trigger customization
	trigger: ReactElement;

	// Items configuration
	items: DropdownItem[];
	onItemSelect?: (item: DropdownItem) => void;

	// Positioning and appearance
	position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
	offset?: number;
	className?: string;
	dropdownClassName?: string;
	itemClassName?: string;

	// Behavior
	closeOnSelect?: boolean;
	disabled?: boolean;

	// Custom renderers
	renderItem?: (item: DropdownItem, index: number) => ReactNode;
	renderTrigger?: (trigger: ReactElement, isOpen: boolean) => ReactElement;
}

export const MyDropdown: React.FC<DropdownProps> = ({
	trigger,
	items,
	onItemSelect,
	position = 'bottom-left',
	offset = 8,
	className,
	dropdownClassName,
	itemClassName,
	closeOnSelect = true,
	disabled = false,
	renderItem,
	renderTrigger,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLElement | null>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				triggerRef.current &&
				!triggerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [isOpen]);

	// Close dropdown on escape key
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			return () => document.removeEventListener('keydown', handleEscape);
		}
	}, [isOpen]);

	const handleTriggerClick = () => {
		if (!disabled) {
			setIsOpen(!isOpen);
		}
	};

	const handleItemClick = (item: DropdownItem) => {
		if (item.disabled) return;

		// Call item's onClick if provided
		if (item.onClick) {
			item.onClick(item);
		}

		// Call dropdown's onItemSelect if provided
		if (onItemSelect) {
			onItemSelect(item);
		}

		// Close dropdown if closeOnSelect is true
		if (closeOnSelect) {
			setIsOpen(false);
		}
	};

	const getPositionClasses = () => {
		const positions = {
			'bottom-left': 'top-full left-0',
			'bottom-right': 'top-full right-0',
			'top-left': 'bottom-full left-0',
			'top-right': 'bottom-full right-0',
		};
		return positions[position];
	};

	const getAnimationClasses = () => {
		if (position.includes('bottom')) {
			return 'animate-slide-down';
		} else if (position.includes('top')) {
			return 'animate-slide-up';
		}
		return 'animate-scale-in';
	};

	const renderDefaultItem = (item: DropdownItem, index: number) => {
		if (item.divider) {
			return (
				<div
					key={`divider-${index}`}
					className="border-t border-gray-200 my-1"
				/>
			);
		}

		return (
			<button
				key={item.id}
				onClick={() => handleItemClick(item)}
				disabled={item.disabled}
				className={cn(
					// Base styles
					'w-full text-left px-4 py-2 text-sm transition-colors duration-200',
					'flex items-center gap-2',

					// Interactive states
					'hover:bg-primary-toned-50',
					'focus:bg-primary-toned-100 focus:outline-none',
					'active:bg-primary-toned-200',

					// Disabled state
					item.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',

					// Custom classes
					itemClassName,
					item.className
				)}
			>
				{item.icon && (
					<span className="flex-shrink-0 w-4 h-4">
						{item.icon}
					</span>
				)}
				<span className="flex-1">{item.label}</span>
			</button>
		);
	};


	const triggerElement = renderTrigger
		? renderTrigger(trigger, isOpen)
		: React.cloneElement(trigger, {
			ref: (node: HTMLElement | null) => {
				triggerRef.current = node;
				// Call the original ref, if any
				const { ref } = trigger as any;
				if (typeof ref === 'function') ref(node);
				else if (ref && typeof ref === 'object') ref.current = node;
			},
			onClick: handleTriggerClick,
			'aria-expanded': isOpen,
			'aria-haspopup': true,
			disabled: disabled,
		});

	return (
		<div className={cn('relative inline-block', className)}>
			{triggerElement}

			{isOpen && (
				<div
					ref={dropdownRef}
					className={cn(
						// Base positioning
						'absolute z-50',
						getPositionClasses(),

						// Base styles
						'min-w-48 bg-white',
						'border border-gray-200',
						'rounded-lg shadow-lg',

						// Animation
						getAnimationClasses(),

						// Custom classes
						dropdownClassName
					)}
					style={{
						marginTop: position.includes('bottom') ? offset : undefined,
						marginBottom: position.includes('top') ? offset : undefined,
					}}
				>
					<div className="py-1">
						{items.map((item, index) => (
							renderItem ? renderItem(item, index) : renderDefaultItem(item, index)
						))}
					</div>
				</div>
			)}
		</div>
	);
};

// Export additional components for convenience
export const DropdownTrigger: React.FC<{
	children: ReactNode;
	className?: string;
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}> = ({ children, className, variant = 'outline' }) => {
	const variants = {
		primary: 'bg-primary text-white hover:bg-primary-toned-600',
		secondary: 'bg-secondary text-white hover:bg-secondary-toned-600',
		outline: 'border border-gray-300 hover:bg-gray-50',
		ghost: 'hover:bg-gray-100',
	};

	return (
		<button
			className={cn(
				'inline-flex items-center justify-center gap-2',
				'px-4 py-2 text-sm font-medium',
				'rounded-md transition-colors duration-200',
				'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
				'disabled:opacity-50 disabled:cursor-not-allowed',
				variants[variant],
				className
			)}
		>
			{children}
		</button>
	);
};

// Utility function to create dropdown items easily
export const createDropdownItem = (
	id: string | number,
	label: string,
	options?: Partial<Omit<DropdownItem, 'id' | 'label'>>
): DropdownItem => ({
	id,
	label,
	...options,
});

// Utility function to create a divider
export const createDropdownDivider = (id?: string | number): DropdownItem => ({
	id: id || `divider-${Date.now()}`,
	label: '',
	divider: true,
});

export const DefaultDropdownItemClassName = cn(
	'w-full text-left px-4 py-2 text-sm transition-colors duration-200',
	'flex items-center gap-2',
	'hover:bg-primary-toned-50',
	'focus:bg-primary-toned-100 focus:outline-none',
	'active:bg-primary-toned-200',
);

export default MyDropdown;
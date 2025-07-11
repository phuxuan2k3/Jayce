import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '../../../../../app/cn';
import { commonInputClasses } from '../common-classnames';

interface TimeInputFieldProps {
	value: string;
	placeholder: string;
	disabled: boolean;
	error?: string;
	onToggle: () => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: () => void;
}

export default function TimeInputField({
	value,
	placeholder,
	disabled,
	error,
	onToggle,
	onChange,
	onBlur,
}: TimeInputFieldProps) {
	return (
		<div
			className={cn(
				commonInputClasses,
				'cursor-pointer flex items-center justify-between',
				disabled && 'opacity-50 cursor-not-allowed bg-gray-100',
				error && 'border-red-500 ring-red-500 focus:ring-red-500',
				'focus:ring-primary-toned-300 focus:border-primary-toned-600'
			)}
			onClick={() => !disabled && onToggle()}
			role="button"
			tabIndex={disabled ? -1 : 0}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					!disabled && onToggle();
				}
			}}
		>
			<input
				type="text"
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
				className="flex-1 bg-transparent border-none outline-none text-left"
				disabled={disabled}
				onClick={(e) => e.stopPropagation()}
			/>
			<Clock
				className={cn(
					'w-5 h-5 text-primary-toned-600',
					disabled && 'text-gray-400'
				)}
			/>
		</div>
	);
}

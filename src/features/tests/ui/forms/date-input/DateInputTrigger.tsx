import { Calendar } from 'lucide-react';
import { cn } from '../../../../../app/cn';
import { commonInputClasses } from '../common-classnames';

interface DateInputTriggerProps {
	selectedDate: string;
	placeholder: string;
	disabled: boolean;
	error?: string;
	onClick: () => void;
	onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function DateInputTrigger({
	selectedDate,
	placeholder,
	disabled,
	error,
	onClick,
	onKeyDown,
}: DateInputTriggerProps) {
	const formatDate = (dateString: string) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	return (
		<div
			className={cn(
				commonInputClasses,
				'cursor-pointer flex items-center justify-between',
				disabled && 'opacity-50 cursor-not-allowed bg-gray-100',
				error && 'border-red-500 ring-red-500 focus:ring-red-500',
				'focus:ring-primary-toned-300 focus:border-primary-toned-600'
			)}
			onClick={onClick}
			role="button"
			tabIndex={disabled ? -1 : 0}
			onKeyDown={onKeyDown}
		>
			<span className={cn(
				'flex-1 text-left',
				!selectedDate && 'text-gray-500'
			)}>
				{selectedDate ? formatDate(selectedDate) : placeholder}
			</span>
			<Calendar
				className={cn(
					'w-5 h-5 text-primary-toned-600',
					disabled && 'text-gray-400'
				)}
			/>
		</div>
	);
}

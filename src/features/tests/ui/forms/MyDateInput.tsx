import { useState, useRef, useEffect } from 'react';
import { cn } from '../../../../app/cn';
import { DateInputTrigger, CalendarPopover } from './date-input';

interface MyDateInputProps {
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	error?: string;
	min?: string;
	max?: string;
	required?: boolean;
	name?: string;
	id?: string;
}

export default function MyDateInput({
	value = '',
	onChange,
	placeholder = 'Select date',
	className = '',
	disabled = false,
	error,
	min,
	max,
	required = false,
	name,
	id,
}: MyDateInputProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(value);
	const [currentMonth, setCurrentMonth] = useState(() => {
		if (value) {
			return new Date(value);
		}
		return new Date();
	});

	const containerRef = useRef<HTMLDivElement>(null);

	// Handle clicks outside to close calendar
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Update internal state when value prop changes
	useEffect(() => {
		setSelectedDate(value);
		if (value) {
			setCurrentMonth(new Date(value));
		}
	}, [value]);

	const handleDateSelect = (date: Date) => {
		// Format date as YYYY-MM-DD without timezone conversion
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const dateString = `${year}-${month}-${day}`;

		setSelectedDate(dateString);
		onChange?.(dateString);
	};

	const navigateMonth = (direction: 'prev' | 'next') => {
		setCurrentMonth(prev => {
			const newMonth = new Date(prev);
			if (direction === 'prev') {
				newMonth.setMonth(prev.getMonth() - 1);
			} else {
				newMonth.setMonth(prev.getMonth() + 1);
			}
			return newMonth;
		});
	};

	const handleTriggerClick = () => {
		if (!disabled) {
			setIsOpen(!isOpen);
		}
	};

	const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (!disabled) {
				setIsOpen(!isOpen);
			}
		}
	};

	return (
		<div ref={containerRef} className={cn('relative', className)}>
			<DateInputTrigger
				selectedDate={selectedDate}
				placeholder={placeholder}
				disabled={disabled}
				error={error}
				onClick={handleTriggerClick}
				onKeyDown={handleTriggerKeyDown}
			/>

			{isOpen && (
				<CalendarPopover
					currentMonth={currentMonth}
					selectedDate={selectedDate}
					min={min}
					max={max}
					onNavigateMonth={navigateMonth}
					onDateSelect={handleDateSelect}
				/>
			)}

			{/* Hidden input for form submission */}
			<input
				type="hidden"
				name={name}
				id={id}
				value={selectedDate}
				required={required}
			/>

			{error && (
				<p className="mt-1 text-sm text-red-600">{error}</p>
			)}
		</div>
	);
}

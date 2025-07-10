import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../../app/cn';
import { commonInputClasses } from './common-classnames';

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

	const formatDate = (dateString: string) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const handleDateSelect = (date: Date) => {
		// Format date as YYYY-MM-DD without timezone conversion
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const dateString = `${year}-${month}-${day}`;

		setSelectedDate(dateString);
		onChange?.(dateString);
		setIsOpen(false);
	};

	const getDaysInMonth = (date: Date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days = [];

		// Add empty cells for days before month starts
		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null);
		}

		// Add days of the month
		for (let day = 1; day <= daysInMonth; day++) {
			days.push(new Date(year, month, day));
		}

		return days;
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

	const isDateDisabled = (date: Date) => {
		// Format date as YYYY-MM-DD without timezone conversion
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const dateString = `${year}-${month}-${day}`;

		if (min && dateString < min) return true;
		if (max && dateString > max) return true;
		return false;
	};

	const isDateSelected = (date: Date) => {
		if (!selectedDate) return false;
		// Format date as YYYY-MM-DD without timezone conversion
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const dateString = `${year}-${month}-${day}`;

		return dateString === selectedDate;
	};

	const isToday = (date: Date) => {
		const today = new Date();
		return date.toDateString() === today.toDateString();
	};

	const days = getDaysInMonth(currentMonth);
	const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

	return (
		<div ref={containerRef} className={cn('relative', className)}>
			<div
				className={cn(
					commonInputClasses,
					'cursor-pointer flex items-center justify-between',
					disabled && 'opacity-50 cursor-not-allowed bg-gray-100',
					error && 'border-red-500 ring-red-500 focus:ring-red-500',
					'focus:ring-primary-toned-300 focus:border-primary-toned-600'
				)}
				onClick={() => !disabled && setIsOpen(!isOpen)}
				role="button"
				tabIndex={disabled ? -1 : 0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						!disabled && setIsOpen(!isOpen);
					}
				}}
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

			{isOpen && (
				<div className="absolute top-full left-0 mt-1 bg-white border border-primary-toned-300 rounded-md shadow-lg z-50 min-w-full">
					<div className="p-4">
						{/* Month navigation */}
						<div className="flex items-center justify-between mb-4">
							<button
								type="button"
								onClick={() => navigateMonth('prev')}
								className="p-2 rounded-md hover:bg-primary-toned-50 text-primary-toned-600 transition-colors"
							>
								<ChevronLeft className="w-4 h-4" />
							</button>
							<h3 className="text-lg font-semibold text-primary-toned-800">
								{monthYear}
							</h3>
							<button
								type="button"
								onClick={() => navigateMonth('next')}
								className="p-2 rounded-md hover:bg-primary-toned-50 text-primary-toned-600 transition-colors"
							>
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>

						{/* Days of week header */}
						<div className="grid grid-cols-7 gap-1 mb-2">
							{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
								<div key={day} className="text-center text-sm font-medium text-primary-toned-600 py-2">
									{day}
								</div>
							))}
						</div>

						{/* Calendar days */}
						<div className="grid grid-cols-7 gap-1">
							{days.map((date, index) => {
								if (!date) {
									return <div key={index} className="p-2" />;
								}

								const disabled = isDateDisabled(date);
								const selected = isDateSelected(date);
								const today = isToday(date);

								return (
									<button
										key={index}
										type="button"
										onClick={() => !disabled && handleDateSelect(date)}
										disabled={disabled}
										className={cn(
											'p-2 text-sm rounded-md transition-colors',
											'hover:bg-primary-toned-100 focus:outline-none focus:ring-2 focus:ring-primary-toned-300',
											disabled && 'text-gray-400 cursor-not-allowed hover:bg-transparent',
											selected && 'bg-primary-toned-600 text-white hover:bg-primary-toned-700',
											today && !selected && 'bg-primary-toned-50 text-primary-toned-800 font-semibold',
											!selected && !today && 'text-gray-700'
										)}
									>
										{date.getDate()}
									</button>
								);
							})}
						</div>
					</div>
				</div>
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

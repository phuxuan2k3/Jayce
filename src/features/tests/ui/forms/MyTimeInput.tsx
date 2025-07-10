import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '../../../../app/cn';
import { commonInputClasses } from './common-classnames';

interface MyTimeInputProps {
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	error?: string;
	required?: boolean;
	name?: string;
	id?: string;
	min?: string;
	max?: string;
	step?: number; // minutes step, default 1
	format?: '12' | '24'; // 12-hour or 24-hour format
}

export default function MyTimeInput({
	value = '',
	onChange,
	placeholder = 'Select time',
	className = '',
	disabled = false,
	error,
	required = false,
	name,
	id,
	min,
	max,
	step = 1,
	format = '24',
}: MyTimeInputProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedTime, setSelectedTime] = useState(value);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
	const [inputValue, setInputValue] = useState('');

	const containerRef = useRef<HTMLDivElement>(null);
	const hoursScrollRef = useRef<HTMLDivElement>(null);
	const minutesScrollRef = useRef<HTMLDivElement>(null);

	// Handle clicks outside to close dropdown
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Scroll to selected items when dropdown opens
	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				if (hoursScrollRef.current) {
					const hourIndex = format === '12' ? hours - 1 : hours;
					const hourElement = hoursScrollRef.current.children[hourIndex] as HTMLElement;
					if (hourElement) {
						hourElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
					}
				}

				if (minutesScrollRef.current) {
					const minuteIndex = Math.floor(minutes / step);
					const minuteElement = minutesScrollRef.current.children[minuteIndex] as HTMLElement;
					if (minuteElement) {
						minuteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
					}
				}
			}, 100);
		}
	}, [isOpen, hours, minutes, format, step]);

	// Update internal state when value prop changes
	useEffect(() => {
		setSelectedTime(value);
		if (value) {
			parseTimeString(value);
		}
	}, [value]);

	// Update input value when selected time changes
	useEffect(() => {
		if (selectedTime) {
			setInputValue(formatTimeDisplay(selectedTime));
		} else {
			setInputValue('');
		}
	}, [selectedTime, format]);

	const parseTimeString = (timeString: string) => {
		if (!timeString) return;

		const [hourStr, minuteStr] = timeString.split(':');
		const hour = parseInt(hourStr, 10);
		const minute = parseInt(minuteStr, 10);

		if (format === '12') {
			if (hour === 0) {
				setHours(12);
				setPeriod('AM');
			} else if (hour < 12) {
				setHours(hour);
				setPeriod('AM');
			} else if (hour === 12) {
				setHours(12);
				setPeriod('PM');
			} else {
				setHours(hour - 12);
				setPeriod('PM');
			}
		} else {
			setHours(hour);
		}

		setMinutes(minute);
	};

	const formatTimeDisplay = (timeString: string) => {
		if (!timeString) return '';

		const [hourStr, minuteStr] = timeString.split(':');
		const hour = parseInt(hourStr, 10);

		if (format === '12') {
			const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
			const ampm = hour >= 12 ? 'PM' : 'AM';
			return `${displayHour}:${minuteStr} ${ampm}`;
		} else {
			return `${hourStr}:${minuteStr}`;
		}
	};

	const handleTimeChange = (newHours: number, newMinutes: number, newPeriod?: 'AM' | 'PM') => {
		let finalHours = newHours;

		if (format === '12' && newPeriod) {
			if (newPeriod === 'AM') {
				finalHours = newHours === 12 ? 0 : newHours;
			} else {
				finalHours = newHours === 12 ? 12 : newHours + 12;
			}
		}

		const timeString = `${String(finalHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;

		if (isValidTime(timeString)) {
			setSelectedTime(timeString);
			onChange?.(timeString);
		}
	};

	const isValidTime = (timeString: string) => {
		if (!timeString) return false;

		// Check against min and max constraints
		if (min && timeString < min) return false;
		if (max && timeString > max) return false;

		return true;
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputVal = e.target.value;
		setInputValue(inputVal);

		// Try to parse the input as time
		const timeRegex = format === '12'
			? /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
			: /^(\d{1,2}):(\d{2})$/;

		const match = inputVal.match(timeRegex);
		if (match) {
			let inputHours = parseInt(match[1], 10);
			const inputMinutes = parseInt(match[2], 10);
			const inputPeriod = match[3]?.toUpperCase() as 'AM' | 'PM';

			// Validate ranges
			if (inputMinutes >= 0 && inputMinutes <= 59) {
				if (format === '12') {
					if (inputHours >= 1 && inputHours <= 12) {
						setHours(inputHours);
						setMinutes(inputMinutes);
						setPeriod(inputPeriod);
						handleTimeChange(inputHours, inputMinutes, inputPeriod);
					}
				} else {
					if (inputHours >= 0 && inputHours <= 23) {
						setHours(inputHours);
						setMinutes(inputMinutes);
						handleTimeChange(inputHours, inputMinutes);
					}
				}
			}
		}
	};

	const handleInputBlur = () => {
		// Reset input value to formatted time if invalid
		if (selectedTime) {
			setInputValue(formatTimeDisplay(selectedTime));
		} else {
			setInputValue('');
		}
	};

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
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
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

			{isOpen && (
				<div className="absolute top-full left-0 mt-1 bg-white border border-primary-toned-300 rounded-md shadow-lg z-50 min-w-full">
					<div className="p-4">
						{/* Time picker controls */}
						<div className="flex items-center justify-center space-x-4">
							{/* Hours */}
							<div className="flex flex-col items-center">
								<div className="text-sm text-primary-toned-600 mb-2">Hours</div>
								<div ref={hoursScrollRef} className="h-32 overflow-y-auto border border-primary-toned-200 rounded-md">
									<div className="min-w-12">
										{Array.from({ length: format === '12' ? 12 : 24 }, (_, i) => {
											const hour = format === '12' ? i + 1 : i;
											const isSelected = hours === hour;
											return (
												<button
													key={hour}
													type="button"
													className={cn(
														'w-full px-3 py-1 text-center hover:bg-primary-toned-50 transition-colors',
														isSelected && 'bg-primary-toned-600 text-white hover:bg-primary-toned-700'
													)}
													onClick={() => {
														setHours(hour);
														handleTimeChange(hour, minutes, period);
													}}
												>
													{format === '12' ? hour : String(hour).padStart(2, '0')}
												</button>
											);
										})}
									</div>
								</div>
							</div>

							<div className="text-2xl font-bold text-primary-toned-800 mt-8">:</div>

							{/* Minutes */}
							<div className="flex flex-col items-center">
								<div className="text-sm text-primary-toned-600 mb-2">Minutes</div>
								<div ref={minutesScrollRef} className="h-32 overflow-y-auto border border-primary-toned-200 rounded-md">
									<div className="min-w-12">
										{Array.from({ length: Math.ceil(60 / step) }, (_, i) => {
											const minute = i * step;
											const isSelected = minutes === minute;
											return (
												<button
													key={minute}
													type="button"
													className={cn(
														'w-full px-3 py-1 text-center hover:bg-primary-toned-50 transition-colors',
														isSelected && 'bg-primary-toned-600 text-white hover:bg-primary-toned-700'
													)}
													onClick={() => {
														setMinutes(minute);
														handleTimeChange(hours, minute, period);
													}}
												>
													{String(minute).padStart(2, '0')}
												</button>
											);
										})}
									</div>
								</div>
							</div>

							{/* AM/PM toggle for 12-hour format */}
							{format === '12' && (
								<div className="flex flex-col items-center">
									<div className="text-sm text-primary-toned-600 mb-2">Period</div>
									<div className="flex flex-col space-y-1">
										{['AM', 'PM'].map((p) => (
											<button
												key={p}
												type="button"
												className={cn(
													'px-3 py-2 rounded-md font-medium transition-colors',
													period === p
														? 'bg-primary-toned-600 text-white hover:bg-primary-toned-700'
														: 'bg-primary-toned-100 text-primary-toned-800 hover:bg-primary-toned-200'
												)}
												onClick={() => {
													setPeriod(p as 'AM' | 'PM');
													handleTimeChange(hours, minutes, p as 'AM' | 'PM');
												}}
											>
												{p}
											</button>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{/* Hidden input for form submission */}
			<input
				type="hidden"
				name={name}
				id={id}
				value={selectedTime}
				required={required}
			/>

			{error && (
				<p className="mt-1 text-sm text-red-600">{error}</p>
			)}
		</div>
	);
}

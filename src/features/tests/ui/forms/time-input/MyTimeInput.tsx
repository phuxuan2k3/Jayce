import { useState, useEffect, useRef } from 'react';
import { cn } from '../../../../../app/cn';
import { MyTimeInputProps } from './types';
import { useTimeInput } from './useTimeInput';
import TimeInputField from './TimeInputField';
import TimePickerDropdown from './TimePickerDropdown';
import { stringToMinutes } from './utils';

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
	const containerRef = useRef<HTMLDivElement>(null);
	const minMinutes = min ? stringToMinutes(min) : undefined;
	const maxMinutes = max ? stringToMinutes(max) : undefined;

	const {
		selectedTime,
		timeState,
		inputValue,
		handleTimeChange,
		handleInputChange,
		handleInputBlur,
	} = useTimeInput({ value, onChange, format, minMinutes, maxMinutes });

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

	const handleToggle = () => setIsOpen(!isOpen);

	const handleHoursChange = (newHours: number) => {
		handleTimeChange(newHours, timeState.minutes, timeState.period);
	};

	const handleMinutesChange = (newMinutes: number) => {
		handleTimeChange(timeState.hours, newMinutes, timeState.period);
	};

	const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
		handleTimeChange(timeState.hours, timeState.minutes, newPeriod);
	};

	return (
		<div ref={containerRef} className={cn('relative', className)}>
			<TimeInputField
				value={inputValue}
				placeholder={placeholder}
				disabled={disabled}
				error={error}
				onToggle={handleToggle}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
			/>

			<TimePickerDropdown
				hours={timeState.hours}
				minutes={timeState.minutes}
				period={timeState.period}
				step={step}
				format={format}
				minMinutes={minMinutes}
				maxMinutes={maxMinutes}
				isOpen={isOpen}
				onHoursChange={handleHoursChange}
				onMinutesChange={handleMinutesChange}
				onPeriodChange={handlePeriodChange}
			/>

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

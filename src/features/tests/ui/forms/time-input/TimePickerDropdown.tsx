import { useRef, useEffect, useCallback } from 'react';
import TimeScrollSelector from './TimeScrollSelector';
import PeriodSelector from './PeriodSelector';

interface TimePickerDropdownProps {
	hours: number;
	minutes: number;
	period: 'AM' | 'PM';
	step: number;
	format: '12' | '24';
	minMunutes?: number;
	maxMinutes?: number;
	isOpen: boolean;
	onHoursChange: (hours: number) => void;
	onMinutesChange: (minutes: number) => void;
	onPeriodChange: (period: 'AM' | 'PM') => void;
}

export default function TimePickerDropdown({
	hours,
	minutes,
	period,
	step,
	format,
	isOpen,
	minMunutes,
	maxMinutes,
	onHoursChange,
	onMinutesChange,
	onPeriodChange,
}: TimePickerDropdownProps) {
	const hoursScrollRef = useRef<HTMLDivElement>(null);
	const minutesScrollRef = useRef<HTMLDivElement>(null);

	// Scroll to selected items when dropdown opens
	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				if (hoursScrollRef.current) {
					const hourIndex = format === '12' ? hours - 1 : hours;
					const hourElement = hoursScrollRef.current.children[0]?.children[hourIndex] as HTMLElement;
					if (hourElement) {
						hourElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
					}
				}

				if (minutesScrollRef.current) {
					const minuteIndex = Math.floor(minutes / step);
					const minuteElement = minutesScrollRef.current.children[0]?.children[minuteIndex] as HTMLElement;
					if (minuteElement) {
						minuteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
					}
				}
			}, 100);
		}
	}, [isOpen, hours, minutes, format, step]);

	const isInvalidHour = useCallback((hour: number): boolean => {
		const currentTotalMinutes = hour * 60 + minutes;
		if (currentTotalMinutes < (minMunutes || 0) || currentTotalMinutes > (maxMinutes || Infinity)) {
			return true;
		}
		return false;
	}, [minMunutes, maxMinutes, minutes]);

	const isInvalidMinute = useCallback((minute: number): boolean => {
		const currentTotalMinutes = hours * 60 + minute;
		if (currentTotalMinutes < (minMunutes || 0) || currentTotalMinutes > (maxMinutes || Infinity)) {
			return true;
		}
		return false;
	}, [minMunutes, maxMinutes, hours]);

	if (!isOpen) return null;

	// Generate hours items
	const hoursItems = Array.from({ length: format === '12' ? 12 : 24 }, (_, i) => {
		const hour = format === '12' ? i + 1 : i;
		return {
			value: hour,
			display: format === '12' ? hour.toString() : String(hour).padStart(2, '0'),
			isSelected: hours === hour,
			isDisabled: isInvalidHour(hour),
		};
	});

	// Generate minutes items
	const minutesItems = Array.from({ length: Math.ceil(60 / step) }, (_, i) => {
		const minute = i * step;
		return {
			value: minute,
			display: String(minute).padStart(2, '0'),
			isSelected: minutes === minute,
			isDisabled: isInvalidMinute(minute),
		};
	});

	return (
		<div className="absolute top-full left-0 mt-1 bg-white border border-primary-toned-300 rounded-md shadow-lg z-50 min-w-full">
			<div className="p-4">
				<div className="flex items-center justify-center space-x-4">
					{/* Hours */}
					<TimeScrollSelector
						ref={hoursScrollRef}
						label="Hours"
						items={hoursItems}
						onSelect={onHoursChange}
					/>

					<div className="text-2xl font-bold text-primary-toned-800 mt-8">:</div>

					{/* Minutes */}
					<TimeScrollSelector
						ref={minutesScrollRef}
						label="Minutes"
						items={minutesItems}
						onSelect={onMinutesChange}
					/>

					{/* AM/PM toggle for 12-hour format */}
					{format === '12' && (
						<PeriodSelector
							period={period}
							onPeriodChange={onPeriodChange}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

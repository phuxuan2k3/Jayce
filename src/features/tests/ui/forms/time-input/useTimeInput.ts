import { useState, useEffect, useCallback } from 'react';
import { TimeState } from './types';
import {
	parseTimeString,
	formatTimeDisplay,
	convertToTimeString,
	isValidTime,
	parseInputTime
} from './utils';

interface UseTimeInputProps {
	value?: string;
	onChange?: (value: string) => void;
	format: '12' | '24';
	minMinutes?: number;
	maxMinutes?: number;
}

export function useTimeInput({ value = '', onChange, format, minMinutes, maxMinutes }: UseTimeInputProps) {
	const [selectedTime, setSelectedTime] = useState(value);
	const [timeState, setTimeState] = useState<TimeState>(() =>
		parseTimeString(value, format)
	);
	const [inputValue, setInputValue] = useState('');

	// Update internal state when value prop changes
	useEffect(() => {
		setSelectedTime(value);
		if (value) {
			setTimeState(parseTimeString(value, format));
		}
	}, [value, format]);

	// Update input value when selected time changes
	useEffect(() => {
		if (selectedTime) {
			setInputValue(formatTimeDisplay(selectedTime, format));
		} else {
			setInputValue('');
		}
	}, [selectedTime, format]);

	const handleTimeChange = useCallback((
		newHours: number,
		newMinutes: number,
		newPeriod?: 'AM' | 'PM'
	) => {
		const finalPeriod = newPeriod || timeState.period;
		const timeString = convertToTimeString(newHours, newMinutes, finalPeriod, format);

		if (isValidTime(timeString, minMinutes, maxMinutes)) {
			setSelectedTime(timeString);
			setTimeState({ hours: newHours, minutes: newMinutes, period: finalPeriod });
			onChange?.(timeString);
		}
	}, [timeState.period, format, minMinutes, maxMinutes, onChange]);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const inputVal = e.target.value;
		setInputValue(inputVal);

		const parsed = parseInputTime(inputVal, format);
		if (parsed) {
			setTimeState(parsed);
			handleTimeChange(parsed.hours, parsed.minutes, parsed.period);
		}
	}, [format, handleTimeChange]);

	const handleInputBlur = useCallback(() => {
		// Reset input value to formatted time if invalid
		if (selectedTime) {
			setInputValue(formatTimeDisplay(selectedTime, format));
		} else {
			setInputValue('');
		}
	}, [selectedTime, format]);

	return {
		selectedTime,
		timeState,
		inputValue,
		handleTimeChange,
		handleInputChange,
		handleInputBlur,
	};
}

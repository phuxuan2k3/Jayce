import { TimeState } from './types';

export const parseTimeString = (timeString: string, format: '12' | '24'): TimeState => {
	if (!timeString) return { hours: 0, minutes: 0, period: 'AM' };

	const [hourStr, minuteStr] = timeString.split(':');
	const hour = parseInt(hourStr, 10);
	const minute = parseInt(minuteStr, 10);

	if (format === '12') {
		if (hour === 0) {
			return { hours: 12, minutes: minute, period: 'AM' };
		} else if (hour < 12) {
			return { hours: hour, minutes: minute, period: 'AM' };
		} else if (hour === 12) {
			return { hours: 12, minutes: minute, period: 'PM' };
		} else {
			return { hours: hour - 12, minutes: minute, period: 'PM' };
		}
	} else {
		return { hours: hour, minutes: minute, period: 'AM' };
	}
};

export const formatTimeDisplay = (timeString: string, format: '12' | '24'): string => {
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

export const convertToTimeString = (
	hours: number,
	minutes: number,
	period: 'AM' | 'PM',
	format: '12' | '24'
): string => {
	let finalHours = hours;

	if (format === '12') {
		if (period === 'AM') {
			finalHours = hours === 12 ? 0 : hours;
		} else {
			finalHours = hours === 12 ? 12 : hours + 12;
		}
	}

	return `${String(finalHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export const isValidTime = (timeString: string, minMinutes?: number, maxMinutes?: number): boolean => {
	if (!timeString) return false;
	const [hourStr, minuteStr] = timeString.split(':');
	if (!hourStr || !minuteStr) return false;
	const inputMinutes = parseInt(hourStr, 10) * 60 + parseInt(minuteStr, 10);
	if (isNaN(inputMinutes)) return false;
	if (inputMinutes < (minMinutes || 0) || inputMinutes > (maxMinutes || Infinity)) return false;
	return true;
};

export const parseInputTime = (
	inputVal: string,
	format: '12' | '24'
): { hours: number; minutes: number; period: 'AM' | 'PM' } | null => {
	const timeRegex = format === '12'
		? /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
		: /^(\d{1,2}):(\d{2})$/;

	const match = inputVal.match(timeRegex);
	if (!match) return null;

	const inputHours = parseInt(match[1], 10);
	const inputMinutes = parseInt(match[2], 10);
	const inputPeriod = (match[3]?.toUpperCase() as 'AM' | 'PM') || 'AM';

	// Validate ranges
	if (inputMinutes < 0 || inputMinutes > 59) return null;

	if (format === '12') {
		if (inputHours < 1 || inputHours > 12) return null;
	} else {
		if (inputHours < 0 || inputHours > 23) return null;
	}

	return { hours: inputHours, minutes: inputMinutes, period: inputPeriod };
};

export const stringToMinutes = (timeString: string): number => {
	if (!timeString) return 0;
	const [hourStr, minuteStr] = timeString.split(':');
	const hours = parseInt(hourStr, 10);
	const minutes = parseInt(minuteStr, 10);
	if (isNaN(hours) || isNaN(minutes)) return 0;
	return hours * 60 + minutes;
};


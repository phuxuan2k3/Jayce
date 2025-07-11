import { cn } from '../../../../../app/cn';

interface CalendarGridProps {
	currentMonth: Date;
	selectedDate: string;
	min?: string;
	max?: string;
	onDateSelect: (date: Date) => void;
}

export default function CalendarGrid({
	currentMonth,
	selectedDate,
	min,
	max,
	onDateSelect,
}: CalendarGridProps) {
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

	const handleDateSelect = (date: Date) => {
		if (!isDateDisabled(date)) {
			onDateSelect(date);
		}
	};

	const days = getDaysInMonth(currentMonth);

	return (
		<>
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
							onClick={() => {
								handleDateSelect(date);
							}}
							disabled={disabled}
							className={cn(
								'p-2 text-sm rounded-md transition-colors',
								'hover:bg-primary-toned-100 focus:outline-none focus:ring-2 focus:ring-primary-toned-300',
								disabled && 'text-gray-400 cursor-not-allowed hover:bg-transparent',
								selected && 'bg-primary-toned-600 text-white hover:bg-primary-toned-700',
								today && !selected && 'bg-primary-toned-50 text-primary-toned-800 font-semibold',
								!selected && !today && !disabled && 'text-gray-700'
							)}
						>
							{date.getDate()}
						</button>
					);
				})}
			</div>
		</>
	);
}

import MonthNavigation from './MonthNavigation';
import CalendarGrid from './CalendarGrid';

interface CalendarPopoverProps {
	currentMonth: Date;
	selectedDate: string;
	min?: string;
	max?: string;
	onNavigateMonth: (direction: 'prev' | 'next') => void;
	onDateSelect: (date: Date) => void;
}

export default function CalendarPopover({
	currentMonth,
	selectedDate,
	min,
	max,
	onNavigateMonth,
	onDateSelect,
}: CalendarPopoverProps) {
	return (
		<div className="absolute top-full left-0 mt-1 bg-white border border-primary-toned-300 rounded-md shadow-lg z-50 min-w-full">
			<div className="p-4">
				<MonthNavigation
					currentMonth={currentMonth}
					onNavigate={onNavigateMonth}
				/>
				<CalendarGrid
					currentMonth={currentMonth}
					selectedDate={selectedDate}
					min={min}
					max={max}
					onDateSelect={onDateSelect}
				/>
			</div>
		</div>
	);
}

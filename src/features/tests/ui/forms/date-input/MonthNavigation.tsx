import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthNavigationProps {
	currentMonth: Date;
	onNavigate: (direction: 'prev' | 'next') => void;
}

export default function MonthNavigation({ currentMonth, onNavigate }: MonthNavigationProps) {
	const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

	return (
		<div className="flex items-center justify-between mb-4">
			<button
				type="button"
				onClick={() => onNavigate('prev')}
				className="p-2 rounded-md hover:bg-primary-toned-50 text-primary-toned-600 transition-colors"
			>
				<ChevronLeft className="w-4 h-4" />
			</button>
			<h3 className="text-lg font-semibold text-primary-toned-800">
				{monthYear}
			</h3>
			<button
				type="button"
				onClick={() => onNavigate('next')}
				className="p-2 rounded-md hover:bg-primary-toned-50 text-primary-toned-600 transition-colors"
			>
				<ChevronRight className="w-4 h-4" />
			</button>
		</div>
	);
}

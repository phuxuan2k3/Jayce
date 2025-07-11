import { cn } from '../../../../../app/cn';

interface PeriodSelectorProps {
	period: 'AM' | 'PM';
	onPeriodChange: (period: 'AM' | 'PM') => void;
}

export default function PeriodSelector({ period, onPeriodChange }: PeriodSelectorProps) {
	return (
		<div className="flex flex-col items-center">
			<div className="text-sm text-primary-toned-600 mb-2">Period</div>
			<div className="flex flex-col space-y-1">
				{(['AM', 'PM'] as const).map((p) => (
					<button
						key={p}
						type="button"
						className={cn(
							'px-3 py-2 rounded-md font-medium transition-colors',
							period === p
								? 'bg-primary-toned-600 text-white hover:bg-primary-toned-700'
								: 'bg-primary-toned-100 text-primary-toned-800 hover:bg-primary-toned-200'
						)}
						onClick={() => onPeriodChange(p)}
					>
						{p}
					</button>
				))}
			</div>
		</div>
	);
}

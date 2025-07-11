import { forwardRef } from 'react';
import { cn } from '../../../../../app/cn';

interface TimeScrollSelectorProps {
	label: string;
	items: Array<{
		value: number;
		display: string;
		isSelected: boolean;
		isDisabled: boolean;
	}>;
	onSelect: (value: number) => void;
}

const TimeScrollSelector = forwardRef<HTMLDivElement, TimeScrollSelectorProps>(
	({ label, items, onSelect }, ref) => {
		return (
			<div className="flex flex-col items-center">
				<div className="text-sm text-primary-toned-600 mb-2">{label}</div>
				<div ref={ref} className="h-48 overflow-y-auto border border-primary-toned-200 rounded-md">
					<div className="min-w-12">
						{items.map(({ value, display, isSelected, isDisabled }) => (
							<button
								key={value}
								type="button"
								className={cn(
									'w-full px-3 py-1 text-center hover:bg-primary-toned-50 transition-colors',
									isSelected && 'bg-primary-toned-600 text-white hover:bg-primary-toned-700',
									isDisabled && 'text-gray-400 cursor-not-allowed',
								)}
								onClick={() => onSelect(value)}
							>
								{display}
							</button>
						))}
					</div>
				</div>
			</div>
		);
	}
);

TimeScrollSelector.displayName = 'TimeScrollSelector';

export default TimeScrollSelector;

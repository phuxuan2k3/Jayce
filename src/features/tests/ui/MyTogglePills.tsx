import { cn } from '../../../app/cn';

export default function MyTogglePills({
	label,
	isChecked,
	onChange,
	className = '',
}: {
	label: string;
	isChecked: boolean;
	onChange: (checked: boolean) => void;
	className?: string;

}) {
	return (
		<div className={cn(
			"flex items-center justify-center rounded-full border-primary px-3 py-1 cursor-pointer select-none text-sm transition-colors hover:bg-primary-toned-200",
			isChecked ? "bg-primary text-white" : "bg-primary-toned-100 text-primary-toned-700",
			className
		)}
			onClick={() => onChange(!isChecked)}
		>
			{label}
		</div>
	)
}

import { Search } from 'lucide-react'
import { cn } from '../../../../app/cn';

export default function MyInputWithSearch({
	inputComponent,
	className = '',
}: {
	inputComponent: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("relative", className)}>
			{inputComponent}

			<div className="absolute inset-y-0 right-0 flex items-center pr-3">
				<Search className="h-5 w-5 text-gray-400" />
			</div>
		</div>
	)
}

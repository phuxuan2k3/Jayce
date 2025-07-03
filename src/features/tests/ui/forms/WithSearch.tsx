import { Search } from 'lucide-react'

export default function WithSearch({
	inputComponent,
}: {
	inputComponent: React.ReactNode;
}) {
	return (
		<div className="relative">
			{inputComponent}

			<div className="absolute inset-y-0 right-0 flex items-center pr-3">
				<Search className="h-5 w-5 text-gray-400" />
			</div>
		</div>
	)
}

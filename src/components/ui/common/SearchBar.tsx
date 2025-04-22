import { Search } from 'lucide-react'

export default function SearchBar({
	text,
	onTextChange,
	placeholder = "Search...",
}: {
	placeholder?: string;
	text: string;
	onTextChange: (text: string) => void;
}) {
	return (
		<div className="flex-1 relative flex border border-gray-300 rounded-md focus-within:border-primary">
			<input
				type="text"
				className="w-full h-full px-4 py-2 rounded-md focus:outline-none"
				onChange={(e) => onTextChange(e.target.value)}
				value={text}
				placeholder={placeholder}
			/>
			<div className="relative h-full flex items-center justify-center pr-2">
				<Search size={20} className="text-gray-400" />
			</div>
		</div>
	)
}

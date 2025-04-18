import { X } from "lucide-react"

export default function LinksContextTab({
	links,
	onLinksChange,
}: {
	links: string[];
	onLinksChange: (links: string[]) => void;
}) {
	return (
		<div className="space-y-4 p-4 bg-gray-100 rounded-lg">
			<h2 className="text-lg font-semibold">Reference Links</h2>
			<p className="text-sm text-gray-600">Add links to relevant resources or documents.</p>

			{/* Links input fields */}
			<div className="flex flex-col gap-2">
				{links.map((link, index) => (
					<div key={index} className="grid grid-cols-[1fr_auto] gap-2">
						<input
							type="text"
							value={link}
							onChange={(e) => {
								const newLinks = [...links];
								newLinks[index] = e.target.value;
								onLinksChange(newLinks);
							}}
							className="flex-grow px-2 py-1 border border-gray-300 rounded"
							placeholder="https://example.com"
						/>
						<button
							onClick={() => {
								const newLinks = links.filter((_, i) => i !== index);
								onLinksChange(newLinks);
							}}
							className="p-2 text-gray-500 hover:text-red-500 rounded"
							aria-label="Remove link"
						>
							<X size={16} />
						</button>
					</div>
				))}
			</div>

			<button
				onClick={() => onLinksChange([...links, ''])}
				className="px-4 py-1 bg-primary-toned-600 text-white rounded hover:bg-primary-toned-500 transition-colors duration-200"
				aria-label="Add link"
			>
				Add Reference Link
			</button>
		</div>
	)
}

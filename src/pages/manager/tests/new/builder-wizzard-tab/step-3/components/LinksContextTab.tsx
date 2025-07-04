import { CircleX, Link } from "lucide-react";
import { cn } from "../../../../../../../app/cn";
import { classNameInput } from "../../../common/class-names";


interface LinksContextTabProps {
	links: string[];
	newLink: string;
	onNewLinkChange: (value: string) => void;
	onAddLink: () => void;
	onRemoveLink: (index: number) => void;
}

export default function LinksContextTab({
	links,
	newLink,
	onNewLinkChange,
	onAddLink,
	onRemoveLink
}: LinksContextTabProps) {
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			onAddLink();
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex space-x-2">
				<input
					type="url"
					placeholder="https://example.com"
					className={cn(classNameInput, 'flex-1')}
					value={newLink}
					onChange={(e) => onNewLinkChange(e.target.value)}
					onKeyDown={handleKeyPress}
				/>
				<button
					type="button"
					onClick={onAddLink}
					className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-semibold"
				>
					Add
				</button>
			</div>

			{links.length > 0 && (
				<div className="space-y-2">
					<h4 className="font-medium text-gray-700">Added Links:</h4>
					{links.map((link, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
						>
							<div className="flex items-center space-x-3">
								<span className="text-lg">
									<Link className="w-5 h-5 text-primary" />
								</span>
								<a
									href={link}
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:underline truncate max-w-md"
								>
									{link}
								</a>
							</div>
							<button
								type="button"
								onClick={() => onRemoveLink(index)}
								className="text-red-500 hover:text-red-700 font-medium"
							>
								<CircleX className="w-5 h-5" />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

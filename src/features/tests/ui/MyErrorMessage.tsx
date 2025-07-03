import { cn } from "../../../app/cn";

export default function MyErrorMessages({
	className = '',
	errorMessages = [],
}: {
	errorMessages: string[];
	className?: string;
}) {
	return (
		errorMessages.length > 0 && (
			<div className={cn("px-6 py-4 bg-red-50 border border-red-200 rounded-lg shadow-md mb-4", className)}>
				<ul className="text-red-500 list-disc list-inside">
					{errorMessages.map((msg, index) => (
						<li key={index}>{msg}</li>
					))}
				</ul>
			</div>
		)
	)
}

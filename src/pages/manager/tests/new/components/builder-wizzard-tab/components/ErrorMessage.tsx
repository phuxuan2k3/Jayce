export default function ErrorMessages({
	errorMessages = [],
}: {
	errorMessages: string[];
}) {
	return (
		errorMessages.length > 0 && (
			<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
				<ul className="text-red-600 text-sm">
					{errorMessages.map((msg, index) => (
						<li key={index}>{msg}</li>
					))}
				</ul>
			</div>
		)
	)
}

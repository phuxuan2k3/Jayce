export default function ErrorMessages({
	errorMessages = [],
}: {
	errorMessages: string[];
}) {
	return (
		errorMessages.length > 0 && (
			<div className="text-red-500 text-sm mt-2">
				{errorMessages.map((msg, index) => (
					<p key={index}>{msg}</p>
				))}
			</div>
		)
	)
}

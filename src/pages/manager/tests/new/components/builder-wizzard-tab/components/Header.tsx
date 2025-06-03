export default function Header({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className="col-span-2 mb-4">
			<h2 className="text-2xl font-bold text-primary mb-2">
				{title}
			</h2>
			<p className="text-sm text-gray-600">
				{description}
			</p>
		</div>
	)
}

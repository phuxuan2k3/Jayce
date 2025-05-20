export default function Card({
	header,
	icon,
	body,
}: {
	header: string;
	icon: React.ReactNode;
	body: React.ReactNode;
}) {
	return (
		<div className="bg-white shadow-md rounded-lg overflow-hidden h-full">
			<div className="p-4 bg-primary-toned-50 flex items-center border-b">
				{icon}
				<h2 className="text-xl font-bold text-primary">{header}</h2>
			</div>
			<div className="p-4">
				{body}
			</div>
		</div>
	)
}

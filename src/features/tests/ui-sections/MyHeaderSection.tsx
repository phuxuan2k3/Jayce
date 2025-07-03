import { cn } from "../../../app/cn";

export default function MyHeaderTitleSection({
	title,
	description,
	onClick,
	className = "",
	children
}: {
	title: string;
	description?: string;
	onClick?: () => void;
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<div
			className={cn(
				"flex flex-col",
				onClick && "cursor-pointer hover:bg-primary-toned-50/60",
				className,
			)}
			onClick={onClick}
		>
			<h2 className="text-3xl font-extrabold text-primary mb-2 relative inline-block">
				<span className="bg-gradient-to-r from-primary to-primary-toned-700 bg-clip-text text-transparent">
					{title}
				</span>
				<span className="block h-0.5 w-[20%] bg-primary-toned-200 rounded-full mt-1" />
			</h2>
			{description && (
				<p className="text-primary-toned-700 leading-relaxed">
					{description}
				</p>
			)}
			{children}
		</div>
	);
}

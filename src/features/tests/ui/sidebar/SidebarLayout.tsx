import { cn } from "../../../../app/cn";

export default function SidebarLayout({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<div className={cn(
			"sticky top-16 max-h-[82vh] h-full shadow-primary bg-white rounded-lg p-6 flex flex-col gap-4",
			className
		)}>
			{children}
		</div>
	)
}

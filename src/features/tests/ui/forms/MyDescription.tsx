import { cn } from "../../../../app/cn";

type MyDescriptionProps = React.HTMLAttributes<HTMLSpanElement> & {
	text?: string | React.ReactNode;
	flexShrink0?: boolean;
};

export default function MyDescription({
	text,
	flexShrink0 = true,
	className,
	children,
	...props }: MyDescriptionProps) {
	if (!text && !children) {
		return null; // Return null if no text or children are provided
	}
	return (
		<span
			className={cn(
				`text-sm text-primary text-ellipsis`,
				flexShrink0 && "flex-shrink-0 ",
				className
			)}
			{...props}
		>{text || children}
		</span>
	);
}

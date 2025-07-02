import { cn } from "../../../../app/cn";

type MyDescriptionProps = React.HTMLAttributes<HTMLSpanElement> & {
	text?: string | React.ReactNode;
};

export default function MyDescription({ text, className, children, ...props }: MyDescriptionProps) {
	if (!text && !children) {
		return null; // Return null if no text or children are provided
	}
	return (
		<span
			className={cn(`text-sm text-primary flex-shrink-0 text-ellipsis ${className}`)}
			{...props}
		>{text || children}
		</span>
	);
}

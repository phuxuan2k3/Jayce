import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../../../app/cn";

const MyFieldLayoutVariants = cva(
	"",
	{
		variants: {
			orientation: {
				vertical: "flex flex-col items-start gap-1",
				horizontal: "flex flex-row items-center gap-4",
			},
		},
		defaultVariants: {
			orientation: "vertical",
		},
	}
);

type MyFieldLayoutVariantsType = VariantProps<typeof MyFieldLayoutVariants>;


export default function MyFieldLayout({
	children,
	className,
	orientation,
}: {
	children?: React.ReactNode;
	className?: string;
} & MyFieldLayoutVariantsType) {
	return (
		<div className={cn(MyFieldLayoutVariants({ orientation }), className)}>
			{children}
		</div>
	)
}

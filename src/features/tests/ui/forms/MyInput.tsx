import * as React from "react"
import { cn } from "../../../../app/cn"
import { commonInputClasses } from "./common-classnames"
import { cva, VariantProps } from "class-variance-authority"

export const MyInputVariants = cva(
	cn(commonInputClasses),
	{
		variants: {
			size: {
				default: "",
				small: cn("h-8 px-4 text-sm"),
				large: cn("h-12 px-4 text-lg"),
			},
			color: {
				default: "",
				secondary: cn("border-secondary text-secondary focus:ring-secondary"),
				tertiary: cn("border-tertiary text-tertiary focus:ring-tertiary"),
			},
		},
		defaultVariants: {
			size: "default",
			color: "default",
		},
	}
);

export type MyInputVariantProps = VariantProps<typeof MyInputVariants>;

type MyInputProps = React.ComponentProps<"input"> & {
	variant?: MyInputVariantProps;
	error?: string | null;
};

export default function MyInput({ error, className, type, variant, ...props }: MyInputProps) {
	return (
		<input
			type={type}
			data-slot="input"
			autoComplete="off"
			className={cn(
				commonInputClasses,
				MyInputVariants(variant),
				className,
				error && 'border-red-500'
			)}
			{...props}
		/>
	)
}


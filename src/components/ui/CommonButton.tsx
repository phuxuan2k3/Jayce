import React from 'react'
import { cn } from '../../app/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
	'font-semibold px-4 py-2 rounded-md flex items-center justify-center gap-x-2 w-full h-full shadow-md transition-colors duration-200',
	{
		variants: {
			variant: {
				primary: "bg-primary text-white hover:bg-primary-toned-800",
				secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300",
				danger: "bg-red-600 text-white hover:bg-red-700",
				transparent: "bg-transparent text-gray-800 hover:bg-gray-100"
			}
		},
		defaultVariants: {
			variant: "primary"
		},
	}
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	children?: React.ReactNode;
	className?: string;
}

export default function CommonButton({
	children,
	className = "",
	variant,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			type={props?.type ?? "button"}
			className={cn(buttonVariants({ variant, className }))}>
			{children}
		</button>
	)
}

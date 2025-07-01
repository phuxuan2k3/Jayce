import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../../../app/cn'

const buttonVariants = cva(
	'px-4 py-2 rounded-md transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed',
	{
		variants: {
			variant: {
				primary: 'bg-primary text-white hover:bg-primary-toned-800',
				secondary: 'bg-secondary text-white hover:bg-secondary-toned-800',
				destructive: 'bg-red-600 text-white hover:bg-red-700',
				outline:
					'border border-primary text-primary bg-transparent hover:bg-primary hover:text-white',
				gray: 'bg-gray-300 text-gray-700 hover:bg-gray-400', // added gray variant
			},
			size: {
				large: 'text-lg px-6 py-3',
				normal: 'text-base px-4 py-2',
				medium: 'text-sm px-3 py-1.5',
				small: 'text-xs px-2 py-1 font-normal',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'normal',
		},
	}
)

type MyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants>

export default function MyButton({
	className = '',
	children,
	variant,
	size,
	...props
}: MyButtonProps) {
	return (
		<button
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		>
			{children}
		</button>
	)
}

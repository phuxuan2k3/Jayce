import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../../../../app/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const selectVariants = cva(
	'relative w-full rounded-md border bg-white shadow-sm transition-colors duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary',
	{
		variants: {
			variant: {
				default: 'border-primary hover:border-primary-toned-400',
				error: 'border-red-500 focus-within:ring-red-500 focus-within:border-red-500',
				success: 'border-green-500 focus-within:ring-green-500 focus-within:border-green-500'
			},
			size: {
				sm: 'text-sm',
				md: 'text-base',
				lg: 'text-lg'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'md'
		}
	}
)

const selectButtonVariants = cva(
	'w-full flex items-center justify-between px-3 py-2 text-left cursor-pointer focus:outline-none',
	{
		variants: {
			size: {
				sm: 'px-2 py-1 text-sm',
				md: 'px-3 py-2 text-base',
				lg: 'px-4 py-3 text-lg'
			}
		},
		defaultVariants: {
			size: 'md'
		}
	}
)

export interface SelectOption {
	value: string | number
	label: string
	disabled?: boolean
}

export interface MySelectProps extends VariantProps<typeof selectVariants> {
	options: SelectOption[]
	value?: string | number
	placeholder?: string
	disabled?: boolean
	className?: string
	label?: string
	error?: string
	required?: boolean
	onChange?: (value: string | number) => void
	onBlur?: () => void
	// Inherit common HTML attributes
	id?: string
	name?: string
	autoComplete?: string
	form?: string
	'data-testid'?: string
	'aria-label'?: string
	'aria-labelledby'?: string
	'aria-describedby'?: string
	tabIndex?: number
}

export default function MySelect({
	options,
	value,
	placeholder = "Select an option...",
	disabled = false,
	className,
	label,
	error,
	required = false,
	variant,
	size,
	onChange,
	onBlur,
	...restProps
}: MySelectProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
		options.find(option => option.value === value) || null
	)
	const selectRef = useRef<HTMLDivElement>(null)

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
				setIsOpen(false)
				onBlur?.()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [onBlur])

	// Update selected option when value prop changes
	useEffect(() => {
		const option = options.find(option => option.value === value)
		setSelectedOption(option || null)
	}, [value, options])

	const handleToggle = () => {
		if (!disabled) {
			setIsOpen(!isOpen)
		}
	}

	const handleSelect = (option: SelectOption) => {
		if (!option.disabled) {
			setSelectedOption(option)
			setIsOpen(false)
			onChange?.(option.value)
			onBlur?.()
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (disabled) return

		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault()
				setIsOpen(!isOpen)
				break
			case 'Escape':
				setIsOpen(false)
				onBlur?.()
				break
			case 'ArrowDown':
				event.preventDefault()
				if (!isOpen) {
					setIsOpen(true)
				} else {
					// Focus next option
					const currentIndex = selectedOption
						? options.findIndex(opt => opt.value === selectedOption.value)
						: -1
					const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0
					const nextOption = options[nextIndex]
					if (nextOption && !nextOption.disabled) {
						setSelectedOption(nextOption)
						onChange?.(nextOption.value)
					}
				}
				break
			case 'ArrowUp':
				event.preventDefault()
				if (!isOpen) {
					setIsOpen(true)
				} else {
					// Focus previous option
					const currentIndex = selectedOption
						? options.findIndex(opt => opt.value === selectedOption.value)
						: 0
					const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1
					const prevOption = options[prevIndex]
					if (prevOption && !prevOption.disabled) {
						setSelectedOption(prevOption)
						onChange?.(prevOption.value)
					}
				}
				break
		}
	}

	const effectiveVariant = error ? 'error' : variant

	return (
		<div className="w-full">
			{label && (
				<label className="block text-sm font-medium text-gray-700 mb-1">
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}

			<div
				ref={selectRef}
				className={cn(selectVariants({ variant: effectiveVariant, size }), className)}
				{...restProps}
			>
				<div
					className={cn(
						selectButtonVariants({ size }),
						disabled && 'cursor-not-allowed opacity-50',
						selectedOption ? 'text-gray-900' : 'text-gray-500'
					)}
					onClick={handleToggle}
					onKeyDown={handleKeyDown}
					tabIndex={disabled ? -1 : 0}
					role="combobox"
					aria-expanded={isOpen}
					aria-haspopup="listbox"
					aria-label={label}
				>
					<span className="truncate">
						{selectedOption ? selectedOption.label : placeholder}
					</span>

					<svg
						className={cn(
							'w-5 h-5 text-gray-400 transition-transform duration-200',
							isOpen && 'transform rotate-180'
						)}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>

				{isOpen && (
					<div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
						<ul role="listbox" className="py-1">
							{options.length === 0 ? (
								<li className="px-3 py-2 text-gray-500 text-center">
									No options available
								</li>
							) : (
								options.map((option) => (
									<li
										key={option.value}
										className={cn(
											'px-3 py-2 cursor-pointer transition-colors duration-150',
											option.disabled
												? 'text-gray-400 cursor-not-allowed'
												: 'text-gray-900 hover:bg-primary-toned-50',
											selectedOption?.value === option.value && 'bg-primary-toned-100 text-primary-toned-800'
										)}
										onClick={() => handleSelect(option)}
										role="option"
										aria-selected={selectedOption?.value === option.value}
									>
										<span className="flex items-center justify-between">
											<span className="truncate">{option.label}</span>
											{selectedOption?.value === option.value && (
												<svg
													className="w-4 h-4 text-primary"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											)}
										</span>
									</li>
								))
							)}
						</ul>
					</div>
				)}
			</div>

			{error && (
				<p className="mt-1 text-sm text-red-600">{error}</p>
			)}
		</div>
	)
}

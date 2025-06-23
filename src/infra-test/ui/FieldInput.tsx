import React from 'react';

interface FieldInputProps {
	label: string;
	name: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	type?: 'text' | 'number' | 'select' | 'textarea';
	placeholder?: string;
	min?: string | number;
	options?: { value: string; label: string }[];
	required?: boolean;
	className?: string;
	errorMessage?: string; // Added errorMessage prop
}

const FieldInput: React.FC<FieldInputProps> = ({
	label,
	name,
	value,
	onChange,
	type = 'text',
	placeholder,
	min,
	options,
	required = false,
	className = '',
	errorMessage // Destructure errorMessage
}) => {
	const baseInputClass = `w-full p-2 border border-primary-toned-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${errorMessage ? 'border-red-500' : ''} ${className}`;

	const renderInput = () => {
		switch (type) {
			case 'select':
				return (
					<select
						name={name}
						value={value}
						onChange={onChange}
						className={baseInputClass}
						required={required}
					>
						{options?.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				);
			case 'textarea':
				return (
					<textarea
						name={name}
						value={value}
						onChange={onChange}
						className={baseInputClass}
						placeholder={placeholder}
						required={required}
						rows={3}
					/>
				);
			case 'number':
				return (
					<input
						type="number"
						name={name}
						value={value}
						onChange={onChange}
						min={min}
						className={baseInputClass}
						placeholder={placeholder}
						required={required}
					/>
				);
			default:
				return (
					<input
						type="text"
						name={name}
						value={value}
						onChange={onChange}
						className={baseInputClass}
						placeholder={placeholder}
						required={required}
					/>
				);
		}
	};

	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-1">
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</label>
			{renderInput()}
			{errorMessage && (
				<p className="mt-1 text-xs text-red-500">{errorMessage}</p>
			)}
		</div>
	);
};

export default FieldInput;

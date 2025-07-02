import React from "react";
import { cn } from "../../../../app/cn";
import type { InputHTMLAttributes } from "react";

interface MyCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "checked"> {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string | React.ReactNode;
	className?: string;
}

const MyCheckbox: React.FC<MyCheckboxProps> = ({ checked, onChange, label, className, id, ...rest }) => {
	return (
		<label htmlFor={id} className={cn("flex items-center cursor-pointer select-none gap-2", className)}>
			<div className="relative flex items-center justify-center">
				<input
					type="checkbox"
					id={id}
					checked={checked}
					onChange={e => onChange(e.target.checked)}
					className="sr-only"
					{...rest}
				/>
				<div
					className={cn(
						"w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center",
						checked
							? "bg-primary border-primary"
							: "bg-white border-gray-300 hover:border-primary-toned-400",
						rest.disabled && "opacity-50 cursor-not-allowed"
					)}
				>
					{checked && (
						<svg
							className="w-4 h-4 text-white"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</div>
			</div>

			{label}

		</label>
	);
};

export default MyCheckbox;

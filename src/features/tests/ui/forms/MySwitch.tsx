
import React from "react";
import { cn } from "../../../../app/cn";

import type { InputHTMLAttributes } from "react";

interface MySwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "checked"> {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string | React.ReactNode;
	className?: string;
}



const MySwitch: React.FC<MySwitchProps> = ({ checked, onChange, label, className, ...rest }) => {
	return (
		<label className={cn("flex items-center cursor-pointer select-none gap-2", className)}>
			<div className="relative">
				<input
					type="checkbox"
					checked={checked}
					onChange={e => onChange(e.target.checked)}
					className="sr-only"
					{...rest}
				/>
				<div
					className={cn(
						"w-11 h-6 rounded-full transition-colors duration-200",
						checked ? "bg-primary" : "bg-gray-300",
						rest.disabled && "opacity-50"
					)}
				></div>
				<div
					className={cn(
						"absolute left-0 top-0 w-6 h-6 bg-white border border-gray-300 rounded-full shadow transition-transform duration-200",
						checked ? "translate-x-5" : "translate-x-0",
						rest.disabled && "opacity-50"
					)}
				></div>
			</div>
			{label}
		</label>
	);
};

export default MySwitch;


import React from "react";
import { cn } from "../../../../app/cn";
import type { InputHTMLAttributes } from "react";

import { CheckboxIcon } from "../../../../components/icons/CheckboxIcon";

interface CheckboxBoxProps {
	checked: boolean;
	disabled?: boolean;
}

const CheckboxBox: React.FC<CheckboxBoxProps> = ({ checked, disabled }) => (
	<div
		className={cn(
			"w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center",
			checked
				? "bg-primary border-primary"
				: "bg-white border-gray-300 hover:border-primary-toned-400",
			disabled && "opacity-50 cursor-not-allowed"
		)}
	>
		{checked && <CheckboxIcon />}
	</div>
);

interface MyCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "checked"> {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string | React.ReactNode;
	className?: string;
}

export default function MyCheckbox({ checked, onChange, label, className, id, ...rest }: MyCheckboxProps) {
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
				<CheckboxBox checked={checked} disabled={rest.disabled} />
			</div>
			{label}
		</label>
	);
};

MyCheckbox.displayName = "MyCheckbox";
MyCheckbox.CheckboxBox = CheckboxBox;


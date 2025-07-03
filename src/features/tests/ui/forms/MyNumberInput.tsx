import React, { useState, useEffect } from "react";
import MyInput from "./MyInput";

type MyNumberInputProps = Omit<React.ComponentProps<typeof MyInput>, "type"> & {
	min?: number;
	max?: number;
};

export default function MyNumberInput(props: MyNumberInputProps) {
	const { min, max, value, onBlur, onChange, ...rest } = props;
	const [draftValue, setDraftValue] = useState<string>(
		value !== undefined && value !== null ? String(value) : ""
	);

	useEffect(() => {
		if (value !== undefined && value !== null && String(value) !== draftValue) {
			setDraftValue(String(value));
		}
		if ((value === undefined || value === null) && draftValue !== "") {
			setDraftValue("");
		}
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDraftValue(e.target.value);
		if (onChange) {
			onChange(e);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		let num = draftValue === "" ? undefined : parseFloat(draftValue);
		if (num !== undefined && !isNaN(num)) {
			let clamped = num;
			if (min !== undefined && clamped < min) clamped = min;
			if (max !== undefined && clamped > max) clamped = max;
			if (clamped !== num) {
				setDraftValue(String(clamped));
				if (onChange) {
					const syntheticEvent = {
						...e,
						target: { ...e.target, value: String(clamped) },
					} as React.ChangeEvent<HTMLInputElement>;
					onChange(syntheticEvent);
				}
			}
		} else {
			setDraftValue("min" in props ? String(min) : "0");
		}
		if (onBlur) onBlur(e);
	};

	return (
		<MyInput
			type="number"
			min={min}
			max={max}
			value={draftValue}
			onChange={handleChange}
			onBlur={handleBlur}
			{...rest}
		/>
	);
}
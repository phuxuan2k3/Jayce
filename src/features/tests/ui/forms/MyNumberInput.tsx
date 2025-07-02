import { useState } from "react";
import MyInput from "./MyInput";

type MyNumberInputProps = Omit<React.ComponentProps<typeof MyInput>, "type">;

export default function MyNumberInput(props: MyNumberInputProps) {
	const [draftValue, setDraftValue] = useState<number | undefined>(Number(props.value) || undefined);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value ? parseFloat(e.target.value) : undefined;
		setDraftValue(value);
		if (props.onChange) {
			props.onChange(e);
		}
	};

	return (
		<MyInput
			type="number"
			{...props}
		/>
	)
}

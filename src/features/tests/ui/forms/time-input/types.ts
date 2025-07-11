export interface MyTimeInputProps {
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	error?: string;
	required?: boolean;
	name?: string;
	id?: string;
	min?: string;
	max?: string;
	step?: number; // minutes step, default 1
	format?: '12' | '24'; // 12-hour or 24-hour format
}

export interface TimeState {
	hours: number;
	minutes: number;
	period: 'AM' | 'PM';
}

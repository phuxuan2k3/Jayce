import { ReactNode } from "react";

export type BaseComponentProps = {
	className?: string;
	children?: ReactNode;
	onClick?: () => void;
}

export const TypeMap = {
	"MCQ": {
		label: "MCQ",
		color: "bg-blue-100 text-blue-800",
	},
	"LONG_ANSWER": {
		label: "Long Answer",
		color: "bg-orange-100 text-orange-800",
	},
} as const;

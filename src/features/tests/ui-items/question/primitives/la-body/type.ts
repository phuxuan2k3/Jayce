import { cn } from "../../../../../../app/cn";

export const commonBoxClassNames = cn("py-2 text-gray-800 px-4 border rounded-lg text-sm");

export const commonSliderButtonClassNames = (isShow: boolean) => cn(
	commonBoxClassNames,
	'border-gray-300 shadow-sm hover:bg-gray-200 text-sm font-semibold hover:underline',
	isShow && "rounded-b-none",
);

export const TextAnswerAsConst = {
	"CORRECT": {
		color: cn("bg-green-100 border-green-500 text-green-800"),
		text: "Correct Answer",
	},
	"PARTIALLY_CORRECT": {
		color: cn("bg-yellow-100 border-yellow-500 text-yellow-800"),
		text: "Partially Correct Answer",
	},
	"INCORRECT": {
		color: cn("bg-red-100 border-red-500 text-red-800"),
		text: "Incorrect Answer",
	},
	"PENDING_REVIEW": {
		color: cn("bg-blue-100 border-blue-500 text-blue-800"),
		text: "Pending Review",
	},
};

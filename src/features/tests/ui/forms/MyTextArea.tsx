import { commonInputClasses } from "./common-classnames";
import { cn } from "../../../../app/cn";
import TextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";
import { MyInputVariantProps, MyInputVariants } from "./MyInput";

type MyTextAreaProps = TextareaAutosizeProps & {
	variant?: MyInputVariantProps;
};

export default function MyTextArea({ className, variant, ...props }: MyTextAreaProps) {
	return (
		<TextareaAutosize
			className={cn(
				commonInputClasses,
				MyInputVariants(variant),
				className
			)}
			{...props}
		/>
	);
}

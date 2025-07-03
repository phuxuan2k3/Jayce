import { commonInputClasses } from "./common-classnames";
import { cn } from "../../../../app/cn";
import TextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";
import { MyInputVariantProps, MyInputVariants } from "./MyInput";

type MyTextAreaProps = TextareaAutosizeProps & {
	variant?: MyInputVariantProps;
	isAutoSized?: boolean; // Optional prop to control auto-sizing
};

export default function MyTextArea({ className, variant, isAutoSized = true, ...props }: MyTextAreaProps) {
	return (
		isAutoSized ? (
			<TextareaAutosize
				className={cn(
					commonInputClasses,
					MyInputVariants(variant),
					className
				)}
				{...props}
				rows={props.rows || 3} // Default to 3 rows if not specified
			/>
		) : (
			<textarea
				className={cn(
					commonInputClasses,
					MyInputVariants(variant),
					className
				)}
				{...props}
				rows={props.rows || 3} // Default to 3 rows if not specified
			/>
		)
	);
}

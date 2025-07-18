import React from "react";
import { commonInputClasses } from "./common-classnames";
import { cn } from "../../../../app/cn";
import TextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";
import { MyInputVariantProps, MyInputVariants } from "./MyInput";

type MyTextAreaProps = TextareaAutosizeProps & {
	variant?: MyInputVariantProps;
	isAutoSized?: boolean; // Optional prop to control auto-sizing
	error?: string; // Optional prop for error messages
};

const MyTextArea = React.forwardRef<HTMLTextAreaElement, MyTextAreaProps>(
	({ className, variant, isAutoSized = true, error, ...props }, ref) => {
		return (
			isAutoSized ? (
				<TextareaAutosize
					ref={ref}
					className={cn(
						commonInputClasses,
						error && "border-red-500",
						MyInputVariants(variant),
						className
					)}
					{...props}
					rows={props.rows || 3} // Default to 3 rows if not specified
				/>
			) : (
				<textarea
					ref={ref}
					className={cn(
						commonInputClasses,
						error && "border-red-500",
						MyInputVariants(variant),
						className
					)}
					{...props}
					rows={props.rows || 3} // Default to 3 rows if not specified
				/>
			)
		);
	}
);

MyTextArea.displayName = "MyTextArea";

export default MyTextArea;

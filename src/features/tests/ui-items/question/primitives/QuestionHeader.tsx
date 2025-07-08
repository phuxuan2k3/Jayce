
import { BaseComponentProps } from "./types";
import { TypeMap } from "../types";
import { QuestionContext } from "./contexts";
import { cn } from "../../../../../app/cn";

const { useQuestion } = QuestionContext;


function QuestionPrimitivesHeader({ className = "" }: BaseComponentProps) {
	const { index, question } = useQuestion();
	const { text, points, type } = question;
	return (
		<div
			className={cn(
				"flex items-start gap-4",
				className
			)}
		>
			<div className="flex flex-col items-stretch gap-1 flex-shrink-0">
				<span className="text-gray-500 font-mono">
					{index != null ? `Question ${index + 1}.` : "Question"}
				</span>
				<span className="px-3 h-fit bg-primary-toned-200 text-primary-toned-700 text-xs font-semibold rounded-full w-full text-center">
					{points ? `${points} point${points > 1 ? "s" : ""}` : ""}
				</span>
			</div>
			<div className="flex-1">
				<span>{text}</span>
			</div>
			<span
				className={cn(
					"py-0 text-xs px-4 rounded-full",
					TypeMap[type].color
				)}
			>
				{TypeMap[type].label || "Unknown"}
			</span>
		</div>
	);
}

QuestionPrimitivesHeader.displayName = "QuestionPrimitivesHeader";

export { QuestionPrimitivesHeader };

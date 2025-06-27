import QuestionPrimitives, { PrimitivesProps } from "../primitives";
import { cn } from "../../../../app/cn";
import { QuestionPrimitivesDetailBody } from "../primitives/QuestionBody";
import { QuestionPrimitivesHeader } from "../primitives/QuestionHeader";

export function QuestionDefault({
	className = "", ...context
}: PrimitivesProps) {
	return (
		<QuestionPrimitives {...context} className={cn("bg-white", className)}>
			<QuestionPrimitivesHeader />
			<QuestionPrimitivesDetailBody />
		</QuestionPrimitives>
	);
}

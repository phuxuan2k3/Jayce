import { cn } from "../../../../../app/cn";
import QuestionPrimitives, { PrimitivesProps } from "../primitives";
import { QuestionPrimitivesDetailBody } from "../primitives/QuestionBody";
import { QuestionPrimitivesFooter } from "../primitives/QuestionFooter";
import { QuestionPrimitivesHeader } from "../primitives/QuestionHeader";

export function QuestionDefault({
	className = "", ...context
}: PrimitivesProps) {
	return (
		<QuestionPrimitives {...context} className={cn("bg-white flex flex-col gap-4", className)}>
			<QuestionPrimitivesHeader />
			<QuestionPrimitivesDetailBody />
			<QuestionPrimitivesFooter />
		</QuestionPrimitives>
	);
}

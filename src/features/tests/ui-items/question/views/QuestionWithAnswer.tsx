import { cn } from '../../../../../app/cn';
import QuestionPrimitives, { PrimitivesProps } from '../primitives';
import { QuestionPrimitivesDetailBody } from '../primitives/QuestionBody';
import { QuestionPrimitivesHeader } from '../primitives/QuestionHeader';

export default function QuestionWithAnswer({
	className = "", ...context
}: PrimitivesProps) {
	return (
		<QuestionPrimitives {...context} className={cn("bg-white", className)}>
			<QuestionPrimitivesHeader />
			<QuestionPrimitivesDetailBody />
		</QuestionPrimitives>
	);
}

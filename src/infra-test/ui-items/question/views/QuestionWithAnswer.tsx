import { cn } from '../../../../app/cn';
import QuestionPrimitives, { PrimitivesProps } from '../primitives';
import QuestionAggregate from '../primitives/QuestionAggregate';
import { QuestionPrimitivesDetailBody } from '../primitives/QuestionBody';
import { QuestionPrimitivesHeader } from '../primitives/QuestionHeader';

export default function QuestionWithAnswer({
	className = "", ...context
}: PrimitivesProps) {
	return (
		<QuestionPrimitives {...context} className={cn("bg-white", className)}>
			<QuestionPrimitivesHeader />
			<QuestionPrimitivesDetailBody />
			<QuestionAggregate />
		</QuestionPrimitives>
	);
}

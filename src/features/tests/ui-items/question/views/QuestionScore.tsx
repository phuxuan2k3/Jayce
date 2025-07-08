import { cn } from "../../../../../app/cn";
import QuestionPrimitives, { PrimitivesProps } from "../primitives";
import { QuestionPrimitivesDetailBody } from "../primitives/QuestionBody";
import { QuestionPrimitivesScoreFooter } from "../primitives/QuestionFooter";
import { QuestionPrimitivesHeader } from "../primitives/QuestionHeader";

export function QuestionScore({
	className = "",
	hasAnswer,
	...context
}: PrimitivesProps & {
	hasAnswer: {
		givenPoints: number;
		onGivenPointsChange: (points: number) => void;
		givenComment?: string;
		onGivenCommentChange: (comment?: string) => void;
	} | undefined;
}) {
	const allowComment = context.question?.type === "LONG_ANSWER"; // Only allow comments for long answer questions
	const questionPoints = context.question.points;

	return (
		<QuestionPrimitives {...context} className={cn("bg-white flex flex-col gap-4", className)}>
			<QuestionPrimitivesHeader />
			<QuestionPrimitivesDetailBody />
			{hasAnswer ? (
				<QuestionPrimitivesScoreFooter
					allowComment={allowComment}
					questionPoints={questionPoints}
					points={hasAnswer.givenPoints}
					onPointsChange={hasAnswer.onGivenPointsChange}
					comment={hasAnswer.givenComment}
					onCommentChange={hasAnswer.onGivenCommentChange}
				/>
			) : (
				<div className="flex items-center justify-center h-32 text-gray-500">
					<p className="text-sm">No answer provided for this question.</p>
				</div>
			)}
		</QuestionPrimitives>
	);
}

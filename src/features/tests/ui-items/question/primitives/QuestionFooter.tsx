import { cn } from '../../../../../app/cn';
import MyLabel from '../../../ui/forms/MyLabel';
import MyNumberInput from '../../../ui/forms/MyNumberInput';
import MyTextArea from '../../../ui/forms/MyTextArea';
import { QuestionContext, ShowAnswerContext } from './contexts';

function QuestionFooter() {
	const { show } = ShowAnswerContext.useShowAnswer();
	const { question } = QuestionContext.useQuestion();
	const answer = QuestionContext.useAnswer();
	if (show === false || answer == null) return null;
	return (
		<div className='flex flex-col gap-2'>
			<div className="text-sm font-semibold text-gray-800">
				Points received: {answer.pointReceived != null
					? answer.pointReceived
					: <span className='italic'>Pending...</span>
				} / {question.points}
			</div>
			{answer.comment != null && (
				<div className="text-sm text-gray-600">
					Comment: {answer.comment}
				</div>
			)}
		</div>
	)
}

function QuestionScoreFooter({
	className = "",
	questionPoints,
	points,
	onPointsChange,
	comment,
	allowComment,
	onCommentChange
}: {
	className?: string;
	questionPoints: number;
	points: number;
	onPointsChange: (points: number) => void;
	allowComment: boolean;
	comment?: string;
	onCommentChange: (comment?: string) => void;
}) {
	const error = (points < 0 || points > questionPoints) ? "Points must be between 0 and " + questionPoints : undefined;
	return (
		<div className={cn(
			"grid grid-cols-[auto_1fr] gap-2 p-2 place-items-baseline",
			className
		)}>
			<MyLabel>Given Points: </MyLabel>
			<div className="flex flex-col">
				<div className="flex items-center gap-2">
					<MyNumberInput
						min={0}
						placeholder='Enter points...'
						className="w-24"
						max={questionPoints}
						value={points}
						error={error}
						onAbort={() => onPointsChange(0)}
						onChange={(e) => onPointsChange(e.target.valueAsNumber)}
					/>
					<span className="text-sm text-gray-500">
						/ {questionPoints} points
					</span>
				</div>
				{error && (
					<div className="text-xs text-red-500 mt-1">
						{error}
					</div>
				)}
			</div>
			{allowComment && (
				<>
					<MyLabel>Comment: </MyLabel>
					<MyTextArea
						value={comment}
						onChange={(e) => {
							const value = e.target.value;
							if (value.trim() === "") {
								onCommentChange(undefined);
							}
							else {
								onCommentChange(value);
							}
						}}
						onAbort={() => onCommentChange(undefined)}
						placeholder="Enter your comment here..."
						className="flex-1"
					/>
				</>
			)}
		</div>
	);
}

export { QuestionFooter as QuestionPrimitivesFooter };
export { QuestionScoreFooter as QuestionPrimitivesScoreFooter };

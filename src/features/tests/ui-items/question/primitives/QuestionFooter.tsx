import { cn } from '../../../../../app/cn';
import { useLanguage } from '../../../../../LanguageProvider';
import MyLabel from '../../../ui/forms/MyLabel';
import MyNumberInput from '../../../ui/forms/MyNumberInput';
import MyTextArea from '../../../ui/forms/MyTextArea';
import { QuestionContext, ShowAnswerContext } from './contexts';

function QuestionFooter() {
	const { t } = useLanguage();

	const { show } = ShowAnswerContext.useShowAnswer();
	const { question } = QuestionContext.useQuestion();
	const answer = QuestionContext.useAnswer();
	if (show === false || answer == null) return null;
	return (
		<div className='flex flex-col gap-2'>
			<div className="text-sm font-semibold text-gray-800">
				{t("points_received")}: {answer.pointReceived != null
					? answer.pointReceived
					: <span className='italic'>{t("pending_review")}</span>
				} / {question.points}
			</div>
			{answer.comment != null && (
				<div className="text-sm text-gray-600">
					{t("comment_label")}: {answer.comment}
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
	const { t } = useLanguage();

	const error = (points < 0 || points > questionPoints) ? t("points_error") + questionPoints : undefined;
	return (
		<div className={cn(
			"grid grid-cols-[auto_1fr] gap-2 p-2 place-items-baseline",
			className
		)}>
			<MyLabel>{t("given_points")}: </MyLabel>
			<div className="flex flex-col">
				<div className="flex items-center gap-2">
					<MyNumberInput
						min={0}
						placeholder={t("points_placeholder")}
						className="w-24"
						max={questionPoints}
						value={points}
						error={error}
						onAbort={() => onPointsChange(0)}
						onChange={(e) => onPointsChange(e.target.valueAsNumber)}
					/>
					<span className="text-sm text-gray-500">
						/ {questionPoints} {t("points_suffix")}
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
					<MyLabel>{t("comment_label")}: </MyLabel>
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
						placeholder={t("comment_placeholder")}
						className="flex-1"
					/>
				</>
			)}
		</div>
	);
}

export { QuestionFooter as QuestionPrimitivesFooter };
export { QuestionScoreFooter as QuestionPrimitivesScoreFooter };

import { cn } from '../../../../../../app/cn';
import { useLanguage } from '../../../../../../LanguageProvider';
import { QuestionContext, ShowAnswerContext } from '../contexts';
import { BaseComponentProps } from '../types';
import { commonBoxClassNames } from './type';
import { TextAnswerAsConst } from './type';

export function AttemptAnswerText({
	className = "",
}: BaseComponentProps) {
	const { t } = useLanguage();

	const answerDetail = QuestionContext.useLongAnswerAnswerDetail();
	const answer = QuestionContext.useAnswer();
	const { question } = QuestionContext.useQuestion();
	const showResult = ShowAnswerContext.useShowAnswer().show;

	if (answerDetail == null || answer == null) return null;

	const pointReceived = answer.pointReceived;
	const points = question.points;

	let status = TextAnswerAsConst.PENDING_REVIEW;
	if (showResult) {
		if (pointReceived == null) {
			status = TextAnswerAsConst.PENDING_REVIEW;
		} else if (pointReceived >= points) {
			status = TextAnswerAsConst.CORRECT;
		} else if (pointReceived > 0) {
			status = TextAnswerAsConst.PARTIALLY_CORRECT;
		} else {
			status = TextAnswerAsConst.INCORRECT;
		}
	}

	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<div className={cn(commonBoxClassNames, "px-6 py-3")}>
				<h1 className='text-base mb-2'>{t("attempt_answer_text_title")}:</h1>
				{answerDetail.answer ? answerDetail.answer : t("attempt_answer_text_empty")}
			</div>
			{showResult && (
				<div className={cn(commonBoxClassNames, "font-semibold", status.color)}>
					{t(status.text)}
				</div>
			)}
		</div>
	);
}

import { DoQuestionContext, QuestionContext, ShowAnswerContext } from './contexts';
import MyButton from '../../../ui/buttons/MyButton';
import { LongAnswerDetail, LongAnswerDo } from './la-body';
import { MCQDetail, MCQDo } from './mcq-body';
import { BaseComponentProps } from './types';
import { cn } from '../../../../../app/cn';
import { useLanguage } from '../../../../../LanguageProvider';

function QuestionDetailBody({
	className = "",
}: BaseComponentProps) {
	const { question, hasCorrectAnswer } = QuestionContext.useQuestion();

	let detailComponent: React.ReactNode = null;
	if (question.type === "MCQ") {
		detailComponent = <MCQDetail />;
	}
	if (question.type === "LONG_ANSWER") {
		detailComponent = <LongAnswerDetail />;
	}
	return (
		<div className={cn('flex flex-col gap-4', className)}>
			{detailComponent}
			{hasCorrectAnswer && <ShowAnswerButton className="self-end" />}
		</div>
	);
}

function QuestionDoBody({
	className = "",
}: BaseComponentProps) {
	const { t } = useLanguage();

	const { question } = QuestionContext.useQuestion();
	const { setDoAnswer } = DoQuestionContext.useDoQuestionContext();
	let detailComponent: React.ReactNode = null;
	if (question.type === "MCQ") {
		detailComponent = <MCQDo />;
	}
	if (question.type === "LONG_ANSWER") {
		detailComponent = <LongAnswerDo />;
	}
	return (
		<div className={cn('flex flex-col gap-4', className)}>
			{detailComponent}

			<MyButton
				size={"small"}
				className="self-end"
				variant="secondary"
				onClick={() => setDoAnswer(undefined)}
			>
				{t("clear_answer")}
			</MyButton>
		</div>
	);
}


QuestionDetailBody.displayName = "QuestionBody";
QuestionDetailBody.ShowAnswerButton = ShowAnswerButton;

export { QuestionDetailBody as QuestionPrimitivesDetailBody };
export { QuestionDoBody as QuestionPrimitivesDoBody };

function ShowAnswerButton({
	className = "",
}: BaseComponentProps) {
	const { t } = useLanguage();

	const { show, setShow } = ShowAnswerContext.useShowAnswer();
	return (
		<MyButton
			size={"small"}
			className={cn(className)}
			variant={show ? "secondary" : "primary"}
			onClick={() => setShow(!show)}
		>
			{t(show ? "hide_answer" : "show_answer")}
		</MyButton>
	);
}
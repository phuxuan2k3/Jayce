import { DoQuestionContext, QuestionContext, ShowAnswerContext } from './contexts';
import MyButton from '../../../ui/buttons/MyButton';
import { LongAnswerDetail, LongAnswerDo } from './la-body';
import { MCQDetail, MCQDo } from './mcq-body';
import { BaseComponentProps } from './types';
import { cn } from '../../../../../app/cn';

function QuestionDetailBody({
	className = "",
}: BaseComponentProps) {
	const { show } = ShowAnswerContext.useShowAnswer();
	const { question, hasCorrectAnswer } = QuestionContext.useQuestion();
	const answer = QuestionContext.useAnswer();

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
			{show && answer && (
				<>
					<hr className="my-2 border-gray-300" />
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
				</>
			)}
		</div>
	);
}

function QuestionDoBody({
	className = "",
}: BaseComponentProps) {
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
				Clear Answer
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
	const { show, setShow } = ShowAnswerContext.useShowAnswer();
	return (
		<MyButton
			size={"small"}
			className={cn(className)}
			variant={show ? "secondary" : "primary"}
			onClick={() => setShow(!show)}
		>
			{show ? "Hide Answer" : "Show Answer"}
		</MyButton>
	);
}
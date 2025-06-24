import { QuestionContext, ShowAnswerContext } from '../contexts';
import { cn } from '../../../../../app/cn';
import MyButton from '../../../../ui/MyButton';
import { LongAnswerDetail } from './LongAnswerDetail';
import { MCQDetail } from './MCQDetail';

function QuestionDetail() {
	const { show, setShow } = ShowAnswerContext.useShowAnswer();
	const { question } = QuestionContext.useQuestion();
	const answer = QuestionContext.useAnswer();

	let detailComponent: React.ReactNode = null;
	if (question.type === "MCQ") {
		detailComponent = <MCQDetail />;
	}
	if (question.type === "LONG_ANSWER") {
		detailComponent = <LongAnswerDetail />;
	}
	return (
		<div className='p-4 flex flex-col gap-4'>
			<MyButton
				size={"small"}
				className={cn('self-end')}
				variant={show ? "secondary" : "primary"}
				onClick={() => setShow(!show)}
			>
				{show ? "Hide Answer" : "Show Answer"}
			</MyButton>
			{detailComponent}
			{show && answer && (
				<>
					<hr className="my-2 border-gray-300" />
					<div className="text-sm font-semibold text-gray-800">
						Poinst received: {answer.pointReceived != null ? answer.pointReceived : <span className='italic'>Pending...</span>} / {question.points}
					</div>
				</>
			)}
		</div>
	);
}

QuestionDetail.displayName = "QuestionDetail";
QuestionDetail.MCQDetail = MCQDetail;
QuestionDetail.LongAnswerDetail = LongAnswerDetail;

export { QuestionDetail as QuestionPrimitivesDetail };
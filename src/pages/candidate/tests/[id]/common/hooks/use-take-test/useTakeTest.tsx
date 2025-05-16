import { useMemo } from "react";
import { QuestionToDo } from "../../../../../../../features/tests/model/question.model";
import { AnswerCore } from "../../../../../../../features/tests/model/attempt.model";
import useCurrentQuestionIndex from "./useCurrentQuestionIndex";
import useFlagQuestions from "./useFlagQuestions";
import useSecondsLeft from "./useTimeLeft";
import { QuestionDoingState } from "../../type";

export default function useTakeTest({
	questionsToDo,
	questionsAnswers,
	startedAt,
	minutes,
}: {
	questionsToDo: Array<QuestionToDo>;
	questionsAnswers: Array<AnswerCore>;
	startedAt?: string | Date | null;
	minutes?: number | null;
}) {
	const {
		currentQuestionIndex,
		handleCurrentQuestionIndexChange,
		handleNextQuestion,
		handlePreviousQuestion,
	} = useCurrentQuestionIndex(questionsToDo.length);

	const {
		handleQuestionFlagToggled: handleFlagQuestionToggle,
		isQuestionFlagged,
	} = useFlagQuestions();

	const secondsLeft = useSecondsLeft({
		startedAt: startedAt ? new Date(startedAt) : new Date(),
		minutes: minutes || 0,
	});

	const questionAnswersMap = useMemo(() => {
		return new Map<number, AnswerCore>(
			questionsAnswers.map((answer) => [answer.questionId, answer])
		);
	}, [questionsAnswers]);

	const questionDoings: QuestionDoingState[] = useMemo(() => {
		return questionsToDo.map((question, index) => {
			return {
				questionId: question.id,
				isFlagged: isQuestionFlagged(question.id),
				isAnswered: questionAnswersMap.has(question.id),
				isCurrent: index === currentQuestionIndex,
			};
		});
	}, [
		questionsToDo,
		questionsAnswers,
		currentQuestionIndex,
		isQuestionFlagged,
	]);

	const currentQuestion = useMemo(() => {
		return {
			question: questionsToDo[currentQuestionIndex],
			state: questionDoings[currentQuestionIndex],
		}
	}, [
		questionsToDo,
		currentQuestionIndex,
		questionDoings,
	])

	return {
		secondsLeft,
		questionDoings,
		currentQuestionIndex,
		currentQuestion,
		handleCurrentQuestionIndexChange,
		handleNextQuestion,
		handlePreviousQuestion,
		handleFlagQuestionToggle,
	}
}


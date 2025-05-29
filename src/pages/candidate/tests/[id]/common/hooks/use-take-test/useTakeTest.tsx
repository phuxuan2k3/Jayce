import { useMemo } from "react";
import { QuestionToDo } from "../../../../../../../infra-test/core/question.model";
import { AnswerCore } from "../../../../../../../infra-test/core/attempt.model";
import useCurrentQuestionIndex from "./useCurrentQuestionIndex";
import useFlagQuestions from "./useFlagQuestions";
import { QuestionDoingState } from "../../type";
import useCurrentAttemptWithAnswers from "./useCurrentAttemptWithAnswers";
import useCurrentAttemptActions from "./useCurrentAttemptActions";

export default function useTakeTest({
	testId,
	questionsToDo,
	minutes,
	onNotFoundCurrentAttempt,
}: {
	testId: string;
	questionsToDo: Array<QuestionToDo>;
	minutes?: number | null;
	onNotFoundCurrentAttempt?: () => void;
}) {
	const { data: {
		currentAttempt,
		answers,
	}, isLoading } = useCurrentAttemptWithAnswers({
		testId,
		onNotFoundCurrentAttempt,
	});

	const startedAt = currentAttempt?.createdAt;
	const questionsAnswers = useMemo(() => {
		return answers.filter((answer) => {
			return questionsToDo.some((question) => question.id === answer.questionId);
		});
	}, [answers, questionsToDo]);

	const {
		handleAnswer,
		handleSubmit,
	} = useCurrentAttemptActions({
		attemptId: currentAttempt?.id,
	});

	const {
		currentQuestionIndex,
		handleCurrentQuestionIndexChange,
	} = useCurrentQuestionIndex(questionsToDo.length);

	const {
		handleQuestionFlagToggled: handleFlagQuestionToggle,
		isQuestionFlagged,
	} = useFlagQuestions();

	const secondsLeft = useMemo(() => {
		if (startedAt == null || minutes == null) {
			return 0;
		}
		const now = new Date();
		const startedAtDate = new Date(startedAt);
		const timeElapsed = Math.floor(
			(now.getTime() - startedAtDate.getTime()) / 1000 // Seconds
		);
		const totalTime = minutes * 60; // Convert minutes to seconds
		const remainingTime = totalTime - timeElapsed;
		return Math.max(remainingTime, 0);
	}, [startedAt, minutes]);

	const questionAnswersMap = useMemo(() => {
		return new Map<number, AnswerCore>(
			questionsAnswers.map((answer) => [answer.questionId, answer])
		);
	}, [questionsAnswers]);

	const questionDoings: QuestionDoingState[] = useMemo(() => {
		return questionsToDo.map((question, index): QuestionDoingState => {
			return {
				questionId: question.id,
				isFlagged: isQuestionFlagged(question.id),
				isCurrent: index === currentQuestionIndex,
				chosenOption: questionAnswersMap.get(question.id)?.chosenOption,
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
		isLoading,
		secondsLeft,
		questionDoings,
		currentQuestionIndex,
		currentQuestion,
		handleAnswer,
		handleSubmit,
		handleCurrentQuestionIndexChange,
		handleFlagQuestionToggle,
	}
}


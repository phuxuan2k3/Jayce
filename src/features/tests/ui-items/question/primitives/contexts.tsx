import { createContext, useCallback, useContext } from "react";
import { AnswerCoreSchema, AnswerForQuestionTypeSchema, QuestionCoreSchema } from "../../../api/test.api-gen-v2";

type QuestionCoreSchemaMinimal = Omit<QuestionCoreSchema, "id" | "testId" | "_aggregate_test">

export interface QuestionContextProps {
	question: QuestionCoreSchemaMinimal;
	withAnswer?: Pick<AnswerCoreSchema, "pointReceived" | "child" | "pointReceived">;
	index?: number;
}

const questionContext = createContext<QuestionContextProps | undefined>(undefined);

const useQuestion = () => {
	const context = useContext(questionContext);
	if (!context) {
		throw new Error("useQuestionContext must be used within a QuestionPrimitives");
	}
	return context;
}

const useMCQDetail = () => {
	const context = useQuestion();
	if (context.question.type !== "MCQ" || context.question.detail.type !== "MCQ") {
		throw new Error("useMCQQuestion must be used with a MCQ question");
	}
	const { question: { detail } } = context;
	return detail;
}

const useLongAnswerDetail = () => {
	const context = useQuestion();
	if (context.question.type !== "LONG_ANSWER" || context.question.detail.type !== "LONG_ANSWER") {
		throw new Error("useLongAnswerDetail must be used with a LONG_ANSWER question");
	}
	const { question: { detail } } = context;
	return detail;
}

const useAnswer = () => {
	const context = useQuestion();
	const { withAnswer } = context;
	if (withAnswer == null) {
		return undefined;
	}
	return withAnswer;
}

const useMCQAnswerDetail = () => {
	const context = useQuestion();
	const { withAnswer } = context;
	if (withAnswer == null) {
		return undefined;
	}
	if (withAnswer.child.type !== "MCQ") {
		throw new Error("useMCQAnswerDetail must be used with a MCQ answer");
	}
	return withAnswer.child;
}

const useLongAnswerAnswerDetail = () => {
	const context = useQuestion();
	const { withAnswer } = context;
	if (withAnswer == null) {
		return undefined;
	}
	if (withAnswer.child.type !== "LONG_ANSWER") {
		throw new Error("useLongAnswerAnswerDetail must be used with a LONG_ANSWER answer");
	}
	return withAnswer.child;
}

export const QuestionContext = {
	Provider: questionContext.Provider,
	useQuestion,
	useAnswer,
	useMCQDetail,
	useLongAnswerDetail,
	useMCQAnswerDetail,
	useLongAnswerAnswerDetail,
};


const showAnswerContext = createContext<{
	show: boolean;
	setShow: (show: boolean) => void;
} | undefined>(undefined);

const useShowAnswer = () => {
	const context = useContext(showAnswerContext);
	if (!context) {
		throw new Error("useShowAnswer must be used within a ShowAnswerProvider");
	}
	return context;
}

export const ShowAnswerContext = {
	Provider: showAnswerContext.Provider,
	useShowAnswer,
}

const doQuestionContext = createContext<{
	doAnswer: AnswerForQuestionTypeSchema | undefined;
	setDoAnswer: (answer: AnswerForQuestionTypeSchema | undefined) => void;
} | undefined>(undefined);

const useDoQuestionContext = () => {
	const context = useContext(doQuestionContext);
	if (!context) {
		throw new Error("useDoQuestionContext must be used within a DoQuestionProvider");
	}
	const getMCQChosenOption = useCallback(() => {
		if (context.doAnswer == null) {
			return undefined;
		}
		if (context.doAnswer.type !== "MCQ") {
			throw new Error("doAnswer is not a MCQ answer");
		}
		return context.doAnswer.chosenOption;
	}, [context.doAnswer]);

	const getLongAnswerAnswer = useCallback(() => {
		if (context.doAnswer == null) {
			return undefined;
		}
		if (context.doAnswer.type !== "LONG_ANSWER") {
			throw new Error("doAnswer is not a LONG_ANSWER answer");
		}
		return context.doAnswer.answer;
	}, [context.doAnswer]);

	return {
		...context,
		getMCQChosenOption,
		getLongAnswerAnswer,
	};
}

export const DoQuestionContext = {
	Provider: doQuestionContext.Provider,
	useDoQuestionContext,
};
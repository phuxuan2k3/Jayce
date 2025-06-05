import { AnswerCore } from "../../../../../../../infra-test/core/attempt.model";
import { QuestionCore } from "../../../../../../../infra-test/core/question.model";

export type QuestionAnswer = {
	question: QuestionCore;
	answer: Omit<AnswerCore, "questionId"> | null;
}
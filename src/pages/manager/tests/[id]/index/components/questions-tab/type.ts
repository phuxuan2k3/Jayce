import { QuestionCore, TestQuestionsAggregate } from "../../../../../../../infra-test/core/question.model";

export type QuestionsTabModel = {
	questionsWithAggregate: QuestionsWithAggregate[];
	totalAttempts: number;
};

export type QuestionsWithAggregate = {
	question: QuestionCore;
	aggregate: TestQuestionsAggregate;
};

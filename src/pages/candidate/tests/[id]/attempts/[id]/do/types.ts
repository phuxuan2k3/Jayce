import { TestFullSchema, QuestionCoreSchema, AttemptCoreSchema, AnswerCoreSchema, AnswerForQuestionTypeSchema } from '../../../../../../../infra-test/api/test.api-gen-v2';

export type TestDoServerData = {
	test: TestFullSchema;
	questions: QuestionCoreSchema[];
	attempt: AttemptCoreSchema;
	attemptAnswers: AnswerCoreSchema[];
};

export type QuestionDoState = {
	index: number;
	question: QuestionCoreSchema;
	isFlagged: boolean;
	isCurrent: boolean;
	answer: AnswerForQuestionTypeSchema | null;
};

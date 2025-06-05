import { AnswerCore, AttemptAggregate, AttemptCore } from "../../../../../../infra-test/core/attempt.model";
import { QuestionCore } from "../../../../../../infra-test/core/question.model";
import { ExamCore, TestAggregate } from "../../../../../../infra-test/core/test.model";
import { CandidateCore, ManagerCore } from "../../../../../../infra-test/core/user.model";

export type QuestionAnswer = {
	question: QuestionCore;
	answer: Omit<AnswerCore, "questionId"> | null;
}

// const exam: ExamCore = mockExams[0];
// const attempt: AttemptCore = mockAttempts[0];
// const attemptAggregate: AttemptAggregate = mockAttemptAggregate;
// const testAggregate = mockTestAggregateData;
// const candidate: CandidateCore = mockUsers[0];
// const manager: ManagerCore = mockUsers[1];

export type ManagerTestsAttemptPageModel = {
	exam: ExamCore;
	attempt: AttemptCore;
	attemptAggregate: AttemptAggregate;
	testAggregate: TestAggregate;
	candidate: CandidateCore;
	manager: ManagerCore;
	questionsAnswers: QuestionAnswer[];
}
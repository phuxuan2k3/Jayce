import { QuestionCore } from "../../../../../infra-test/core/question.model";
import { ExamCore } from "../../../../../infra-test/core/test.model";

export type EditTabs = "configuration" | "questions";

export type ManagerTestEditPageModel = {
	exam: ExamCore;
	questions: QuestionCore[];
}
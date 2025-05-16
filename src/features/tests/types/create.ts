import { QuestionCore } from "../model/question.model";
import { TemplateCore, TestCore, PracticeCore } from "../model/test.model";

export type TestCoreCreate = Omit<TestCore, "id" | 'authorId' | 'createdAt'>;
export type TestPracticeCoreCreate = Omit<PracticeCore, 'id' | 'authorId' | 'createdAt' | "feedback">;
export type QuestionCoreCreate = Omit<QuestionCore, 'id' | 'testId'>;
export type TemplateCoreCreate = Omit<TemplateCore, 'id'>;

export const EMPTY_TEST_PRACTICE_CORE_CREATE: TestPracticeCoreCreate = {
	title: '',
	description: '',
	minutesToAnswer: 30,
	difficulty: "Easy",
	language: 'English',
	mode: 'practice',
	numberOfQuestions: 10,
	numberOfOptions: 4,
	tags: [],
	outlines: [],
};

export const EMPTY_TEMPLATE_CORE_CREATE: TemplateCoreCreate = {
	name: '',
	title: '',
	description: '',
	numberOfQuestions: 10,
	difficulty: "Easy",
	numberOfOptions: 4,
	tags: [],
	outlines: [],
}
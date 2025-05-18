import { QuestionDo } from "./question.model";

export type TestCore = {
	id: string;
	authorId: string;
	title: string;
	description: string;
	minutesToAnswer: number;
	language: string;
	mode: string;
	createdAt: string;
};

export type TestCoreDo = TestCore & {
	questions: QuestionDo[];
};

export type TemplateCore = {
	id: string;
	name: string;
	title: string;
	description: string;
	language: string;
	minutesToAnswer: number;
	difficulty: string;
	tags: string[];
	numberOfQuestions: number;
	numberOfOptions: number;
	outlines: string[];
};

export type FeedbackCore = {
	rating: number;
	comment?: string;
	problems?: string[];
}

export type PracticeAddon = Omit<TemplateCore, "id" | "name" | "title" | "description"> & {
	feedback?: FeedbackCore;
};

export type ExamAddon = {
	roomId: string;
	hasPassword: boolean;
	numberOfAttemptsAllowed: number;
	isAnswerVisible: boolean;
	isAllowedToSeeOtherResults: boolean;
	openDate: string;
	closeDate: string;
};

export type FeedbackProblems = "inaccurate" | "un-related" | "poor content" | "incomplete" | "repeated" | "error" | "other";

export type PracticeCore = TestCore & PracticeAddon;

export type ExamCore = TestCore & ExamAddon;

export type TestAggregateCore = {
	numberOfQuestions: number;
	totalPoints: number;
}

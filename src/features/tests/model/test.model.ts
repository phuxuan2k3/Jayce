import { QuestionDo } from "./question.model";

export type TestCore = {
	id: number;
	author: {
		id: string;
		name: string;
		avatar?: string;
	};
	title: string;
	description: string;
	minutesToAnswer: number;
	language: string;
	mode: "practice" | "exam";
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
	difficulty: string;
	tags: string[];
	numberOfQuestions: number;
	numberOfOptions: number;
	outlines: string[];
};

export type ExamConfig = {
	roomId: string;
	password?: string;
	numberOfAttemptsAllowed: number;
	isAnswerVisible: boolean;
	isAllowedToSeeOthersResults: boolean;
	openDate: string;
	closeDate: string;
};

export type TestPractice = TestCore & Omit<TemplateCore, "id" | "name" | "title" | "description"> & {
	feedback: {
		rating: number;
		comment?: string;
		problems?: ("inaccurate" | "un-related" | "poor content" | "incomplete" | "repeated" | "error" | "other")[];
	};
};

export type TestExam = TestCore & ExamConfig;

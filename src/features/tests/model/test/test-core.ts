import { QuestionDo } from "../question.model";

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

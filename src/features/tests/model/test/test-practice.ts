import { TestCore } from "./test-core";

export type TestPractice = TestCore & Omit<PromptTemplate, "id" | "name" | "title" | "description"> & {
	feedback: {
		rating: number;
		comment?: string;
		problems?: "inaccurate" | "un-related" | "poor content" | "incomplete" | "repeated" | "error" | "other";
	};
};

export type PromptTemplate = {
	id: number;
	name: string;
	title: string;
	description: string;
	difficulty: number;
	tags: string[];
	numberOfQuestions: number;
	numberOfOptions: number;
	outlines: string[];
};

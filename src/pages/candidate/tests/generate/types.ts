export type PracticeGenerationData = {
	title: string;
	description: string;
	minutesToAnswer: number;
	language: string;
	difficulty: PracticeDifficulty;
	tags: string[];
	outlines: string[];
	numberOfQuestions: number;
	numberOfOptions: number;
};

export type TemplateCreateData = {
	name: string;
	title: string;
	description: string;
	language: string;
	minutesToAnswer: number;
	difficulty: PracticeDifficulty;
	tags: string[];
	outlines: string[];
	numberOfQuestions: number;
	numberOfOptions: number;
}

export const EMPTY_PRACTICE_GENERATION: PracticeGenerationData = {
	title: '',
	description: '',
	minutesToAnswer: 0,
	language: 'English',
	difficulty: "easy",
	tags: [],
	outlines: [],
	numberOfQuestions: 0,
	numberOfOptions: 0,
};

export type PracticeGenerationLoadingState = "generating" | "saving" | "none";
export type PracticeDifficulty = "easy" | "medium" | "hard";
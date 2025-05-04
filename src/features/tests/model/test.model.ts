export type TestCore = {
	id: number;
	authorId: string;
	title: string;
	description: string;
	minutesToAnswer: number;
	createdAt: string;
} & {
	mode: "practice";
	template: TestTemplateCard;
} | {
	mode: "exam";
	config: ExamConfig;
};

export type TestTemplateCard = {
	id: number;
	difficulty: number;
	tags: string[];
	numberOfQuestions: number;
	numberOfOptions: number;
	extraContexts: string[];
};

export type ExamConfig = {
	roomId: string;
	password?: string;
	allowBackwardsNavigation: boolean;
	answerVisibility: boolean;
	openDate: string;
	closeDate: string;
	numberOfAttemptsAllowed: number;
};


export type AttemptCore = {
	id: number;
	candidateId: string;
	testId: number;
	hasEnded: boolean;
	secondsSpent: number;
	score: number;
	createdAt: string;
	updatedAt: string;
};

export type AnswerCore = {
	questionId: number;
	chosenOption: number;
};
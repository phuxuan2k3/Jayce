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

export type Answer = {
	questionId: number;
	chosenOption: number;
};
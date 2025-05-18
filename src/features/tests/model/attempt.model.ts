export type AttemptCore = {
	id: string;
	candidateId: string;
	testId: string;
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

export type AttemptAggregateCore = {
	answered: number;
	answeredCorrect: number;
};

export type AttemptsOfTestAggregateCore = {
	totalParticipants: number;
	totalAttempts: number;
	averageScore: number;
	highestScore: number;
	lowestScore: number;
	averageTime: number;
};

export type AttemptsOfCandidateInTestAggregateCore = {
	totalAttempts: number;
	averageScore: number;
	highestScore: number;
	lowestScore: number;
	averageTime: number;
	rank: number;
	candidateId: string;
};


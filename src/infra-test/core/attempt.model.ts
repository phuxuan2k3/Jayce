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

export type AttemptAggregate = {
	answered: number;
	answeredCorrect: number;
};

export type AttemptsOfTestAggregate = {
	totalParticipants: number;
	totalAttempts: number;
	averageScore: number;
	highestScore: number;
	lowestScore: number;
	averageTime: number;
};

export type AttemptsOfCandidateInTestAggregate = {
	totalAttempts: number;
	averageScore: number;
	highestScore: number;
	lowestScore: number;
	averageTime: number;
	rank: number;
	candidateId: string;
};

export const EMPTY_ATTEMPT_AGGREGATE: AttemptsOfTestAggregate = {
	totalParticipants: 0,
	totalAttempts: 0,
	averageScore: 0,
	highestScore: 0,
	lowestScore: 0,
	averageTime: 0,
};
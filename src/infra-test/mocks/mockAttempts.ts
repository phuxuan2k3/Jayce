import { AttemptAggregate, AttemptCore, AttemptsOfTestAggregate } from "../core/attempt.model";

export const mockAttempts: AttemptCore[] = [
	{
		id: "attempt_001",
		candidateId: "candidate_001",
		testId: "test_001",
		hasEnded: true,
		secondsSpent: 3600, // 60 minutes
		score: 85.5,
		createdAt: "2025-05-25T10:00:00Z",
		updatedAt: "2025-05-25T11:00:00Z"
	},
	{
		id: "attempt_002",
		candidateId: "candidate_002",
		testId: "test_002",
		hasEnded: true,
		secondsSpent: 4200, // 70 minutes
		score: 92.0,
		createdAt: "2025-05-26T14:30:00Z",
		updatedAt: "2025-05-26T15:40:00Z"
	},
	{
		id: "attempt_003",
		candidateId: "candidate_003",
		testId: "test_001",
		hasEnded: false,
		secondsSpent: 1800, // 30 minutes (ongoing)
		score: 0,
		createdAt: "2025-05-27T09:15:00Z",
		updatedAt: "2025-05-27T09:45:00Z"
	},
	{
		id: "attempt_004",
		candidateId: "candidate_001",
		testId: "test_003",
		hasEnded: true,
		secondsSpent: 5400, // 90 minutes
		score: 78.3,
		createdAt: "2025-05-28T16:00:00Z",
		updatedAt: "2025-05-28T17:30:00Z"
	},
	{
		id: "attempt_005",
		candidateId: "candidate_004",
		testId: "test_002",
		hasEnded: true,
		secondsSpent: 2700, // 45 minutes
		score: 96.7,
		createdAt: "2025-05-29T11:20:00Z",
		updatedAt: "2025-05-29T12:05:00Z"
	}
];

export const mockAttemptAggregate: AttemptAggregate = {
	answered: 3,
	answeredCorrect: 2
}

export const mockAnswers = [
	{
		questionId: 1,
		chosenOption: 2
	},
	{
		questionId: 2,
		chosenOption: 1
	},
	{
		questionId: 3,
		chosenOption: 3
	}
];
export const mockAttemptOfTestAggregateData: AttemptsOfTestAggregate = {
	totalParticipants: 150,
	totalAttempts: 165,
	averageScore: 72.5,
	highestScore: 98.0,
	lowestScore: 35.5,
	averageTime: 5400, // 90 minutes in seconds
};

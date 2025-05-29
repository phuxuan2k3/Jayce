import { AttemptCore, AttemptsOfCandidateInTestAggregate } from "../core/attempt.model";

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


export const mockAttetmptsOfCandidateInTestAggregate: AttemptsOfCandidateInTestAggregate[] = [
	{
		candidateId: "candidate_001",
		totalAttempts: 3,
		averageScore: 82.1,
		highestScore: 90.5,
		lowestScore: 75.0,
		averageTime: 4200, // 70 minutes
		rank: 2
	},
	{
		candidateId: "candidate_002",
		totalAttempts: 2,
		averageScore: 88.5,
		highestScore: 92.0,
		lowestScore: 85.0,
		averageTime: 3900, // 65 minutes
		rank: 1
	},
	{
		candidateId: "candidate_003",
		totalAttempts: 1,
		averageScore: 76.8,
		highestScore: 76.8,
		lowestScore: 76.8,
		averageTime: 5100, // 85 minutes
		rank: 4
	},
	{
		candidateId: "candidate_004",
		totalAttempts: 4,
		averageScore: 79.3,
		highestScore: 96.7,
		lowestScore: 58.2,
		averageTime: 4500, // 75 minutes
		rank: 3
	},
	{
		candidateId: "candidate_005",
		totalAttempts: 2,
		averageScore: 71.5,
		highestScore: 84.0,
		lowestScore: 59.0,
		averageTime: 5400, // 90 minutes
		rank: 5
	}
]
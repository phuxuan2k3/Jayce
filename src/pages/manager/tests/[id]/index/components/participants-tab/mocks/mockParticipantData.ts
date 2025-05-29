import { Role } from "../../../../../../../../features/auth/types/auth";
import { AttemptCore, AttemptsOfCandidateInTestAggregate } from "../../../../../../../../infra-test/core/attempt.model";
import { UserCore } from "../../../../../../../../infra-test/core/user.model";

// Sample user data with good performance
export const mockHighPerformerUser: UserCore = {
	id: "user_high_001",
	username: "sarah_johnson",
	email: "sarah.johnson@example.com",
	role: Role.Candidate, // Candidate role
	fullname: "Sarah Johnson",
	avatarPath: "/avatar/1.png",
	metadata: {
		fullname: "Sarah Johnson",
		avatarPath: "/avatar/1.png",
		country: "United States",
		education: "Computer Science, MIT",
		birthday: "1995/06/15"
	}
};

export const mockHighPerformerAggregate: AttemptsOfCandidateInTestAggregate = {
	candidateId: "user_high_001",
	rank: 2,
	totalAttempts: 4,
	averageScore: 85.5,
	highestScore: 94.0,
	lowestScore: 72.0,
	averageTime: 4680 // 78 minutes
};

export const mockHighPerformerAttempts: AttemptCore[] = [
	{
		id: "attempt_high_001",
		candidateId: "user_high_001",
		testId: "test_001",
		hasEnded: true,
		secondsSpent: 4320, // 72 minutes
		score: 72.0,
		createdAt: "2025-05-20T09:30:00Z",
		updatedAt: "2025-05-20T10:42:00Z"
	},
	{
		id: "attempt_high_002",
		candidateId: "user_high_001",
		testId: "test_001",
		hasEnded: true,
		secondsSpent: 4680, // 78 minutes
		score: 85.0,
		createdAt: "2025-05-22T14:15:00Z",
		updatedAt: "2025-05-22T15:33:00Z"
	},
	{
		id: "attempt_high_003",
		candidateId: "user_high_001",
		testId: "test_001",
		hasEnded: true,
		secondsSpent: 4980, // 83 minutes
		score: 89.0,
		createdAt: "2025-05-25T10:00:00Z",
		updatedAt: "2025-05-25T11:23:00Z"
	},
	{
		id: "attempt_high_004",
		candidateId: "user_high_001",
		testId: "test_001",
		hasEnded: true,
		secondsSpent: 4740, // 79 minutes
		score: 94.0,
		createdAt: "2025-05-27T16:30:00Z",
		updatedAt: "2025-05-27T17:49:00Z"
	}
];

// Sample user data with moderate performance
export const mockMidPerformerUser: UserCore = {
	id: "user_mid_001",
	username: "alex_chen",
	email: "alex.chen@example.com",
	role: Role.Candidate,
	fullname: "Alex Chen",
	avatarPath: "",
	metadata: {
		fullname: "Alex Chen",
		country: "Canada",
		education: "Software Engineering, University of Toronto",
		birthday: "1993/03/22"
	}
};

export const mockMidPerformerAggregate: AttemptsOfCandidateInTestAggregate = {
	candidateId: "user_mid_001",
	rank: 4,
	totalAttempts: 3,
	averageScore: 67.3,
	highestScore: 75.0,
	lowestScore: 58.0,
	averageTime: 5100 // 85 minutes
};

export const mockMidPerformerAttempts: AttemptCore[] = [
	{
		id: "attempt_mid_001",
		candidateId: "user_mid_001",
		testId: "test_001",
		hasEnded: true,
		secondsSpent: 5400, // 90 minutes
		score: 58.0,
		createdAt: "2025-05-21T11:00:00Z",
		updatedAt: "2025-05-21T12:30:00Z"
	},
	{
		id: "attempt_mid_002",
		candidateId: "user_mid_001",
		testId: "test_001",
		hasEnded: true,
		secondsSpent: 4980, // 83 minutes
		score: 69.0,
		createdAt: "2025-05-24T09:45:00Z",
		updatedAt: "2025-05-24T11:08:00Z"
	},
	{
		id: "attempt_mid_003",
		candidateId: "user_mid_001",
		testId: "test_001",
		hasEnded: true,
		secondsSpent: 4920, // 82 minutes
		score: 75.0,
		createdAt: "2025-05-28T13:20:00Z",
		updatedAt: "2025-05-28T14:42:00Z"
	}
];

// Sample user with no avatar and single attempt
export const mockNewUser: UserCore = {
	id: "user_new_001",
	username: "emma_wilson",
	email: "emma.wilson@example.com",
	role: Role.Candidate,
	fullname: "Emma Wilson",
	avatarPath: "",
	metadata: {
		fullname: "Emma Wilson",
		country: "United Kingdom",
		education: "Computer Science, Oxford University",
		birthday: "1996/02/14"
	}
};

export const mockNewUserAggregate: AttemptsOfCandidateInTestAggregate = {
	candidateId: "user_new_001",
	rank: 7,
	totalAttempts: 1,
	averageScore: 82.0,
	highestScore: 82.0,
	lowestScore: 82.0,
	averageTime: 4500 // 75 minutes
};

export const mockNewUserAttempts: AttemptCore[] = [
	{
		id: "attempt_new_001",
		candidateId: "user_new_001",
		testId: "test_001",
		hasEnded: true,
		secondsSpent: 4500, // 75 minutes
		score: 82.0,
		createdAt: "2025-05-29T10:00:00Z",
		updatedAt: "2025-05-29T11:15:00Z"
	}
];

// Sample user with ongoing attempt
export const mockActiveUser: UserCore = {
	id: "user_active_001",
	username: "david_kim",
	email: "david.kim@example.com",
	role: Role.Candidate,
	fullname: "David Kim",
	avatarPath: "/avatar/default.png",
	metadata: {
		fullname: "David Kim",
		avatarPath: "/avatar/default.png",
		country: "South Korea",
		education: "Computer Engineering, KAIST",
		birthday: "1994/08/30"
	}
};

export const mockActiveUserAggregate: AttemptsOfCandidateInTestAggregate = {
	candidateId: "user_active_001",
	rank: 3,
	totalAttempts: 3,
	averageScore: 79.0,
	highestScore: 86.0,
	lowestScore: 70.0,
	averageTime: 4800 // 80 minutes
};

export const mockActiveUserAttempts: AttemptCore[] = [
	{
		id: "attempt_active_001",
		candidateId: "user_active_001",
		testId: "test_001",
		hasEnded: true,
		secondsSpent: 4920, // 82 minutes
		score: 70.0,
		createdAt: "2025-05-20T14:00:00Z",
		updatedAt: "2025-05-20T15:22:00Z"
	},
	{
		id: "attempt_active_002",
		candidateId: "user_active_001",
		testId: "test_001",
		hasEnded: true,
		secondsSpent: 4680, // 78 minutes
		score: 86.0,
		createdAt: "2025-05-25T16:30:00Z",
		updatedAt: "2025-05-25T17:48:00Z"
	},
	{
		id: "attempt_active_003",
		candidateId: "user_active_001",
		testId: "test_001",
		hasEnded: false, // In progress
		secondsSpent: 3600, // 60 minutes so far
		score: 0, // Not completed yet
		createdAt: "2025-05-29T09:00:00Z",
		updatedAt: "2025-05-29T10:00:00Z"
	}
];

// Export convenient test data sets
export const mockParticipantDataSets = {
	highPerformer: {
		user: mockHighPerformerUser,
		userAttemptsAggregate: mockHighPerformerAggregate,
		userAttempts: mockHighPerformerAttempts
	},
	midPerformer: {
		user: mockMidPerformerUser,
		userAttemptsAggregate: mockMidPerformerAggregate,
		userAttempts: mockMidPerformerAttempts
	},
	newUser: {
		user: mockNewUser,
		userAttemptsAggregate: mockNewUserAggregate,
		userAttempts: mockNewUserAttempts
	},
	activeUser: {
		user: mockActiveUser,
		userAttemptsAggregate: mockActiveUserAggregate,
		userAttempts: mockActiveUserAttempts
	}
};

// Default export for quick testing
export default mockParticipantDataSets.highPerformer;

import { Role } from "../../../../../features/auth/types/auth";
import { AttemptCandidate } from "./types/attempt-candidate";

export const mockAttemptCandidates: AttemptCandidate[] = [
	{
		candidate: {
			id: "1",
			fullname: "John Doe",
			email: "john.doe@example.com",
			avatarPath: "https://yoshino.com.vn/wp-content/uploads/2025/01/IMG_3594.jpg",
			username: "johndoe",
			metadata: {},
			role: Role.Candidate,
		},
		attempt: {
			id: "attempt1",
			testId: "test1",
			candidateId: "1",
			score: 85,
			secondsSpent: 3600,
			hasEnded: true,
			createdAt: new Date("2023-10-01T10:00:00Z").toISOString(),
			updatedAt: new Date("2023-10-01T12:00:00Z").toISOString(),
		},
	},
	{
		candidate: {
			id: "2",
			fullname: "Jane Smith",
			email: "jane.smith@example.com",
			avatarPath: "https://example.com/avatar2.jpg",
			username: "janesmith",
			metadata: {},
			role: Role.Candidate,
		},
		attempt: {
			id: "attempt2",
			testId: "test1",
			candidateId: "2",
			score: 72,
			secondsSpent: 2850,
			hasEnded: true,
			createdAt: new Date("2023-10-02T09:30:00Z").toISOString(),
			updatedAt: new Date("2023-10-02T11:15:00Z").toISOString(),
		},
	},
	{
		candidate: {
			id: "3",
			fullname: "Alex Johnson",
			email: "alex.johnson@example.com",
			avatarPath: "https://example.com/avatar3.jpg",
			username: "alexj",
			metadata: {},
			role: Role.Candidate,
		},
		attempt: {
			id: "attempt3",
			testId: "test1",
			candidateId: "3",
			score: 91,
			secondsSpent: 3200,
			hasEnded: true,
			createdAt: new Date("2023-10-03T14:00:00Z").toISOString(),
			updatedAt: new Date("2023-10-03T15:45:00Z").toISOString(),
		},
	},
	{
		candidate: {
			id: "4",
			fullname: "Sarah Williams",
			email: "sarah.w@example.com",
			avatarPath: "https://example.com/avatar4.jpg",
			username: "sarahw",
			metadata: {},
			role: Role.Candidate,
		},
		attempt: {
			id: "attempt4",
			testId: "test1",
			candidateId: "4",
			score: 68,
			secondsSpent: 4100,
			hasEnded: true,
			createdAt: new Date("2023-10-04T11:20:00Z").toISOString(),
			updatedAt: new Date("2023-10-04T13:30:00Z").toISOString(),
		},
	}
];
import { TestCoreSchema, TestFullSchema } from "../../api/test.api-gen-v2";

export const MockTestCore: TestCoreSchema[] = [
	{
		id: "test-1",
		authorId: "author-1",
		title: "JavaScript Basics",
		description: "A test covering basic JavaScript concepts.",
		minutesToAnswer: 30,
		language: "en",
		createdAt: "2025-06-01T10:00:00Z",
		updatedAt: "2025-06-10T12:00:00Z",
		mode: "EXAM"
	},
	{
		id: "test-2",
		authorId: "author-2",
		title: "React Fundamentals",
		description: "Test on React core principles and hooks.",
		minutesToAnswer: 45,
		language: "en",
		createdAt: "2025-05-15T09:30:00Z",
		updatedAt: "2025-06-05T11:00:00Z",
		mode: "PRACTICE"
	},
	{
		id: "test-3",
		authorId: "author-3",
		title: "TypeScript Advanced",
		description: "Advanced TypeScript types and generics.",
		minutesToAnswer: 60,
		language: "en",
		createdAt: "2025-04-20T08:00:00Z",
		updatedAt: "2025-06-15T14:00:00Z",
		mode: "EXAM"
	}
];

export const MockTestFull: TestFullSchema[] = [
	{
		id: "test-1",
		authorId: "author-1",
		title: "JavaScript Basics",
		description: "A test covering basic JavaScript concepts.",
		minutesToAnswer: 30,
		language: "en",
		createdAt: "2025-06-01T10:00:00Z",
		updatedAt: "2025-06-10T12:00:00Z",
		mode: "EXAM",
		_aggregate: {
			numberOfQuestions: 10,
			totalPoints: 100,
			totalCandidates: 50,
			totalAttempts: 60,
			averageScore: 75,
			highestScore: 100,
			lowestScore: 40,
			averageTime: 1500
		},
		_detail: {
			mode: "EXAM",
			roomId: "room-1",
			hasPassword: false,
			isAnswerVisible: false,
			isAllowedToSeeOtherResults: false,
			openDate: "2025-06-01T10:00:00Z",
			closeDate: "2025-06-10T12:00:00Z",
			participants: ["candidate-1", "candidate-2"],
			isPublic: true
		}
	},
	{
		id: "test-2",
		authorId: "author-2",
		title: "React Fundamentals",
		description: "Test on React core principles and hooks.",
		minutesToAnswer: 45,
		language: "en",
		createdAt: "2025-05-15T09:30:00Z",
		updatedAt: "2025-06-05T11:00:00Z",
		mode: "PRACTICE",
		_aggregate: {
			numberOfQuestions: 12,
			totalPoints: 120,
			totalCandidates: 30,
			totalAttempts: 35,
			averageScore: 80,
			highestScore: 120,
			lowestScore: 60,
			averageTime: 2000
		},
		_detail: {
			mode: "PRACTICE",
			difficulty: "Intermediate",
			tags: ["react", "hooks", "components"],
			numberOfQuestions: 12,
			numberOfOptions: 4,
			outlines: ["JSX", "useState", "useEffect"]
		}
	},
	{
		id: "test-3",
		authorId: "author-3",
		title: "TypeScript Advanced",
		description: "Advanced TypeScript types and generics.",
		minutesToAnswer: 60,
		language: "en",
		createdAt: "2025-04-20T08:00:00Z",
		updatedAt: "2025-06-15T14:00:00Z",
		mode: "EXAM",
		_aggregate: {
			numberOfQuestions: 15,
			totalPoints: 150,
			totalCandidates: 20,
			totalAttempts: 22,
			averageScore: 90,
			highestScore: 150,
			lowestScore: 70,
			averageTime: 2500
		},
		_detail: {
			mode: "EXAM",
			roomId: "room-3",
			hasPassword: true,
			password: "ts2025",
			isAnswerVisible: false,
			isAllowedToSeeOtherResults: true,
			openDate: "2025-04-20T08:00:00Z",
			closeDate: "2025-06-15T14:00:00Z",
			participants: ["candidate-3", "candidate-4"],
			isPublic: false
		}
	}
];
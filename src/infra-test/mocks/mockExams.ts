import { ExamCore } from "../core/test.model";

export const mockExams: ExamCore[] = [
	{
		// TestCore properties
		id: "exam-001",
		authorId: "user-123",
		title: "JavaScript Fundamentals Exam",
		description: "Test your knowledge of JavaScript basics including variables, functions, and control flow",
		minutesToAnswer: 60,
		language: "English",
		mode: "online",
		createdAt: "2025-05-20T10:00:00Z",

		// ExamAddon properties
		roomId: "room-js-001",
		hasPassword: true,
		numberOfAttemptsAllowed: 2,
		isAnswerVisible: false,
		isAllowedToSeeOtherResults: false,
		openDate: "2025-05-26T09:00:00Z",
		closeDate: "2025-05-26T23:59:59Z"
	},
	{
		id: "exam-002",
		authorId: "user-456",
		title: "React Advanced Concepts",
		description: "Advanced React topics including hooks, context API, and performance optimization",
		minutesToAnswer: 90,
		language: "English",
		mode: "hybrid",
		createdAt: "2025-05-15T14:30:00Z",

		roomId: "room-react-002",
		hasPassword: false,
		numberOfAttemptsAllowed: 1,
		isAnswerVisible: true,
		isAllowedToSeeOtherResults: true,
		openDate: "2025-06-01T10:00:00Z",
		closeDate: "2025-06-02T10:00:00Z"
	},
	{
		id: "exam-003",
		authorId: "user-789",
		title: "Python Data Structures",
		description: "Comprehensive exam on Python data structures including lists, dictionaries, and sets",
		minutesToAnswer: 75,
		language: "English",
		mode: "online",
		createdAt: "2025-05-18T09:15:00Z",

		roomId: "room-py-003",
		hasPassword: true,
		numberOfAttemptsAllowed: 3,
		isAnswerVisible: false,
		isAllowedToSeeOtherResults: false,
		openDate: "2025-05-28T08:00:00Z",
		closeDate: "2025-05-29T20:00:00Z"
	},
	{
		id: "exam-004",
		authorId: "user-234",
		title: "SQL Database Design",
		description: "Test your knowledge of SQL database design principles and query optimization",
		minutesToAnswer: 120,
		language: "English",
		mode: "proctored",
		createdAt: "2025-05-22T11:45:00Z",

		roomId: "room-sql-004",
		hasPassword: true,
		numberOfAttemptsAllowed: 1,
		isAnswerVisible: false,
		isAllowedToSeeOtherResults: false,
		openDate: "2025-06-05T13:00:00Z",
		closeDate: "2025-06-05T15:00:00Z"
	},
	{
		id: "exam-005",
		authorId: "user-567",
		title: "TypeScript Advanced Types",
		description: "Advanced TypeScript concepts including generics, utility types, and type inference",
		minutesToAnswer: 90,
		language: "English",
		mode: "online",
		createdAt: "2025-05-23T16:20:00Z",

		roomId: "room-ts-005",
		hasPassword: false,
		numberOfAttemptsAllowed: 2,
		isAnswerVisible: true,
		isAllowedToSeeOtherResults: true,
		openDate: "2025-06-10T09:00:00Z",
		closeDate: "2025-06-11T09:00:00Z"
	}
];
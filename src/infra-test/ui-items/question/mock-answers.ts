import { AnswerCoreSchema } from "../../api/test.api-gen-v2";

export const MockAnswers: AnswerCoreSchema[] = [
	{
		id: "1",
		attemptId: "attempt-001",
		questionId: 1,
		pointReceived: 5,
		createdAt: "2025-06-23T10:00:00Z",
		updatedAt: "2025-06-23T10:00:00Z",
		child: {
			type: "MCQ",
			chosenOption: 2 // Paris
		}
	},
	{
		id: "2",
		attemptId: "attempt-002",
		questionId: 2,
		pointReceived: 3,
		createdAt: "2025-06-23T10:05:00Z",
		updatedAt: "2025-06-23T10:05:00Z",
		child: {
			type: "MCQ",
			chosenOption: 1 // 4
		}
	},
	{
		id: "3",
		attemptId: "attempt-003",
		questionId: 3,
		pointReceived: 8,
		createdAt: "2025-06-23T10:10:00Z",
		updatedAt: "2025-06-23T10:10:00Z",
		child: {
			type: "LONG_ANSWER",
			answer: "Polymorphism allows objects to be treated as instances of their parent class rather than their actual class."
		}
	}
];
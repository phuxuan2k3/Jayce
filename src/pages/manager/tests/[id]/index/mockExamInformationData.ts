import { ExamCore, TestAggregateCore } from "../../../../../infra-test/core/test.model";
import { AttemptsOfTestAggregate } from "../../../../../infra-test/core/attempt.model";

export const mockExamData: ExamCore = {
	id: "exam001",
	authorId: "author_xyz",
	title: "Comprehensive Web Development Exam",
	description: "An in-depth examination of full-stack web development principles, covering HTML, CSS, JavaScript, Node.js, and databases.",
	minutesToAnswer: 120,
	language: "Multiple Languages",
	mode: "exam",
	createdAt: "2025-04-15T09:30:00Z",
	roomId: "WEB_DEV_EXAM_ROOM_101",
	hasPassword: true,
	numberOfAttemptsAllowed: 1,
	isAnswerVisible: false,
	isAllowedToSeeOtherResults: false,
	openDate: "2025-06-01T00:00:00Z",
	closeDate: "2025-06-07T23:59:59Z",
};

export const mockTestAggregateData: TestAggregateCore = {
	numberOfQuestions: 50,
	totalPoints: 100,
};

export const mockAttemptOfTestAggregateData: AttemptsOfTestAggregate = {
	totalParticipants: 150,
	totalAttempts: 165,
	averageScore: 72.5,
	highestScore: 98.0,
	lowestScore: 35.5,
	averageTime: 5400, // 90 minutes in seconds
};

export const mockFullExamInformation = {
	exam: mockExamData,
	testAggregate: mockTestAggregateData,
	attemptOfTestAggregate: mockAttemptOfTestAggregateData,
};

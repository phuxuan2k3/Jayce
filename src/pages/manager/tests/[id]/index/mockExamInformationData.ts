import { ExamCore } from "../../../../../infra-test/core/test.model";
import { mockTestAggregateData } from "../../../../../infra-test/mocks/mockTests";
import { mockAttemptOfTestAggregateData } from "../../../../../infra-test/mocks/mockAttempts";

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

export const mockFullExamInformation = {
	exam: mockExamData,
	testAggregate: mockTestAggregateData,
	attemptOfTestAggregate: mockAttemptOfTestAggregateData,
};

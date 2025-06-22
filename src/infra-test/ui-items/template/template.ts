import { TemplateCoreSchema } from "../../../infra-test/api/test.api-gen-v2";

export const MockTemplateCoreSchemaItems: TemplateCoreSchema[] = [
	{
		id: "1",
		userId: "user-1",
		name: "Frontend Basics",
		title: "Frontend Developer Basics",
		description: "A template for basic frontend developer questions.",
		language: "en",
		minutesToAnswer: 30,
		difficulty: "easy",
		tags: ["frontend", "html", "css", "javascript"],
		numberOfQuestions: 10,
		numberOfOptions: 4,
		outlines: ["HTML", "CSS", "JavaScript"],
		createdAt: "2025-06-01T10:00:00Z",
		updatedAt: "2025-06-10T12:00:00Z"
	},
	{
		id: "2",
		userId: "user-2",
		name: "Backend Intermediate",
		title: "Intermediate Backend Developer",
		description: "Covers intermediate backend concepts and practices.",
		language: "en",
		minutesToAnswer: 45,
		difficulty: "medium",
		tags: ["backend", "nodejs", "api"],
		numberOfQuestions: 15,
		numberOfOptions: 5,
		outlines: ["Node.js", "APIs", "Databases"],
		createdAt: "2025-05-15T09:30:00Z",
		updatedAt: "2025-06-12T14:00:00Z"
	},
	{
		id: "3",
		userId: "user-3",
		name: "Fullstack Advanced",
		title: "Advanced Fullstack Developer",
		description: "Advanced topics for fullstack development.",
		language: "en",
		minutesToAnswer: 60,
		difficulty: "hard",
		tags: ["fullstack", "architecture", "cloud"],
		numberOfQuestions: 20,
		numberOfOptions: 6,
		outlines: ["Architecture", "Cloud", "DevOps"],
		createdAt: "2025-04-20T08:00:00Z",
		updatedAt: "2025-06-15T16:00:00Z"
	}
];
import { PromptTemplate, TestCore, TestCoreDo, TestPractice } from "../model/test.model";

export const mockTestCoreDos: TestCoreDo[] = [
	{
		id: 1,
		author: {
			id: "author123",
			name: "Jane Smith",
			avatar: "https://example.com/avatar/janesmith.png"
		},
		title: "JavaScript Fundamentals",
		description: "Test your knowledge of JavaScript basics including variables, functions, and objects.",
		minutesToAnswer: 30,
		language: "JavaScript",
		mode: "practice",
		createdAt: "2023-05-15T10:30:00Z",
		questions: [
			{
				id: 101,
				testId: 1,
				text: "What is the output of console.log(typeof null)?",
				options: ["null", "undefined", "object", "number"],
				points: 5,
				isFlagged: false,
				chosenOption: undefined
			},
			{
				id: 102,
				testId: 1,
				text: "Which method is used to add elements to the end of an array?",
				options: ["push()", "unshift()", "append()", "concat()"],
				points: 5,
				isFlagged: false
			}
		]
	},
	{
		id: 2,
		author: {
			id: "author456",
			name: "John Doe",
			avatar: "https://example.com/avatar/johndoe.png"
		},
		title: "Python Basics",
		description: "Evaluate your Python programming skills with questions on syntax, data structures and more.",
		minutesToAnswer: 45,
		language: "Python",
		mode: "exam",
		createdAt: "2023-06-20T14:15:00Z",
		questions: [
			{
				id: 201,
				testId: 2,
				text: "What is the output of print(type([]))?",
				options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"],
				points: 10,
				isFlagged: false,
				chosenOption: undefined
			},
			{
				id: 202,
				testId: 2,
				text: "Which of the following is used to define a function in Python?",
				options: ["function", "def", "fun", "define"],
				points: 10,
				isFlagged: true,
				chosenOption: 2
			}
		]
	}
];


export const mockTestCores: TestCore[] = [
	{
		id: 3,
		author: {
			id: "author789",
			name: "Alex Johnson",
			avatar: "https://example.com/avatar/alex.png"
		},
		title: "React Fundamentals",
		description: "Test your knowledge of React components, hooks, and state management.",
		minutesToAnswer: 40,
		language: "JavaScript",
		mode: "practice",
		createdAt: "2023-07-10T09:30:00Z"
	},
	{
		id: 4,
		author: {
			id: "author101",
			name: "Sarah Williams"
		},
		title: "SQL Mastery",
		description: "Advanced SQL queries, database optimization, and best practices.",
		minutesToAnswer: 60,
		language: "SQL",
		mode: "exam",
		createdAt: "2023-08-05T16:45:00Z"
	}
];

export const promptTemplates: PromptTemplate[] = [
	{
		id: 1,
		name: "React Basics",
		title: "React Fundamentals Test",
		description: "Basic concepts of React including components, hooks, and state management",
		difficulty: 2,
		tags: ["React", "Frontend", "JavaScript"],
		numberOfQuestions: 10,
		numberOfOptions: 4,
		outlines: ["Components", "Hooks", "Props", "State", "Context"]
	},
	{
		id: 2,
		name: "TypeScript Advanced",
		title: "TypeScript Advanced Concepts",
		description: "Advanced TypeScript features including generics, utility types, and type inference",
		difficulty: 3,
		tags: ["TypeScript", "Frontend", "Programming"],
		numberOfQuestions: 15,
		numberOfOptions: 4,
		outlines: ["Generics", "Utility Types", "Type Inference", "Type Guards", "Decorators"]
	}
];

export const userGeneratedTests: TestPractice[] = [
	{
		id: 101,
		author: {
			id: "user-1",
			name: "Current User",
		},
		title: "My JavaScript Test",
		description: "Custom JavaScript test generated from prompt",
		minutesToAnswer: 30,
		language: "en",
		mode: "practice",
		createdAt: "2025-04-25T12:00:00Z",
		difficulty: 2,
		tags: ["JavaScript", "Frontend"],
		numberOfQuestions: 10,
		numberOfOptions: 4,
		outlines: ["ES6 Features", "Async/Await", "Closures"],
		feedback: {
			rating: 4,
		}
	}
];
import { GetGenerateExamQuestionsApiResponse } from "./exam-generation.api";

export const mockGetGenerateExamQuestionsApiResponse: GetGenerateExamQuestionsApiResponse = {
	questions: [
		{
			text: "What is the primary purpose of React hooks?",
			options: [
				"To manage state and side effects in functional components",
				"To replace class components entirely",
				"To improve performance of React applications",
				"To handle routing in React applications"
			],
			points: 5,
			correctOption: 0
		},
		{
			text: "Which of the following is the correct way to define a TypeScript interface?",
			options: [
				"type UserInterface = { name: string; age: number; }",
				"interface User { name: string; age: number; }",
				"class User { name: string; age: number; }",
				"const User = { name: string; age: number; }"
			],
			points: 3,
			correctOption: 1
		},
		{
			text: "What does the 'useState' hook return?",
			options: [
				"A single state value",
				"An array with the state value and a setter function",
				"An object with state and setState properties",
				"A function to update the state"
			],
			points: 4,
			correctOption: 1
		},
		{
			text: "Which HTTP status code indicates a successful request?",
			options: [
				"404",
				"500",
				"200",
				"301"
			],
			points: 2,
			correctOption: 2
		},
		{
			text: "What is the main advantage of using TypeScript over JavaScript?",
			options: [
				"Better runtime performance",
				"Static type checking and improved developer experience",
				"Smaller bundle sizes",
				"Native browser support"
			],
			points: 4,
			correctOption: 1
		},
		{
			text: "In React, what is the purpose of the 'key' prop when rendering lists?",
			options: [
				"To style list items differently",
				"To help React identify which items have changed, added, or removed",
				"To set unique IDs for accessibility",
				"To enable sorting functionality"
			],
			points: 4,
			correctOption: 1
		},
		{
			text: "What is the difference between 'let' and 'const' in JavaScript?",
			options: [
				"'let' is block-scoped, 'const' is function-scoped",
				"'let' can be reassigned, 'const' cannot be reassigned",
				"'let' is for strings, 'const' is for numbers",
				"There is no difference between them"
			],
			points: 3,
			correctOption: 1
		},
		{
			text: "Which of the following best describes the Virtual DOM?",
			options: [
				"A direct representation of the browser's DOM",
				"A lightweight JavaScript representation of the real DOM",
				"A database for storing component state",
				"A CSS framework for styling components"
			],
			points: 5,
			correctOption: 1
		},
		{
			text: "What is the correct way to handle asynchronous operations in JavaScript?",
			options: [
				"Using only callbacks",
				"Using Promises and async/await",
				"Using synchronous functions only",
				"Using setTimeout for all async operations"
			],
			points: 4,
			correctOption: 1
		},
		{
			text: "In CSS, which property is used to control the space between elements?",
			options: [
				"padding",
				"margin",
				"border",
				"spacing"
			],
			points: 2,
			correctOption: 1
		}
	]
};
import { QuestionCore } from "../model/question.model";

const questions: QuestionCore[] = [
	{
		id: 1,
		testId: "web-dev-basics",
		text: "What does HTML stand for?",
		options: [
			"Hyper Text Markup Language",
			"High Tech Modern Language",
			"Hyperlink Text Management Language",
			"Home Tool Markup Language"
		],
		points: 10,
		correctOption: 0
	},
	{
		id: 2,
		testId: "web-dev-basics",
		text: "Which CSS property is used to change the text color of an element?",
		options: [
			"font-color",
			"text-color",
			"color",
			"text-style"
		],
		points: 5,
		correctOption: 2
	},
	{
		id: 3,
		testId: "javascript-fundamentals",
		text: "Which of the following is not a JavaScript data type?",
		options: [
			"String",
			"Boolean",
			"Float",
			"Object"
		],
		points: 15,
		correctOption: 2
	},
	{
		id: 4,
		testId: "javascript-fundamentals",
		text: "What is the correct way to create a function in JavaScript?",
		options: [
			"function = myFunction() {}",
			"function myFunction() {}",
			"function:myFunction() {}",
			"create myFunction() {}"
		],
		points: 10,
		correctOption: 1
	},
	{
		id: 5,
		testId: "react-basics",
		text: "What hook should be used for side effects in React components?",
		options: [
			"useState",
			"useEffect",
			"useContext",
			"useReducer"
		],
		points: 20,
		correctOption: 1
	},
	{
		id: 6,
		testId: "react-basics",
		text: "In React, which of the following is used to pass data to a component from outside?",
		options: [
			"setState",
			"render with arguments",
			"props",
			"PropTypes"
		],
		points: 15,
		correctOption: 2
	},
	{
		id: 7,
		testId: "typescript-skills",
		text: "Which of the following is a correct interface declaration in TypeScript?",
		options: [
			"interface Person { name: string; age: number; }",
			"Person interface = { name: string, age: number }",
			"interface Person = { name is string, age is number }",
			"type Person interface { name: string, age: number }"
		],
		points: 25,
		correctOption: 0
	},
	{
		id: 8,
		testId: "typescript-skills",
		text: "What is the TypeScript operator for optional chaining?",
		options: [
			"?=",
			"??",
			"!.",
			"?."
		],
		points: 20,
		correctOption: 3
	},
	{
		id: 9,
		testId: "css-advanced",
		text: "Which CSS layout mode is designed for complex applications with bi-directional layout requirements?",
		options: [
			"Grid",
			"Flexbox",
			"Box Model",
			"Float"
		],
		points: 30,
		correctOption: 0
	},
	{
		id: 10,
		testId: "css-advanced",
		text: "Which CSS pseudo-class selects an element when the user is hovering over it?",
		options: [
			":active",
			":focus",
			":hover",
			":visited"
		],
		points: 15,
		correctOption: 2
	}
];

export default questions;
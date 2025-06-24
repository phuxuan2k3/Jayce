import { QuestionCoreSchema } from "../../api/test.api-gen-v2";

export const MockQuestionCore: QuestionCoreSchema[] = [
	{
		id: 1,
		testId: "test-001",
		text: "What is the capital of France?",
		points: 5,
		type: "MCQ",
		detail: {
			type: "MCQ",
			options: ["Berlin BerlinBerlinBerlinB erlinBerlinBerlinBerlinB erlinB erlinBerlinBe rlinBerlinBerl inBerlin Ber linBerlinBerli nBerlinBe r li nBe rlinBerlin BerlinBerl inBerlinBe rlinBerlinBerlinBerlin BerlinBerlinBerli nBerlinB erlinBerlin", "Madrid", "Paris", "Rome"],
			correctOption: 2
		},
		_aggregate_test: {
			numberOfAnswers: 10,
			numberOfCorrectAnswers: 7,
			averageScore: 4.2
		}
	},
	{
		id: 2,
		testId: "test-001",
		text: "Select the correct output of 2 + 2:",
		points: 3,
		type: "MCQ",
		detail: {
			type: "MCQ",
			options: ["3", "4", "5", "22"],
			correctOption: 1
		},
		_aggregate_test: {
			numberOfAnswers: 15,
			numberOfCorrectAnswers: 12,
			averageScore: 2.8
		}
	},
	{
		id: 3,
		testId: "test-002",
		text: "Explain the concept of polymorphism in OOP.",
		points: 10,
		type: "LONG_ANSWER",
		detail: {
			type: "LONG_ANSWER",
			imageLinks: ["https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"],
			extraText: "Provide examples in any language.",
			correctAnswer: "Polymorphism allows methods to do different things based on the object it is acting upon, typically through method overriding or interfaces."
		},
		_aggregate_test: {
			numberOfAnswers: 5,
			numberOfCorrectAnswers: 0,
			averageScore: 7.5
		}
	},
	{
		id: 4,
		testId: "test-003",
		text: "What is the time complexity of binary search?",
		points: 4,
		type: "MCQ",
		detail: {
			type: "MCQ",
			options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
			correctOption: 1
		},
		_aggregate_test: {
			numberOfAnswers: 20,
			numberOfCorrectAnswers: 18,
			averageScore: 3.8
		}
	},
	{
		id: 5,
		testId: "test-004",
		text: "Describe the process of normalization in databases. Why is it important? Provide an example. And what are the different normal forms? How do they differ? Specifically, what is the third normal form? Specifically, what is the Boyce-Codd normal form? How does it differ from the third normal form? Can you provide an example of a table that is in Boyce-Codd normal form but not in third normal form? Can you provide an example of a table that is in third normal form but not in Boyce-Codd normal form?",
		points: 6,
		type: "LONG_ANSWER",
		detail: {
			type: "LONG_ANSWER",
			imageLinks: [],
			correctAnswer: "Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves dividing a database into tables and defining relationships between them."
		},
		_aggregate_test: {
			numberOfAnswers: 8,
			numberOfCorrectAnswers: 3,
			averageScore: 5.0
		}
	}
];
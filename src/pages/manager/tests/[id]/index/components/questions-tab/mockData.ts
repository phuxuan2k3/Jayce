import { QuestionAggregate, QuestionCore } from "../../../../../../../infra-test/core/question.model";

const mockQuestions: QuestionCore[] = [
	{
		id: 1,
		correctOption: 0,
		options: [
			'React is a JavaScript library for building user interfaces.',
			'React is a programming language.',
			'React is a database management system.',
			'React is a CSS framework.'
		],
		points: 5,
		testId: 'test-123',
		text: 'What is React?',
	},
	{
		id: 2,
		correctOption: 1,
		options: [
			'JavaScript',
			'Python',
			'Java',
			'C++'
		],
		points: 3,
		testId: 'test-123',
		text: 'Which programming language is primarily used for web development?',
	},
	{
		id: 3,
		correctOption: 2,
		options: [
			'HTML',
			'CSS',
			'JavaScript',
			'PHP'
		],
		points: 4,
		testId: 'test-123',
		text: 'Which language is used for styling web pages?',
	},
];

const mockQuestionAggregate: QuestionAggregate[] = [
	{
		questionId: 1,
		numberOfAnswers: 10,
		numberOfCorrectAnswers: 8,
		averagePoints: 4.5,
	},
	{
		questionId: 2,
		numberOfAnswers: 5,
		numberOfCorrectAnswers: 2,
		averagePoints: 0,
	},
	{
		questionId: 3,
		numberOfAnswers: 15,
		numberOfCorrectAnswers: 10,
		averagePoints: 2.5,
	},
]

export { mockQuestions, mockQuestionAggregate };
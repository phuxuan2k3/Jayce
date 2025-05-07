import { QuestionCore, QuestionHideAnswer } from "../../../../../../../features/tests/model/question.model";
import { TestCore } from "../../../../../../../features/tests/model/test/test-core";


// Mock test data
export const fetchTest = (testId: number): Promise<TestCore> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: testId,
				author: {
					id: 'user-123',
					name: 'Current User',
					avatar: '/avatar/default.png'
				},
				title: 'Generated Test',
				description: 'This is an auto-generated test based on your input',
				minutesToAnswer: 30,
				language: 'English',
				mode: 'practice',
				createdAt: new Date().toISOString()
			});
		}, 300); // Reduced timeout for better UX
	});
};

// Mock questions data
export const fetchQuestions = (testId: number): Promise<QuestionHideAnswer[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					testId,
					text: 'What is React?',
					options: [
						'A JavaScript library for building user interfaces',
						'A programming language',
						'A backend framework',
						'A database management system'
					],
					points: 10,
				},
				{
					id: 2,
					testId,
					text: 'What is Redux used for?',
					options: [
						'Server-side rendering',
						'State management',
						'Routing',
						'Form validation'
					],
					points: 15,
				},
				{
					id: 3,
					testId,
					text: 'Which hook is used for side effects in React?',
					options: [
						'useState',
						'useEffect',
						'useContext',
						'useReducer'
					],
					points: 10,
				}
			]);
		}, 2000);
	});
};

// Mock question with answer data
export const fetchQuestionWithAnswer = (questionId: number): Promise<QuestionCore> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			// This is just a mock example - in a real app, you'd fetch the full question with correctOption
			const questions: Record<number, QuestionCore> = {
				1: {
					id: 1,
					testId: 1,
					text: 'What is React?',
					options: [
						'A JavaScript library for building user interfaces',
						'A programming language',
						'A backend framework',
						'A database management system'
					],
					correctOption: 0,
					points: 10
				},
				2: {
					id: 2,
					testId: 1,
					text: 'What is Redux used for?',
					options: [
						'Server-side rendering',
						'State management',
						'Routing',
						'Form validation'
					],
					correctOption: 1,
					points: 15
				},
				3: {
					id: 3,
					testId: 1,
					text: 'Which hook is used for side effects in React?',
					options: [
						'useState',
						'useEffect',
						'useContext',
						'useReducer'
					],
					correctOption: 1,
					points: 10
				}
			};

			resolve(questions[questionId]);
		}, 1000);
	});
};
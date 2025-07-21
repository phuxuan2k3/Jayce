import { setupWorker } from 'msw/browser';
import { mockSuggestQuestions } from './mock/mock.suggest_questions';
import { mockPostTest } from './mock/mock.post-test';
import { HttpHandler } from 'msw';

const handlers: HttpHandler[] = [
	mockSuggestQuestions,
	mockPostTest,
];


export const browserWorker = setupWorker(...handlers)

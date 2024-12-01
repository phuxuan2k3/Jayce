export const paths = {
	REGISTER: '/register',
	LOGIN: '/login',
	HOME: '/',
	TEST: {
		ROOT: '/test',

		// Candidate

		DO: '/test/:testId/do',
		do(testId: string): string {
			return `/test/${testId}/do`;
		},

		LIST: '/test/list',

		ATTEMPTS: '/test/:testId/attempts',
		attempts(testId: string): string {
			return `/test/${testId}/attempts`;
		},

		VIEWANSWER: '/test/viewanswer',

		EVALUATE: '/test/:testId/evaluate/:attemptId',
		evaluate(testId: string, attemptId: string): string {
			return `/test/${testId}/evaluate/${attemptId}`;
		},

		SCHEDULE: '/test/schedule',

		// Business Manager
		SUBMISSION: {
			ROOT: '/test/submission',

			LIST: '/test/submission/list',
			DETAIL: '/test/submission/detail',
		}
	},
}
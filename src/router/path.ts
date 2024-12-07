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

		VIEWANSWER: '/test/:testId/viewanswer/:attemptId',
		viewAnswer(testId: string, attemptId: string): string {
			return `/test/${testId}/viewanswer/${attemptId}`;
		},

		EVALUATE: '/test/:testId/evaluate',
		evaluate(testId: string): string {
			return `/test/${testId}/evaluate`;
		},

		SCHEDULE: '/test/schedule',

		// Business Manager
		SUBMISSION: {
			ROOT: '/test/submission',

			LIST: '/test/submission/list',
			DETAIL: '/test/submission/detail',
		},
		EDIT: {
			ROOT:'/test/edit',
			DETAIL: '/test/edit/detail',
			QUESTION: '/test/edit/question',
		},
		CREATENEWTEST:'/test/createnew',
	},
	CREATETEST: '/createtest',
	TESTLISTVIEW: '/testlistview',
}
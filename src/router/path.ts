export const paths = {
	REGISTER: '/register',
	LOGIN: '/login',
	TEST: {
		ROOT: '/test',

		// Candidate
		DO: '/test/do',
		LIST: '/test/list',
		ATTEMPTS: '/test/:testId/attempts',
		VIEWANSWER: '/test/viewanswer',
		EVALUATE: '/test/evaluate',
		SCHEDULE: '/test/schedule',

		// Business Manager
		SUBMISSION: {
			ROOT: '/test/submission',

			LIST: '/test/submission/list',
			DETAIL: '/test/submission/detail',
		}
	},
}
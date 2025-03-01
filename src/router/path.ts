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
			CREATETEST: '/test/createtest',
			TESTLISTVIEW: '/test/testlistview',
		},
		SCENARIO: {
			ROOT: '/scenario',

			LIST: '/scenario/list',

			CREATE: {
				ROOT:'/scenario/create',
				DETAIL: '/scenario/create/detail',
				QUESTION: '/scenario/create/question',
			},

			EDIT: {
				ROOT:'/scenario/edit',
				DETAIL: '/scenario/edit/detail',
				QUESTION: '/scenario/edit/question',
			},

			SUBMISSION: {
				ROOT: '/scenario/submission',
				DETAIL: '/scenario/submission/detail',
			},
		},
		INTERVIEWPRACTICE:{
			ROOT:'/ipractice',
			PICK:'/ipractice/pick',
			CHOOSE:'/ipractice/choose',
			DETAIL:'/ipractice/detail',
			ANSWER: '/ipractice/answer',
			REVIEW: '/ipractice/review',
		},
		PROFILE: {
			ROOT: '/profile',
		},
		PRICING: {
			ROOT: '/pricing',
		}
	}
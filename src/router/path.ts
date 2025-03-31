export const paths = {
	REGISTER: '/register',
	BREGISTER: '/bregister',
	LOGIN: '/login',
	SUGGESTION: '/suggestion',
	ROLE: '/role',
	CHOOSEROLE: '/chooserole',
	COMPANY: '/company',
	RESET: '/reset',
	NEWPASS: '/resetpassword',
	HOME: '/',

	SCENARIO: {
		ROOT: '/scenario',

		LIST: '/scenario/list',

		CREATE: {
			ROOT: '/scenario/create',
			DETAIL: '/scenario/create/detail',
			QUESTION: '/scenario/create/question',
		},

		EDIT: {
			ROOT: '/scenario/edit',
			DETAIL: '/scenario/edit/detail',
			QUESTION: '/scenario/edit/question',
		},

		SUBMISSION: {
			ROOT: '/scenario/submission',
			DETAIL: '/scenario/submission/detail',
		},
	},
	INTERVIEWPRACTICE: {
		ROOT: '/ipractice',
		PICK: '/ipractice/pick',
		CHOOSE: '/ipractice/choose',
		DETAIL: '/ipractice/detail',
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
const paths2 = {
	ROOT: '/',
	ABOUT: '/about',
	PRICING: '/pricing',
	auth: {
		ROOT: '/auth',
		LOGIN: '/auth/login',
		REGISTER: '/auth/register',
		RESET: '/auth/reset',
		NEWPASS: '/auth/newpass',
		SUGGESTION: '/auth/suggestion',
		ROLE: '/auth/role',
		COMPANY: '/auth/company',
	},
	candidate: {
		ROOT: '/candidate/',
		tests: {
			ROOT: '/candidate/tests/',
			in(id: number | string = ":testId") {
				return {
					_layout: `/candidate/tests/${id}/`,
					ATTEMPTS: `/candidate/tests/${id}/attempts/`,
					DO: `/candidate/tests/${id}/do/`,
					ASSESSMENT: `/candidate/tests/${id}/assessment/`,
					RECOMMENDATION: `/candidate/tests/${id}/recommendation/`,
				}
			},
			attempts: {
				// ROOT: '/candidate/attempts', // todo: add this page
				in(id: number | string = ":attemptId") {
					return {
						ROOT: `/candidate/attempts/${id}/`,
					}
				}
			}
		},
	},
	manager: {
		ROOT: '/manager',
	},
}

export default paths2;
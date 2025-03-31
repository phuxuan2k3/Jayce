const paths2 = {
	ROOT: '/',
	ABOUT: '/about',
	PRICING: '/pricing',
	auth: {
		ROOT: '/auth',
		LOGIN: '/auth/login',
		REGISTER: '/auth/register',
		B_REGISTER: '/auth/b-register',
		RESET: '/auth/reset',
		NEWPASS: '/auth/newpass',
		SUGGESTION: '/auth/suggestion',
		ROLE: '/auth/role',
		COMPANY: '/auth/company',
		CHOOSE_ROLE: '/auth/choose-role',
	},
	candidate: {
		ROOT: '/candidate/',
		tests: {
			ROOT: '/candidate/tests/',
			in(id: number | string = ":testId") {
				return {
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
		tests: {
			ROOT: '/manager/tests/',
			SELF: '/manager/tests/self/',
			in(id: number | string = ":testId") {
				return {
					submissions: {
						ROOT: `/manager/tests/${id}/submissions/`,
						in(id: number | string = ":submissionId") {
							return {
								ROOT: `/manager/tests/${id}/submissions/${id}/`,
							}
						}
					},
					edit: {
						DETAIL: `/manager/tests/${id}/edit/detail/`,
						QUESTION: `/manager/tests/${id}/edit/question/`,
					},
					create: {
						DETAIL: `/manager/tests/${id}/create/detail/`,
						QUESTION: `/manager/tests/${id}/create/question/`,
					},
				}
			},
		},
	},
}

export default paths2;
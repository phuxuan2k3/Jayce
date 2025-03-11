const paths2 = {
	ROOT: '/',
	ABOUT: '/about',
	PRICING: '/pricing',
	auth: {
		ROOT: '/auth',
		LOGIN: '/auth/login',
		REGISTER: '/auth/register',
	},
	candidate: {
		ROOT: '/candidate',
		tests: {
			ROOT: '/candidate/tests',
			in(id: number | string = ":testId") {
				return {
					ATTEMPTS: `/candidate/tests/${id}/attempts`,
					DO: `/candidate/tests/${id}/do`,
				}
			},
			attempts: {
				ROOT: '/candidate/attempts',
				in(id: string = ":attemptId") {
					return {
						ROOT: `/candidate/attempts/${id}`,
						EVALUATION: `/candidate/attempts/${id}/evaluation`,
						RECOMMENDATION: `/candidate/attempts/${id}/recommendation`,
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
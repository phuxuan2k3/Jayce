const paths = {
	_layout: '/',
	ABOUT: '/about',
	PRICING: '/pricing',
	auth: {
		_layout: '/auth',
		LOGIN: '/auth/login',
		RESET_PASSWORD: '/auth/reset-password',
		NEW_PASSWORD: '/auth/new-password',
		CHOOSE_ROLE: '/auth/choose-role',
		REGISTER: '/auth/register',
		BUSINESS_REGISTER: '/auth/business-register',
		PROVIDE_SUGGESTION: '/auth/provide-suggestion',
		PROVIDE_POSITION: '/auth/provide-position',
		PROVIDE_COMPANIES: '/auth/provide-companies',
	},
	candidate: {
		_layout: '/candidate/',
		tests: {
			_layout: '/candidate/tests/',
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
						_layout: `/candidate/attempts/${id}/`,
					}
				}
			}
		},
		scenarios: {
			_layout: '/candidate/scenarios/',
			PICK: '/candidate/scenarios/pick/',
			CHOOSE: '/candidate/scenarios/choose/',
			in(id: number | string = ":scenarioId") {
				return {
					_layout: `/candidate/scenarios/${id}/`,
					ANSWER: `/candidate/scenarios/${id}/answer/`,
					REVIEW: `/candidate/scenarios/${id}/review/`,
				}
			},
		},
		profile: {
			_layout: '/manager/profile/',
			PRICING: '/manager/profile/pricing/',
		},
	},
	manager: {
		_layout: '/manager',
		tests: {
			_layout: '/manager/tests/',
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
				}
			},
			create: {
				DETAIL: `/manager/tests/create/detail/`,
				QUESTION: `/manager/tests/create/question/`,
			},
		},
		scenario: {
			_layout: '/manager/scenarios/',
			in(id: number | string = ":scenarioId") {
				return {
					_layout: `/manager/scenarios/${id}/`,
					edit: {
						DETAIL: `/manager/scenarios/${id}/edit/detail/`,
						QUESTION: `/manager/scenarios/${id}/edit/question/`,
					},

				}
			},
			submissions: {
				in(id: number | string = ":submissionId") {
					return {
						_layout: `/manager/scenarios/submissions/${id}/`,
					}
				}
			},
			create: {
				DETAIL: `/manager/scenarios/create/detail/`,
				QUESTION: `/manager/scenarios/create/question/`,
			}
		},
		profile: {
			_layout: '/manager/profile/',
			PRICING: '/manager/profile/pricing/',
		}
	},
}

export default paths;
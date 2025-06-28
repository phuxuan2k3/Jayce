const paths = {
	_layout: "/",
	ABOUT: "/about",
	PRICING: "/pricing",
	auth: {
		_layout: "/auth",
		LOGIN: "/auth/login",
		RESET_PASSWORD: "/auth/reset-password",
		NEW_PASSWORD: "/auth/new-password",
		CHOOSE_ROLE: "/auth/choose-role",
		REGISTER: "/auth/register",
		BUSINESS_REGISTER: "/auth/business-register",
		PROVIDE_SUGGESTION: "/auth/provide-suggestion",
		PROVIDE_POSITION: "/auth/provide-position",
		PROVIDE_COMPANIES: "/auth/provide-companies",
	},
	candidate: {
		ROOT: "/candidate/",
		tests: {
			ROOT: "/candidate/tests/",
			in: (testId: number | string = ":testId") => ({
				ROOT: `/candidate/tests/${testId}/`,
				PRACTICE: `/candidate/tests/${testId}/practice/`,
				EXAM: `/candidate/tests/${testId}/exam/`,
				attempts: {
					in: (attemptId: number | string = ":attemptId") => ({
						ROOT: `/candidate/tests/${testId}/attempts/${attemptId}/`,
						DO: `/candidate/tests/${testId}/attempts/${attemptId}/do/`,
					}),
				}
			}),
			TEMPLATES: `/candidate/tests/templates/`,
			GENERATE: `/candidate/tests/generate/`,
			JOIN: `/candidate/tests/join/`,
		},
		interview: {
			_layout: "/candidate/interviews",
			LIVE: "/candidate/interviews/live/",
			SETUP: "/candidate/interviews",
			RESULT: "/candidate/interviews/result",
		},
		profile: {
			_layout: "/candidate/profile/",
			PRICING: "/candidate/profile/pricing/",
		},
	},
	manager: {
		ROOT: "/manager",
		tests: {
			ROOT: "/manager/tests/",
			in: (testId: number | string = ":testId") => ({
				ROOT: `/manager/tests/${testId}/`,
				EDIT: `/manager/tests/${testId}/edit/`,
				attempts: {
					in: (attemptId: number | string = ":attemptId") => ({
						ROOT: `/manager/tests/${testId}/attempts/${attemptId}/`,
					}),
				},
			}),
			NEW: `/manager/tests/new/`,
		},
		profile: {
			_layout: "/manager/profile/",
			PRICING: "/manager/profile/pricing/",
		},
	},
};

export default paths;

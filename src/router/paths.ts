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
			in(id: number | string = ":testId") {
				return {
					ROOT: `/candidate/tests/${id}/`,
					PRACTICE: `/candidate/tests/${id}/practice/`,
					EXAM: `/candidate/tests/${id}/exam/`,
					attempts: {
						in: (id: number | string = ":attemptId") => ({
							ROOT: `/candidate/tests/${id}/attempts/${id}/`,
							DO: `/candidate/tests/${id}/attempts/${id}/do/`,
						}),
					}
				};
			},
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
			in(id: number | string = ":testId") {
				return {
					ROOT: `/manager/tests/${id}/`,
					EDIT: `/manager/tests/${id}/edit/`,
					attempts: {
						in(id: number | string = ":attemptId") {
							return {
								ROOT: `/manager/tests/attempts/${id}/`,
							};
						},
					},
				};
			},
			NEW: `/manager/tests/new/`,
		},
		profile: {
			_layout: "/manager/profile/",
			PRICING: "/manager/profile/pricing/",
		},
	},
};

export default paths;

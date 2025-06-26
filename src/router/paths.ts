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
		_layout: "/candidate/",
		tests: {
			ROOT: "/candidate/tests/",
			in(id: number | string = ":testId") {
				return {
					_layout: `/candidate/tests/${id}/`,
					PRACTICE: `/candidate/tests/${id}/practice/`,
					TAKE_PRACTICE: `/candidate/tests/${id}/take-practice/`,
					EXAM: `/candidate/tests/${id}/exam/`,
					TAKE_EXAM: `/candidate/tests/${id}/exam/take-exam/`,
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
		scenarios: {
			_layout: "/candidate/scenarios/",
			in(id: number | string = ":scenarioId") {
				return {
					_layout: `/candidate/scenarios/${id}/`,
					ANSWER: `/candidate/scenarios/${id}/answer/`,
					REVIEW: `/candidate/scenarios/${id}/review/`,
				};
			},
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
			SETTINGS: "/candidate/profile/settings",
		},
	},
	manager: {
		_layout: "/manager",
		tests: {
			ROOT: "/manager/tests/",
			in(id: number | string = ":testId") {
				return {
					ROOT: `/manager/tests/${id}/`,
					EDIT: `/manager/tests/${id}/edit/`,
				};
			},
			attempts: {
				in(id: number | string = ":attemptId") {
					return {
						ROOT: `/manager/tests/attempts/${id}/`,
					};
				},
			},
			NEW: `/manager/tests/new/`,
		},
		scenario: {
			_layout: "/manager/scenarios/",
			in(id: number | string = ":scenarioId") {
				return {
					_layout: `/manager/scenarios/${id}/`,
					SUBMISSIONS: `/manager/scenarios/${id}/submissions/`,
					EDIT_DETAIL: `/manager/scenarios/${id}/edit-detail/`,
					EDIT_QUESTIONS: `/manager/scenarios/${id}/edit-questions/`,
				};
			},
			submissions: {
				in(id: number | string = ":submissionId") {
					return {
						_layout: `/manager/scenarios/submissions/${id}/`,
					};
				},
			},
			CREATE_DETAIL: `/manager/scenarios/create-detail/`,
			CREATE_QUESTIONS: `/manager/scenarios/create-questions/`,
		},
		profile: {
			_layout: "/manager/profile/",
			PRICING: "/manager/profile/pricing/",
			SETTINGS: "/manager/profile/settings",
		},
	},
};

export default paths;

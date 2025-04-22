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
			_layout: "/candidate/tests/",
			in(id: number | string = ":testId") {
				return {
					_layout: `/candidate/tests/${id}/`,
					ATTEMPTS: `/candidate/tests/${id}/attempts/`,
					DO: `/candidate/tests/${id}/do/`,
					ASSESSMENT: `/candidate/tests/${id}/assessment/`,
					RECOMMENDATION: `/candidate/tests/${id}/recommendation/`,
				};
			},
			attempts: {
				// TODO: add this page: '/candidate/attempts',
				in(id: number | string = ":attemptId") {
					return {
						_layout: `/candidate/tests/attempts/${id}/`,
					};
				},
			},
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
			_layout: "/candidate/interviews/",
			LIVE: "/candidate/interviews/live/",
			SETUP: "/candidate/interviews/setup",
		},
		profile: {
			_layout: "/candidate/profile/",
			PRICING: "/candidate/profile/pricing/",
		},
	},
	manager: {
		_layout: "/manager",
		tests: {
			_layout: "/manager/tests/",
			ROOT: "/manager/tests/",
			in(id: number | string = ":testId") {
				return {
					_layout: `/manager/tests/${id}/`,
					ATTEMPTS: `/manager/tests/${id}/attempts/`,
					EDIT: `/manager/tests/${id}/edit/`,
				};
			},
			attempts: {
				in(id: number | string = ":attemptId") {
					return {
						_layout: `/manager/tests/attempts/${id}/`,
					};
				},
			},
			CREATE: `/manager/tests/create/`,
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
		},
	},
};

export default paths;

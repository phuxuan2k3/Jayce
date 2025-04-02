import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import CandidateTestAssessmentPage from "../pages/candidate/tests/[id]/assessment/CandidateTestAssessmentPage";
import ErrorPage from "../components/pages/ErrorPage";
import CandidateTestRecommendationPage from "../pages/candidate/tests/[id]/recommendation/CandidateTestRecommendationPage";
import ManagerTestAttemptsPage from "../pages/manager/tests/[id]/attempts/ManagerTestAttemptsPage";
import ManagerTestAttemptPage from "../pages/manager/tests/attempts/[id]/ManagerTestAttemptPage";
import ManagerTestsCreatePage from "../pages/manager/tests/create/ManagerTestsCreatePage";
import ScenarioListView from "../pages/manager/scenario/ScenarioListView/ScenarioListView";
import ScenarioLayout from "../pages/manager/scenario/ScenarioLayout";
import ScenarioSubmissionListView from "../pages/manager/scenario/ScenarioSubmissionListView/ScenarioSubmissionListView";
import ScenarioSubmissionDetail from "../pages/manager/scenario/ScenarioSubmissionDetail/ScenarioSubmissionDetail";
import ScenarioCreateDetail from "../pages/manager/scenario/ScenarioCreateDetail/ScenarioCreateDetail";
import ScenarioCreateQuestion from "../pages/manager/scenario/ScenarioCreateQuestion/ScenarioCreateQuestion";
import ScenarioEditDetail from "../pages/manager/scenario/ScenarioEditDetail/ScenarioEditDetail";
import ScenarioEditQuestion from "../pages/manager/scenario/ScenarioEditQuestion/ScenarioEditQuestion";
import PickAField from "../pages/candidate/scenarios/PickAField/PickAField";
import ChooseScenario from "../pages/candidate/scenarios/ChooseScenario/ChooseScenario";
import ScenarioDetail from "../pages/candidate/scenarios/Detail/Detail";
import AnswerQuestion from "../pages/candidate/scenarios/AnswerQuestion/AnswerQuestion";
import Review from "../pages/candidate/scenarios/Review/Review";
import ProfilePage from "../pages/common/profile/index/ProfilePage";
import PricingPage from "../pages/common/profile/pricing/PricingPage";
import ProvideSuggestionPage from "../pages/auth/provide-suggestion/suggestion";
import ProvidePositionPage from "../pages/auth/provide-position/ProvidePositionPage";
import ProvideCompaniesPage from "../pages/auth/provide-companies/ProvideCompaniesPage";
import ResetPasswordPage from "../pages/auth/reset-password/ResetPasswordPage";
import NewPasswordPage from "../pages/auth/new-password/NewPasswordPage";
import paths from "./paths";
import AuthenticateLayout from "../components/layouts/AuthenticateLayout";
import UnauthLayout from "../components/layouts/UnauthLayout";
import CandidateLayout from "../pages/candidate/CandidateLayout";
import GuestPage from "../pages/unauth/GuestPage";
import TestsPage from "../pages/common/tests/index/TestsPage";
import CandidateTestDoPage from "../pages/candidate/tests/[id]/do/CandidateTestDoPage";
import CandidateTestAttemtpsPage from "../pages/candidate/tests/[id]/attempts/CandidateTestAttemptsPage";
import CandidateTestLayout from "../pages/candidate/tests/CandidateTestLayout";
import ManagerLayout from "../components/layouts/ManagerLayout";
import BusinessRegisterPage from "../pages/auth/bussiness-register/BusinessRegisterPage";
import ChooseRolePage from "../pages/auth/choose-role/ChooseRolePage";
import CandidateAttemptPage from "../pages/candidate/tests/attempts/[id]/CandidateAttemptPage";
import HomePage from "../pages/common/HomePage";
import React from "react";
import CandidateInTestLayout from "../pages/candidate/tests/[id]/CandidateInTestLayout";
import ManagerTestsSelfPage from "../pages/manager/tests/self/ManagerTestsSelfPage";
import ManagerTestEditPage from "../pages/manager/tests/[id]/edit/ManagerTestEditPage";

const router = createBrowserRouter([{
	errorElement: <ErrorPage />,
	children: [

		// Authentication pages

		{
			path: paths.auth._layout,
			element: <AuthenticateLayout />,
			children: [
				{
					path: paths.auth.LOGIN,
					element: <LoginPage />
				},
				{
					path: paths.auth.CHOOSE_ROLE,
					element: <ChooseRolePage />
				},
				{
					path: paths.auth.BUSINESS_REGISTER,
					element: <BusinessRegisterPage />
				},
				{
					path: paths.auth.REGISTER,
					element: <RegisterPage />
				},
				{
					path: paths.auth.PROVIDE_SUGGESTION,
					element: <ProvideSuggestionPage />
				},
				{
					path: paths.auth.PROVIDE_POSITION,
					element: <ProvidePositionPage />
				},
				{
					path: paths.auth.PROVIDE_COMPANIES,
					element: <ProvideCompaniesPage />
				},
				{
					path: paths.auth.RESET_PASSWORD,
					element: <ResetPasswordPage />
				},
				{
					path: paths.auth.NEW_PASSWORD,
					element: <NewPasswordPage />
				},
			],
		},

		// Candidate pages

		{
			path: paths.candidate._layout,
			element: <CandidateLayout />,
			children: [

				// Common pages

				{
					index: true,
					element: <HomePage />,
				},

				// F1 - Tests

				{
					path: paths.candidate.tests._layout,
					element: <CandidateTestLayout />,
					children: [
						{
							index: true,
							element: <TestsPage />
						},
						{
							path: paths.candidate.tests.in().RECOMMENDATION,
							element: <CandidateTestRecommendationPage />
						},
						{
							path: paths.candidate.tests.in().ASSESSMENT,
							element: <CandidateTestAssessmentPage />
						},

						// In an Attempt

						{
							path: paths.candidate.tests.attempts.in()._layout,
							children: [
								{
									index: true,
									element: <CandidateAttemptPage />
								}
							]
						},

						// In a Test

						{
							path: paths.candidate.tests.in()._layout,
							element: <CandidateInTestLayout />,
							children: [
								{
									path: paths.candidate.tests.in().DO,
									element: <CandidateTestDoPage />
								},
								{
									path: paths.candidate.tests.in().ATTEMPTS,
									element: <CandidateTestAttemtpsPage />
								},
							],
						},
					]
				},

				// F2 - Scenario

				{
					path: paths.candidate.scenarios._layout,
					children: [
						{
							path: paths.candidate.scenarios.PICK,
							element: <PickAField />,
						},
						{
							path: paths.candidate.scenarios.CHOOSE,
							element: <ChooseScenario />,
						},
						{
							path: paths.candidate.scenarios.in()._layout,
							children: [
								{
									index: true,
									element: <ScenarioDetail />,
								},
								{
									path: paths.candidate.scenarios.in().ANSWER,
									element: <AnswerQuestion />,
								},
								{
									path: paths.candidate.scenarios.in().REVIEW,
									element: <Review />,
								},
							],
						},
					]
				},

				// Profile
				{
					path: paths.candidate.profile._layout,
					children: [
						{
							index: true,
							element: <ProfilePage />,
						},
						{
							path: paths.candidate.profile.PRICING,
							element: <PricingPage />,
						},
					]
				}
			]
		},

		// Manager pages

		{
			path: paths.manager._layout,
			element: <ManagerLayout />,
			children: [

				// Common pages

				{
					element: <HomePage />,
					index: true
				},

				// F1 - Tests

				{
					path: paths.manager.tests._layout,
					children: [
						{
							index: true,
							element: <TestsPage />,
						},
						{
							path: paths.manager.tests.SELF,
							element: <ManagerTestsSelfPage />
						},
						{
							path: paths.manager.tests.in()._layout,
							children: [
								{
									path: paths.manager.tests.in().ATTEMPTS,
									element: <ManagerTestAttemptsPage />
								}
							],
						},
						{
							path: paths.manager.tests.in().ATTEMPTS.in()._layout,
							element: <ManagerTestAttemptPage />
						},
						{
							path: paths.manager.tests.CREATE,
							element: <ManagerTestsCreatePage />
						},
						{
							path: paths.manager.tests.in().EDIT,
							element: <ManagerTestEditPage />
						},
					],
				},

				// F2 - Scenario

				{
					path: paths.manager.scenario._layout,
					element: <ScenarioLayout />,
					children: [
						{
							index: true,
							element: <ScenarioListView />,
						},
						{
							path: paths.manager.scenario.in()._layout,
							children: [
								{
									index: true,
									element: <ScenarioSubmissionListView />,
								},
								{
									path: paths.manager.scenario.in().edit.DETAIL,
									element: <ScenarioEditDetail />,
								},
								{
									path: paths.manager.scenario.in().edit.QUESTION,
									element: <ScenarioEditQuestion />,
								}
							]
						},
						{
							path: paths.manager.scenario.submissions.in()._layout,
							children: [
								{
									index: true,
									element: <ScenarioSubmissionDetail />,
								}
							],
						},
						{
							path: paths.manager.scenario.create.DETAIL,
							element: <ScenarioCreateDetail />
						},
						{
							path: paths.manager.scenario.create.QUESTION,
							element: <ScenarioCreateQuestion />
						},
					],
				},

				// Profile

				{
					path: paths.manager.profile._layout,
					children: [
						{
							index: true,
							element: <ProfilePage />,
						},
						{
							path: paths.manager.profile.PRICING,
							element: <PricingPage />,
						},
					]
				}
			]
		},

		// No authentication pages

		{
			path: paths._layout,
			element: <UnauthLayout />,
			children: [
				{
					element: <GuestPage />,
					index: true
				}
			]
		},
	]
}], {
	basename: '/'
});

export default router;
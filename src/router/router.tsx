import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import TestEvaluate from "../pages/candidate/tests/evaluate/TestEvaluate";
import ErrorPage from "../components/pages/ErrorPage";
import TestSchedule from "../pages/candidate/tests/schedule/TestSchedule";
import TestSubmissionListView from "../pages/manager/tests/TestSubmissionListView/TestSubmissionListView";
import TestSubmissionDetail from "../pages/manager/tests/TestSubmissionDetail/TestSubmissionDetail";
import TestListView from "../pages/manager/tests/TestListView/TestListView";
import CreateTest from "../pages/manager/tests/TestCreateDetail/TestCreateDetail";
import EditTestDetail from "../pages/manager/tests/TestEditDetail/TestEditDetail";
import EditTestQuestion from "../pages/manager/tests/TestEditQuestion/EditTestQuestion";
import CreateNewTest from "../pages/manager/tests/TestCreateQuestion/TestCreateQuestion";
import ScenarioListView from "../pages/manager/scenario/ScenarioListView/ScenarioListView";
import ScenarioLayout from "../pages/manager/scenario/ScenarioLayout";
import ScenarioSubmissionListView from "../pages/manager/scenario/ScenarioSubmissionListView/ScenarioSubmissionListView";
import ScenarioSubmissionDetail from "../pages/manager/scenario/ScenarioSubmissionDetail/ScenarioSubmissionDetail";
import ScenarioCreateDetail from "../pages/manager/scenario/ScenarioCreateDetail/ScenarioCreateDetail";
import ScenarioCreateQuestion from "../pages/manager/scenario/ScenarioCreateQuestion/ScenarioCreateQuestion";
import ScenarioEditDetail from "../pages/manager/scenario/ScenarioEditDetail/ScenarioEditDetail";
import ScenarioEditQuestion from "../pages/manager/scenario/ScenarioEditQuestion/ScenarioEditQuestion";
import PickAField from "../pages/candidate/scenarios/PickAField/PickAField";
import LayoutInterviewPractice from "../pages/candidate/scenarios/InterviewLayout";
import ChooseScenario from "../pages/candidate/scenarios/ChooseScenario/ChooseScenario";
import ScenarioDetail from "../pages/candidate/scenarios/Detail/Detail";
import AnswerQuestion from "../pages/candidate/scenarios/AnswerQuestion/AnswerQuestion";
import Review from "../pages/candidate/scenarios/Review/Review";
import ProfileDashboard from "../pages/common/Profile/Candidate/ProfileDashboard";
import ProfileLayout from "../pages/common/Profile/components/Layout";
import PricingPage from "../pages/common/Profile/Candidate/PricingPage";
import ProvideSuggestionPage from "../pages/auth/provide-suggestion/suggestion";
import ProvidePositionPage from "../pages/auth/provide-position/ProvidePositionPage";
import ProvideCompaniesPage from "../pages/auth/provide-companies/ProvideCompaniesPage";
import ResetPasswordPage from "../pages/auth/reset-password/ResetPasswordPage";
import NewPasswordPage from "../pages/auth/new-password/NewPasswordPage";
import paths from "./paths";
import AuthenticateLayout from "../components/layouts/AuthenticateLayout";
import UnauthLayout from "../components/layouts/UnauthLayout";
import CandidateLayout from "../pages/candidate/layout";
import DashboardPage from "../pages/unauth/DashboardPage";
import TestsPage from "../pages/common/tests/index/TestsPage";
import TestDoPage from "../pages/candidate/tests/[id]/do/TestDoPage";
import TestAttemtpsPage from "../pages/candidate/tests/[id]/attempts/TestAttemptsPage";
import CurrentTestLayout from "../features/Test/layout/CurrentTestLayout";
import ManagerLayout from "../components/layouts/ManagerLayout";
import BusinessRegisterPage from "../pages/auth/bussiness-register/BusinessRegisterPage";
import ChooseRolePage from "../pages/auth/choose-role/ChooseRolePage";
import AttemptDetailPage from "../pages/candidate/tests/attempts/[id]/AttemptDetailPage";
import React from "react";

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

				// Dashboard

				{
					index: true,
					element: <DashboardPage />,
				},

				// F1 - Tests

				{
					path: paths.candidate.tests._layout,
					element: <CurrentTestLayout />,
					children: [
						{
							index: true,
							element: <TestsPage />
						},
						{
							path: paths.candidate.tests.in().RECOMMENDATION,
							element: <TestSchedule />
						},
						{
							path: paths.candidate.tests.in().ASSESSMENT,
							element: <TestEvaluate />
						},

						// In an Attempt

						{
							path: paths.candidate.tests.attempts.in()._layout,
							children: [
								{
									index: true,
									element: <AttemptDetailPage />
								}
							]
						},

						// In a Test

						{
							path: paths.candidate.tests.in()._layout,
							children: [
								{
									path: paths.candidate.tests.in().DO,
									element: <TestDoPage />
								},
								{
									path: paths.candidate.tests.in().ATTEMPTS,
									element: <TestAttemtpsPage />
								},
							],
						},
					]
				},

				// F2 - Scenario

				{
					path: paths.candidate.scenarios._layout,
					element: <LayoutInterviewPractice />,
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
					element: <ProfileLayout />,
					children: [
						{
							index: true,
							element: <ProfileDashboard />,
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

				// Dashboard

				{
					element: <DashboardPage />,
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
							element: <TestListView />,
						},
						{
							path: paths.manager.tests.in().submissions.ROOT,
							element: <TestSubmissionListView />
						},
						{
							path: paths.manager.tests.in().submissions.in().ROOT,
							element: <TestSubmissionDetail />
						},
						{
							path: paths.manager.tests.create.DETAIL,
							element: <CreateTest />
						},
						{
							path: paths.manager.tests.create.QUESTION,
							element: <CreateNewTest />
						},
						{
							path: paths.manager.tests.in().edit.DETAIL,
							element: <EditTestDetail />
						},
						{
							path: paths.manager.tests.in().edit.QUESTION,
							element: <EditTestQuestion />
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
					element: <ProfileLayout />,
					children: [
						{
							index: true,
							element: <ProfileDashboard />,
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
					element: <DashboardPage />,
					index: true
				}
			]
		},
	]
}], {
	basename: '/'
});

export default router;
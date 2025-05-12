import { createBrowserRouter } from "react-router-dom";
import AuthLoginPage from "../pages/auth/login/AuthLoginPage";
import AuthRegisterPage from "../pages/auth/register/AuthRegisterPage";
import ErrorPage from "../components/pages/ErrorPage";
import ManagerTestAttemptsPage from "../pages/manager/tests/[id]/attempts/ManagerTestAttemptsPage";
import ManagerTestAttemptPage from "../pages/manager/tests/attempts/[id]/index/ManagerTestAttemptPage";
import ManagerTestsCreatePage from "../pages/manager/tests/create/ManagerTestsCreatePage";
import ManagerScenariosPage from "../pages/manager/scenarios/index/ManagerScenariosPage";
import ManagerScenarioSubmissionsPage from "../pages/manager/scenarios/[id]/submissions/ManagerScenarioSubmissionsPage";
import ScenarioSubmissionDetail from "../pages/manager/scenarios/submissions/[id]/index/ManagerScenariosSubmissionPage";
import ManagerScenariosCreateDetailPage from "../pages/manager/scenarios/create-detail/ManagerScenariosCreateDetailPage";
import ScenarioCreateQuestion from "../pages/manager/scenarios/create-questions/ManagerScenariosCreateQuestionsPage";
import ManagerScenarioEditDetailPage from "../pages/manager/scenarios/[id]/edit-detail/ManagerScenarioEditDetailPage";
import ManagerScenarioEditQuestionsPage from "../pages/manager/scenarios/[id]/edit-questions/ManagerScenarioEditQuestionsPage";
import CandidateScenariosPage from "../pages/candidate/scenarios/index/CandidateScenariosPage";
import CandidateScenarioPage from "../pages/candidate/scenarios/[id]/index/CandidateScenarioPage";
import CandidateScenarioAnswerPage from "../pages/candidate/scenarios/[id]/answer/CandidateScenarioAnswerPage";
import CandidateScenarioReviewPage from "../pages/candidate/scenarios/[id]/review/CandidateScenarioReviewPage";
import ProfilePage from "../pages/common/profile/index/ProfilePage";
import PricingPage from "../pages/common/profile/pricing/PricingPage";
import AuthProvideSuggestionPage from "../pages/auth/provide-suggestion/AuthProvideSuggestion";
import AuthProvidePositionPage from "../pages/auth/provide-position/AuthProvidePositionPage";
import AuthProvideCompaniesPage from "../pages/auth/provide-companies/AuthProvideCompaniesPage";
import AuthResetPasswordPage from "../pages/auth/reset-password/AuthResetPasswordPage";
import AuthNewPasswordPage from "../pages/auth/new-password/AuthNewPasswordPage";
import paths from "./paths";
import AuthLayout from "../pages/auth/AuthLayout";
import UnauthLayout from "../pages/unauth/UnauthLayout";
import CandidateLayout from "../pages/candidate/CandidateLayout";
import GuestPage from "../pages/unauth/index/GuestPage";
import CandidateTestsPage from "../pages/candidate/tests/index/CandidateTestsPage";
import CandidateTestsLayout from "../pages/candidate/tests/CandidateTestsLayout";
import ManagerLayout from "../pages/manager/ManagerLayout";
import AuthBusinessRegisterPage from "../pages/auth/bussiness-register/AuthBusinessRegisterPage";
import AuthChooseRolePage from "../pages/auth/choose-role/AuthChooseRolePage";
import CandidateAttemptPage from "../pages/candidate/tests/attempts/[id]/index/CandidateAttemptPage";
import CandidateInTestLayout from "../pages/candidate/tests/[id]/CandidateInTestLayout";
import ManagerTestsPage from "../pages/manager/tests/index/ManagerTestsPage";
import CandidateHomePage from "../pages/candidate/index/CandidateHomePage";
import ManagerHomePage from "../pages/manager/scenarios/index/ManagerHomePage";
import CandidateInterviewLivePage from "../pages/candidate/interviews/live/CandidateInterviewLivePage";
import ManagerTestEditPage from "../pages/manager/tests/[id]/edit/ManagerTestEditPage";
import SetUpPage from "../pages/candidate/interviews/setup/setup";
import Settings from "../pages/common/profile/index/Settings";
import CandidateTestsTemplatesPage from "../pages/candidate/tests/templates/page";
import CandidateTestsPracticePage from "../pages/candidate/tests/generate/page";
import CandidateTestPraticePage from "../pages/candidate/tests/[id]/pratice/page";
import CandidateTestPage from "../pages/candidate/tests/[id]/index/CandidateTestPage";
import CandidateTestsJoinPage from "../pages/candidate/tests/join/CandidateTestsJoinPage";

const router = createBrowserRouter(
	[
		{
			path: paths._layout,
			errorElement: <ErrorPage />,
			children: [

				// Authentication pages
				{
					path: paths.auth._layout,
					element: <AuthLayout />,
					children: [
						{
							path: paths.auth.LOGIN,
							element: <AuthLoginPage />,
						},
						{
							path: paths.auth.CHOOSE_ROLE,
							element: <AuthChooseRolePage />,
						},
						{
							path: paths.auth.BUSINESS_REGISTER,
							element: <AuthBusinessRegisterPage />,
						},
						{
							path: paths.auth.REGISTER,
							element: <AuthRegisterPage />,
						},
						{
							path: paths.auth.PROVIDE_SUGGESTION,
							element: <AuthProvideSuggestionPage />,
						},
						{
							path: paths.auth.PROVIDE_POSITION,
							element: <AuthProvidePositionPage />,
						},
						{
							path: paths.auth.PROVIDE_COMPANIES,
							element: <AuthProvideCompaniesPage />,
						},
						{
							path: paths.auth.RESET_PASSWORD,
							element: <AuthResetPasswordPage />,
						},
						{
							path: paths.auth.NEW_PASSWORD,
							element: <AuthNewPasswordPage />,
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
							element: <CandidateHomePage />,
						},

						// F1 - Tests

						{
							path: paths.candidate.tests.ROOT,
							element: <CandidateTestsLayout />,
							children: [
								{
									index: true,
									element: <CandidateTestsPage />,
								},
								{
									path: paths.candidate.tests.TEMPLATES,
									element: <CandidateTestsTemplatesPage />,
								},
								{
									path: paths.candidate.tests.GENERATE,
									element: <CandidateTestsPracticePage />,
								},
								{
									path: paths.candidate.tests.JOIN,
									element: <CandidateTestsJoinPage />,
								},

								// In an Attempt

								{
									path: paths.candidate.tests.attempts.in().ROOT,
									children: [
										{
											index: true,
											element: <CandidateAttemptPage />,
										},
									],
								},

								// In a Test

								{
									path: paths.candidate.tests.in().ROOT,
									element: <CandidateInTestLayout />,
									children: [
										{
											index: true,
											element: <CandidateTestPage />,
										},
										{
											path: paths.candidate.tests.in().DO,
											element: <CandidateTestPraticePage />,
										},
									],
								},
							],
						},

						// F2 - Scenario

						{
							path: paths.candidate.scenarios._layout,
							children: [
								{
									index: true,
									element: <CandidateScenariosPage />,
								},
								{
									path: paths.candidate.scenarios.in()._layout,
									children: [
										{
											index: true,
											element: <CandidateScenarioPage />,
										},
										{
											path: paths.candidate.scenarios.in().ANSWER,
											element: <CandidateScenarioAnswerPage />,
										},
										{
											path: paths.candidate.scenarios.in().REVIEW,
											element: <CandidateScenarioReviewPage />,
										},
									],
								},
							],
						},

						// F3 - Interview

						{
							path: paths.candidate.interview._layout,
							children: [
								{
									path: paths.candidate.interview.LIVE,
									element: <CandidateInterviewLivePage />,
								},
								{
									path: paths.candidate.interview.SETUP,
									element: <SetUpPage />,
								},
							],
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
								{
									path: paths.candidate.profile.SETTINGS,
									element: <Settings />,
								}
							],
						},
					],
				},

				// Manager pages

				{
					path: paths.manager._layout,
					element: <ManagerLayout />,
					children: [
						// Common pages

						{
							element: <ManagerHomePage />,
							index: true
						},

						// F1 - Tests

						{
							path: paths.manager.tests._layout,
							children: [
								{
									index: true,
									element: <ManagerTestsPage />,
								},
								{
									path: paths.manager.tests.in()._layout,
									children: [
										{
											path: paths.manager.tests.in().ATTEMPTS,
											element: <ManagerTestAttemptsPage />,
										},
										{
											path: paths.manager.tests.in().EDIT,
											element: <ManagerTestEditPage />,
										},
									],
								},
								{
									path: paths.manager.tests.attempts.in()._layout,
									element: <ManagerTestAttemptPage />,
								},
								{
									path: paths.manager.tests.CREATE,
									element: <ManagerTestsCreatePage />,
								},
							],
						},

						// F2 - Scenario

						{
							path: paths.manager.scenario._layout,
							children: [
								{
									index: true,
									element: <ManagerScenariosPage />,
								},
								{
									path: paths.manager.scenario.in()._layout,
									children: [
										{
											index: true,
											element: <ManagerScenarioSubmissionsPage />,
										},
										{
											path: paths.manager.scenario.in().EDIT_DETAIL,
											element: <ManagerScenarioEditDetailPage />,
										},
										{
											path: paths.manager.scenario.in().EDIT_QUESTIONS,
											element: <ManagerScenarioEditQuestionsPage />,
										},
										{
											path: paths.manager.scenario.in().SUBMISSIONS,
											element: <ManagerScenarioSubmissionsPage />,
										},
									],
								},
								{
									path: paths.manager.scenario.submissions.in()._layout,
									children: [
										{
											index: true,
											element: <ScenarioSubmissionDetail />,
										},
									],
								},
								{
									path: paths.manager.scenario.CREATE_DETAIL,
									element: <ManagerScenariosCreateDetailPage />,
								},
								{
									path: paths.manager.scenario.CREATE_QUESTIONS,
									element: <ScenarioCreateQuestion />,
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
								{
									path: paths.manager.profile.SETTINGS,
									element: <Settings />,
								}
							],
						},
					],
				},

				// No authentication pages, for guests, if has role, navigate away
				{
					element: <UnauthLayout />,
					children: [
						{
							element: <GuestPage />,
							index: true,
						},
					],
				},
			],
		},
	],
	{
		basename: "/",
	}
);

export default router;

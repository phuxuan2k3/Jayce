import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLoginPage from "../pages/auth/login/AuthLoginPage";
import AuthRegisterPage from "../pages/auth/register/AuthRegisterPage";
import ErrorPage from "../components/pages/ErrorPage";
import PricingPage from "../pages/common/profile/pricing/PricingPage";
import AuthProvideSuggestionPage from "../pages/auth/provide-suggestion/AuthProvideSuggestion";
import AuthProvidePositionPage from "../pages/auth/provide-position/AuthProvidePositionPage";
import AuthProvideCompaniesPage from "../pages/auth/provide-companies/AuthProvideCompaniesPage";
import AuthResetPasswordPage from "../pages/auth/reset-password/AuthResetPasswordPage";
import AuthNewPasswordPage from "../pages/auth/new-password/AuthNewPasswordPage";
import paths from "./paths";
import AuthLayout from "../pages/auth/AuthLayout";
import UnauthLayout from "../pages/unauth/UnauthLayout";
import CandidateLayout from "../pages/candidate/layout";
import GuestPage from "../pages/unauth/index/GuestPage";
import CandidateTestsPage from "../pages/candidate/tests/index/page";
import ManagerLayout from "../pages/manager/layout";
import AuthBusinessRegisterPage from "../pages/auth/bussiness-register/AuthBusinessRegisterPage";
import AuthChooseRolePage from "../pages/auth/choose-role/AuthChooseRolePage";
import CandidateTestAttemptPage from "../pages/candidate/tests/[id]/attempts/[id]/index/page";
import ManagerTestsPage from "../pages/manager/tests/index/page";
import CandidateHomePage from "../pages/candidate/index/page";
import CandidateInterviewLivePage from "../pages/candidate/interviews/live/CandidateInterviewLivePage";
// import SetUpPage from "../pages/candidate/interviews/setup/setup";
import Settings from "../pages/common/profile/index/Settings";
import CandidateTestsTemplatesPage from "../pages/candidate/tests/templates/page";
import CandidateTestsGeneratePage from "../pages/candidate/tests/generate/page";
import CandidatePracticePage from "../pages/candidate/tests/[id]/practice/page";
import CandidateTestsJoinPage from "../pages/candidate/tests/join/page";
import CandidateTestExamPage from "../pages/candidate/tests/[id]/exam/page";
import ManagerTestPage from "../pages/manager/tests/[id]/index/page";
import ResultPage from "../pages/candidate/interviews/result/result";
import ManagerTestEditPage from "../pages/manager/tests/[id]/edit/page";
import ManagerTestsNewPage from "../pages/manager/tests/new/page";
import ManagerTestsAttemptPage from "../pages/manager/tests/[id]/attempts/[id]/index/page";
import ManagerTestLayout from "../pages/manager/tests/[id]/layout";
import InterviewPage from "../pages/candidate/interviews/setup";
import CandidateTestAttemptsDoPage from "../pages/candidate/tests/[id]/attempts/[id]/do/page";
import CandidateTestPage from "../pages/candidate/tests/[id]/index/page";

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
					path: paths.candidate.ROOT,
					element: <CandidateLayout />,
					children: [

						// Common pages
						{
							index: true,
							element: <CandidateHomePage />,
						},

						// F1 F2 - Tests
						{
							path: paths.candidate.tests.ROOT,
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
									element: <CandidateTestsGeneratePage />,
								},
								{
									path: paths.candidate.tests.JOIN,
									element: <CandidateTestsJoinPage />,
								},

								// In a Test
								{
									path: paths.candidate.tests.in().ROOT,
									children: [
										{
											index: true,
											element: <CandidateTestPage />,
										},
										{
											path: paths.candidate.tests.in().PRACTICE,
											element: <CandidatePracticePage />,
										},
										{
											path: paths.candidate.tests.in().EXAM,
											element: <CandidateTestExamPage />,
										},
										{
											path: paths.candidate.tests.in().attempts.in().DO,
											element: <CandidateTestAttemptsDoPage />,
										},
										{
											path: paths.candidate.tests.in().attempts.in().ROOT,
											element: <CandidateTestAttemptPage />,
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
									element: <InterviewPage />,
								},
								{
									path: paths.candidate.interview.RESULT,
									element: <ResultPage />,
								},
							],
						},

						// Profile
						{
							path: paths.candidate.profile._layout,
							children: [
								{
									index: true,
									element: <Settings />,
								},
								{
									path: paths.candidate.profile.PRICING,
									element: <PricingPage />,
								},
							],
						},
					],
				},

				// Manager pages

				{
					path: paths.manager.ROOT,
					element: <ManagerLayout />,
					children: [

						{
							element: <Navigate to={paths.manager.tests.ROOT} replace />,
							index: true,
						},

						// F1 - Tests

						{
							path: paths.manager.tests.ROOT,
							element: <ManagerTestLayout />,
							children: [
								{
									index: true,
									element: <ManagerTestsPage />,
								},
								{
									path: paths.manager.tests.NEW,
									element: <ManagerTestsNewPage />,
								},
								{
									path: paths.manager.tests.in().ROOT,
									children: [
										{
											index: true,
											element: <ManagerTestPage />,
										},
										{
											path: paths.manager.tests.in().EDIT,
											element: <ManagerTestEditPage />,
										},
									],
								},
								{
									path: paths.manager.tests.in().attempts.in().ROOT,
									element: <ManagerTestsAttemptPage />,
								},
							],
						},

						// Profile

						{
							path: paths.manager.profile._layout,
							children: [
								{
									index: true,
									element: <Settings />,
								},
								{
									path: paths.manager.profile.PRICING,
									element: <PricingPage />,
								},
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

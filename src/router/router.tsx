import { createBrowserRouter } from "react-router-dom";
import AuthLoginPage from "../pages/auth/login/AuthLoginPage";
import AuthRegisterPage from "../pages/auth/register/AuthRegisterPage";
import CandidateTestAssessmentPage from "../pages/candidate/tests/[id]/assessment/CandidateTestAssessmentPage";
import ErrorPage from "../components/pages/ErrorPage";
import CandidateTestRecommendationPage from "../pages/candidate/tests/[id]/recommendation/CandidateTestRecommendationPage";
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
import TestsPage from "../pages/common/tests/index/TestsPage";
import CandidateTestDoPage from "../pages/candidate/tests/[id]/do/CandidateTestDoPage";
import CandidateTestAttemtpsPage from "../pages/candidate/tests/[id]/attempts/CandidateTestAttemptsPage";
import CandidateTestLayout from "../pages/candidate/tests/CandidateTestLayout";
import ManagerLayout from "../pages/manager/ManagerLayout";
import AuthBusinessRegisterPage from "../pages/auth/bussiness-register/AuthBusinessRegisterPage";
import AuthChooseRolePage from "../pages/auth/choose-role/AuthChooseRolePage";
import CandidateAttemptPage from "../pages/candidate/tests/attempts/[id]/index/CandidateAttemptPage";
import HomePage from "../pages/common/HomePage";
import CandidateInTestLayout from "../pages/candidate/tests/[id]/CandidateInTestLayout";
import ManagerTestEditPage from "../pages/manager/tests/[id]/edit/ManagerTestEditPage";
import ManagerTestsSelfPage from "../pages/manager/tests/self/ManagerTestsSelfPage";
import CandidateInterviewLivePage from "../pages/candidate/interviews/live/CandidateInterviewLivePage";
import SetUpPage from "../pages/candidate/interviews/setup/setup";
import ResultPage from "../pages/candidate/interviews/result/result";

const router = createBrowserRouter(
  [
    {
      path: paths._layout,
      errorElement: <ErrorPage />,
      children: [
        // TODO Dev: DEMO
        {
          path: "/dev",
          element: <CandidateInterviewLivePage />,
        },

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
              element: <HomePage />,
            },

            // F1 - Tests

            {
              path: paths.candidate.tests._layout,
              element: <CandidateTestLayout />,
              children: [
                {
                  index: true,
                  element: <TestsPage />,
                },
                {
                  path: paths.candidate.tests.in().RECOMMENDATION,
                  element: <CandidateTestRecommendationPage />,
                },
                {
                  path: paths.candidate.tests.in().ASSESSMENT,
                  element: <CandidateTestAssessmentPage />,
                },

                // In an Attempt

                {
                  path: paths.candidate.tests.attempts.in()._layout,
                  children: [
                    {
                      index: true,
                      element: <CandidateAttemptPage />,
                    },
                  ],
                },

                // In a Test

                {
                  path: paths.candidate.tests.in()._layout,
                  element: <CandidateInTestLayout />,
                  children: [
                    {
                      path: paths.candidate.tests.in().DO,
                      element: <CandidateTestDoPage />,
                    },
                    {
                      path: paths.candidate.tests.in().ATTEMPTS,
                      element: <CandidateTestAttemtpsPage />,
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
                // {
                //   path: paths.candidate.interview.SETUP,
                //   element: <SetUpPage />,
                // },
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
              element: <HomePage />,
              index: true,
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
                  element: <ManagerTestsSelfPage />,
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
            {
              path: paths.candidate.interview.RESULT,
              element: <ResultPage />,
            },
            {
              path: paths.candidate.interview.SETUP,
              element: <SetUpPage />,
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

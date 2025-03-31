import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
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
import Suggestion from "../pages/auth/suggestion/suggestion";
import Role from "../pages/auth/role/role";
import Company from "../pages/auth/company/company";
import ResetPassword from "../pages/auth/resetpass/resetpass";
import NewPassword from "../pages/auth/newpass/newpass";
import paths2 from "./paths";
import AuthenticateLayout from "../components/layouts/AuthenticateLayout";
import UnauthLayout from "../components/layouts/UnauthLayout";
import CandidateLayout from "../pages/candidate/layout";
import DashboardPage from "../pages/common/DashboardPage";
import TestsPage from "../pages/common/tests/index/TestsPage";
import TestDoPage from "../pages/candidate/tests/[id]/do/TestDoPage";
import TestAttemtpsPage from "../pages/candidate/tests/[id]/attempts/TestAttemptsPage";
import CurrentTestLayout from "../features/Test/layout/CurrentTestLayout";
import ManagerLayout from "../components/layouts/ManagerLayout";
import BRegister from "../pages/auth/register/BRegister";
import ChooseRole from "../pages/auth/chooseRole/chooseRole";
import AttemptDetailPage from "../pages/candidate/tests/attempts/[id]/AttemptDetailPage";
import React from "react";

const router = createBrowserRouter([{
	errorElement: <ErrorPage />,
	children: [

		// Authentication pages

		{
			path: paths2.auth._layout,
			element: <AuthenticateLayout />,
			children: [
				{
					path: paths2.auth.LOGIN,
					element: <Login />
				},
				{
					path: paths2.auth.CHOOSE_ROLE,
					element: <ChooseRole />
				},
				{
					path: paths2.auth.B_REGISTER,
					element: <BRegister />
				},
				{
					path: paths2.auth.REGISTER,
					element: <Register />
				},
				{
					path: paths2.auth.SUGGESTION,
					element: <Suggestion />
				},
				{
					path: paths2.auth.ROLE,
					element: <Role />
				},
				{
					path: paths2.auth.COMPANY,
					element: <Company />
				},
				{
					path: paths2.auth.RESET,
					element: <ResetPassword />
				},
				{
					path: paths2.auth.NEWPASS,
					element: <NewPassword />
				},
			],
		},

		// Candidate pages

		{
			path: paths2.candidate._layout,
			element: <CandidateLayout />,
			children: [

				// Dashboard

				{
					index: true,
					element: <DashboardPage />,
				},

				// F1 - Tests

				{
					path: paths2.candidate.tests._layout,
					element: <CurrentTestLayout />,
					children: [
						{
							index: true,
							element: <TestsPage />
						},
						{
							path: paths2.candidate.tests.in().RECOMMENDATION,
							element: <TestSchedule />
						},
						{
							path: paths2.candidate.tests.in().ASSESSMENT,
							element: <TestEvaluate />
						},

						// In an Attempt

						{
							path: paths2.candidate.tests.attempts.in()._layout,
							children: [
								{
									index: true,
									element: <AttemptDetailPage />
								}
							]
						},

						// In a Test

						{
							path: paths2.candidate.tests.in()._layout,
							children: [
								{
									path: paths2.candidate.tests.in().DO,
									element: <TestDoPage />
								},
								{
									path: paths2.candidate.tests.in().ATTEMPTS,
									element: <TestAttemtpsPage />
								},
							],
						},
					]
				},

				// F2 - Scenario

				{
					path: paths2.candidate.scenarios._layout,
					element: <LayoutInterviewPractice />,
					children: [
						{
							path: paths2.candidate.scenarios.PICK,
							element: <PickAField />,
						},
						{
							path: paths2.candidate.scenarios.CHOOSE,
							element: <ChooseScenario />,
						},
						{
							path: paths2.candidate.scenarios.in()._layout,
							children: [
								{
									index: true,
									element: <ScenarioDetail />,
								},
								{
									path: paths2.candidate.scenarios.in().ANSWER,
									element: <AnswerQuestion />,
								},
								{
									path: paths2.candidate.scenarios.in().REVIEW,
									element: <Review />,
								},
							],
						},
					]
				},

				// Profile
				{
					path: paths2.candidate.profile._layout,
					element: <ProfileLayout />,
					children: [
						{
							index: true,
							element: <ProfileDashboard />,
						},
						{
							path: paths2.candidate.profile.PRICING,
							element: <PricingPage />,
						},
					]
				}
			]
		},

		// Manager pages

		{
			path: paths2.manager._layout,
			element: <ManagerLayout />,
			children: [

				// Dashboard

				{
					element: <DashboardPage />,
					index: true
				},

				// F1 - Tests

				{
					path: paths2.manager.tests._layout,
					children: [
						{
							index: true,
							element: <TestsPage />,
						},
						{
							path: paths2.manager.tests.SELF,
							element: <TestListView />,
						},
						{
							path: paths2.manager.tests.in().submissions.ROOT,
							element: <TestSubmissionListView />
						},
						{
							path: paths2.manager.tests.in().submissions.in().ROOT,
							element: <TestSubmissionDetail />
						},
						{
							path: paths2.manager.tests.create.DETAIL,
							element: <CreateTest />
						},
						{
							path: paths2.manager.tests.create.QUESTION,
							element: <CreateNewTest />
						},
						{
							path: paths2.manager.tests.in().edit.DETAIL,
							element: <EditTestDetail />
						},
						{
							path: paths2.manager.tests.in().edit.QUESTION,
							element: <EditTestQuestion />
						},
					],
				},

				// F2 - Scenario

				{
					path: paths2.manager.scenario._layout,
					element: <ScenarioLayout />,
					children: [
						{
							index: true,
							element: <ScenarioListView />,
						},
						{
							path: paths2.manager.scenario.in()._layout,
							children: [
								{
									index: true,
									element: <ScenarioSubmissionListView />,
								},
								{
									path: paths2.manager.scenario.in().edit.DETAIL,
									element: <ScenarioEditDetail />,
								},
								{
									path: paths2.manager.scenario.in().edit.QUESTION,
									element: <ScenarioEditQuestion />,
								}
							]
						},
						{
							path: paths2.manager.scenario.submissions.in()._layout,
							children: [
								{
									index: true,
									element: <ScenarioSubmissionDetail />,
								}
							],
						},
						{
							path: paths2.manager.scenario.create.DETAIL,
							element: <ScenarioCreateDetail />
						},
						{
							path: paths2.manager.scenario.create.QUESTION,
							element: <ScenarioCreateQuestion />
						},
					],
				},

				// Profile

				{
					path: paths2.manager.profile._layout,
					element: <ProfileLayout />,
					children: [
						{
							index: true,
							element: <ProfileDashboard />,
						},
						{
							path: paths2.manager.profile.PRICING,
							element: <PricingPage />,
						},
					]
				}
			]
		},

		// No authentication pages

		{
			path: paths2._layout,
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
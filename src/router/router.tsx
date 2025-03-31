import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Authen/login/Login";
import { paths } from "./path"
import Register from "../pages/Authen/register/Register";
import TestEvaluate from "../pages/Test/Candidate/TestEvaluate/TestEvaluate";
import ErrorPage from "../components/pages/ErrorPage";
import TestSchedule from "../pages/Test/Candidate/TestSchedule/TestSchedule";
import AttemptDetailPage from "../pages/Test/Candidate/AttemptDetail/AttemptDetailPage";
import TestSubmissionListView from "../pages/Test/BusinessManager/TestSubmissionListView/TestSubmissionListView";
import TestSubmissionDetail from "../pages/Test/BusinessManager/TestSubmissionDetail/TestSubmissionDetail";
import TestListView from "../pages/Test/BusinessManager/TestListView/TestListView";
import CreateTest from "../pages/Test/BusinessManager/TestCreateDetail/TestCreateDetail";
import EditTestDetail from "../pages/Test/BusinessManager/TestEditDetail/TestEditDetail";
import EditTestQuestion from "../pages/Test/BusinessManager/TestEditQuestion/EditTestQuestion";
import CreateNewTest from "../pages/Test/BusinessManager/TestCreateQuestion/TestCreateQuestion";
import ScenarioListView from "../pages/Scenario/BusinessManager/ScenarioListView/ScenarioListView";
import ScenarioLayout from "../pages/Scenario/components/ScenarioLayout";
import ScenarioSubmissionListView from "../pages/Scenario/BusinessManager/ScenarioSubmissionListView/ScenarioSubmissionListView";
import ScenarioSubmissionDetail from "../pages/Scenario/BusinessManager/ScenarioSubmissionDetail/ScenarioSubmissionDetail";
import ScenarioCreateDetail from "../pages/Scenario/BusinessManager/ScenarioCreateDetail/ScenarioCreateDetail";
import ScenarioCreateQuestion from "../pages/Scenario/BusinessManager/ScenarioCreateQuestion/ScenarioCreateQuestion";
import ScenarioEditDetail from "../pages/Scenario/BusinessManager/ScenarioEditDetail/ScenarioEditDetail";
import ScenarioEditQuestion from "../pages/Scenario/BusinessManager/ScenarioEditQuestion/ScenarioEditQuestion";
import PickAField from "../pages/Scenario/Candidate/PickAField/PickAField";
import LayoutInterviewPractice from "../pages/Scenario/components/InterviewLayout";
import ChooseScenario from "../pages/Scenario/Candidate/ChooseScenario/ChooseScenario";
import ScenarioDetail from "../pages/Scenario/Candidate/Detail/Detail";
import AnswerQuestion from "../pages/Scenario/Candidate/AnswerQuestion/AnswerQuestion";
import Review from "../pages/Scenario/Candidate/Review/Review";
import ProfileDashboard from "../pages/Profile/Candidate/ProfileDashboard";
import ProfileLayout from "../pages/Profile/components/Layout";
import PricingPage from "../pages/Profile/Candidate/PricingPage";
import Suggestion from "../pages/Authen/suggestion/suggestion";
import Role from "../pages/Authen/role/role";
import Company from "../pages/Authen/company/company";
import ResetPassword from "../pages/Authen/resetpass/resetpass";
import NewPassword from "../pages/Authen/newpass/newpass";
import paths2 from "./path-2";
import AuthenticateLayout from "../components/layouts/AuthenticateLayout";
import UnauthLayout from "../components/layouts/UnauthLayout";
import CandidateLayout from "../components/layouts/CandidateLayout";
import DashboardPage from "../pages/common/DashboardPage";
import TestsPage from "../pages/Test/Candidate/Tests/TestsPage";
import TestDoPage from "../pages/Test/Candidate/TestDo/TestDoPage";
import TestAttemtpsPage from "../pages/Test/Candidate/TestAttempts/TestAttemptsPage";
import CurrentTestLayout from "../features/Test/layout/CurrentTestLayout";
import ManagerLayout from "../components/layouts/ManagerLayout";
import BRegister from "../pages/Authen/register/BRegister";
import ChooseRole from "../pages/Authen/chooseRole/chooseRole";

const router = createBrowserRouter([{
	errorElement: <ErrorPage />,
	children: [
		{
			path: paths2.auth.ROOT,
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
		{
			path: paths2.candidate.ROOT,
			element: <CandidateLayout />,
			children: [
				{
					element: <CurrentTestLayout />,
					children: [
						{
							path: paths2.candidate.ROOT,
							element: <DashboardPage />,
							index: true
						},
						{
							path: paths2.candidate.tests.ROOT,
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
						{
							path: paths2.candidate.tests.attempts.in().ROOT,
							element: <AttemptDetailPage />
						}
					]
				},
				{
					path: paths2.candidate.tests.in().DO,
					element: <TestDoPage />
				},
				{
					path: paths2.candidate.tests.in().ATTEMPTS,
					element: <TestAttemtpsPage />
				},
			]
		},
		{
			path: paths2.manager.ROOT,
			element: <ManagerLayout />,
			children: [
				{
					path: paths2.manager.ROOT,
					element: <DashboardPage />,
					index: true
				},
				{
					path: paths2.manager.tests.ROOT,
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
					path: paths2.manager.tests.in().create.DETAIL,
					element: <CreateTest />
				},
				{
					path: paths2.manager.tests.in().create.QUESTION,
					element: <CreateNewTest />
				},
				{
					path: paths2.manager.tests.in().edit.DETAIL,
					element: <EditTestDetail />
				},
				{
					path: paths2.manager.tests.in().edit.QUESTION,
					element: <EditTestQuestion />
				}
			]
		},
		{
			path: paths2.ROOT,
			element: <UnauthLayout />,
			children: [
				{
					path: paths2.ROOT,
					element: <DashboardPage />,
					index: true
				}
			]
		},


		// Old paths

		{
			path: paths.SCENARIO.ROOT,
			element: <ScenarioLayout />,
			children: [
				{
					path: '',
					element: <Navigate to={paths.SCENARIO.LIST} />, // Redirect to paths.SCENARIO.LIST
				},
				{
					path: paths.SCENARIO.LIST,
					element: <ScenarioListView />,
				},
				{
					path: paths.SCENARIO.SUBMISSION.ROOT,
					element: <ScenarioSubmissionListView />,
				},
				{
					path: paths.SCENARIO.SUBMISSION.DETAIL,
					element: <ScenarioSubmissionDetail />
				},
				{
					path: paths.SCENARIO.CREATE.ROOT,
					element: <Navigate to={paths.SCENARIO.LIST} />,
				},
				{
					path: paths.SCENARIO.CREATE.DETAIL,
					element: <ScenarioCreateDetail />
				},
				{
					path: paths.SCENARIO.CREATE.QUESTION,
					element: <ScenarioCreateQuestion />
				},
				{
					path: paths.SCENARIO.EDIT.ROOT,
					element: <Navigate to={paths.SCENARIO.LIST} />,
				},
				{
					path: paths.SCENARIO.EDIT.DETAIL,
					element: <ScenarioEditDetail />,
				},
				{
					path: paths.SCENARIO.EDIT.QUESTION,
					element: <ScenarioEditQuestion />,
				},
			],
		},
		{
			path: paths.INTERVIEWPRACTICE.ROOT,
			element: <LayoutInterviewPractice />,
			children: [
				{
					path: paths.INTERVIEWPRACTICE.PICK,
					element: <PickAField />,
				},
				{
					path: paths.INTERVIEWPRACTICE.CHOOSE,
					element: <ChooseScenario />,
				},
				{
					path: paths.INTERVIEWPRACTICE.DETAIL,
					element: <ScenarioDetail />,
				},
				{
					path: paths.INTERVIEWPRACTICE.ANSWER,
					element: <AnswerQuestion />,
				},
				{
					path: paths.INTERVIEWPRACTICE.REVIEW,
					element: <Review />,
				}
			]
		},
		{
			path: paths.PROFILE.ROOT,
			element: <ProfileLayout />,
			children: [
				{
					path: '',
					element: <ProfileDashboard />,
				},
			],
		},
		{
			path: paths.PRICING.ROOT,
			element: <ProfileLayout />,
			children: [
				{
					path: '',
					element: <PricingPage />,
				},
			],
		}]
}], {
	basename: '/'
});

export default router;
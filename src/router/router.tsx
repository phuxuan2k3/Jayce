import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Authen/login/Login";
import Dashboard from "../pages/Dashboard";
import TestDo from "../pages/Test/Candidate/TestDo/TestDo";
import { paths } from "./path"
import Register from "../pages/Authen/register/Register";
import TestList from "../pages/Test/Candidate/TestList/TestList";
import Layout from "../pages/Test/components/Layout";
import TestDetail from "../pages/Test/Candidate/TestAttempts/TestAttempts";
import TestEvaluate from "../pages/Test/Candidate/TestEvaluate/TestEvaluate";
import ErrorPage from "../components/ErrorPage";
import TestSchedule from "../pages/Test/Candidate/TestSchedule/TestSchedule";
import TestViewAnswer from "../pages/Test/Candidate/TestViewAnswer/TestViewAnswer";
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
const router = createBrowserRouter([
	{
		errorElement: <ErrorPage />,
		children: [
			{
				path: paths.REGISTER,
				element: <Register />,
			},
			{
				path: paths.LOGIN,
				element: <Login />
			},
			{
				path: "/",
				element: <Dashboard />
			},
			{
				path: paths.TEST.ROOT,
				element: <Layout />,
				children: [
					{
						path: paths.TEST.LIST,
						element: <TestList />,
					},
					{
						path: paths.TEST.DO,
						element: <TestDo />
					},
					{
						path: paths.TEST.ATTEMPTS,
						element: <TestDetail />
					},
					{
						path: paths.TEST.VIEWANSWER,
						element: <TestViewAnswer />
					},
					{
						path: paths.TEST.EVALUATE,
						element: <TestEvaluate />
					},
					{
						path: paths.TEST.SCHEDULE,
						element: <TestSchedule />
					},
					{
						path: paths.TEST.SUBMISSION.ROOT,
						children: [
							{
								path: paths.TEST.SUBMISSION.LIST,
								element: <TestSubmissionListView />
							},
							{
								path: paths.TEST.SUBMISSION.DETAIL,
								element: <TestSubmissionDetail />
							}
						]
					},
					{
						path: paths.TEST.EDIT.ROOT,
						children: [
							{
								path: paths.TEST.EDIT.DETAIL,
								element: <EditTestDetail />
							},
							{
								path: paths.TEST.EDIT.QUESTION,
								element: <EditTestQuestion />
							}
						]
					},
					{
						path: paths.TEST.CREATENEWTEST,
						element: <CreateNewTest />
					},
					{
						path: paths.TEST.CREATETEST,
						element: <CreateTest />,
					},
					{
						path: paths.TEST.TESTLISTVIEW,
						element: <TestListView />,
					},
				],
			},
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
		]
	}
], {
	basename: '/'
});

export default router;
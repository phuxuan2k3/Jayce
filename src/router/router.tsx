import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Authen/Login";
import Dashboard from "../pages/Dashboard";
import TestDo from "../pages/Test/Candidate/TestDo/TestDo";
import { paths } from "./path"
import Register from "../pages/Authen/Register";
import TestList from "../pages/Test/Candidate/TestList/TestList";
import Layout from "../pages/Test/components/Layout";
import TestDetail from "../pages/Test/Candidate/TestAttempts/TestAttempts";
import TestEvaluate from "../pages/Test/Candidate/TestEvaluate/TestEvaluate";
import ErrorPage from "../components/ErrorPage";
import TestSchedule from "../pages/Test/Candidate/TestSchedule/TestSchedule";
import TestViewAnswer from "../pages/Test/Candidate/TestViewAnswer/TestViewAnswer";
import TestSubmissionListView from "../pages/Test/BusinessManager/ListView/TestSubmissionListView";
import TestSubmissionDetail from "../pages/Test/BusinessManager/Detail/TestSubmissionDetail";
import TestListView from "../pages/TestListView/TestListView";
import CreateTest from "../pages/TestCreate/CreateTest";
import EditTestDetail from "../pages/Test/EditTestDetail/EditTestDetail";
import EditTestQuestion from "../pages/Test/EditTestQuestion/EditTestQuestion";
import CreateNewTest from "../pages/Test/CreateNewTest/CreateNewTest";
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
				],
			},
			{
				path: paths.TESTLISTVIEW,
				element: <TestListView />,
			},
			{
				path: paths.CREATETEST,
				element: <CreateTest />,
			},
			
		]
	}
], {
	basename: '/'
});

export default router;
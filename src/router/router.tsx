import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Authen/Login";
import Dashboard from "../pages/Dashboard";
import TestScreen from "../pages/Test/TestScreen/TestScreen";
import { paths } from "./path"
import Register from "../pages/Authen/Register";
import TestList from "../pages/Test/TestList/TestList";
import Layout from "../pages/Test/components/Layout";
import TestDetail from "../pages/Test/TestAttempts/TestAttempts";
import TestEvaluate from "../pages/Test/TestEvaluate/TestEvaluate";
import ErrorPage from "../components/ErrorPage";
import TestSchedule from "../pages/Test/TestSchedule/TestSchedule";
import TestSubmissionListView from "../pages/Test/Submission/ListView/TestSubmissionListView";
import TestSubmissionDetail from "../pages/Test/Submission/Detail/TestSubmissionDetail";
import TestViewAnswer from "../pages/Test/TestViewAnswer/TestViewAnswer";


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
						path: paths.TEST.DO,
						element: <TestScreen />
					},
					{
						path: paths.TEST.LIST,
						element: <TestList />,
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
					}
				],
			}
		]
	}
], {
	basename: '/'
});

export default router;
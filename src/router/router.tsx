import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Authen/Login";
import Dashboard from "../pages/Dashboard";
import TestScreen from "../pages/Test/TestScreen";
import { paths } from "./path"
import Register from "../pages/Authen/Register";
import TestList from "../pages/Test/TestList";
import testListMock from "../mocks/data/testlist.mock";
import Layout from "../pages/Test/components/Layout";
import TestDetail from "../pages/Test/TestDetail";
import TestViewAnswer from "../pages/Test/TestViewAnswer";
import TestEvaluate from "../pages/Test/TestEvaluate";
import TestSchedule from "../pages/Test/TestSchedule";
import TestSubmissionListView from "../pages/Test/TestSubmissionListView";
import TestSubmissionDetail from "../pages/Test/TestSubmissionDetail";
import TestListView from "../pages/TestListView";
import CreateTest from "../pages/CreateTest";

export default function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path={paths.LOGIN} element={<Login />} />
				<Route path={paths.REGISTER} element={<Register />} />
				<Route path={paths.TEST.ROOT} element={<Layout />}>
					<Route path={paths.TEST.DO} element={<TestScreen />} />
					<Route path={paths.TEST.LIST} element={<TestList questions={testListMock} />} />
					<Route path={paths.TEST.DETAIL} element={<TestDetail />} />
					<Route path={paths.TEST.VIEWANSWER} element={<TestViewAnswer />} />
					<Route path={paths.TEST.EVALUATE} element={<TestEvaluate />} />

				</Route>
				<Route path={paths.TEST.SCHEDULE} element={<TestSchedule />} />
				<Route path={paths.TEST.SUBMISSION.LIST} element={<TestSubmissionListView />} />
				<Route path={paths.TEST.SUBMISSION.DETAIL} element={<TestSubmissionDetail />} />
				<Route path={paths.TESTLISTVIEW} element={<TestListView />} />
				<Route path={paths.CREATETEST} element={<CreateTest />} />
			</Routes>
		</Router>
	);
}

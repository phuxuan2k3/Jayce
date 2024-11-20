import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Authen/Login";
import Dashboard from "../pages/Dashboard";
import TestScreen from "../pages/Test/TestScreen";
import { paths } from "./path"
import Register from "../pages/Authen/Register";
import TestList from "../pages/Test/TestList";
import testListMock from "../mocks/data/testlist.mock";
import Layout from "../pages/Test/components/Layout";

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
				</Route>
			</Routes>
		</Router>
	);
}

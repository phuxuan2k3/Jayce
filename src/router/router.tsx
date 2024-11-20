import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Authen/Login";
import Dashboard from "../pages/Dashboard";
import TestScreen from "../pages/Test/TestScreen";
import { paths } from "./path"
import Register from "../pages/Authen/Register";
import { dev } from "../development/dev";
import { useEffect, useState } from "react";
import Layout from "../pages/F1/components/Layout";

export default function AppRouter() {
	const [devRoute, setDevRoute] = useState<JSX.Element | null>(null);

	useEffect(() => {
		async function loadDevPage() {
			const page = await dev.loadDevPage();
			setDevRoute(page);
		}
		loadDevPage();
	}, [devRoute]);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path={paths.LOGIN} element={<Login />} />
				<Route path={paths.REGISTER} element={<Register />} />
				<Route path={paths.TESTSCREEN} element={<TestScreen />} />
				<Route element={<Layout />}>
					{devRoute &&
						<Route path={dev.routePath} element={devRoute} />
					}
				</Route>
			</Routes>
		</Router>
	);
}

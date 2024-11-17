import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Authen/Login";
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
				<Route path="/" element={<Login />} />
				<Route path={paths.LOGIN} element={<Login />} />
				<Route path={paths.REGISTER} element={<Register />} />
				<Route element={<Layout />}>
					{devRoute &&
						<Route path={dev.routePath} element={devRoute} />
					}
				</Route>
			</Routes>
		</Router>
	);
}
